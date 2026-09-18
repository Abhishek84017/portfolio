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
  appStoreUrl?: string;
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
    appStoreUrl: "https://apps.apple.com/in/app/solnce-one-stop-solar-app/id1621714349",
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
      {
        src: "/images/projects/bestill-2.webp",
        alt: "BeStill meditation series screen listing guided sessions with durations",
        width: 540,
        height: 1456,
        position: "left top",
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=nl.lifeconnexion.bestill",
    appStoreUrl: "https://apps.apple.com/in/app/bestill-bible-meditation/id1547396575",
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
    appStoreUrl: "https://apps.apple.com/in/app/dragon-ltc-solutions/id1531698405",
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
    slug: "yoomento",
    name: "Yoomento",
    category: "Mentorship & Coaching Platform",
    description:
      "A personal-growth marketplace connecting people with verified mentors and certified coaches — discovery, booking, in-app payments and progress tracking.",
    stack: ["Flutter", "Riverpod", "Supabase", "Stripe", "Edge Functions", "AES-256-GCM", "Sentry", "AI"],
    badge: "iOS + Android",
    frame: "phone",
    accent: "#8e93dc",
    icon: { src: "/images/projects/yoomento-icon.webp", alt: "Yoomento app icon" },
    screenshots: [
      {
        src: "/images/gallery/yoomento-0.webp",
        alt: "Yoomento home screen with a mood check-in, daily affirmation and goals",
        width: 370,
        height: 800,
      },
      {
        src: "/images/gallery/yoomento-1.webp",
        alt: "Yoomento find professionals screen listing verified mentors",
        width: 370,
        height: 800,
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.yoomento.mobile",
    appStoreUrl: "https://apps.apple.com/in/app/yoomento/id6770527258",
    caseStudy: {
      problem:
        "People trying to build focus and healthier habits needed a trusted way to find verified mentors and coaches, book sessions and pay — while professionals needed onboarding, availability, consent and payout workflows of their own.",
      approach: [
        "Built the Flutter app with Riverpod on a Supabase backend — auth, Postgres and Edge Functions for reminders, emails, feedback reports and Stripe webhooks.",
        "Integrated Stripe PaymentSheet for in-app session payments and Stripe Connect onboarding for professional payouts.",
        "Encrypted sensitive client data with AES-256-GCM, keys held in secure storage, plus digitally signed consent forms with renewal reminders.",
        "Timezone-aware booking and availability calendars, AI-generated progress summaries via a chat-completion service, and Sentry for crash and performance monitoring.",
      ],
      result: [
        { metric: "iOS + Android", label: "Live on both stores" },
        { metric: "11", label: "Supabase Edge Functions" },
      ],
    },
    gallery: {
      aspect: "370 / 800",
      slides: [
        { src: "/images/gallery/yoomento-0.webp", alt: "Yoomento home screen with a mood check-in, daily affirmation and goals", caption: "Daily check-ins, affirmations and goals" },
        { src: "/images/gallery/yoomento-1.webp", alt: "Yoomento find professionals screen listing verified mentors with specialties and ratings", caption: "Find verified mentors and coaches" },
        { src: "/images/gallery/yoomento-2.webp", alt: "Yoomento specialized program overview for research academies", caption: "Specialised mentorship programs" },
        { src: "/images/gallery/yoomento-3.webp", alt: "Yoomento book session screen with per-session pricing and inclusions", caption: "Book and pay for sessions in-app" },
        { src: "/images/gallery/yoomento-4.webp", alt: "Yoomento services screen for mentorship, coaching and screen detox", caption: "Mentorship, coaching and screen detox" },
        { src: "/images/gallery/yoomento-5.webp", alt: "Yoomento sign-in screen letting users join as a client or as a professional", caption: "Join as a client — or as a professional" },
      ],
    },
  },
  {
    slug: "raghuvir-developer",
    name: "Raghuvir Developer",
    category: "Real-Estate Operations App",
    description:
      "A real-estate developer's operations system on mobile — flat inventory, construction process automation, targets, defects and bill approvals for site and office teams.",
    stack: ["Flutter", "BLoC", "freezed", "Hive", "Firebase", "FCM", "Remote Config", "Crashlytics"],
    badge: "iOS + Android",
    frame: "phone",
    accent: "#8f9ec9",
    icon: { src: "/images/projects/raghuvir-icon.webp", alt: "Raghuvir Developer app icon" },
    screenshots: [
      {
        src: "/images/gallery/raghuvir-0.webp",
        alt: "Raghuvir Developer home screen listing projects with building and unit counts",
        width: 540,
        height: 1200,
      },
      {
        src: "/images/gallery/raghuvir-2.webp",
        alt: "Raghuvir Developer automation data screen showing processed units wing by wing",
        width: 540,
        height: 1200,
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.raghuvirdevelopers",
    appStoreUrl: "https://apps.apple.com/in/app/raghuvir-developers/id6747113189",
    caseStudy: {
      problem:
        "A real-estate developer ran its projects on a web operations system, but site and office teams needed the same flat inventory, process tracking, targets, defects and bill approvals on their phones.",
      approach: [
        "Rebuilt each web module as a mobile feature with flutter_bloc and freezed — dashboard, automation, targeted activities, defects, bill progress, tutorials and more.",
        "Cascading filter forms and activity × flat progress matrices, with single and bulk bill approval from the grid.",
        "Hive caching and connectivity checks for patchy on-site networks.",
        "Confidential training PDFs and videos with watermarking and screen-capture blocking; FCM notifications, Remote Config maintenance mode and Crashlytics.",
      ],
      result: [
        { metric: "16", label: "BLoC feature modules" },
        { metric: "iOS + Android", label: "Live on both stores" },
      ],
    },
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
  {
    slug: "skmei",
    name: "SKMEI Watch — Employee",
    category: "Employee HRMS App",
    description:
      "An HR app for SKMEI's workforce — location-verified clock in and out, attendance history, leave requests, employee directory and company announcements.",
    stack: ["Flutter", "BLoC", "freezed", "Geolocator", "Hive", "OTP Auth", "Screen Security", "Crashlytics"],
    badge: "iOS + Android",
    frame: "phone",
    accent: "#7ea6e0",
    icon: { src: "/images/projects/skmei-icon.webp", alt: "SKMEI Watch Employee app icon" },
    screenshots: [
      {
        src: "/images/gallery/skmei-0.webp",
        alt: "SKMEI home screen with attendance check-in, quick leave and work anniversaries; employee names blurred",
        width: 540,
        height: 1200,
      },
      {
        src: "/images/gallery/skmei-3.webp",
        alt: "SKMEI leave applications filter by status, type, employee, branch and dates",
        width: 540,
        height: 1200,
      },
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.skmei.app",
    appStoreUrl: "https://apps.apple.com/in/app/skmei-watch-employee/id6754878989",
    caseStudy: {
      problem:
        "SKMEI's employees needed one place for the everyday HR basics — clocking in and out, tracking work hours, applying for leave and staying connected with the organisation.",
      approach: [
        "Structured the app as flutter_bloc + freezed feature modules: attendance, check-in/out, leave applications, employee directory, announcements, HR handbook, visitor passes and stock-out.",
        "Location-verified clock in and out with Geolocator, with a server-controlled geofencing bypass for approved exceptions.",
        "OTP verification at sign-in and screen-capture protection on both iOS and Android.",
        "Hive caching and connectivity checks, an in-app PDF HR handbook, and Crashlytics for production stability.",
      ],
      result: [
        { metric: "9", label: "BLoC feature modules" },
        { metric: "iOS + Android", label: "Live on both stores" },
      ],
    },
    gallery: {
      aspect: "9 / 20",
      slides: [
        { src: "/images/gallery/skmei-0.webp", alt: "SKMEI home screen with attendance check-in, quick leave and work anniversaries; employee names blurred", caption: "Clock in and see today at a glance" },
        { src: "/images/gallery/skmei-1.webp", alt: "SKMEI employee profile with call and email actions and personal information", caption: "Employee profiles, one tap to call or email" },
        { src: "/images/gallery/skmei-2.webp", alt: "SKMEI create attendance request form with date, time range and explanation", caption: "Attendance correction requests" },
        { src: "/images/gallery/skmei-3.webp", alt: "SKMEI leave applications filter by status, type, employee, branch and dates", caption: "Filterable leave applications" },
        { src: "/images/gallery/skmei-4.webp", alt: "SKMEI sign-in screen for the employee workspace", caption: "Secure workspace sign-in" },
      ],
    },
  },
];
