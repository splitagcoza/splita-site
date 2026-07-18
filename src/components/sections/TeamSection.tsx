"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { useInView } from "@/lib/useInView";

const TEAM = [
  {
    name: "Onke",
    role: "Co-Founder",
    bio: "Passionate about building tools that protect and empower African creators.",
  },
  {
    name: "Sipho Mlotshwa",
    role: "Co-Founder",
    bio: "Passionate about building tools that protect and empower African creators.",
  },
  {
    name: "Andile Nkosi",
    role: "Co-Founder",
    bio: "Passionate about building tools that protect and empower African creators.",
  },
  {
    name: "Lebohang Motaung",
    role: "Co-Founder",
    bio: "Passionate about building tools that protect and empower African creators.",
  },
];

export default function TeamSection() {
  const [ref, inView] = useInView();

  return (
    <SectionWrapper id="team" className="bg-light">
      {/* Heading block */}
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#C9920A", fontVariant: "small-caps" }}
        >
          The Team
        </p>
        <h2 className="font-serif font-bold text-dark text-3xl md:text-4xl leading-snug">
          The People Behind SPLITA
        </h2>
        <p className="text-dark/60 text-base leading-relaxed">
          A focused crew of musicians, developers, and legal professionals united
          by one belief: African creators deserve the same contractual
          infrastructure as artists anywhere else in the world.
        </p>
      </div>

      {/* Team grid */}
      <div
        ref={ref}
        className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center gap-3"
          >
            {/* Avatar placeholder — swap src once photos are available */}
            <div
              className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0"
              aria-hidden="true"
            />

            {/* Name */}
            <p className="font-bold text-dark text-base leading-tight">
              {member.name}
            </p>

            {/* Role */}
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "#C9920A" }}
            >
              {member.role}
            </p>

            {/* Bio */}
            <p className="text-dark/50 text-sm leading-snug">{member.bio}</p>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <div className="mt-12 flex justify-center">
        <Button variant="secondary">
          <a href="/contact">Join Our Team</a>
        </Button>
      </div>
    </SectionWrapper>
  );
}
