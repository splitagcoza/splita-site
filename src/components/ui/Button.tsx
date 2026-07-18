import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-white";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Readonly<ButtonProps>) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors px-6 py-3";
  const variants = {
    primary: "bg-gold text-dark hover:bg-gold/90",
    secondary: "border-2 border-gold text-gold hover:bg-gold hover:text-dark",
    "outline-white": "border-2 border-white text-white hover:bg-white hover:text-dark",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
