import { PolicyPage } from "@/components/policy-page";
import { termsSections } from "@/lib/policies";

export default function TermsConditionsPage() {
  return (
    <PolicyPage
      eyebrow="Terms & Conditions"
      title="Clear terms for using Yeble.careers and our registration-related services"
      intro="We believe policy pages should be understandable, not intimidating. These terms explain how our website and registration-related services are meant to be used, what a payment confirms, and what it does not."
      sections={[...termsSections]}
    />
  );
}
