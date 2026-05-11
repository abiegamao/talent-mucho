import type { Metadata } from "next";
import DoneClient from "./DoneClient";

export const metadata: Metadata = {
  title: "Your Bootcamp Map ~ Cohort 1",
  description:
    "Your personalized Bootcamp Map for Cohort 1. The next four weeks, shaped around you.",
  robots: { index: false, follow: false },
};

export default function IntakeDonePage() {
  return <DoneClient />;
}
