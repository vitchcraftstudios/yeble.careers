"use client";

import { useState } from "react";
import { ArrowRight, Building2, CalendarClock, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IntakeCallDialogProps = {
  service: string;
};

export function IntakeCallDialog({ service }: IntakeCallDialogProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setSubmitted(false);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          Request an Intake Call
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request an intake call</DialogTitle>
          <DialogDescription>
            Tell us what you need for {service.toLowerCase()}. Our Selaqui, Dehradun team will come back with role
            alignment, timeline, and next steps.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
              <div className="space-y-2">
                <p className="font-semibold text-emerald-950">Request captured</p>
                <p className="text-sm leading-6 text-emerald-900/80">
                  We will use this modal flow for the upcoming Admin Submission queue and Registrant Dashboard handoff.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form
            className="mt-4 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Company name
                <Input placeholder="Your company or business unit" required />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Work email
                <Input type="email" placeholder="talent@company.com" required />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Hiring SPOC
                <Input placeholder="Full name" required />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Mobile number
                <Input type="tel" placeholder="+91" required />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Hiring brief
              <Textarea
                placeholder={`Share role count, locations, skill mix, and urgency for ${service.toLowerCase()}.`}
                required
              />
            </label>

            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#163b66]" />
                North India-focused hiring ops
              </div>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-[#163b66]" />
                72-hour shortlist planning
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-[#163b66]" />
                Professional intake call format
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">
                This modal is intentionally lightweight and ready to be connected to Neon-backed submissions later.
              </p>
              <Button type="submit" variant="secondary">
                Send request
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
