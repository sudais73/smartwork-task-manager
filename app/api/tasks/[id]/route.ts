import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/dbConnect';
import User from '@/models/User';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
    
 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });

  const data = await req.json();
  const updated = await Task.findOneAndUpdate(
    { _id: params.id, userId:user?._id },
    data,
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
   
 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });

  await Task.findOneAndDelete({ _id: params.id, userId: user?._id });
  return NextResponse.json({ success: true });
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const session = await auth();
   
 if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });


  const task = await Task.findOne({ _id: params.id, userId: user?._id });
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(task);
}

