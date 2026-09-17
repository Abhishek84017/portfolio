export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position when the frame crops the image; defaults to top center */
  position?: string;
};

export type GallerySlide = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  problem: string;
  approach: string[];
  result: { metric: string; label: string }[];
  resultNote?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  badge: string;
  frame: "phone" | "browser";
  accent: string; // tint behind the device frame
  icon?: { src: string; alt: string };
  screenshots: Screenshot[];
  playStoreUrl?: string;
  caseStudy?: CaseStudy;
  /** Slug of a related write-up in data/posts.ts. */
  notes?: string;
  /** false keeps the app out of the Featured Projects grid (previews only). */
  inGrid?: boolean;
  /** Full Play Store gallery, shown in the App Previews section. */
  gallery?: { aspect: string; slides: GallerySlide[] };
};

export const projects: Project[] = [
  {
    slug: "solnce",
    name: "Solnce",
    category: "One-Stop Solar Platform",
    description:
      "India's first all-in-one solar service platform — rooftop, industrial and ground-mounted solar bookings with live project tracking.",
    stack: ["Flutter", "Provider", "REST APIs", "Firebase", "Google Maps API", "Payments"],
    badge: "10,000+ installs",
    frame: "phone",
    accent: "#e0b56a",
    icon: { src: "/images/projects/solnce-icon.webp", alt: "Solnce app icon" },
    screenshots: [
      {
        src: "/images/projects/solnce-1.webp",
        alt: "Solnce home screen listing new solar, cleaning, maintenance and loan services",
        width: 526,
        height: 900,
        position: "left top",
      },
      {
        src: "/images/projects/solnce-2.webp",
        alt: "Solnce project tracking screen showing completed installation stages",
        width: 506,
        height: 900,
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.locgfx.solnce_user",
    notes: "flutter-load-time-30-percent",
    gallery: {
      aspect: "9 / 16",
      slides: [
        { src: "/images/gallery/solnce-0.webp", alt: "Solnce store banner: India's #1 one-stop solar app", caption: "India's one-stop solar app" },
        { src: "/images/gallery/solnce-1.webp", alt: "Solnce home screen with new solar, cleaning, maintenance and loan services", caption: "Every solar service in one home screen" },
        { src: "/images/gallery/solnce-2.webp", alt: "Solnce live solar bidding screen comparing installer quotations", caption: "Live bidding from pre-verified installers" },
        { src: "/images/gallery/solnce-3.webp", alt: "Solnce project tracking screen with completed installation stages", caption: "End-to-end project tracking" },
        { src: "/images/gallery/solnce-4.webp", alt: "Solnce solar loan screen comparing bank offers", caption: "Compare and select solar loans" },
      ],
    },
    caseStudy: {
      problem:
        "Solar customers needed a single app to book rooftop, industrial and ground-mounted installations, follow each project live, and handle the document uploads required for government subsidy approvals.",
      approach: [
        "Led end-to-end Flutter development with Provider for state management over REST APIs and Firebase.",
        "Integrated Google Maps API and payments into the booking flow, with live project tracking for customers.",
        "Designed the document upload flow for government subsidy approvals.",
        "Profiled performance and applied lazy loading and widget rebuild optimization.",
      ],
      result: [
        { metric: "10,000+", label: "Play Store installs" },
        { metric: "~30%", label: "Faster app load time" },
      ],
    },
  },
  {
    slug: "bestill",
    name: "BeStill",
    category: "Christian Meditation App",
    description:
      "Full-stack wellness app with audio streaming, scripture-based guided sessions, and subscription monetization.",
    stack: ["Flutter", "Django", "Google Play Billing", "Audio Streaming", "Firebase", "FCM"],
    badge: "10,000+ installs",
    frame: "phone",
    accent: "#b79ac0",
    icon: { src: "/images/projects/bestill-icon.webp", alt: "BeStill app icon" },
    screenshots: [
      {
        src: "/images/projects/bestill-1.webp",
        alt: "BeStill home screen with a 13-minute guided meditation and topic filters",
        width: 525,
        height: 933,
        position: "left top",
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=nl.lifeconnexion.bestill",
    notes: "flutter-subscription-lifecycle",
    gallery: {
      aspect: "540 / 1168",
      slides: [
        { src: "/images/gallery/bestill-0.webp", alt: "BeStill audio player streaming a guided meditation session", caption: "Streaming guided audio sessions" },
        { src: "/images/gallery/bestill-1.webp", alt: "BeStill home screen with today's meditation and topic filters", caption: "A calm, scripture-based home" },
        { src: "/images/gallery/bestill-2.webp", alt: "BeStill meditation series list with session durations", caption: "Structured meditation series" },
        { src: "/images/gallery/bestill-3.webp", alt: "BeStill store screen: be inspired, equipped and empowered by meditation series", caption: "Series covering every area of life" },
        { src: "/images/gallery/bestill-4.webp", alt: "BeStill store screen about deep rest, better sleep and biblical mindfulness", caption: "Rest, sleep and focus" },
      ],
    },
    caseStudy: {
      problem:
        "A scripture-based meditation product needed reliable audio streaming, a sustainable subscription model, and a way to bring users back day after day.",
      approach: [
        "Delivered the full stack — Flutter client with a Django (Python) backend over REST APIs.",
        "Integrated Google Play Billing for the subscription lifecycle: 1-week free trial, renewal, cancellation, and grace period.",
        "Built webhook integrations with ThriveCart and LemonSqueezy for subscription lifecycle events.",
        "Implemented Firebase and an FCM push notification system to drive re-engagement.",
      ],
      result: [
        { metric: "10,000+", label: "Play Store installs" },
        { metric: "1-week", label: "Free trial into paid plans" },
      ],
      resultNote: "The FCM push system measurably improved daily active user retention.",
    },
  },
  {
    slug: "dragon-ltc",
    name: "Dragon LTC Solutions",
    category: "Healthcare Cost Management",
    description:
      "Pharmaceutical cost optimization for Long-Term Care facilities — patient admissions, prescription tracking, and billing audits.",
    stack: ["Flutter", "REST APIs", "Admin Architecture", "Email Integration", "HIPAA"],
    badge: "HIPAA-aware · Sole developer",
    frame: "phone",
    accent: "#8fbfae",
    icon: { src: "/images/projects/dragon-ltc-icon.webp", alt: "Dragon LTC Solutions app icon" },
    screenshots: [
      {
        src: "/images/projects/dragon-ltc-1.webp",
        alt: "Dragon LTC Solutions sign-in screen",
        width: 600,
        height: 1333,
      },
      {
        src: "/images/projects/dragon-ltc-2.webp",
        alt: "Dragon LTC Solutions dashboard menu with resident, insurance and high-cost alerts",
        width: 600,
        height: 1333,
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.DragonLTCSolutions",
    notes: "hipaa-flutter-checklist",
    gallery: {
      aspect: "9 / 20",
      slides: [
        { src: "/images/gallery/dragon-ltc-0.webp", alt: "Dragon LTC Solutions sign-in screen", caption: "Secure sign-in for care-facility staff" },
        { src: "/images/gallery/dragon-ltc-1.webp", alt: "Dragon LTC Solutions dashboard menu with resident, insurance, high-cost and RTS alerts", caption: "Resident, insurance and high-cost alerts" },
        { src: "/images/gallery/dragon-ltc-2.webp", alt: "Dragon LTC Solutions medications list with open, follow-up and resolved tabs; patient details blurred", caption: "Prescription tracking — patient data blurred" },
      ],
    },
    caseStudy: {
      problem:
        "Long-Term Care facilities needed to manage patient admissions, prescription tracking and billing audits on mobile — handling patient data under HIPAA Privacy Rule requirements.",
      approach: [
        "Independently architected and deployed the app as the sole developer, including the admin architecture and email integration.",
        "Enforced AES-256 encrypted local storage for sensitive data.",
        "Disabled screenshot capture and enforced session timeout policies.",
        "Implemented PII-safe audit logging.",
      ],
      result: [
        { metric: "1", label: "Developer, end to end" },
        { metric: "AES-256", label: "Encrypted local storage" },
      ],
      resultNote: "Shipped to the Play Store meeting HIPAA Privacy Rule requirements.",
    },
  },
  {
    slug: "gateway-educonnect",
    name: "Gateway Educonnect",
    category: "Study Abroad & Immigration",
    description:
      "Instant Apply for university filtering and applications, Razorpay payments, and exam prep for IELTS, PTE, TOEFL, GMAT, and SAT.",
    stack: ["Flutter", "BLoC", "REST APIs", "Razorpay", "Firebase"],
    badge: "5 exam-prep modules",
    frame: "phone",
    accent: "#d9a177",
    screenshots: [],
  },
  {
    slug: "garbh-sanskar",
    name: "Anmol Garbh Sanskar",
    category: "Pregnancy Education App",
    description:
      "Maternal wellness app with daily routine-based content and local notification reminders, optimized for low-to-mid-range Android devices.",
    stack: ["Flutter", "Provider", "REST APIs", "Firebase", "Local Notifications"],
    badge: "Tuned for low-end Android",
    frame: "phone",
    accent: "#a7bf8a",
    icon: { src: "/images/projects/garbh-sanskar-icon.webp", alt: "Anmol Garbh Sanskar app icon" },
    screenshots: [
      {
        src: "/images/projects/garbh-sanskar-1.webp",
        alt: "Anmol Garbh Sanskar daily diet plan screen organised by meal",
        width: 600,
        height: 1067,
      },
      {
        src: "/images/projects/garbh-sanskar-2.webp",
        alt: "Anmol Garbh Sanskar sign-in screen",
        width: 600,
        height: 1067,
      },
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.greenhightech.anmol_garbh_sanskar",
  },
  {
    slug: "nextgen",
    name: "NextGen",
    category: "Multi-Platform Admin Panel",
    description:
      "Fully responsive admin dashboard with adaptive layouts across mobile, tablet, desktop and web from one Flutter codebase and design system.",
    stack: ["Flutter", "BLoC", "Responsive Layout", "Mobile", "Tablet", "Desktop", "Web"],
    badge: "4 platforms · 1 codebase",
    frame: "browser",
    accent: "#b8a48a",
    screenshots: [],
  },
  {
    slug: "raghuvir-developer",
    name: "Raghuvir Developer",
    category: "Real-Estate Operations App",
    description:
      "Internal business app for a real-estate developer — real-time flat inventory, team targets and performance tracking, and activity management.",
    stack: ["Flutter"],
    badge: "Internal business app",
    frame: "phone",
    accent: "#8f9ec9",
    inGrid: false,
    icon: { src: "/images/projects/raghuvir-icon.webp", alt: "Raghuvir Developer app icon" },
    screenshots: [],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.raghuvirdevelopers",
    gallery: {
      aspect: "9 / 20",
      slides: [
        { src: "/images/gallery/raghuvir-0.webp", alt: "Raghuvir Developer home screen listing projects with building and unit counts", caption: "Every project, building and unit at a glance" },
        { src: "/images/gallery/raghuvir-1.webp", alt: "Raghuvir Developer navigation menu with projects, automation, targets and reports", caption: "Projects, automation, targets and reports" },
        { src: "/images/gallery/raghuvir-2.webp", alt: "Raghuvir Developer automation data screen showing processed units wing by wing", caption: "Wing-by-wing progress, unit by unit" },
        { src: "/images/gallery/raghuvir-3.webp", alt: "Raghuvir Developer automation report filters for project, buildings, wings and units", caption: "Filterable automation reports" },
      ],
    },
  },
];

export const openSource = {
  profileUrl: "https://github.com/Abhishek84017",
  repos: [
    { name: "flutter-admin-dashboard", language: "Dart" },
    { name: "Flutter_bloc", language: "Dart" },
  ],
} as const;
