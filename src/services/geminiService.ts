import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function chatWithTaxAssistant(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  if (!ai || !apiKey) {
    return `### 🔑 API Key Required

The AI Tax Assistant requires a Gemini API key to function. 

**For Site Administrators:**
Please add the \`GEMINI_API_KEY\` environment variable in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add \`GEMINI_API_KEY\` with your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Redeploy the application

**For Visitors:**
Please contact VNP Ltd directly for tax advisory services while our AI assistant is being configured.

📞 **Contact VNP Ltd**
- Email: info@valuenet.com
- Phone: +234 (0) XXX XXXX XXX
- Location: Abuja, Nigeria`;
  }

  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are the VNP AI Tax & Audit Assistant for Valuenet Associate (VNP Ltd), an Abuja-based firm. 
  You are an expert in Nigerian tax laws (CITA, PITA, Finance Act 2024/25, VAT, etc.) and FIRS filing deadlines.
  Your tone is professional, authoritative, but helpful and clear ("Modern Corporate").
  Always remind clients that while you provide guidance, they should consult with a VNP associate for official filings.
  Keep responses concise and well-structured using Markdown (bolding, headers, lists, etc.) to ensure readability.`;

  try {
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
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `### ⚠️ Service Temporarily Unavailable

We're experiencing technical difficulties with the AI assistant. Please try again later or contact VNP Ltd directly for immediate assistance.

**Alternative Options:**
- Call our office for urgent tax queries
- Email your questions to our tax advisory team
- Schedule a consultation appointment

Thank you for your patience.`;
  }
}

export async function searchTaxLaws(query: string, filter?: string, sortBy?: 'relevance' | 'section') {
  if (!ai || !apiKey) {
    return [];
  }

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

  try {
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
  } catch (error) {
    console.error('Gemini API Error:', error);
    return [];
  }
}

export async function scanDocumentForCompliance(base64Data: string, mimeType: string) {
  if (!ai || !apiKey) {
    return {
      status: "error",
      findings: ["API Key not configured"],
      suggestions: [
        "Please configure the GEMINI_API_KEY environment variable to enable document scanning",
        "Contact site administrator to set up the AI services"
      ],
      extractedData: {
        message: "AI Document Scanner requires API key configuration"
      }
    };
  }

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

  try {
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
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      status: "error",
      findings: ["Service temporarily unavailable"],
      suggestions: ["Please try again later or contact VNP Ltd directly for document review"],
      extractedData: {
        error: "Technical error occurred during document analysis"
      }
    };
  }
}
