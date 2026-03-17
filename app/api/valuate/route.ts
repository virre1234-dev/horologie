import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    console.log("Anthropic response:", JSON.stringify(data).slice(0, 500));
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
