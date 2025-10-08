import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
  await connectDB();
  const session = await auth();

  
 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });


  const tasks = await Task.find({ userId: user?._id }).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const session = await auth();

 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });


  const { title, description, dueDate, priority } = await req.json();

  const newTask = await Task.create({
    userId: user?._id,
    title,
    description,
    dueDate,
    priority,
  });

  return NextResponse.json(newTask);
}
