import { NextResponse } from "next/server";
import Task from "@/models/Task";
import openai from "@/lib/openai";
import { connectDB } from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const session = await auth();
  
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const user = await User.findOne({ email: session.user.email });
  const userId = user?._id;

  // ✅ Get only this user's "todo" (pending) tasks
  const tasks = await Task.find({ userId, status: "todo" });

  const prompt = `
  You are a helpful task-prioritizing assistant.
  Based on these tasks and their due dates, rank which should be done first.
  Return ONLY a valid JSON array of task titles from highest to lowest priority.
  Do not include explanations, markdown, or text outside the JSON array.

  Tasks: ${JSON.stringify(tasks)}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let rawResponse = completion.choices[0].message.content || "";

  // 🧹 Extract clean JSON array from the model output
  let jsonMatch = rawResponse.match(/```json([\s\S]*?)```|(\[.*\])/);
  let recommendation;

  if (jsonMatch) {
    try {
      recommendation = JSON.parse(jsonMatch[1] || jsonMatch[2]);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      recommendation = rawResponse; // fallback
    }
  } else {
    recommendation = rawResponse; // fallback
  }

 return NextResponse.json({ recommendation: Array.isArray(recommendation) ? recommendation : [] });
}
