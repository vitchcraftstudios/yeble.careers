import { PolicyPage } from "@/components/policy-page";
import { accessibilitySections } from "@/lib/policies";

export default function AccessibilityPage() {
  return (
    <PolicyPage
      eyebrow="Accessibility"
      title="Our commitment to making the website easier to use for more people"
      intro="We want this website to feel usable, readable, and respectful across devices and access needs. This page explains the accessibility principles we are working toward and how to contact us if something gets in the way."
      sections={[...accessibilitySections]}
    />
  );
}
