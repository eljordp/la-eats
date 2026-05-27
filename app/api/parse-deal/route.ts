import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;

const PROMPT = `You are a structured-data extractor for Los Angeles restaurant deals.
Look at the screenshot (likely an Instagram ad, story, or promo) and extract the deal into strict JSON.

Return ONLY a single JSON object with these exact fields. Use null if a field is not visible.
{
  "restaurant": string,
  "deal": string,
  "day": string,
  "timeWindow": string,
  "price": string,
  "neighborhood": string,
  "cuisine": string,
  "category": string,
  "sourceHandle": string,
  "notes": string
}

Few-shot example:
Input: a screenshot showing "MONDAYS — $25 three course at Little Dom's, Los Feliz, all night, wine bottles $20"
Output:
{"restaurant":"Little Dom's","deal":"$25 three-course meal","day":"Monday","timeWindow":"All night","price":"$25","neighborhood":"Los Feliz","cuisine":"Italian","category":"Weekly Special","sourceHandle":null,"notes":"Wine bottles $20 add-on"}

Now extract from the attached image. Return ONLY the JSON object, no markdown fences, no commentary.`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured on server" },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image too large (max 4MB)" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const base64 = buf.toString("base64");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([
      { inlineData: { data: base64, mimeType: file.type } },
      { text: PROMPT },
    ]);
    const text = result.response.text().trim();

    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Couldn't parse — Gemini returned non-JSON", raw: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, data: parsed });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gemini call failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
