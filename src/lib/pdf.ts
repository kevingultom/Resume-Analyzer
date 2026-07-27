import pdfParse from "pdf-parse";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  const text = data.text.trim();

  if (!text) {
    throw new Error(
      "Could not extract any text from this PDF. It may be a scanned image without selectable text."
    );
  }

  return text;
}
