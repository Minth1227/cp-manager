import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/analyze_catalog' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: { message: "API key is missing on the server." } }));
                return;
              }

              const requestBody = JSON.parse(body);
              const { imagePart, prompt } = requestBody;

              if (!imagePart || !prompt) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: { message: "Missing imagePart or prompt" } }));
                return;
              }

              const payload = {
                contents: [{ parts: [{ text: prompt }, imagePart] }],
                generationConfig: {
                  responseMimeType: "application/json",
                  responseSchema: {
                    type: "OBJECT",
                    properties: {
                      q1_yn: { type: "STRING", enum: ["예", "아니오", ""] },
                      q1_desc: { type: "STRING" },
                      q2_yn: { type: "STRING", enum: ["예", "아니오", ""] },
                      q2_desc: { type: "STRING" },
                      q3_eccn: { type: "STRING" },
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
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: { message: err.message } }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  root: '.',
  plugins: [apiPlugin()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
});
