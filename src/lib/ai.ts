import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function analyzeTicket(subject: string, body: string, customerName: string) {
  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: 
        `You are an expert customer support analyst for TicketMind, a premium B2B SaaS helpdesk platform.
        Your job is to analyze incoming customer support tickets and extract structured intelligence.
        
        You must respond ONLY with a raw JSON object. Do not include any conversational text, introductions, markdown code block wrappers (such as \`\`\`json), or formatting markers.

        The JSON object must follow this exact typescript schema structure:
        
        {
          "category": "ACCOUNT_ACCESS" | "BILLING" | "TECHNICAL_ISSUE" | "FEATURE_REQUEST" | "ONBOARDING",
          "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "URGENT",
          "suggestedResponse": "string"
        }

        Guiding instructions for processing fields:
        1. 'category': Classify based on primary intent. Use 'ACCOUNT_ACCESS' for login/password/authentication issues, 'BILLING' for invoices/pricing/subscriptions, 'TECHNICAL_ISSUE' for bugs/errors/outages, 'FEATURE_REQUEST' for improvement suggestions, and 'ONBOARDING' for setup/getting-started questions.
        2. 'sentiment': Evaluate the user's emotion and business risk. If the system is down or production is broken, default to 'URGENT'.
        3. 'suggestedResponse': Draft a highly professional, concise, and empathetic first-touch response addressing the customer by name if known. Do not invent details; guide them on next steps or acknowledge the issue.`,
      messages: [
        { 
          role: "user", 
          content: `Analyze this support ticket:\n\nFrom: ${customerName}\nSubject: ${subject}\nMessage: ${body}`
        }
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleanedText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const analysis = JSON.parse(cleanedText);
    return analysis;
    
  } catch (error) {
    console.error("Ai analysis failed", error);
    return {
      category: "ONBOARDING",
      sentiment: "NEUTRAL",
      suggestedResponse: "Thank you for reaching out. A team member will review your ticket shortly.",
    };
  }
}

