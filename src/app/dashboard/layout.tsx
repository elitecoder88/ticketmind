import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}