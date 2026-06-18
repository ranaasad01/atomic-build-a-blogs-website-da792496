"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-playfair text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  pathname === link.href && !link.href.startsWith("#")
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10"
                >
                  {link.label}
                </motion.span>
                <span className="absolute inset-0 rounded-lg bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={getHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden md:inline-flex"
            >
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                {navCTA.label}
              </motion.span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => {
                      handleAnchorClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
                className="mt-2 pt-2 border-t border-gray-100"
              >
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => {
                    handleAnchorClick(e, navCTA.href);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                >
                  {navCTA.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}