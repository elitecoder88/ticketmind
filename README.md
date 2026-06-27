# TicketMind 🧠

A clean, intelligent customer support dashboard that takes incoming tickets, runs them through an AI layer to analyze sentiment and auto-assign categories, and displays real-time team analytics. Built to eliminate the manual mess of support queues.

---

## 🔗 Links

*   **GitHub Repo:** [github.com/elitecoder88/ticketmind](https://github.com/elitecoder88/ticketmind)

---

## 🔥 Features

*   **KPI Tracking:** Real-time visibility into the open backlog, average resolution times, and volume trends.
*   **AI Auto-Triaging:** Incoming text is automatically parsed, tagged by topic (Billing, Bugs, Access), and prioritized.
*   **Sentiment Tracking:** Breaks down customer mood distributions (Positive, Neutral, Negative, Urgent) instantly so you can spot frustrated customers before escalation.
*   **Queue Velocity Chart:** A 30-day view comparing incoming ticket volume vs. the team's resolution speed.
*   **Profile Settings:** Fully functional, secure account management powered by Clerk.

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
*   **Database & ORM:** Neon Serverless PostgreSQL, Prisma
*   **Auth:** Clerk
*   **AI:** Anthropic Claude API
*   **Charts:** Recharts

---

## 🏗️ How Data Flows

```text
Customer submits ticket via intake form / webhook
       ↓
Next.js API route (POST /api/tickets) intercepts and validates the payload
       ↓
Route passes the raw text body to the Anthropic Claude API for evaluation
       ↓
Claude returns structured JSON: category, sentiment, and an initial response draft
       ↓
Prisma ORM updates the ticket record in Neon PostgreSQL with the new AI metadata
       ↓
Dashboard pulls the enriched records and maps out the 30-day charting matrix via Recharts
```

---

## 🤖 Lessons Learned & Technical Deep Dives

Building the analytics view forced me to wrestle with some highly specific time-series data challenges:

*   **The "Vanishing Empty Days" Bug:** Prisma's `groupBy` doesn't work for charting timestamps over time because it groups by the exact millisecond. If you just iterate over database rows, days with zero tickets disappear completely, causing broken gaps in your charts. I fixed this by mapping out a 30-day "skeleton array" filled with zeros first, then layering the actual database results on top. 
*   **Timezone Date Shifting:** Standard JavaScript date constructors (`new Date("2026-05-22")`) default to midnight UTC. In local Montreal time, that shifts back by 4 hours to 8 PM the previous day, ruining chart accuracy. The fix was appending `T00:00:00` and enforcing uniform `UTC` string conversions.
*   **System-Wide State Integrity:** Discovered a data bug where Average Resolution Time was stuck at `0.0h` despite having resolved tickets. The frontend was fine, but the backend `PATCH` route wasn't actually stamping the `resolvedAt` field into the database on status updates. Fixed the route to set resolvedAt on transitions to RESOLVED/CLOSED, and clear it on reopens.

---

## ⚙️ Local Setup

### Prerequisites
* Node.js 18+
* A PostgreSQL database instance (like Neon)
* A Clerk developer account

### 1. Clone & Install
```bash
git clone https://github.com/elitecoder88/ticketmind.git
cd ticketmind
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory and populate it with your keys:

```env
# Database Connection (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/ticketmind?sslmode=require"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Redirect Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Anthropic
ANTHROPIC_API_KEY="sk-ant-..."
```

### 3. Initialize the Database Schema
Sync the Prisma schema with your database and generate the client:

```bash
npx prisma db push
npx prisma generate
```

### 4. Launch the Development Server
```bash
npm run dev
```


Head to [http://localhost:3000](http://localhost:3000) to see your local version running.

---

## 🗺️ Roadmap
*   **Milestone 6 (Current):** Push the final live production build directly to Vercel.
*   **Omnichannel Ingestion:** Build an email webhook parsing loop to automatically convert incoming client emails into structured tickets.
*   **Agent Assist Actions:** Implement single-click AI reply drafting inside the ticket workspace detail views.
*   **Real-time Queue Sync:** Add WebSockets or live polling to update queue velocity statistics without needing manual page refreshes.

---

Built by **Christopher Biekeu** — software engineer based in Montreal, currently open to opportunities.

[LinkedIn](https://www.linkedin.com/in/christopherbiekeu) · [GitHub](https://github.com/elitecoder88)