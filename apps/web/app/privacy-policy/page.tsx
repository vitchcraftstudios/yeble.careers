import { PolicyPage } from "@/components/policy-page";
import { privacySections } from "@/lib/policies";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy Policy"
      title="How we handle your information with care and practical clarity"
      intro="When you share your details with Yeble, we treat that seriously. This page explains what information we collect, why we collect it, how it is used, and how you can reach us with privacy-related questions."
      sections={[...privacySections]}
    />
  );
}
