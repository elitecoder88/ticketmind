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
            <a href="/sign-in">Sign in</a>
            <a href="/sign-up" className="bg-black text-white px-4 py-2 rounded-lg">Get started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold">Intelligent customer support without the complexity</h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">Bring your customer channels into a single, unified dashboard powered by context-aware AI. Automatically route tickets, track customer satisfaction trends, and resolve issues faster than ever.</p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <a href="/sign-up" className="bg-black text-white px-6 py-3 rounded-lg">Start free trial</a>
          <a href="/dashboard" className="border border-gray-300 px-6 py-3 rounded-lg">View demo</a>
        </div>
      </section>

      {/* Core Features */}
      <section>
        <h2>Title for this section</h2>
        <p>Subtile for this section</p>

        <div> {/* This will be your 3-column grid */}
          {/* Card 1 */}
          <div>
            <h3>Auto-Categorization</h3>
            <p>Your description here</p>
          </div>

          {/* Card 2 */}
          <div>
            <h3>Smart Respnses</h3>
            <p>Your description here</p>
          </div>

          {/* Card 3 */}
          <div>
            <h3>Sentiment Anaalysis</h3>
            <p>Your description here</p>
          </div>
        </div>
      </section>
    </div>
  );
}
