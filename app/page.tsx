"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, BookOpen, Users, Sparkles, Mail, Check, TrendingUp, Heart, Eye, ChevronRight } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  categories,
  type Author,
  type Post,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const authors: Author[] = [
  {
    name: "Maya Chen",
    avatar: "/images/author-maya-chen.jpg",
    bio: "Tech writer and software engineer exploring the intersection of code and creativity.",
    role: "Senior Editor",
  },
  {
    name: "James Okafor",
    avatar: "/images/author-james-okafor.jpg",
    bio: "Cultural critic and essayist with a passion for storytelling and human connection.",
    role: "Culture Editor",
  },
  {
    name: "Sofia Reyes",
    avatar: "/images/author-sofia-reyes.jpg",
    bio: "UX designer and design systems thinker who writes about craft and intentionality.",
    role: "Design Lead",
  },
  {
    name: "Liam Park",
    avatar: "/images/author-liam-park.jpg",
    bio: "Science communicator making complex ideas accessible and genuinely exciting.",
    role: "Science Writer",
  },
];

const featuredPosts: Post[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

const recentPosts: Post[] = [
  {
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
  },
  {
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
  },
  {
    slug: "the-rise-of-the-micro-founder",
    title: "The Rise of the Micro-Founder",
    excerpt:
      "Forget unicorns. A new wave of solo builders is creating sustainable, profitable businesses on their own terms.",
    coverImage: "/images/micro-founder-solo-business.jpg",
    category: "Business",
    tags: ["startups", "entrepreneurship", "indie"],
    author: authors[1],
    publishedAt: "2024-04-17",
    readTime: 7,
  },
  {
    slug: "color-theory-for-the-rest-of-us",
    title: "Color Theory for the Rest of Us",
    excerpt:
      "You don't need a design degree to understand why some palettes sing and others fall flat.",
    coverImage: "/images/color-theory-design-guide.jpg",
    category: "Design",
    tags: ["design", "color", "visual"],
    author: authors[2],
    publishedAt: "2024-04-11",
    readTime: 5,
  },
];

const stats = [
  { label: "Articles Published", value: "1,200+", icon: BookOpen },
  { label: "Monthly Readers", value: "85,000+", icon: Users },
  { label: "Topics Covered", value: "6 Categories", icon: TrendingUp },
  { label: "Avg. Read Time", value: "6 Minutes", icon: Clock },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Inkwell is the only publication I actually look forward to reading. Every piece feels considered, never rushed.",
    name: "Priya Nair",
    role: "Product Designer at Figma",
    avatar: "/images/testimonial-priya-nair.jpg",
  },
  {
    id: 2,
    quote:
      "The writing here is genuinely good. Not just informative — it makes you think differently about familiar things.",
    name: "Tom Eriksson",
    role: "Engineering Manager",
    avatar: "/images/testimonial-tom-eriksson.jpg",
  },
  {
    id: 3,
    quote:
      "I've recommended Inkwell to my entire team. It's rare to find a blog that respects your intelligence and your time.",
    name: "Amara Diallo",
    role: "Founder, Clearpath Studio",
    avatar: "/images/testimonial-amara-diallo.jpg",
  },
];

const categoryColorMap: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-700",
  violet: "bg-violet-100 text-violet-700",
  rose: "bg-rose-100 text-rose-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
};

const defaultBadge = "bg-gray-100 text-gray-700";

function getCategoryColor(categoryLabel: string): string {
  const found = categories.find(
    (c) => c.label.toLowerCase() === categoryLabel.toLowerCase()
  );
  if (!found) return defaultBadge;
  return categoryColorMap[found.color] ?? defaultBadge;
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0] ?? "2024", 10);
  const month = parseInt(parts[1] ?? "1", 10) - 1;
  const day = parseInt(parts[2] ?? "1", 10);
  const d = new Date(year, month, day);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {APP_TAGLINE}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                Ideas that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                  move
                </span>{" "}
                you forward.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-indigo-200 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              >
                {APP_DESCRIPTION}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  href="#featured"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-full shadow-xl shadow-indigo-900/30 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  Start Reading
                </motion.a>
                <motion.a
                  href="#newsletter"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500/20 border border-indigo-400/40 text-white font-semibold rounded-full hover:bg-indigo-500/30 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe Free
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: featured card preview */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex flex-col gap-4"
            >
              {featuredPosts.slice(0, 3).map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={slideInRight}
                  custom={i}
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-indigo-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </span>
                    <p className="text-white font-semibold text-sm mt-1 leading-snug line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-indigo-300 text-xs mt-1">
                      {post.readTime} min read
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-300 flex-shrink-0" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Posts ───────────────────────────────────────────────── */}
      <section id="featured" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                Editor's Picks
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                Featured Stories
              </h2>
            </div>
            <a
              href="#categories"
              className="hidden md:flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              Browse all <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-100 border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-shadow cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-indigo-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} min
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Explore by Topic
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Find Your Niche
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
              From deep-dives into emerging tech to reflections on everyday
              culture — there's something here for every curious mind.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5"
          >
            {categories.map((cat) => {
              const colorClasses: Record<string, string> = {
                indigo:
                  "from-indigo-500 to-indigo-700 shadow-indigo-200 hover:shadow-indigo-300",
                violet:
                  "from-violet-500 to-violet-700 shadow-violet-200 hover:shadow-violet-300",
                rose: "from-rose-500 to-rose-700 shadow-rose-200 hover:shadow-rose-300",
                emerald:
                  "from-emerald-500 to-emerald-700 shadow-emerald-200 hover:shadow-emerald-300",
                amber:
                  "from-amber-500 to-amber-600 shadow-amber-200 hover:shadow-amber-300",
                sky: "from-sky-500 to-sky-700 shadow-sky-200 hover:shadow-sky-300",
              };
              const gradient =
                colorClasses[cat.color] ??
                "from-gray-500 to-gray-700 shadow-gray-200";

              return (
                <motion.div
                  key={cat.slug}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white shadow-lg cursor-pointer overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors rounded-3xl" />
                  <h3 className="font-playfair text-2xl font-bold mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-white/70 text-sm">
                    Explore {cat.label.toLowerCase()} articles →
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Recent Posts ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              Fresh Off the Press
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Recent Articles
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {recentPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group flex gap-5 p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mt-2 mb-1.5 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="font-medium text-gray-600">
                      {post.author.name}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                    <span>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Value Props ──────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">
                About {APP_NAME}
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
                Writing that respects your time and intelligence.
              </h2>
              <p className="text-indigo-200 text-lg leading-relaxed mb-8">
                We started {APP_NAME} because we were tired of content farms,
                clickbait headlines, and articles that say nothing. Every piece
                we publish is carefully edited, thoroughly researched, and
                written by people who genuinely care about their subject.
              </p>
              <ul className="space-y-4">
                {[
                  "No ads, no sponsored content — ever",
                  "Every article reviewed by a senior editor",
                  "Writers paid fairly for quality work",
                  "Free to read, always",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-indigo-300" />
                    </div>
                    <span className="text-indigo-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                {
                  icon: Star,
                  title: "Curated Quality",
                  desc: "We publish fewer articles so each one can be exceptional.",
                },
                {
                  icon: Heart,
                  title: "Reader First",
                  desc: "No dark patterns, no paywalls, no manipulative design.",
                },
                {
                  icon: Eye,
                  title: "Deep Dives",
                  desc: "We go beyond the surface to give you real understanding.",
                },
                {
                  icon: Users,
                  title: "Community",
                  desc: "A growing community of curious, thoughtful readers.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-indigo-200" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-indigo-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              What Readers Say
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Loved by Curious Minds
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-8 shadow-md shadow-gray-100 border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/40 transition-shadow"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                Stay in the Loop
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                Get the best stories, weekly.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Join 85,000+ readers who get our hand-picked articles delivered
                every Tuesday morning. No spam, unsubscribe anytime.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-7 h-7 text-emerald-600" />
                  </div>
                  <p className="text-xl font-semibold text-gray-900">
                    You're in!
                  </p>
                  <p className="text-gray-500">
                    Welcome to the {APP_NAME} community. Check your inbox for a
                    welcome note.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm whitespace-nowrap"
                  >
                    Subscribe Free
                  </motion.button>
                </form>
              )}
              <p className="text-gray-400 text-xs mt-4">
                No spam. Unsubscribe with one click at any time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}