import Image from "next/image";

interface LogoProps {
  /** "light" = white wordmark (on dark bg); "dark" = dark wordmark (on light bg) */
  variant?: "light" | "dark";
  /** px size for the icon mark */
  size?: number;
  href?: string;
  className?: string;
}

export default function Logo({
  variant = "dark",
  size = 40,
  href = "/",
  className,
}: Readonly<LogoProps>) {
  const textColor = variant === "light" ? "text-white" : "text-dark";

  return (
    <a href={href} className={`flex items-center gap-3 flex-shrink-0 ${className ?? ""}`}>
      <Image
        src="/images/splita-logo.png"
        alt="SPLITA logo mark"
        width={size}
        height={size}
        priority
      />
      <span
        className={`font-bold uppercase tracking-widest ${textColor}`}
        style={{ fontSize: "20px", letterSpacing: "0.18em" }}
      >
        SPLITA
      </span>
    </a>
  );
}
