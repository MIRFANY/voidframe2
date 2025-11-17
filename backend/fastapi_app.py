#!/usr/bin/env python3
"""
FastAPI wrapper to:
1. Accept PDF upload
2. Run extractor (from main.py)
3. Run evaluator (from llm.py)
4. Return final JSON output
"""

import os
import uuid
import shutil
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Import your Python functions (NOT subprocess)
from main import run_extractor
from llm import run_llm_evaluator

# --------------------------------------------------------------------
# FastAPI Setup
# --------------------------------------------------------------------
app = FastAPI(
    title="DPR Evaluation API",
    description="Upload a PDF → Extract → Evaluate → JSON",
    version="2.1",
)

# Enable CORS for frontend (React/Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# --------------------------------------------------------------------
# Health Check
# --------------------------------------------------------------------
@app.get("/")
def root():
    return {"status": "DPR Evaluation API is running (v2.1)!"}


# --------------------------------------------------------------------
# Main DPR Evaluation Endpoint
# --------------------------------------------------------------------
@app.post("/evaluate")
async def evaluate_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF → Extract → Evaluate → Return JSON
    """

    # ----------------------------------------------------
    # 1️⃣ Save Uploaded PDF
    # ----------------------------------------------------
    try:
        unique_name = f"{uuid.uuid4().hex}.pdf"
        pdf_path = os.path.join(UPLOAD_DIR, unique_name)

        with open(pdf_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

    except Exception as e:
        return JSONResponse(
            {"error": "Failed to save uploaded file", "details": str(e)},
            status_code=500,
        )

    # ----------------------------------------------------
    # 2️⃣ Extract PDF contents (main.py logic)
    # ----------------------------------------------------
    try:
        extracted_data = run_extractor(pdf_path)
    except Exception as e:
        return JSONResponse(
            {"error": "PDF extraction failed", "details": str(e)},
            status_code=500,
        )

    # ----------------------------------------------------
    # 3️⃣ Evaluate using LLM (llm.py logic)
    # ----------------------------------------------------
    try:
        result = run_llm_evaluator(extracted_data)
    except Exception as e:
        return JSONResponse(
            {"error": "LLM evaluation failed", "details": str(e)},
            status_code=500,
        )

    # ----------------------------------------------------
    # 4️⃣ Return Result to Frontend
    # ----------------------------------------------------
    return JSONResponse(result)
