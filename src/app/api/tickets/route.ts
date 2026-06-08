import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany();
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.subject || !body.body ||!body.customerName || !body.customerEmail || !body.organizationId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }  

  try {
    const ticket = await prisma.ticket.create({
      data: {
        subject: body.subject,
        body: body.body,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        organizationId: body.organizationId,
        priority: body.priority
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    return NextResponse.json({error: "Failed to create tickets"}, { status: 500});
  }
}

