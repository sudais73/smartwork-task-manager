import { NextResponse } from "next/server";
import Task from "@/models/Task";
import { auth } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/dbConnect";

export async function GET() {
  try {
    await connectDB();
     const session = await auth();
      
    if (!session?.user?.email)
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   
     const user = await User.findOne({ email: session.user.email });
   
    const userId = user?._id;
    const tasks = await Task.find({ userId });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const pendingTasks = tasks.filter(
      (t) => t.status === "todo" || t.status === "in-progress"
    ).length;

    const completionRate = totalTasks 
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    // Get recent 5 tasks
    const recentTasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status dueDate priority");

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      recentTasks,
      user,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
