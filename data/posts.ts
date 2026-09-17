export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  tags: string[];
  project?: string; // slug in data/projects.ts
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "flutter-load-time-30-percent",
    title: "How I cut a Flutter app's load time by ~30%",
    excerpt:
      "Profiling first, then three levers that did the work on Solnce: less work before the first frame, lazy loading, and rebuild discipline.",
    publishedAt: "2026-09-17",
    tags: ["Performance", "Flutter", "DevTools"],
    project: "solnce",
    blocks: [
      {
        type: "p",
        text: "Solnce is a one-stop solar platform with 10,000+ installs. The ~30% app load time reduction we shipped didn't come from a single trick. It came from measuring properly, then pulling three unglamorous levers: performance profiling, lazy loading, and widget rebuild optimization.",
      },
      { type: "h2", text: "1. Measure in profile mode, on a real device" },
      {
        type: "p",
        text: "Debug builds are slow by design, so any number you take from them is noise. Run in profile mode on a mid-range Android phone — the kind most of your users actually own — and record startup before touching code.",
      },
      {
        type: "code",
        lang: "bash",
        code: "# Startup timeline written to build/start_up_info.json\nflutter run --profile --trace-startup\n\n# Then open DevTools → Performance to inspect jank and long frames\nflutter run --profile",
      },
      {
        type: "p",
        text: "Keep the baseline. Every change after this is compared against the same device, the same build mode and the same flow.",
      },
      { type: "h2", text: "2. Do less before the first frame" },
      {
        type: "p",
        text: "Startup is often slow because `main()` awaits everything: analytics, remote config, caches, feature flags. Only await what the first screen truly needs, render, and warm up the rest afterwards.",
      },
      {
        type: "code",
        lang: "dart",
        code: "Future<void> main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  await Firebase.initializeApp(); // needed before first use\n\n  runApp(const App());\n\n  // Everything the first screen doesn't need waits for that screen.\n  WidgetsBinding.instance.addPostFrameCallback((_) {\n    unawaited(warmUpNonCriticalServices());\n  });\n}",
      },
      { type: "h2", text: "3. Load lazily — lists, pages and images" },
      {
        type: "list",
        items: [
          "Use `ListView.builder` / `SliverList` so only visible rows are built, instead of `ListView(children: [...])` over a whole dataset.",
          "Paginate API calls and fetch the next page near the end of the list rather than loading everything up front.",
          "Decode images at the size they're displayed with `cacheWidth` / `cacheHeight` — a 4000px photo in a 120px card wastes memory and decode time.",
          "Defer heavy screens and their data until the user actually navigates to them.",
        ],
      },
      {
        type: "code",
        lang: "dart",
        code: "LayoutBuilder(\n  builder: (context, constraints) {\n    final dpr = MediaQuery.devicePixelRatioOf(context);\n    return Image.network(\n      project.coverUrl,\n      cacheWidth: (constraints.maxWidth * dpr).round(),\n      fit: BoxFit.cover,\n    );\n  },\n)",
      },
      { type: "h2", text: "4. Rebuild only what changed" },
      {
        type: "p",
        text: "With Provider, the most common waste is a large widget calling `context.watch` on a model and rebuilding entirely when one field changes. Select the exact value instead, keep static subtrees `const`, and push state down to the smallest widget that needs it.",
      },
      {
        type: "code",
        lang: "dart",
        code: "// Rebuilds on every change to ProjectModel:\nfinal model = context.watch<ProjectModel>();\n\n// Rebuilds only when the stage label changes:\nfinal stage = context.select<ProjectModel, String>((m) => m.currentStage);",
      },
      {
        type: "p",
        text: "Turn on “Track widget rebuilds” in DevTools and scroll through the slow screen. Anything rebuilding that shouldn't be is your next fix. Wrap independently animating parts in a `RepaintBoundary` so they don't repaint their neighbours.",
      },
      { type: "h2", text: "The checklist" },
      {
        type: "list",
        ordered: true,
        items: [
          "Baseline startup and key flows in profile mode on a real mid-range device.",
          "Await only first-screen dependencies in `main()`; defer the rest.",
          "Build lists lazily, paginate, and decode images at display size.",
          "Select narrowly, use `const`, and verify with rebuild tracking.",
          "Re-measure against the baseline — keep the change only if the number moved.",
        ],
      },
    ],
  },
  {
    slug: "hipaa-flutter-checklist",
    title: "A practical HIPAA checklist for Flutter apps",
    excerpt:
      "The app-side controls I enforced as sole developer on Dragon LTC Solutions: AES-256 storage, screenshot prevention, session timeouts and PII-safe logging.",
    publishedAt: "2026-09-17",
    tags: ["Security", "Healthcare", "Flutter"],
    project: "dragon-ltc",
    blocks: [
      {
        type: "callout",
        text: "This covers engineering controls inside a mobile app. HIPAA compliance also depends on your backend, hosting, Business Associate Agreements and organisational policies — treat this as a developer checklist, not legal advice.",
      },
      {
        type: "p",
        text: "Dragon LTC Solutions helps Long-Term Care facilities manage patient admissions, prescription tracking and billing audits. As the sole developer, I had to make sure protected health information (PHI) stayed protected on the device itself. These are the controls that mattered most.",
      },
      { type: "h2", text: "1. Encrypt everything at rest with AES-256" },
      {
        type: "p",
        text: "Never write PHI to plain `SharedPreferences` or an unencrypted database. Generate a 256-bit key once, keep it in the platform keystore (Keychain on iOS, Keystore on Android), and use it to encrypt the local store.",
      },
      {
        type: "code",
        lang: "dart",
        code: "const _storage = FlutterSecureStorage();\n\nFuture<List<int>> _databaseKey() async {\n  final existing = await _storage.read(key: 'db_key');\n  if (existing != null) return base64Url.decode(existing);\n\n  final key = Hive.generateSecureKey(); // 256-bit\n  await _storage.write(key: 'db_key', value: base64UrlEncode(key));\n  return key;\n}\n\nfinal records = await Hive.openBox<Map>(\n  'records',\n  encryptionCipher: HiveAesCipher(await _databaseKey()),\n);",
      },
      { type: "h2", text: "2. Keep PHI out of screenshots and the app switcher" },
      {
        type: "p",
        text: "On Android, `FLAG_SECURE` blocks screenshots and screen recording and blanks the app in the recents view.",
      },
      {
        type: "code",
        lang: "kotlin",
        code: "class MainActivity : FlutterFragmentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        window.setFlags(\n            WindowManager.LayoutParams.FLAG_SECURE,\n            WindowManager.LayoutParams.FLAG_SECURE,\n        )\n    }\n}",
      },
      {
        type: "p",
        text: "iOS doesn't allow blocking screenshots, but you can stop PHI appearing in the app switcher: listen for `AppLifecycleState.inactive` and cover the UI with a privacy screen until the app is active again.",
      },
      { type: "h2", text: "3. Enforce session timeouts" },
      {
        type: "p",
        text: "Two cases need handling: the user walks away from an open app, and the app sits in the background. Reset an inactivity timer on any pointer event, and compare timestamps when the app resumes.",
      },
      {
        type: "code",
        lang: "dart",
        code: "class SessionGuard extends StatefulWidget { /* ... */ }\n\nclass _SessionGuardState extends State<SessionGuard> with WidgetsBindingObserver {\n  static const timeout = Duration(minutes: 5);\n  Timer? _idle;\n  DateTime? _backgroundedAt;\n\n  void _resetIdle() {\n    _idle?.cancel();\n    _idle = Timer(timeout, widget.onLock);\n  }\n\n  @override\n  void didChangeAppLifecycleState(AppLifecycleState state) {\n    if (state == AppLifecycleState.paused) _backgroundedAt = DateTime.now();\n    if (state == AppLifecycleState.resumed && _backgroundedAt != null &&\n        DateTime.now().difference(_backgroundedAt!) > timeout) {\n      widget.onLock();\n    }\n  }\n\n  @override\n  Widget build(BuildContext context) => Listener(\n        onPointerDown: (_) => _resetIdle(),\n        child: widget.child,\n      );\n}",
      },
      { type: "h2", text: "4. Make logging PII-safe by default" },
      {
        type: "p",
        text: "Logs travel: to the console, crash reporters, support tickets. Redact at the logging boundary so no call site can forget, and never log raw request or response bodies.",
      },
      {
        type: "code",
        lang: "dart",
        code: "String redactPii(String input) => input\n    .replaceAll(RegExp(r'[\\w.+-]+@[\\w-]+\\.[\\w.]+'), '[email]')\n    .replaceAll(RegExp(r'\\b\\d{4}-\\d{2}-\\d{2}\\b'), '[date]')\n    .replaceAll(RegExp(r'\\+?\\d[\\d\\s-]{7,}\\d'), '[phone]')\n    .replaceAll(RegExp(r'\\b\\d{5,}\\b'), '[id]');\n\nvoid audit(String message) => logger.info(redactPii(message));",
      },
      { type: "h2", text: "5. Don't forget the side channels" },
      {
        type: "list",
        items: [
          "Push notifications: lock screens display payloads, so send a generic message and fetch details after authentication.",
          "Crash reporting and analytics: no patient names, record numbers or free text in custom keys or events.",
          "Network: TLS everywhere; consider certificate pinning for high-risk APIs.",
          "Clipboard and exports: disable copying from sensitive fields where the workflow allows it.",
        ],
      },
      { type: "h2", text: "The checklist" },
      {
        type: "list",
        ordered: true,
        items: [
          "AES-256 encrypted local storage, key held in Keychain / Keystore.",
          "Screenshot prevention on Android; privacy cover in the iOS app switcher.",
          "Inactivity and background session timeouts.",
          "Redaction at the logging boundary.",
          "No PHI in notifications, analytics or crash reports.",
        ],
      },
    ],
  },
  {
    slug: "flutter-subscription-lifecycle",
    title: "Subscriptions without surprises: modelling the billing lifecycle",
    excerpt:
      "What BeStill taught me about free trials, renewals, cancellations and grace periods — across Google Play Billing and ThriveCart / LemonSqueezy webhooks.",
    publishedAt: "2026-09-17",
    tags: ["Payments", "Architecture", "Django"],
    project: "bestill",
    blocks: [
      {
        type: "p",
        text: "BeStill is a Christian meditation app with 10,000+ installs and a subscription model: a 1-week free trial, renewals, cancellations and grace periods. Subscription events arrive from Google Play Billing and from ThriveCart and LemonSqueezy webhooks, handled by a Django backend. The hard part isn't taking the first payment — it's every state after it.",
      },
      { type: "h2", text: "1. Name every state before writing UI" },
      {
        type: "p",
        text: "Most billing bugs are unmodelled states: a user in a grace period gets locked out, or a cancelled user loses access days before their paid period ends. Write the states and legal transitions down first, and make entitlement a property of the state.",
      },
      {
        type: "code",
        lang: "dart",
        code: "enum SubStatus { none, trial, active, grace, onHold, canceled, expired }\n\nextension Entitlement on SubStatus {\n  bool get hasAccess => switch (this) {\n        SubStatus.trial || SubStatus.active || SubStatus.grace || SubStatus.canceled => true,\n        SubStatus.none || SubStatus.onHold || SubStatus.expired => false,\n      };\n}",
      },
      {
        type: "p",
        text: "Note `canceled` keeps access: cancelling turns off auto-renew, it doesn't refund the period the user already paid for. And `grace` keeps access while the store retries a failed payment.",
      },
      { type: "h2", text: "2. Let the server own entitlement" },
      {
        type: "p",
        text: "The app should never decide on its own that a user is premium. The approach I recommend: after a purchase, send the purchase token to your backend, verify it with the Google Play Developer API, and store the resulting state. Google's Real-time Developer Notifications keep that state current when renewals, holds or cancellations happen while the app is closed. The app simply asks the backend what the user is entitled to.",
      },
      { type: "h2", text: "3. Funnel every source into one entitlement record" },
      {
        type: "p",
        text: "When subscriptions can come from more than one provider, each source should update the same entitlement record rather than growing its own premium flag. Webhooks must be verified and processed idempotently, because providers retry. LemonSqueezy, for example, signs each payload with an HMAC-SHA256 `X-Signature` header.",
      },
      {
        type: "code",
        lang: "python",
        code: "import hashlib, hmac, json\n\nfrom django.conf import settings\nfrom django.http import HttpResponse, HttpResponseForbidden\nfrom django.views.decorators.csrf import csrf_exempt\nfrom django.views.decorators.http import require_POST\n\n\n@csrf_exempt\n@require_POST\ndef lemonsqueezy_webhook(request):\n    expected = hmac.new(\n        settings.LEMONSQUEEZY_SIGNING_SECRET.encode(), request.body, hashlib.sha256\n    ).hexdigest()\n    if not hmac.compare_digest(expected, request.headers.get(\"X-Signature\", \"\")):\n        return HttpResponseForbidden()\n\n    delivery_id = hashlib.sha256(request.body).hexdigest()\n    if WebhookDelivery.objects.filter(pk=delivery_id).exists():\n        return HttpResponse(status=200)  # retry of an event we already applied\n\n    event = json.loads(request.body)\n    apply_subscription_event(source=\"lemonsqueezy\", payload=event)\n    WebhookDelivery.objects.create(pk=delivery_id)\n    return HttpResponse(status=200)",
      },
      { type: "h2", text: "4. Design the grace period, don't just tolerate it" },
      {
        type: "p",
        text: "A failed renewal is usually an expired card, not a user who wants to leave. Keep access during the grace period, show a calm banner explaining that payment needs attention, and deep-link straight to the Play subscription settings so fixing it takes one tap.",
      },
      {
        type: "code",
        lang: "dart",
        code: "final uri = Uri.parse(\n  'https://play.google.com/store/account/subscriptions'\n  '?sku=$productId&package=$packageName',\n);\nawait launchUrl(uri, mode: LaunchMode.externalApplication);",
      },
      { type: "h2", text: "5. Test the timeline, not just the purchase" },
      {
        type: "list",
        items: [
          "Add license testers in Play Console — test subscriptions renew on an accelerated schedule, so a whole trial-to-renewal cycle runs in minutes.",
          "Walk every transition: trial → paid, payment failure → grace → recovery, grace → hold → expiry, cancel → end of period.",
          "Unit-test the transition function; it's pure logic and the cheapest place to catch a wrong lock-out.",
          "Replay webhook deliveries to prove idempotency.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingMinutes(post: Post) {
  const words = post.blocks
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "code" ? b.code : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
