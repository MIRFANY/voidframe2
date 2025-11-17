import fitz                   # PyMuPDF

from pdf2image import convert_from_path
from PIL import Image
import numpy as np
import camelot
import pdfplumber
import cv2
import os
import sys
import json
import contextlib


class PDFExtractor:

    def __init__(self, pdf_path, output_dir="pdf_output"):
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"❌ PDF not found: {pdf_path}")

        self.pdf_path = pdf_path
        self.output_dir = output_dir

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

    # -----------------------------------------------------
    # 1. EXTRACT RAW TEXT + LAYOUT (BBOXES)
    # -----------------------------------------------------
    def extract_text_and_layout(self):
        doc = fitz.open(self.pdf_path)
        all_text = ""
        layout_data = []

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text("text")
            blocks = page.get_text("blocks")

            # Fallback to OCR if page is scanned
           

            all_text += f"\n--- PAGE {page_num+1} ---\n{text}\n"

            # Extract layout blocks
            page_layout = []
            for block in blocks:
                x0, y0, x1, y1, b_text, block_type, *_ = block
                if isinstance(b_text, str) and b_text.strip():
                    page_layout.append({
                        "text": b_text.strip(),
                        "bbox": [float(x0), float(y0), float(x1), float(y1)]
                    })

            layout_data.append({
                "page": page_num + 1,
                "layout": page_layout
            })

        return all_text, layout_data

    # -----------------------------------------------------
    # 2. EXTRACT TABLES — Camelot + PDFPlumber fallback
    # -----------------------------------------------------
    def extract_tables(self):
        tables_output = []

        print("Using Camelot for tables...")

        try:
            with open(os.devnull, 'w') as fnull, \
                 contextlib.redirect_stdout(fnull), \
                 contextlib.redirect_stderr(fnull):

                camelot_tables = camelot.read_pdf(self.pdf_path, pages='all', flavor='lattice')
        except Exception:
            camelot_tables = []

        if camelot_tables:
            for i, t in enumerate(camelot_tables):
                df = t.df
                tables_output.append({
                    "table_number": len(tables_output) + 1,
                    "source": "camelot",
                    "data": df.to_dict(orient="records")
                })

        print("Using PDFPlumber fallback...")
        with pdfplumber.open(self.pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                extracted = page.extract_tables()

                for table in extracted:
                    headers = table[0]
                    rows = []
                    for row in table[1:]:
                        row_data = {
                            headers[i]: row[i] if i < len(row) else None
                            for i in range(len(headers))
                        }
                        rows.append(row_data)

                    tables_output.append({
                        "page": page_num + 1,
                        "source": "pdfplumber",
                        "data": rows
                    })

        return tables_output

    # -----------------------------------------------------
    # 3. EXTRACT ONLY EMBEDDED IMAGES (NOT FULL PAGE)
    # -----------------------------------------------------
    def extract_images(self):
        doc = fitz.open(self.pdf_path)
        images_saved = []

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            image_list = page.get_images(full=True)

            if not image_list:
                continue

            for img_index, img_info in enumerate(image_list):
                xref = img_info[0]
                base_image = doc.extract_image(xref)

                image_bytes = base_image["image"]
                image_ext = base_image["ext"]

                img_name = f"{self.output_dir}/page_{page_num+1}_img_{img_index+1}.{image_ext}"

                with open(img_name, "wb") as f:
                    f.write(image_bytes)

                images_saved.append(img_name)

        return images_saved

    # -----------------------------------------------------
    # 4. DETECT CHARTS FROM EMBEDDED IMAGES (NOT FULL PAGE)
    # -----------------------------------------------------
    def extract_charts(self):
        charts = []

        for img_path in self.extract_images():
            img = cv2.imread(img_path)
            if img is None:
                continue

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            edges = cv2.Canny(gray, 120, 220)

            if np.sum(edges) > 8_500_000:  # tuned threshold
                charts.append(img_path)

        return charts

    # -----------------------------------------------------
    # MASTER FUNCTION
    # -----------------------------------------------------
    def extract_all(self):
        print("Extracting text + layout...")
        text, layout = self.extract_text_and_layout()

        print("Extracting tables...")
        tables = self.extract_tables()

        print("Extracting embedded images...")
        images = self.extract_images()

        print("Detecting charts from embedded images...")
        charts = self.extract_charts()

        result = {
            "raw_text": text,
            "layout": layout,
            "tables": tables,
            "images": images,
            "charts": charts
        }

        output_json = f"{self.output_dir}/extracted_data.json"
        with open(output_json, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=4)

        print(f"\n✅ Extraction completed!")
        print(f"📄 JSON saved at: {output_json}\n")

        return result


# -----------------------------------------------------
# MAIN — support CLI arguments
# -----------------------------------------------------
def run_extractor(pdf_path):
    extractor = PDFExtractor(pdf_path)
    return extractor.extract_all()

