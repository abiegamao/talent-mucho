// Hidden bootcamp curriculum data ~ used by InsideClient.tsx
// PIN-gated; not imported anywhere public.

export interface SessionData {
  num: string;          // "Kickoff" | "W1·S1" etc.
  date: string;
  title: string;
  italic?: string;
  weekColor: string;
  buildLive: string;        // The concrete artifact built live
  teach: string[];          // 2-3 bullets, concepts in service of the build
  walkAway: string;         // What you walk away with after this session
  teachMin: number;
  buildMin: number;
}

export const SESSIONS: SessionData[] = [
  {
    num: "Kickoff",
    date: "Fri, Jun 5",
    title: "Welcome &",
    italic: "orientation",
    weekColor: "#C4A882",
    buildLive: "Your Claude.ai account, Pro upgrade if needed, and your first Project shell with your business docs uploaded.",
    teach: [
      "How Cohort 1 will run ~ rhythms, expectations, where to ask for help",
      "Pick your one project for the month (everyone commits by end)",
      "Project structure: instructions, knowledge, conversation history",
    ],
    walkAway: "1 Claude Project loaded with your business docs, ready for Week 1.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W1·S1",
    date: "Sat, Jun 6",
    title: "The interface,",
    italic: "Projects",
    weekColor: "#C4A882",
    buildLive: "Your second Claude Project: a 'Voice & Brand' project loaded with examples of your writing, tone, and 5 sample posts.",
    teach: [
      "How Projects differ from chats ~ context that persists",
      "Reading vs writing prompts: when to ask, when to direct",
      "The art of asking Claude clarifying questions back",
    ],
    walkAway: "1 Voice/Brand Project that drafts in your tone on demand.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W1·S2",
    date: "Sun, Jun 7",
    title: "Custom instructions,",
    italic: "file uploads",
    weekColor: "#C4A882",
    buildLive: "Your third Claude Project: a 'Client Hub' project with one client's docs, history, and a custom instruction set.",
    teach: [
      "Custom instructions: what makes them work vs. waste tokens",
      "File uploads: PDFs, CSVs, DOCX ~ what Claude does well, what it skips",
      "When to start a new conversation vs. extend the current one",
    ],
    walkAway: "3 configured Claude Projects ~ Week 1 deliverable complete.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W2·S3",
    date: "Sat, Jun 13",
    title: "AI employees ~",
    italic: "what Cowork makes real",
    weekColor: "#7D6B5A",
    buildLive: "Set up Cowork on your computer, give it permission to one folder, and watch it organise files autonomously.",
    teach: [
      "What Cowork is ~ Claude with file system + browser access",
      "The 'AI employee' frame: roles, not tools",
      "Permissions, safety, and what Cowork won't do",
    ],
    walkAway: "Cowork installed, permissions configured, first folder organised live.",
    teachMin: 35,
    buildMin: 145,
  },
  {
    num: "W2·S4",
    date: "Sun, Jun 14",
    title: "Build and test",
    italic: "your first AI employee",
    weekColor: "#7D6B5A",
    buildLive: "Define a named AI employee (Inbox Triage / Lead Qualifier / Content Reviewer ~ pick one), brief it, and test against 5 real scenarios from your business.",
    teach: [
      "How to write a brief that actually works (the 4-part frame)",
      "Testing AI employees: 5-scenario stress test",
      "When to iterate vs. start over with a new brief",
    ],
    walkAway: "1 named AI employee in Cowork, briefed and tested ~ Week 2 deliverable complete.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W3·S5",
    date: "Sat, Jun 20",
    title: "Claude Code ~",
    italic: "your first build",
    weekColor: "#5A7A6B",
    buildLive: "Open a terminal, install Claude Code, and ship your first thing: a tiny one-page tool that solves a specific problem in your business (no design needed).",
    teach: [
      "What Vibe Coding actually is ~ describing intent, not syntax",
      "Terminal basics for non-coders (we go slow here)",
      "What Claude Code can build in a 90-min sprint vs. what it can't",
    ],
    walkAway: "1 working tool you described and Claude Code shipped ~ on your computer.",
    teachMin: 35,
    buildMin: 145,
  },
  {
    num: "W3·S6",
    date: "Sun, Jun 21",
    title: "Build your",
    italic: "business dashboard",
    weekColor: "#5A7A6B",
    buildLive: "Use Claude Code to build a custom dashboard for your business ~ pulling from a Google Sheet, a JSON file, or a simple form. Your version of Notion, but yours.",
    teach: [
      "What a 'business dashboard' really is (it's simpler than you think)",
      "Working with data: sheets, JSON, simple files",
      "When done is done ~ shipping ugly things that work",
    ],
    walkAway: "1 custom dashboard you built with Claude Code ~ Week 3 deliverable complete.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W4·S7",
    date: "Sat, Jun 27",
    title: "Your full Claude stack",
    italic: "working together",
    weekColor: "#6B5A7A",
    buildLive: "Wire it all up: Projects + AI employees + Code + Chrome extension. Pick one workflow in your business and rebuild it end-to-end with Claude.",
    teach: [
      "Stack thinking: where each tool fits in your day",
      "The 3-moments-a-day routine (morning / midday / shutdown)",
      "Avoiding tool overlap and decision fatigue",
    ],
    walkAway: "One real business workflow now running on the full Claude stack.",
    teachMin: 30,
    buildMin: 150,
  },
  {
    num: "W4·S8",
    date: "Sun, Jun 28",
    title: "Showcases &",
    italic: "graduation",
    weekColor: "#6B5A7A",
    buildLive: "Write your daily Claude routine: 3 specific moments in your workday where Claude is open and ready ~ what for, what prompts, what success looks like.",
    teach: [
      "How operators stay sharp after the bootcamp ends",
      "Building your own skill library going forward",
      "How to teach your team / VA what you just learned",
    ],
    walkAway: "Your written daily Claude routine ~ Week 4 deliverable complete. You're done.",
    teachMin: 60,
    buildMin: 120,
  },
];

export interface SetupItem {
  title: string;
  desc: string;
  link?: { label: string; href: string };
}

export const COMMON_SETUP: SetupItem[] = [
  {
    title: "Sign up at claude.ai",
    desc: "Free works to start. Pro (€20/mo) is recommended for the bootcamp ~ you'll hit free-tier limits in Week 2.",
    link: { label: "claude.ai", href: "https://claude.ai" },
  },
  {
    title: "Join the Skool community",
    desc: "Invite link is in your welcome email. Pin the #cohort-1 channel ~ that's where homework, screenshots, and questions live.",
  },
  {
    title: "Install Chrome",
    desc: "We'll use the Claude in Chrome extension in Week 3. If you use Safari/Firefox, that's fine ~ just have Chrome ready too.",
    link: { label: "google.com/chrome", href: "https://www.google.com/chrome/" },
  },
  {
    title: "Pick a 'Claude folder'",
    desc: "One folder on your computer where every prompt, document, and Claude Code project for the bootcamp lives. We'll point Cowork at it in Week 2.",
  },
  {
    title: "Have your business assets ready",
    desc: "3 docs: your offer/services page, your FAQ, and your brand voice notes. Plus one client/customer profile. We use these from Day 1.",
  },
];

export const MAC_SETUP: SetupItem[] = [
  {
    title: "Claude Desktop for Mac",
    desc: "macOS 13 or newer. Install once, sign in once.",
    link: { label: "claude.ai/download", href: "https://claude.ai/download" },
  },
  {
    title: "Claude Cowork (Mac)",
    desc: "This is the AI-employee app. Mac-first ~ full feature set.",
    link: { label: "anthropic.com/cowork", href: "https://www.anthropic.com/cowork" },
  },
  {
    title: "Claude Code (terminal)",
    desc: "Install via terminal. Confirm with `claude --version` after install.",
    link: { label: "Install guide", href: "https://docs.claude.com/en/docs/claude-code/quickstart" },
  },
  {
    title: "Optional: Raycast",
    desc: "Free productivity launcher. Quick way to open Claude from anywhere.",
    link: { label: "raycast.com", href: "https://www.raycast.com/" },
  },
];

export const WINDOWS_SETUP: SetupItem[] = [
  {
    title: "Claude Desktop for Windows",
    desc: "Windows 11 recommended. Install once, sign in once.",
    link: { label: "claude.ai/download", href: "https://claude.ai/download" },
  },
  {
    title: "Claude Cowork (Windows)",
    desc: "Windows support is now stable. Same AI-employee app, same setup flow.",
    link: { label: "anthropic.com/cowork", href: "https://www.anthropic.com/cowork" },
  },
  {
    title: "Claude Code (PowerShell)",
    desc: "Install via PowerShell using Anthropic's Windows guide. Confirm with `claude --version`.",
    link: { label: "Install guide", href: "https://docs.claude.com/en/docs/claude-code/quickstart" },
  },
  {
    title: "WSL2 (optional)",
    desc: "Not required for the bootcamp. Skip unless you already use it.",
  },
];

export const OUTCOMES = [
  {
    week: "Week 1",
    color: "#C4A882",
    title: "3 Claude Projects",
    desc: "Loaded with your docs, business context, and brand voice. Ready to draft, plan, and decide in your tone.",
  },
  {
    week: "Week 2",
    color: "#7D6B5A",
    title: "1 named AI employee",
    desc: "Set up in Cowork, briefed against real scenarios. Handles a recurring task in your business autonomously.",
  },
  {
    week: "Week 3",
    color: "#5A7A6B",
    title: "1 custom dashboard",
    desc: "Built with Claude Code. No coding background needed. Yours, on your computer, doing what Notion can't.",
  },
  {
    week: "Week 4",
    color: "#6B5A7A",
    title: "A daily Claude routine",
    desc: "3 specific moments in your workday where Claude is open, prompts ready, outcomes defined. The system runs you.",
  },
];

export const SESSION_ANATOMY = [
  { range: "0:00–0:10", min: 10, label: "Quick context", desc: "What we're building today and why it matters", kind: "teach" as const },
  { range: "0:10–0:25", min: 15, label: "Live demo", desc: "Instructor builds first, narrating", kind: "teach" as const },
  { range: "0:25–2:10", min: 105, label: "Build sprint", desc: "Your turn ~ breakouts + instructor circulation", kind: "build" as const },
  { range: "2:10–2:40", min: 30, label: "Showcase", desc: "3 students share, peer feedback", kind: "build" as const },
  { range: "2:40–3:00", min: 20, label: "Office hours + brief", desc: "Q&A and tomorrow's homework", kind: "teach" as const },
];

export const WONT_COVER = [
  "The philosophy or ethics of AI ~ that's not why you're here",
  "Building production SaaS for paying users ~ that's a different course",
  "Chatbot-only projects ~ no Telegram bots, no SaaS chatbots",
  "Industry-specific verticals we don't know ~ we'll point you to who does",
];

export const ROOM_CODE = [
  {
    title: "Show up live",
    desc: "Recordings exist. The magic doesn't ~ that happens in real time, in the breakouts, in the chat.",
  },
  {
    title: "One project, all month",
    desc: "Pick it by end of Kickoff. Building one real thing beats prototyping five.",
  },
  {
    title: "Cameras encouraged, not required",
    desc: "We get it. But you'll get more out of this if we can see you.",
  },
  {
    title: "Ask anything in chat",
    desc: "Meri is in chat the entire session. No question is too basic. Stuck for 5 min? Ask.",
  },
  {
    title: "Done beats perfect",
    desc: "We ship working things, not pretty things. Polish is for after Cohort 1.",
  },
];
