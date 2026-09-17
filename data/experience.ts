export type Experience = {
  role: string;
  company: string;
  start: string;
  end: string;
  duration: string;
  summary?: string;
  highlights: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Senior Flutter Developer",
    company: "Sarvadhi Solutions Pvt. Ltd.",
    start: "May 2022",
    end: "Present",
    duration: "4 yrs",
    current: true,
    summary:
      "Full ownership of 6+ production apps across 4 industry domains — sole Flutter engineer on most projects.",
    highlights: [
      "Architected and shipped 6+ production apps from scratch to store — technical design, Clean Architecture, BLoC/Provider, and Play Store / App Store releases.",
      "Drove 10,000+ installs on two flagship apps (Solnce, BeStill) and cut app load time by ~30% through profiling, lazy loading, and widget rebuild optimization.",
      "Built CI/CD pipelines with GitHub Actions and Codemagic — reducing manual deployment effort by ~70% across 4+ apps with automated builds, code signing, and store submissions.",
      "Mentored 3 junior Flutter developers through weekly code reviews, architecture walkthroughs, and pair programming.",
      "Integrated RESTful APIs with Dio across 6+ apps — JWT token refresh, interceptors, pagination, offline caching, and error recovery — reducing API-related bug reports by an estimated 40%.",
      "Delivered a HIPAA-aware healthcare app (Dragon LTC Solutions) as sole developer — AES-256 encrypted storage, screenshot prevention, session timeouts, and PII-safe logging.",
      "Integrated Google Play Billing and ThriveCart / LemonSqueezy webhooks for BeStill's subscription lifecycle — free trial, renewal, cancellation, and grace period.",
      "Implemented Firebase Auth, Firestore, and FCM across 3+ apps; BeStill's push notification system measurably improved daily active user retention.",
      "Bridged native Swift and Kotlin via Platform Channels for custom camera overlays and biometric authentication.",
      "Wrote full technical design docs (screen flows, API contracts, state strategy, edge cases) for every module, and presented architecture trade-offs in client-facing demos.",
      "Used Claude AI, Cursor, and GitHub Copilot to accelerate feature delivery by ~20% while maintaining test coverage and code quality.",
    ],
  },
  {
    role: "Flutter Developer Trainee",
    company: "Krishna Soft Web",
    start: "Oct 2021",
    end: "Mar 2022",
    duration: "6 mos",
    highlights: [
      "Built production-ready training projects applying Dart fundamentals, widget lifecycle, REST API integration, Material Design, and navigation patterns.",
    ],
  },
];
