export const APP_NAME = "Inkwell";
export const APP_TAGLINE = "Stories Worth Reading";
export const APP_DESCRIPTION =
  "Thoughtful articles on technology, culture, design, and the human experience.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Featured", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Start Reading",
  href: "#featured",
};

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export const categories = [
  { label: "Technology", slug: "technology", color: "indigo" },
  { label: "Design", slug: "design", color: "violet" },
  { label: "Culture", slug: "culture", color: "rose" },
  { label: "Science", slug: "science", color: "emerald" },
  { label: "Business", slug: "business", color: "amber" },
  { label: "Lifestyle", slug: "lifestyle", color: "sky" },
];