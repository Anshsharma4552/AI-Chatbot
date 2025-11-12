import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { searchInput, searchType } = await req.json();

        if (!searchInput) {
            return NextResponse.json({ error: "Please pass user search query" }, { status: 400 });
        }

        // Customize prompt based on search type
        let prompt = searchInput;
        if (searchType === 'research') {
            prompt = `Provide a comprehensive research-based answer for: ${searchInput}. Include key facts, statistics, and detailed explanations. Structure your response with clear headings and bullet points where appropriate.`;
        } else {
            prompt = `Answer this question clearly and concisely: ${searchInput}. Provide helpful information and practical insights.`;
        }

        const result = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': process.env.GEMINI_API_KEY
                }
            }
        );

        return NextResponse.json(result.data);

    } catch (error) {
        console.error("Gemini API Error", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}
