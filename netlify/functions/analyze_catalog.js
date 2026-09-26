// Using Node 18+ native fetch
import { requireAuth, ROLES, resolveBotToken } from './lib/requireAuth.js';

export const handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const authz = await requireAuth(event, ROLES.EDITORS);
  if (!authz.ok) return authz.response;

  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "API key is missing on the server." }) };
    }

    const requestBody = JSON.parse(event.body);
    const imagePart = requestBody.imagePart;
    const prompt = requestBody.prompt;

    if (!imagePart || !prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing imagePart or prompt" }) };
    }

    const payload = {
      contents: [{ parts: [{ text: prompt }, imagePart] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            q1_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q1_desc: { type: "STRING", description: "사용 중인 보안 프로토콜 및 알고리즘 기재" },
            q2_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q2_desc: { type: "STRING" },
            q3_eccn: { type: "STRING", description: "문서에 ECCN 번호가 있다면 기재" },
            q4_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q4_desc: { type: "STRING" },
            q5_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q5_desc: { type: "STRING" },
            q6_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q6_desc: { type: "STRING" },
            q7_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q7_desc: { type: "STRING" },
            q8_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q9_yn: { type: "STRING", enum: ["예", "아니오", ""] },
            q9_desc: { type: "STRING" }
          },
          required: ["q1_yn", "q1_desc", "q2_yn", "q2_desc", "q3_eccn", "q4_yn", "q4_desc", "q5_yn", "q5_desc", "q6_yn", "q6_desc", "q7_yn", "q7_desc", "q8_yn", "q9_yn", "q9_desc"]
        }
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
