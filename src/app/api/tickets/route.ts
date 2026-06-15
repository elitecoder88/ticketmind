import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { analyzeTicket } from "@/lib/ai";

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
        priority: body.priority,
      },
    });

    const aiAnalysis = await analyzeTicket(body.subject, body.body, body.customerName);

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        aiCategory: aiAnalysis.category,
        aiSentiment: aiAnalysis.sentiment,
        aiSuggestion: aiAnalysis.suggestedResponse,
      },
    });


    return NextResponse.json(updatedTicket, { status: 201 });
  } catch (error) {
    return NextResponse.json({error: "Failed to create tickets"}, { status: 500});
  }
}



