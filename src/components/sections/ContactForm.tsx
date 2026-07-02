"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Label, Select } from "@/components/ui/Input";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  inquiry: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryOptions = [
  "General Insurance",
  "Reinsurance",
  "Life Insurance",
  "Risk Management",
  "Consulting",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Contact form submission:", data);
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <FadeIn>
      <Card glow className="relative">
        {status === "success" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-cyan/30 bg-cyan/5 p-4 text-sm text-cyan">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Your inquiry has been received. We will respond during business hours.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Your name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" placeholder="+91 ..." {...register("phone")} />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="company">Organization</Label>
              <Input id="company" placeholder="Company name" {...register("company")} />
            </div>
          </div>

          <div>
            <Label htmlFor="inquiry">Inquiry Type *</Label>
            <Select id="inquiry" defaultValue="" {...register("inquiry")}>
              <option value="" disabled>
                Select inquiry type
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            {errors.inquiry && (
              <p className="mt-1 text-xs text-red-400">{errors.inquiry.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Describe your insurance or risk management requirements..."
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" disabled={status === "loading"} className="w-full md:w-auto">
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </form>
      </Card>
    </FadeIn>
  );
}
