import type { Metadata } from "next";
import IntakeClient from "./IntakeClient";

export const metadata: Metadata = {
  title: "Build your Bootcamp Map ~ Cohort 1",
  description:
    "10 questions to shape your bootcamp. Your answers pre-configure your 3 Projects, your AI employee, your dashboard, and your daily ritual.",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return <IntakeClient />;
}
