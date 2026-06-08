"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";


export default function NewTicketPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    customerName: "",
    customerEmail: "",
    priority: "MEDIUM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tickets", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ...formData,
          organizationId: "org-test-1"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      router.refresh();

      router.push("/dashboard/tickets");
    } catch (error) {
      console.error("Form Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Back Button & Header */}
      <button
        onClick={() => router.push("/dashboard/tickets")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Tickets
      </button>

      <div className="flex flex-col space-y-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create New Ticket</h1>
        <p className="text-sm text-slate-500">Manually log an incoming customer support request.</p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Subject Row*/}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</Label>
          <Input
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value })}
            placeholder="Brief description of the issue. e.g., Cannot access account after password reset"
            className="w-full h-10 border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"        
          />
        </div>

        {/* Message Body */}
        <div className="space-y-2">
          <Label htmlFor="body" className="text-sm font-medium text-slate-700">Message Description</Label>
          <Textarea
            id="body"
            required
            rows={5}
            value={formData.body}
            onChange={(e) => setFormData({...formData, body: e.target.value })}
            placeholder="Provide detail on the issue..."
            className="w-full min-h-[120px] border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400 resize-y"       
          />
        </div>

        {/* Customer Information Split Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-sm font-medium text-slate-700">Customer Name</Label>
            <Input
              id="customerName"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value })}
              placeholder="Sarah Chen"
              className="w-full h-10 border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"        
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail" className="text-sm font-medium text-slate-700">Customer Email</Label>
            <Input
              id="customerEmail"
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value })}
              placeholder="sarah@example.com"
              className="w-full h-10 border-slate-200 focus-visible:ring-slate-400 placeholder:text-slate-400"        
            />
          </div>
        </div>

        {/* Priority Selector Row */}
        <div className="space-y-2 max-w-xs">
          <Label htmlFor="priority" className="text-sm font-medium text-slate-700">Priority</Label>
          <div className="relative">
            <select 
              id="priority"
              value={formData.priority}
              onChange={(e) => {
                const selectedPriority = e.target.value;
                setFormData((prev) => ({ ...prev, priority: selectedPriority }));
              }}
              className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 appearance-none cursor-pointer"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            {/* Custom dropdown chevron arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 my-2" />

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm font-medium px-5 h-10 min-w-[120px]"
          >
            {isSubmitting? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Ticket"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}