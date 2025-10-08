import { NextResponse } from "next/server";
import Task from "@/models/Task";
import { transporter } from "@/lib/mailer";
import { connectDB } from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  await connectDB();
const session = await auth();
 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  const now = new Date();
  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await Task.find({
    userId:user?._id,
    dueDate: { $lte: nextDay },
    status: "pending",
  });

  if (tasks.length === 0) return NextResponse.json({ message: "No upcoming tasks" });

  const emailText = tasks.map((t) => `- ${t.title} (Due: ${t.dueDate?.toDateString()})`).join("\n");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user?.email, 
    subject: "⏰ Upcoming Task Alert",
    text: `These tasks are due soon:\n\n${emailText}`,
  });

  return NextResponse.json({ message: "Email sent successfully" });
}
