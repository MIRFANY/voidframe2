#!/usr/bin/env python3
"""
llm_local_updated.py

Local DPR evaluator using Ollama (CLI). Produces a strict, MDoNER-ready JSON report.
"""

import json
import subprocess
import time
import re
import sys
from pathlib import Path
from typing import List, Dict, Any

# -----------------------
# CONFIG
# -----------------------
MODEL = "qwen2.5:7b"           # ✔ Updated for your model
INPUT_JSON = "pdf_output/extracted_data.json"
OUTPUT_JSON = "dpr_evaluation_local.json"
CHUNK_SIZE = 6000
MAX_RETRIES = 2
RETRY_DELAY = 1.0

# Weights for scoring
WEIGHTS = {
    "completeness": 0.20,
    "technical_soundness": 0.25,
    "cost_validation": 0.20,
    "timeline_feasibility": 0.15,
    "risk_mitigation": 0.20
}

# -----------------------
# PROMPTS & SCHEMA
# -----------------------
SYSTEM_INSTRUCTION = (
    "You are an expert evaluator for Detailed Project Reports (DPRs) for the "
    "Ministry of Development of North Eastern Region (MDoNER), Government of India. "
    "You MUST be strict, evidence-based and avoid hallucinations. If the required "
    "information is not present in the given chunk, say 'insufficient information'."
)

SYSTEM_PROMPT_CHUNK = (
    SYSTEM_INSTRUCTION + "\n\n"
    "Analyze the DPR CHUNK below and return ONLY valid JSON matching the exact schema:\n\n"
    "{\n"
    '  "missing_sections": [ {"section": "...", "reason": "..."} ],\n'
    '  "technical_gaps": [ {"issue": "...", "details": "..."} ],\n'
    '  "cost_irregularities": [ {"item": "...", "issue": "...", "evidence": "..."} ],\n'
    '  "timeline_issues": [ {"issue": "...", "details": "..."} ],\n'
    '  "risk_analysis": [ {"risk": "...", "impact": "Low|Medium|High", "probability": "Low|Medium|High", "notes": "..."} ],\n'
    '  "chunk_score": 0\n'
    "}\n\n"
    "If unsure, return an empty list for that field. Do NOT output text outside JSON."
)

# -----------------------
# HELPERS
# -----------------------

def load_input(path: str) -> Dict[str, Any]:
    p = Path(path)
    if not p.exists():
        print(f"Input file not found: {path}", file=sys.stderr)
        sys.exit(1)
    return json.loads(p.read_text(encoding="utf-8"))

def chunk_text(text: str, size: int) -> List[str]:
    paragraphs = re.split(r'\n{2,}', text)
    chunks = []
    current = ""

    for p in paragraphs:
        if len(current) + len(p) + 2 <= size:
            current += ("\n\n" + p) if current else p
        else:
            if current:
                chunks.append(current)
            if len(p) > size:
                for i in range(0, len(p), size):
                    chunks.append(p[i:i+size])
                current = ""
            else:
                current = p

    if current:
        chunks.append(current)

    return chunks

def call_ollama(prompt: str) -> str:
    try:
        proc = subprocess.run(
            ["ollama", "run", MODEL],
            input=prompt.encode("utf-8"),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=180
        )
        out = proc.stdout.decode("utf-8", errors="ignore").strip()
        return out
    except:
        return ""

def extract_json_from_text(text: str) -> str:
    text = re.sub(r"```(?:json)?", "", text)
    start = None
    brace = 0

    for i, ch in enumerate(text):
        if ch == "{":
            if start is None:
                start = i
            brace += 1
        elif ch == "}":
            brace -= 1
            if brace == 0 and start is not None:
                return text[start:i+1].strip()

    match = re.search(r"(\{[\s\S]*\})", text)
    return match.group(1).strip() if match else text.strip()

def safe_parse_json(text: str) -> Any:
    try:
        return json.loads(extract_json_from_text(text))
    except:
        return None

def dedupe_list_of_dicts(items: List[Dict[str,Any]], key_fields: List[str]) -> List[Dict[str,Any]]:
    seen = set()
    out = []

    for item in items:
        if not isinstance(item, dict):
            continue

        key_parts = []
        for k in key_fields:
            v = item.get(k, "")
            if isinstance(v, (dict, list)):
                v = json.dumps(v, sort_keys=True)
            else:
                v = str(v)
            key_parts.append(v.strip().lower())

        key = tuple(key_parts)

        if key not in seen:
            seen.add(key)
            out.append(item)

    return out

# -----------------------
# MAIN EVALUATION LOGIC
# -----------------------

def evaluate_locally(data: Dict[str,Any]):
    text = data.get("raw_text", "")
    if not text:
        print("No text found. Exiting.")
        sys.exit(1)

    chunks = chunk_text(text, CHUNK_SIZE)
    print(f"Total chunks: {len(chunks)}")

    partial_results = []

    for idx, chunk in enumerate(chunks, start=1):
        print(f"\nProcessing chunk {idx}/{len(chunks)}...")

        prompt = f"{SYSTEM_PROMPT_CHUNK}\n\nDPR_CHUNK:\n{chunk}"

        raw = ""
        for attempt in range(MAX_RETRIES + 1):
            raw = call_ollama(prompt)
            if raw:
                break
            time.sleep(RETRY_DELAY)

        if not raw:
            print("⚠ No response, skipping.")
            continue

        parsed = safe_parse_json(raw)
        if parsed is None:
            print("⚠ JSON parse failed, skipping.")
            continue

        normalized = {
            "missing_sections": parsed.get("missing_sections") or [],
            "technical_gaps": parsed.get("technical_gaps") or [],
            "cost_irregularities": parsed.get("cost_irregularities") or [],
            "timeline_issues": parsed.get("timeline_issues") or [],
            "risk_analysis": parsed.get("risk_analysis") or [],
            "chunk_score": parsed.get("chunk_score", 0)
        }

        partial_results.append(normalized)

    # -----------------------
    # MERGING STAGE
    # -----------------------

    merged = {
        "missing_sections": [],
        "technical_gaps": [],
        "cost_irregularities": [],
        "timeline_issues": [],
        "risk_analysis": [],
        "sub_scores": {},
        "overall_score": 0
    }

    for pr in partial_results:
        merged["missing_sections"].extend(pr["missing_sections"])
        merged["technical_gaps"].extend(pr["technical_gaps"])
        merged["cost_irregularities"].extend(pr["cost_irregularities"])
        merged["timeline_issues"].extend(pr["timeline_issues"])
        merged["risk_analysis"].extend(pr["risk_analysis"])

    merged["missing_sections"] = dedupe_list_of_dicts(merged["missing_sections"], ["section", "reason"])
    merged["technical_gaps"] = dedupe_list_of_dicts(merged["technical_gaps"], ["issue", "details"])
    merged["cost_irregularities"] = dedupe_list_of_dicts(merged["cost_irregularities"], ["item", "issue"])
    merged["timeline_issues"] = dedupe_list_of_dicts(merged["timeline_issues"], ["issue", "details"])
    merged["risk_analysis"] = dedupe_list_of_dicts(merged["risk_analysis"], ["risk", "notes"])

    # -----------------------
    # SCORING
    # -----------------------

    missing = len(merged["missing_sections"])
    tech = len(merged["technical_gaps"])
    cost = len(merged["cost_irregularities"])
    time_issues = len(merged["timeline_issues"])
    risks = len(merged["risk_analysis"])

    completeness = max(0, 100 - missing * 10)
    tech_score = max(0, 100 - tech * 10)
    cost_score = max(0, 100 - cost * 10)
    time_score = max(0, 100 - time_issues * 10)
    risk_score = max(0, 100 - risks * 6)

    merged["sub_scores"] = {
        "completeness": completeness,
        "technical_soundness": tech_score,
        "cost_validation": cost_score,
        "timeline_feasibility": time_score,
        "risk_mitigation": risk_score
    }

    merged["overall_score"] = round(
        completeness * WEIGHTS["completeness"] +
        tech_score * WEIGHTS["technical_soundness"] +
        cost_score * WEIGHTS["cost_validation"] +
        time_score * WEIGHTS["timeline_feasibility"] +
        risk_score * WEIGHTS["risk_mitigation"],
        2,
    )

    Path(OUTPUT_JSON).write_text(json.dumps(merged, indent=2), encoding="utf-8")

    print("\n\n===== FINAL DPR EVALUATION (QWEN 2.5 7B) =====\n")
    print(json.dumps(merged, indent=2))
    print(f"\nSaved to {OUTPUT_JSON}")

    return merged

# -----------------------
# ENTRYPOINT
# -----------------------
def run_llm_evaluator(data):
    return evaluate_locally(data)

    print("🚀 Starting DPR Evaluation using Qwen2.5:7b via Ollama...")
    data = load_input(INPUT_JSON)
    evaluate_locally(data)
