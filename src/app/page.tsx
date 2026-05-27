import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side: Logo/Name */}
          <span className="text-lg font-semibold">TicketMind</span>

          {/* Right side: Buttons  */}
          <div className="flex items-center gap-4">
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up" className="bg-black text-white px-4 py-2 rounded-lg">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold">Intelligent customer support without the complexity</h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">Bring your customer channels into a single, unified dashboard powered by context-aware AI. Automatically route tickets, track customer satisfaction trends, and resolve issues faster than ever.</p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link href="/sign-up" className="bg-black text-white px-6 py-3 rounded-lg">Start free trial</Link>
          <Link href="/dashboard" className="border border-gray-300 px-6 py-3 rounded-lg">View demo</Link>
        </div>
      </section>

      {/* Core Features */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">Customer support, built with superpowers</h2>
        <p className="mt-4 text-lg text-gray-600">Stop wasting time on manual sorting. TicketMind handles the heavy lifting so your team can focus on what matters most—delivering incredible customer service.</p>

        <div className="grid grid-cols-3 gap-6 mt-12"> {/* This will be the 3-column grid */}
          {/* Card 1 */}
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg">Auto-Categorization  🏷️</h3>
            <p className="mt-2 text-gray-600">No more manual routing. Our AI instantly reads incoming emails and chats, tags them by topic — billing, bugs, account access — and prioritizes them so your team tackles what matters first.</p>
          </div>

          {/* Card 2 */}
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg">Smart Response  💬</h3>
            <p className="mt-2 text-gray-600">Slash response times from hours to seconds. TicketMind drafts context-aware replies your agents can review, edit, and send with a single click.</p>
          </div>

          {/* Card 3 */}
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg">Sentiment Analysis  📊</h3>
            <p className="mt-2 text-gray-600">Know how your customers feel before you reply. The AI detects frustration, satisfaction, or urgency in real-time, helping you de-escalate issues and spot trending problems instantly.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center">How it Works</h2>
        <p className="mt-4 text-lg text-gray-600 text-center">Get your AI-powered dashboard running in three simple steps.</p>

        <div className="flex flex-col gap-8 max-w-2xl mx-auto mt-12">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <span className="text-4xl font-bold">1.</span>
            <div>
              <h3 className="font-semibold">Connect your channels</h3>
              <p className="mt-1 text-gray-600">Link your email, add our chat widget, or set up a web form — all in minutes.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <span className="text-4xl font-bold">2.</span>
            <div>
              <h3 className="font-semibold">AI analyzes and learns</h3>
              <p className="mt-1 text-gray-600">TicketMind reads your ticket history, learns your patterns, and builds your custom categories automatically.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <span className="text-4xl font-bold">3.</span>
            <div>
              <h3 className="font-semibold">Launch your dashboard</h3>
              <p className="mt-1 text-gray-600">Your team gains immediate access to sentiment insights, auto-triaged tickets, and AI-drafted responses in one unified view.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof & Trust */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">Trusted by support teams everywhere</h2>
        <p className="mt-4 text-lg text-gray-600">See what teams are saying about TicketMind.</p>

        <div className="grid grid-cols-3 gap-6 mt-12">
          {/* Testimonial 1 */}
          <div className="border border-gray-100 bg-gray-50 rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <span className="text-5xl leading-none text-gray-300">❝</span>
            <p className="italic text-gray-600">We cut our average response time by 60% in the first week. The AI suggestions are scarily accurate — our agents just click send.</p>
            <p className="mt-4 font-semibold">Sarah Chen</p>
            <p className="text-sm text-gray-500">Head of Support, Flowbase</p>
          </div>

          {/* Testimonial 2 */}
          <div className="border border-gray-100 bg-gray-50 rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <span className="text-5xl leading-none text-gray-300">❝</span>
            <p className="italic text-gray-600">TicketMind caught a trending billing issue before it hit our radar. We fixed it before most customers even noticed.</p>
            <p className="mt-4 font-semibold">Marcus Rivera</p>
            <p className="text-sm text-gray-500">VP of Customer Success, Stackline</p>
          </div>

          {/* Testimonial 3 */}
          <div className="border border-gray-100 bg-gray-50 rounded-xl p-6 text-left hover:shadow-md transition-shadow">
            <span className="text-5xl leading-none text-gray-300">❝</span>
            <p className="italic text-gray-600">We used to spend hours triaging tickets every morning. Now the AI handles it overnight and our team starts the day actually helping customers.</p>
            <p className="mt-4 font-semibold">Priya Okafor</p>
            <p className="text-sm text-gray-500">Support Lead, NovaCRM</p>
          </div>
        </div>

        <div className="mt-12 inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
          <span>🔒</span>
          <p className="text-center">Your data is isolated by organization and never used to train public models.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">Pricing</h2>

        <div className="grid grid-cols-2 max-w-4xl mx-auto gap-6 mt-12">
          <div className="border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="mt-2 text-4xl font-bold">$0<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="mt-6 space-y-3 text-left">
              <li className="flex items-start gap-2 text-gray-600">
                <span>✓</span>
                <span>Up to 100 tickets per month</span>
              </li>

              <li className="flex items-start gap-2 text-gray-600">
                <span>✓</span>
                <span>Basic AI categorization</span>
              </li>

              <li className="flex items-start gap-2 text-gray-600">
                <span>✓</span>
                <span>Single channel (web form)</span>
              </li>

              <li className="flex items-start gap-2 text-gray-600">
                <span>✓</span>
                <span>1 team member</span>
              </li>
            </ul>
            <button className="mt-8 w-full py-3 rounded-lg border border-black text-black font-medium hover:bg-gray-100 transition-colors">Get started for Free</button>
          </div>

          <div className="border-2 border-black bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <span className="bg-teal-400 text-white text-s px-3 py-1 rounded-full">Most popular</span>
            <h3 className="text-xl font-semibold mt-4">Pro</h3>
             <p className="mt-2 text-4xl font-bold">$49<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="mt-6 space-y-3 text-left">
              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>Unlimited tickets</span>
              </li>

              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>Full AI suite (categorization, sentiment, smart responses)</span>
              </li>
    
              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>All channels (email, chat, web form)</span>
              </li>

              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>Unlimited team members</span>
              </li> 

              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>Trending issues dashboard</span>
              </li> 

              <li className="flex items-start gap-2 text-gray-600">
                <span className="text-teal-400">✓</span>
                <span>Priority support</span>
              </li>  
            </ul>
            <button className="mt-8 w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-500 transition-colors">Upgrade to Pro</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white text-center py-20 px-6">
        <h2 className="text-3xl font-bold">Ready to transform your customer support?</h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Join hundreds of teams using TicketMind to resolve tickets faster, keep customers happier, and let AI handle the busywork.</p>
        <Link href="/sign-up" className="inline-block mt-8 px-6 py-3 rounded-lg bg-white text-black font-medium">Get started for free</Link>
        <p className="mt-4 text-sm text-gray-100">No credit card required. Free plan available.</p>
      </section>
      

    </div>
  );
}
