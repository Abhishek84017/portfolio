export type SkillIcon =
  | "smartphone"
  | "layers"
  | "database"
  | "server"
  | "cloud"
  | "shield"
  | "flask"
  | "sparkles"
  | "users";

export type SkillGroup = {
  title: string;
  icon: SkillIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Flutter & Dart",
    icon: "smartphone",
    skills: [
      "Flutter (Expert)",
      "Dart 3 — records, patterns, sealed classes",
      "iOS & Android",
      "Flutter Web & Desktop",
      "Material 3 & Cupertino",
      "Responsive / Adaptive Layouts",
      "Custom Animations & CustomPainter",
      "Rive & Lottie",
      "Platform Channels (Swift / Kotlin)",
      "Isolates & compute",
      "Accessibility (Semantics)",
      "i18n / l10n",
    ],
  },
  {
    title: "Architecture & State",
    icon: "layers",
    skills: [
      "BLoC / Cubit",
      "Riverpod",
      "Provider",
      "GetX",
      "Clean Architecture",
      "Domain-Driven Design",
      "Repository Pattern",
      "Dependency Injection (get_it, injectable)",
      "freezed & json_serializable",
      "GoRouter & Deep Linking",
      "Flavors & Multi-environment Builds",
    ],
  },
  {
    title: "Data & Networking",
    icon: "database",
    skills: [
      "REST APIs (Dio)",
      "Interceptors & Token Refresh",
      "GraphQL",
      "WebSockets",
      "Offline-first Caching",
      "Hive / Isar",
      "SQLite (sqflite, Drift)",
      "Secure Storage",
      "Pagination & Retry Strategies",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    skills: [
      "Django",
      "Django REST Framework",
      "JWT / OAuth2",
      "Webhook Integrations",
      "PostgreSQL",
      "MySQL",
      "API Contract Design",
    ],
  },
  {
    title: "Cloud & CI/CD",
    icon: "cloud",
    skills: [
      "Firebase Auth",
      "Firestore",
      "FCM",
      "Crashlytics",
      "Remote Config",
      "Cloud Functions",
      "AWS (Boto3, S3)",
      "GitHub Actions",
      "Codemagic",
      "Fastlane",
      "Docker",
      "Play Console & App Store Connect",
      "TestFlight & Code Signing",
    ],
  },
  {
    title: "Payments & Security",
    icon: "shield",
    skills: [
      "Google Play Billing (IAP)",
      "App Store In-App Purchases",
      "Razorpay",
      "Subscription Lifecycle",
      "ThriveCart",
      "LemonSqueezy",
      "HIPAA Privacy Rule",
      "AES-256 Encryption",
      "Biometric Authentication",
      "SSL Pinning & Code Obfuscation",
      "Session Policy Enforcement",
    ],
  },
  {
    title: "Testing & Quality",
    icon: "flask",
    skills: [
      "Unit",
      "Widget",
      "Integration (E2E)",
      "Golden Tests",
      "Mockito / mocktail",
      "TDD",
      "Flutter DevTools",
      "Memory & Performance Profiling",
      "Static Analysis & Lints",
    ],
  },
  {
    title: "AI Tooling",
    icon: "sparkles",
    skills: [
      "Claude AI",
      "Cursor",
      "GitHub Copilot",
      "ML Kit (OCR)",
      "Gemini",
      "LLM APIs in Apps",
      "Prompt Engineering",
      "Function Calling",
    ],
  },
  {
    title: "Leadership & Delivery",
    icon: "users",
    skills: [
      "Mentoring",
      "Code Reviews",
      "Technical Design Docs",
      "Architecture Walkthroughs",
      "Client Demos",
      "Agile / Scrum",
      "Estimation & Sprint Planning",
      "Store Release Management",
    ],
  },
];
