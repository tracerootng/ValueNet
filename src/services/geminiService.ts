import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithTaxAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are the VNP AI Tax & Audit Assistant for Valuenet Associate (VNP Ltd), an Abuja-based firm. 
  You are an expert in Nigerian tax laws (CITA, PITA, Finance Act 2024/25, VAT, etc.) and FIRS filing deadlines.
  Your tone is professional, authoritative, but helpful and clear ("Modern Corporate").
  Always remind clients that while you provide guidance, they should consult with a VNP associate for official filings.
  Keep responses concise and well-structured using Markdown (bolding, headers, lists, etc.) to ensure readability.`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text;
}

export async function searchTaxLaws(query: string, filter?: string, sortBy?: 'relevance' | 'section') {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Search for relevant sections of Nigerian Tax Laws based on the following keywords: "${query}".
  ${filter ? `Limit search to: ${filter}.` : 'Include results from CITA, PITA, Finance Act 2024/25, and VAT Act.'}
  
  Return a JSON array of objects, where each object contains:
  - actName: (e.g., "Company Income Tax Act (CITA)")
  - sectionNumber: (e.g., "Section 19")
  - title: (e.g., "Dividend Taxation")
  - snippet: (A short excerpt of the relevant text, highlighting matching keywords where possible)
  - officialUrl: (A reliable link to the FIRS or relevant government resource for this act/section)
  
  ${sortBy === 'section' ? 'Sort the returned array by Section Number.' : 'Sort the returned array by Relevance to the query.'}
  Format the response as a valid JSON array.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      responseMimeType: "application/json",
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function scanDocumentForCompliance(base64Data: string, mimeType: string) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this document (invoice, statement, or tax certificate) for compliance with Nigerian FIRS (Federal Inland Revenue Service) requirements.
  Check for:
  1. Presence of a valid TIN (Tax Identification Number).
  2. VAT registration details.
  3. Clearly stated Vendor and Client information.
  4. Correct mathematical calculations (VAT 7.5% check if applicable).
  5. Mandatory fields based on latest Finance Act.

  Return a JSON object with:
  - status: "compliant" | "warning" | "error"
  - findings: string[] (list of identified issues or confirmations)
  - suggestions: string[] (what needs to be fixed)
  - extractedData: object (key bits of info found like TIN, amount, date)`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
    }
  });

  return JSON.parse(response.text || "{}");
}
