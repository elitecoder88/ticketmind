import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function PATCH(request: Request,  { params } : { params: Promise<{ id: string}> }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validStatus = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]
    if (!validStatus.includes(body.status)) {
      return NextResponse.json({ error: "Invalid ticket status"}, {status: 400})
    }

    const newStatus = body.status;

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status: newStatus }
    })
    
    return NextResponse.json(ticket);
    
  } catch (error) {
    return NextResponse.json({ error: "Failed to update ticket status" }, { status: 500 });
  }

}