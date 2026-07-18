import DonateSection from "@/components/sections/DonateSection";

export const metadata = {
  title: "Donate — SPLITA",
  description:
    "Support SPLITA and help us build legal tools that protect African music creators.",
};

export default function DonatePage() {
  return (
    <main className="pt-16">
      <DonateSection />
    </main>
  );
}
