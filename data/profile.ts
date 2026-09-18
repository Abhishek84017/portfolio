export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const profile = {
  name: "Abhishek Patel",
  initials: "AP",
  role: "Senior Flutter Developer",
  tagline: "Cross-Platform Mobile Specialist",
  location: "Surat, Gujarat, India",

  headline: {
    lead: "I build cross\u2011platform apps that ship to",
    highlight: "20,000+ users",
  },
  positioning:
    "I own apps end to end — architecture, state, native bridges, CI/CD and store release — and I'm at my best where the stakes are real: regulated healthcare data, subscription billing, and performance on everyday devices.",
  heroFacts: ["4+ years", "6+ production apps", "HIPAA-compliant healthcare experience"],

  summary: [
    "I'm a Senior Flutter Developer with 4+ years of end-to-end production experience, shipping cross-platform apps to 20,000+ users across solar energy, healthcare, wellness, and education.",
    "At Sarvadhi Solutions I've independently led the architecture, development, and store deployment of 6+ production apps — two of them past 10,000 downloads — usually as the sole Flutter engineer on the project.",
    "My range goes beyond the UI layer: HIPAA-aware healthcare development, full-stack work across Flutter, Django and Firebase, and CI/CD pipelines with GitHub Actions and Codemagic. I've also mentored 3 junior developers along the way.",
  ],
  domains: ["Solar energy", "Healthcare", "Wellness", "Education", "Real estate", "Coaching", "HR & workforce"],

  stats: [
    { value: 4, suffix: "+", label: "Years" },
    { value: 6, suffix: "+", label: "Apps Shipped" },
    { value: 20000, suffix: "+", label: "Users" },
    { value: 2, label: "Apps at 10K+ Installs" },
  ] satisfies Stat[],

  contact: {
    email: "patelabhishek102001@gmail.com",
    phone: "+91 7600175674",
    phoneHref: "tel:+917600175674",
  },
  socials: {
    github: "https://github.com/Abhishek84017",
    // Set once confirmed — the resume PDF currently links to the LinkedIn homepage.
    linkedin: null as string | null,
  },

  resume: {
    href: "/resume.pdf",
    fileName: "Abhishek_Patel_Senior_Flutter_Developer.pdf",
  },
  photo: {
    src: "/images/profile.png",
    width: 1024,
    height: 1536,
    alt: "Abhishek Patel, Senior Flutter Developer, smiling in a navy blazer in an office",
  },
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#previews", label: "Previews" },
  { href: "/blog", label: "Notes" },
  { href: "#contact", label: "Contact" },
] as const;
