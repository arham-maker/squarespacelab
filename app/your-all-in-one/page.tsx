import type { Metadata } from "next";
import { YourAllInOnePage } from "@/components/pages/your-all-in-one-page";

export const metadata: Metadata = {
  title: "Seamless Booking Management | SquarespaceLab",
  description:
    "Your complete booking solution. All-in-one online booking software with payments, reminders, team calendar sync, and an intuitive dashboard.",
};

export default function YourAllInOne() {
  return <YourAllInOnePage />;
}
