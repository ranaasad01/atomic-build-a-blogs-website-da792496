"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, Tag, ArrowLeft, Share2, Copy, Check, ChevronRight, BookOpen, User } from 'lucide-react';
import { APP_NAME, type Post, type Author, categories } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline Authors ───────────────────────────────────────────────────────────

const authors: Author[] = [
  {
    name: "Maya Chen",
    avatar: "/images/author-maya-chen.jpg",
    bio: "Tech writer and software engineer exploring the intersection of code and creativity. Maya has spent over a decade building products at scale and now writes about the ideas shaping our digital future.",
    role: "Senior Editor",
  },
  {
    name: "James Okafor",
    avatar: "/images/author-james-okafor.jpg",
    bio: "Cultural critic and essayist with a passion for storytelling and human connection. James writes about how technology reshapes society, identity, and the way we relate to one another.",
    role: "Culture Editor",
  },
  {
    name: "Sofia Reyes",
    avatar: "/images/author-sofia-reyes.jpg",
    bio: "UX designer and design systems thinker who writes about craft and intentionality. Sofia believes that the best design is invisible — and she's on a mission to explain why.",
    role: "Design Lead",
  },
  {
    name: "Liam Park",
    avatar: "/images/author-liam-park.jpg",
    bio: "Science communicator making complex ideas accessible and genuinely exciting. Liam holds a PhD in molecular biology and has written for Nature, Wired, and The Atlantic.",
    role: "Science Writer",
  },
];

// ─── Posts Map ────────────────────────────────────────────────────────────────

type FullPost = Post & { content: string };

const postsMap: Record<string, FullPost> = {
  "the-quiet-revolution-of-local-first-software": {
    slug: "the-quiet-revolution-of-local-first-software",
    title: "The Quiet Revolution of Local-First Software",
    excerpt:
      "A new generation of apps is rethinking where your data lives — and why it matters more than you think.",
    coverImage: "/images/local-first-software-revolution.jpg",
    category: "Technology",
    tags: ["software", "privacy", "ux"],
    author: authors[0],
    publishedAt: "2024-05-12",
    readTime: 7,
    featured: true,
    content: `For most of the internet's history, the cloud has been the default. Your photos live on Apple's servers. Your documents sync through Google's infrastructure. Your messages pass through Meta's data centers before reaching the person sitting across the table from you. We accepted this arrangement so gradually that most of us never stopped to question it — until the outages started, the privacy scandals mounted, and the subscription fees crept ever upward.\n\nLocal-first software is a quiet but growing rebellion against this model. The core idea is deceptively simple: your data should live on your device first, and sync to the cloud second — if at all. Apps built on this philosophy work offline by default, respond instantly because they're reading from local storage, and give you genuine ownership over your information. Pioneers like Obsidian, Linear, and the Ink & Switch research lab have been proving the concept for years, and the ecosystem is finally maturing.\n\nThe technical underpinnings are fascinating. Conflict-free Replicated Data Types (CRDTs) allow multiple devices to edit the same document simultaneously without a central server arbitrating conflicts. Think of it like Git for all your data — every device holds a complete copy, and merges happen automatically and deterministically. Libraries like Automerge and Yjs have made CRDTs accessible to everyday developers, and a new generation of databases like SQLite-based Turso and the browser-native OPFS are making local storage fast and reliable enough to power serious applications.\n\nBut the revolution isn't just technical — it's philosophical. Local-first software forces product teams to reckon with questions that cloud-first development lets you defer indefinitely: Who owns this data? What happens when the company shuts down? How do we handle privacy by design rather than by policy? These are uncomfortable questions for businesses built on data monetization, but they're exactly the questions users are starting to ask. The apps that answer them honestly — and build their architecture around the answers — are quietly winning the trust of the most discerning users on the internet.`,
  },
  "why-good-design-feels-invisible": {
    slug: "why-good-design-feels-invisible",
    title: "Why Good Design Feels Invisible",
    excerpt:
      "The best interfaces disappear. Here's what designers can learn from the things we never notice.",
    coverImage: "/images/invisible-good-design.jpg",
    category: "Design",
    tags: ["design", "ux", "craft"],
    author: authors[2],
    publishedAt: "2024-05-08",
    readTime: 5,
    featured: true,
    content: `There's a famous story about the design of the original iPhone. When Steve Jobs unveiled it in 2007, he described it as a device with no buttons — just a giant screen. The audience gasped. But the deeper magic wasn't the hardware; it was that within weeks of using it, people stopped thinking about the interface at all. They just... did things. Called people. Sent messages. Browsed the web. The design had become invisible.\n\nThis is the paradox at the heart of great UX: the better the design, the less you notice it. A door handle that affords pulling without a label. A form that guides you to the right input without error messages. A navigation menu that puts exactly what you need exactly where you expect it. None of these things win design awards. None of them go viral. But they are the difference between a product people love and one they merely tolerate.\n\nThe challenge for designers is that invisible design is extraordinarily hard to argue for in a meeting. You can't show a stakeholder the friction you removed. You can't demo the confusion you prevented. The value of good design is often measured in the absence of support tickets, the reduction in task completion time, the slight but meaningful uptick in retention. These are lagging indicators, and they require a culture of measurement and patience that many organizations struggle to maintain.\n\nThe best designers I know have developed a practice of noticing the things they don't notice. They pay attention to the moments when they reach for something and it's exactly where they expected. They study the products that feel effortless and ask: what decision made this feel this way? They build a vocabulary for the invisible — affordances, signifiers, feedback loops, mental models — and they use that vocabulary to advocate for the unglamorous work of refinement. Because in the end, the goal of design is not to be seen. It's to get out of the way.`,
  },
  "the-anthropology-of-the-group-chat": {
    slug: "the-anthropology-of-the-group-chat",
    title: "The Anthropology of the Group Chat",
    excerpt:
      "What our digital conversations reveal about modern friendship, identity, and belonging.",
    coverImage: "/images/group-chat-anthropology.jpg",
    category: "Culture",
    tags: ["culture", "social", "technology"],
    author: authors[1],
    publishedAt: "2024-05-03",
    readTime: 8,
    featured: true,
    content: `Every anthropologist needs a field site. Mine, for the past several years, has been a WhatsApp group called "The Usual Suspects" — eleven people I've known since university, scattered across four continents, who have maintained a continuous conversation for the better part of a decade. In that time, we've shared grief and celebration, argued about politics, sent approximately ten thousand memes, and developed a private language so dense with in-jokes that a stranger reading our chat would understand perhaps one word in five.\n\nThe group chat is one of the most undertheorized social phenomena of our era. Sociologists have written extensively about social media's effects on public discourse, but the private group chat — intimate, persistent, asynchronous — operates by entirely different rules. It is closer to the village square than the town hall, closer to the kitchen table than the op-ed page. It is where we perform our most authentic selves for the people who matter most to us.\n\nWhat strikes me most, studying my own chat and those of friends who've shared them with me, is how the medium shapes the relationship. The asynchronous nature of messaging allows for a kind of emotional processing that real-time conversation doesn't permit. You can draft a response, delete it, reconsider, and send something more considered. You can react with an emoji when words feel inadequate. You can go silent for three days and return without explanation, because everyone understands that life intervenes.\n\nBut the group chat also creates new anxieties. The read receipt is a minor instrument of social torture. The typing indicator — those three dots — generates a specific kind of anticipatory dread. And the question of who is and isn't in the group, who gets added and who gets quietly removed, maps the shifting tectonic plates of friendship with a precision that would have been impossible in the analog era. We have always had inner circles. Now we have named them, and given them notification settings.`,
  },
  "crispr-and-the-ethics-of-editing-life": {
    slug: "crispr-and-the-ethics-of-editing-life",
    title: "CRISPR and the Ethics of Editing Life",
    excerpt:
      "Gene editing promises to cure disease — but who decides what counts as a flaw worth fixing?",
    coverImage: "/images/crispr-gene-editing-ethics.jpg",
    category: "Science",
    tags: ["science", "ethics", "biotech"],
    author: authors[3],
    publishedAt: "2024-04-28",
    readTime: 9,
    content: `In November 2018, a Chinese scientist named He Jiankui announced that he had created the world's first gene-edited babies — twin girls whose embryos he had modified using CRISPR-Cas9 to be resistant to HIV. The scientific community reacted with near-universal horror. Not because the goal was unworthy, but because the methodology was reckless, the consent process was dubious, and the action was irreversible. He Jiankui was subsequently sentenced to three years in prison. The twins, now toddlers somewhere in China, carry edits in every cell of their bodies whose long-term effects remain unknown.\n\nThe He Jiankui affair was a scandal, but it was also a preview. CRISPR technology has advanced with breathtaking speed since Jennifer Doudna and Emmanuelle Charpentier first described its potential as a gene-editing tool in 2012. Clinical trials are now underway for CRISPR-based treatments for sickle cell disease, beta-thalassemia, and certain cancers. In 2023, the FDA approved the first CRISPR therapy — Casgevy — for sickle cell disease, marking a genuine milestone in medicine. The question is no longer whether we can edit the human genome. The question is how far we should go.\n\nThe ethical terrain is genuinely complex. Somatic gene editing — modifying the cells of a living patient to treat disease — is broadly accepted as an extension of existing medical practice. Germline editing — modifying embryos in ways that will be inherited by future generations — is where the consensus breaks down. The concerns are not merely technical. They are philosophical: about the nature of disability and difference, about the line between treatment and enhancement, about who gets to define what counts as a flaw worth fixing.\n\nDisability rights advocates have raised some of the most searching objections. If we can edit out deafness, should we? Many Deaf people would say no — not because deafness isn't a challenge, but because Deaf culture is a rich and vital community that would be diminished by its elimination. The same argument applies, with varying degrees of force, to a range of conditions that sit on the spectrum between disease and difference. CRISPR gives us the power to make these choices at the level of the genome. Whether we have the wisdom to make them well is a question that no amount of scientific progress can answer for us.`,
  },
  "building-a-second-brain-that-actually-works": {
    slug: "building-a-second-brain-that-actually-works",
    title: "Building a Second Brain That Actually Works",
    excerpt:
      "Productivity systems are everywhere. Here's how to build one that fits your life, not someone else's.",
    coverImage: "/images/second-brain-productivity-system.jpg",
    category: "Lifestyle",
    tags: ["productivity", "tools", "mindset"],
    author: authors[0],
    publishedAt: "2024-04-22",
    readTime: 6,
    content: `The productivity industrial complex has a dirty secret: most of its systems are designed for a hypothetical person who is not you. GTD was designed for a mid-career executive managing a complex portfolio of projects. Zettelkasten was designed for a German sociologist who wrote ninety books. The Pomodoro Technique was designed for a university student trying to get through exam season. These are all fine systems. But if you've tried them and found them wanting, the problem probably isn't your discipline. It's the fit.\n\nThe concept of a "second brain" — popularized by Tiago Forte's book of the same name — is more flexible than most productivity frameworks because it starts with a question rather than a prescription: what do you need to remember, and why? The answer varies enormously from person to person. A researcher needs to capture and connect ideas across years of reading. A freelancer needs to track client commitments and project status. A parent needs to remember the names of their kids' teachers and the dates of school events. These are different problems, and they call for different solutions.\n\nThe tools matter less than the habits. I've seen people build effective second brains in Notion, Obsidian, Roam Research, Apple Notes, and a physical notebook. I've also seen people spend six months configuring the perfect Notion workspace and never actually use it. The trap is mistaking the system for the practice. A second brain is not a piece of software. It is a habit of capture, a habit of review, and a habit of retrieval — and those habits have to be simple enough to maintain on your worst days, not just your best ones.\n\nThe single most important principle I've found is this: capture everything, curate ruthlessly. The friction of deciding what's worth saving in the moment is what kills most systems. Instead, capture promiscuously — every interesting idea, every useful link, every half-formed thought — and then do a weekly review where you decide what to keep, what to develop, and what to discard. This separates the act of noticing from the act of judging, and it turns out that both are much easier when you do them separately.`,
  },
  "the-rise-of-the-micro-founder": {
    slug: "the-rise-of-the-micro-founder",
    title: "The Rise of the Micro-Founder",
    excerpt:
      "Forget unicorns. A new wave of solo builders is creating sustainable, profitable businesses on their own terms.",
    coverImage: "/images/micro-founder-solo-business.jpg",
    category: "Business",
    tags: ["entrepreneurship", "startups", "indie"],
    author: authors[1],
    publishedAt: "2024-04-18",
    readTime: 7,
    content: `The mythology of the startup world has always been about scale. Move fast. Raise money. Grow at all costs. Hire aggressively. Reach a billion users or die trying. For two decades, this was the only story Silicon Valley knew how to tell, and it colonized the imaginations of ambitious people everywhere. If you were building a company and you weren't thinking about unicorn status, you were thinking too small.\n\nSomething has shifted. A growing community of builders — they call themselves indie hackers, micro-SaaS founders, solopreneurs — are deliberately opting out of the venture-backed growth treadmill. They're building small, focused products that solve specific problems for specific people, charging fair prices, and keeping their teams tiny. Many of them are profitable from day one. Almost none of them will ever raise a Series A. And a surprising number of them are happier, wealthier, and more fulfilled than their counterparts chasing unicorn valuations.\n\nThe economics have shifted in their favor. The cost of building software has collapsed. A solo developer with access to modern cloud infrastructure, open-source libraries, and AI coding assistants can build in a weekend what would have taken a team of five a month to build in 2010. Distribution has democratized too — a well-placed Product Hunt launch, a viral Twitter thread, or a niche newsletter sponsorship can drive thousands of signups without a marketing budget. The barriers to entry are lower than they've ever been, and the tools for running a lean operation have never been better.\n\nBut the most important shift is cultural. The indie hacker community — centered around forums like Indie Hackers, communities on Twitter and Discord, and newsletters like Starter Story — has created a new set of success metrics. Monthly recurring revenue. Profit margin. Time to first dollar. These are the numbers that matter in this world, not DAUs or growth rate or valuation multiples. It's a more honest accounting of what a business actually is: a sustainable engine for creating value and capturing some of it. The micro-founders are not anti-ambition. They've just redefined what ambition looks like.`,
  },
  "the-lost-art-of-doing-nothing": {
    slug: "the-lost-art-of-doing-nothing",
    title: "The Lost Art of Doing Nothing",
    excerpt:
      "In a culture obsessed with optimization, the most radical act might be to simply sit still.",
    coverImage: "/images/lost-art-doing-nothing.jpg",
    category: "Lifestyle",
    tags: ["mindfulness", "culture", "wellness"],
    author: authors[2],
    publishedAt: "2024-04-14",
    readTime: 5,
    content: `I have a confession: I am terrible at doing nothing. I check my phone while waiting for coffee. I listen to podcasts while walking. I read while eating lunch. I have optimized every idle moment out of my day, and I have the anxiety levels to prove it. I am, in this respect, entirely typical of my generation — we are the first cohort of humans to have grown up with the expectation that every moment of consciousness should be productive, or at least entertaining.\n\nThe Dutch have a word for the kind of doing-nothing I'm describing: niksen. It means, roughly, to idle — to sit without purpose, to let the mind wander without directing it anywhere in particular. It is distinct from meditation, which involves a kind of disciplined attention, and from relaxation, which implies recovery from effort. Niksen is simply the absence of agenda. And it turns out to be extraordinarily difficult for most modern people to achieve.\n\nThe research on mind-wandering is more interesting than you might expect. When neuroscientists study the brain's "default mode network" — the regions that activate when we're not focused on a task — they find that this is not a state of rest but of intense, diffuse activity. The brain is consolidating memories, processing emotions, making unexpected connections between disparate ideas. Many of history's most celebrated creative breakthroughs — Newton's apple, Archimedes' bath, Kekulé's dream of the snake eating its tail — came during moments of apparent idleness. The mind, left to its own devices, does remarkable things.\n\nThe challenge is creating the conditions for niksen in a world designed to prevent it. Every surface is a screen. Every screen is a notification. Every notification is a small, insistent claim on your attention. Reclaiming the right to be bored — genuinely, uncomfortably bored — requires a kind of active resistance to the attention economy. It means leaving your phone in another room. It means sitting on a park bench without earbuds. It means tolerating the initial discomfort of an unoccupied mind long enough to discover what it does when you stop directing it. The results, I'm told, are worth it. I'm still working on finding out.`,
  },
  "how-color-theory-shapes-what-you-buy": {
    slug: "how-color-theory-shapes-what-you-buy",
    title: "How Color Theory Shapes What You Buy",
    excerpt:
      "The psychology of color in branding is more nuanced — and more manipulative — than you think.",
    coverImage: "/images/color-theory-branding.jpg",
    category: "Design",
    tags: ["design", "psychology", "branding"],
    author: authors[2],
    publishedAt: "2024-04-10",
    readTime: 6,
    content: `Walk into any supermarket and pay attention to the colors. The organic section is green and earthy brown. The premium products are black and gold. The budget options are bright primary colors. The children's cereals are a riot of saturated hues. None of this is accidental. Every color decision in every package on every shelf is the result of research, testing, and a sophisticated understanding of how color shapes perception, emotion, and ultimately, behavior.\n\nColor psychology is one of the oldest tools in the marketer's kit, and also one of the most misunderstood. The popular version — red means urgency, blue means trust, green means nature — is real but reductive. The actual science is more contextual and more interesting. Color meaning is heavily influenced by culture: white is the color of mourning in parts of East Asia and the color of weddings in the West. It's influenced by category: the blue that signals trustworthiness for a bank would signal coldness for a food brand. And it's influenced by contrast: a color only means something in relation to the colors around it.\n\nWhat the best brand designers understand is that color is not a signal — it's a relationship. The specific shade of red that Coca-Cola owns is not just red; it's that red, in that context, associated with those memories and those emotions, over more than a century of consistent application. You cannot simply choose red and inherit Coca-Cola's brand equity. You have to earn the association through consistency, repetition, and the slow accumulation of positive experiences.\n\nThe implications for digital design are profound. In an era when most brands live primarily on screens, color choices have to work across an enormous range of display technologies, lighting conditions, and cultural contexts. A color that looks warm and inviting on a calibrated design monitor may look garish on a cheap phone screen. A palette that feels sophisticated to a Western audience may read as cold or clinical in another market. The designers who navigate this complexity well are the ones who understand that they're not choosing colors — they're choosing relationships, and relationships take time to build.`,
  },
  "the-neuroscience-of-creative-flow": {
    slug: "the-neuroscience-of-creative-flow",
    title: "The Neuroscience of Creative Flow",
    excerpt:
      "Scientists are finally beginning to understand what happens in the brain when everything clicks.",
    coverImage: "/images/neuroscience-creative-flow.jpg",
    category: "Science",
    tags: ["neuroscience", "creativity", "psychology"],
    author: authors[3],
    publishedAt: "2024-04-06",
    readTime: 8,
    content: `Every musician, programmer, writer, and athlete knows the feeling: you sit down to work, and at some point the effort disappears. Time dilates. Self-consciousness evaporates. The work seems to do itself. Mihaly Csikszentmihalyi named this state "flow" in 1990, and his description of it — optimal experience, intrinsic motivation, effortless attention — resonated so deeply that the book became a classic. But for decades, the neuroscience of flow remained elusive. We knew what it felt like. We didn't know what it looked like in the brain.\n\nThat's changing. A new generation of neuroimaging studies is beginning to map the neural correlates of flow states, and the findings are surprising. The most consistent result is a phenomenon called transient hypofrontality — a temporary reduction in activity in the prefrontal cortex, the brain region associated with self-monitoring, planning, and critical evaluation. In other words, the inner critic goes quiet. The part of your brain that second-guesses every decision, worries about how you're being perceived, and compares your current performance to your past performance — that part dials down, and something more fluid and automatic takes over.\n\nAt the same time, the brain's reward circuitry lights up. Dopamine, norepinephrine, and anandamide — a naturally occurring cannabinoid — are all released during flow states, creating the characteristic feeling of pleasure and effortlessness. This neurochemical cocktail also enhances pattern recognition and lateral thinking, which may explain why people in flow states often produce their most creative work. The brain is simultaneously less self-critical and more chemically primed for insight.\n\nThe practical implications are significant. If we understand the conditions that trigger flow — clear goals, immediate feedback, a challenge level that slightly exceeds current skill — we can design our work environments and schedules to make flow more likely. This is not a guarantee; flow is notoriously difficult to force. But it is a framework. The research suggests that the single biggest enemy of flow is interruption — not just the interruption itself, but the anticipation of interruption. A mind that knows it might be interrupted cannot fully commit to the task at hand. In an era of constant notifications and open-plan offices, this finding has uncomfortable implications for how we've designed the modern workplace.`,
  },
};

// ─── Related Posts Map ────────────────────────────────────────────────────────

const relatedPostsMap: Record<string, string[]> = {
  "the-quiet-revolution-of-local-first-software": [
    "why-good-design-feels-invisible",
    "the-rise-of-the-micro-founder",
    "building-a-second-brain-that-actually-works",
  ],
  "why-good-design-feels-invisible": [
    "how-color-theory-shapes-what-you-buy",
    "the-quiet-revolution-of-local-first-software",
    "the-lost-art-of-doing-nothing",
  ],
  "the-anthropology-of-the-group-chat": [
    "the-lost-art-of-doing-nothing",
    "the-rise-of-the-micro-founder",
    "building-a-second-brain-that-actually-works",
  ],
  "crispr-and-the-ethics-of-editing-life": [
    "the-neuroscience-of-creative-flow",
    "the-quiet-revolution-of-local-first-software",
    "the-anthropology-of-the-group-chat",
  ],
  "building-a-second-brain-that-actually-works": [
    "the-lost-art-of-doing-nothing",
    "the-rise-of-the-micro-founder",
    "the-quiet-revolution-of-local-first-software",
  ],
  "the-rise-of-the-micro-founder": [
    "building-a-second-brain-that-actually-works",
    "the-quiet-revolution-of-local-first-software",
    "the-anthropology-of-the-group-chat",
  ],
  "the-lost-art-of-doing-nothing": [
    "building-a-second-brain-that-actually-works",
    "the-anthropology-of-the-group-chat",
    "the-neuroscience-of-creative-flow",
  ],
  "how-color-theory-shapes-what-you-buy": [
    "why-good-design-feels-invisible",
    "the-anthropology-of-the-group-chat",
    "the-lost-art-of-doing-nothing",
  ],
  "the-neuroscience-of-creative-flow": [
    "crispr-and-the-ethics-of-editing-life",
    "the-lost-art-of-doing-nothing",
    "building-a-second-brain-that-actually-works",
  ],
};

// ─── Gradient by Category ─────────────────────────────────────────────────────

function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    Technology: "from-indigo-400 to-indigo-600",
    Design: "from-violet-400 to-violet-600",
    Culture: "from-rose-400 to-rose-600",
    Science: "from-emerald-400 to-emerald-600",
    Business: "from-amber-400 to-amber-600",
    Lifestyle: "from-sky-400 to-sky-600",
  };
  return map[category] ?? "from-indigo-400 to-indigo-600";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Inner Component (uses useSearchParams) ───────────────────────────────────

function PostPageInner() {
  const searchParams = useSearchParams();
  const rawSlug = searchParams.get("slug");
  const slug =
    rawSlug && postsMap[rawSlug]
      ? rawSlug
      : "the-quiet-revolution-of-local-first-software";

  const post = postsMap[slug];
  const relatedSlugs = relatedPostsMap[slug] ?? [];
  const relatedPosts = relatedSlugs
    .map((s) => postsMap[s])
    .filter(Boolean) as FullPost[];

  const paragraphs = post.content.split("\n\n").filter(Boolean);
  const midIndex = Math.floor(paragraphs.length / 2);
  // Pull a key sentence from the middle paragraph for blockquote
  const midParagraph = paragraphs[midIndex] ?? "";
  const blockquoteSentence =
    midParagraph.split(". ").slice(0, 2).join(". ") + ".";

  const gradient = getCategoryGradient(post.category);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    {
      label: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      className: "bg-sky-50 hover:bg-sky-100 text-sky-600",
      onClick: () => {
        if (typeof window !== "undefined") {
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
            "_blank"
          );
        }
      },
    },
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      className: "bg-blue-50 hover:bg-blue-100 text-blue-600",
      onClick: () => {
        if (typeof window !== "undefined") {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
            "_blank"
          );
        }
      },
    },
    {
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      className: "bg-blue-50 hover:bg-blue-100 text-blue-700",
      onClick: () => {
        if (typeof window !== "undefined") {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
            "_blank"
          );
        }
      },
    },
    {
      label: copied ? "Copied!" : "Copy",
      icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />,
      className: "bg-gray-50 hover:bg-gray-100 text-gray-600",
      onClick: handleCopy,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop sticky share sidebar */}
      <div className="hidden lg:flex fixed left-4 top-1/3 z-40 flex-col items-center gap-3">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 [writing-mode:vertical-rl] rotate-180">
          Share
        </span>
        {shareButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            aria-label={btn.label}
            title={btn.label}
            className={`rounded-xl w-10 h-10 flex items-center justify-center shadow-sm border border-gray-100 transition-colors ${btn.className}`}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* 1. Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all stories
        </Link>
      </div>

      {/* 2. Article Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-0">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
            {post.category}
          </span>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 leading-tight mt-4 mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          {/* Meta row */}
          <div className="flex items-center gap-6 flex-wrap text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-base">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{post.author.name}</div>
                <div className="text-xs text-gray-400">{post.author.role}</div>
              </div>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>~{post.readTime * 200} words</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Cover Image Placeholder */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div
          className={`h-72 md:h-96 rounded-2xl bg-gradient-to-br ${gradient} flex items-end p-8 overflow-hidden relative`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <p className="relative font-playfair text-3xl md:text-5xl font-bold text-white/20 leading-tight select-none">
            {post.title}
          </p>
        </div>
      </div>

      {/* 4. Mobile Share Row */}
      <div className="max-w-4xl mx-auto px-4 mt-6 flex lg:hidden items-center gap-3">
        <span className="text-xs text-gray-400 uppercase tracking-widest mr-1">Share:</span>
        {shareButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            aria-label={btn.label}
            title={btn.label}
            className={`rounded-xl w-10 h-10 flex items-center justify-center shadow-sm border border-gray-100 transition-colors ${btn.className}`}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* 5. Article Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {paragraphs.map((para, i) => {
          if (i === midIndex) {
            return (
              <div key={i}>
                <p className="text-lg leading-relaxed text-gray-600 mb-6">{para}</p>
                <blockquote className="border-l-4 border-indigo-400 pl-6 py-2 bg-indigo-50 rounded-r-xl italic text-gray-700 text-lg my-8">
                  &ldquo;{blockquoteSentence}&rdquo;
                </blockquote>
              </div>
            );
          }
          if (i === 0) {
            return (
              <p key={i} className="text-xl leading-relaxed text-gray-700 font-medium mb-6">
                {para}
              </p>
            );
          }
          return (
            <p key={i} className="text-lg leading-relaxed text-gray-600 mb-6">
              {para}
            </p>
          );
        })}
      </div>

      {/* 6. Tags Section */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tagged in:
          </span>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 text-sm px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Author Bio Card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-indigo-200 text-indigo-700 text-2xl font-bold flex items-center justify-center">
              {post.author.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-playfair text-xl font-bold text-gray-900">
                  {post.author.name}
                </h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 font-semibold">
                  {post.author.role}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2">{post.author.bio}</p>
              <Link
                href="/blog"
                className="text-sm text-indigo-600 font-medium hover:underline mt-3 inline-flex items-center gap-1"
              >
                View all posts by {post.author.name}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/post?slug=${related.slug}`}
                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white overflow-hidden transition-shadow block"
              >
                <div
                  className={`h-36 bg-gradient-to-br ${getCategoryGradient(related.category)}`}
                />
                <div className="p-4">
                  <span className="text-xs text-indigo-600 font-semibold uppercase">
                    {related.category}
                  </span>
                  <h3 className="font-playfair text-base font-bold text-gray-900 line-clamp-2 mt-1 mb-2">
                    {related.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{related.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 9. Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center border-t border-gray-100">
        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
          Enjoyed this story?
        </h3>
        <p className="text-gray-500 mb-8">
          Discover more thoughtful articles across technology, culture, design, and beyond.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/blog"
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse more stories
          </Link>
          <button
            onClick={handleCopy}
            className="border border-gray-200 text-gray-600 rounded-xl px-6 py-3 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share this post
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function PostPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PostPageInner />
    </Suspense>
  );
}
