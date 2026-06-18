"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerCategories = [
  { label: "Technology", href: "#categories" },
  { label: "Design", href: "#categories" },
  { label: "Culture", href: "#categories" },
  { label: "Science", href: "#categories" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#newsletter" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-playfair text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              {APP_DESCRIPTION}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {footerCategories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={getHref(cat.href)}
                    onClick={(e) => handleAnchorClick(e, cat.href)}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {APP_NAME} · {APP_TAGLINE}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Crafted with care for curious minds.
            </span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}