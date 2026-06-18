"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, Tag, ChevronRight, X, Filter } from 'lucide-react';
import { APP_NAME, categories, type Post, type Author } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Authors ─────────────────────────────────────────────────────────────

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

// ─── Mock Posts ───────────────────────────────────────────────────────────────

const allPosts: Post[] = [
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
  },
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
    readTime: 10,
  },
  {
    slug: "the-rise-of-the-indie-maker",
    title: "The Rise of the Indie Maker",
    excerpt:
      "Forget unicorns. A new wave of solo builders is creating sustainable, profitable businesses on their own terms.",
    coverImage: "/images/indie-maker-rise.jpg",
    category: "Business",
    tags: ["business", "startups", "indie"],
    author: authors[0],
    publishedAt: "2024-04-20",
    readTime: 6,
  },
  {
    slug: "slow-mornings-and-the-art-of-doing-less",
    title: "Slow Mornings and the Art of Doing Less",
    excerpt:
      "In a world obsessed with productivity, there's radical power in choosing stillness before the day begins.",
    coverImage: "/images/slow-mornings-doing-less.jpg",
    category: "Lifestyle",
    tags: ["lifestyle", "wellness", "mindfulness"],
    author: authors[2],
    publishedAt: "2024-04-15",
    readTime: 4,
  },
  {
    slug: "how-ai-is-reshaping-creative-work",
    title: "How AI Is Reshaping Creative Work",
    excerpt:
      "Artificial intelligence isn't replacing creativity — it's forcing us to ask what creativity really means.",
    coverImage: "/images/ai-reshaping-creative-work.jpg",
    category: "Technology",
    tags: ["ai", "creativity", "future"],
    author: authors[1],
    publishedAt: "2024-04-10",
    readTime: 9,
  },
  {
    slug: "the-typography-of-trust",
    title: "The Typography of Trust",
    excerpt:
      "The fonts a brand chooses say more about its values than any tagline. Here's the science behind why.",
    coverImage: "/images/typography-of-trust.jpg",
    category: "Design",
    tags: ["design", "typography", "branding"],
    author: authors[2],
    publishedAt: "2024-04-05",
    readTime: 5,
  },
  {
    slug: "what-ancient-philosophy-teaches-us-about-focus",
    title: "What Ancient Philosophy Teaches Us About Focus",
    excerpt:
      "The Stoics, Epicureans, and Buddhists all had something to say about attention. Turns out, they were right.",
    coverImage: "/images/ancient-philosophy-focus.jpg",
    category: "Culture",
    tags: ["philosophy", "focus", "culture"],
    author: authors[3],
    publishedAt: "2024-03-30",
    readTime: 7,
  },
];

// ─── Derived Data ─────────────────────────────────────────────────────────────

const allTags: string[] = Array.from(
  new Set(allPosts.flatMap((p) => p.tags))
);

const POSTS_PER_PAGE = 6;

// ─── Category gradient map ────────────────────────────────────────────────────

const categoryGradient: Record<string, string> = {
  Technology: "from-indigo-400 to-indigo-600",
  Design: "from-violet-400 to-violet-600",
  Culture: "from-rose-400 to-rose-600",
  Science: "from-emerald-400 to-emerald-600",
  Business: "from-amber-400 to-amber-600",
  Lifestyle: "from-sky-400 to-sky-600",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTags]);

  // ─── Filtering ──────────────────────────────────────────────────────────────

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "" || selectedTags.length > 0;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Stories
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Explore our full collection of articles on technology, design,
              culture, science, and more.
            </p>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories…"
                className="w-full rounded-xl border border-gray-200 pl-12 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FILTER SECTION ───────────────────────────────────────────────── */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.label ? "" : cat.label
                  )
                }
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat.label
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tag chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-0.5 text-xs border transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
              >
                #{tag}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium ml-2 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. POSTS GRID ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500 mb-8">
          <span className="font-semibold text-gray-900">{filteredPosts.length}</span>{" "}
          {filteredPosts.length === 1 ? "story" : "stories"} found
        </p>

        {paginatedPosts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Filter className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
              No stories found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={scaleIn}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                {/* Card image / gradient */}
                <Link href={`/blog/post?slug=${post.slug}`} className="block">
                  <div
                    className={`relative h-48 bg-gradient-to-br ${
                      categoryGradient[post.category] ??
                      "from-indigo-400 to-indigo-600"
                    }`}
                  >
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold bg-white/90 text-indigo-600">
                      {post.category}
                    </span>
                    {/* Read time badge */}
                    <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                    {post.category}
                  </p>
                  <Link href={`/blog/post?slug=${post.slug}`}>
                    <h3 className="font-playfair text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {post.author.name}
                      </span>
                    </div>
                    <Link
                      href={`/blog/post?slug=${post.slug}`}
                      className="flex items-center gap-0.5 text-indigo-600 text-xs font-medium hover:text-indigo-800 transition-colors"
                    >
                      Read more
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── 4. PAGINATION ─────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* ── 5. NEWSLETTER STRIP ─────────────────────────────────────────────── */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-bold mb-3">
              Never Miss a Story
            </h2>
            <p className="text-indigo-200 mb-8">
              Join thousands of curious readers. Get the best articles delivered
              straight to your inbox every week.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">
                <span>🎉</span> You're subscribed!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email…"
                  required
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="bg-white text-indigo-600 font-semibold rounded-r-xl px-6 py-3 text-sm hover:bg-indigo-50 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
