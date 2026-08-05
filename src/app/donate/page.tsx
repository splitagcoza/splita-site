import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact Us — SPLITA",
};

export default function DonatePage() {
  redirect("/contact");
}
