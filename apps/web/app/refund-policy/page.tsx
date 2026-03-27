import { PolicyPage } from "@/components/policy-page";
import { refundSections } from "@/lib/policies";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Refund Policy"
      title="A straightforward explanation of how refund reviews are handled"
      intro="We want expectations to be clear before someone pays. This page explains when a refund may be reviewed, when it usually is not applicable, and what information we need if you want us to check a payment issue."
      sections={[...refundSections]}
    />
  );
}
