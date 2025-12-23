'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-page/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-text-primary hover:text-primary transition-colors"
              aria-label="HRSEO homepage"
            >
              HRSEO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:items-center md:space-x-8">
            <li>
              <Link 
                href="/features" 
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                href="/pricing" 
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              href="/login" 
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring-primary focus:ring-offset-2 shadow-focus-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-text-secondary hover:bg-background-subtle rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/features" 
                  className="block text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="block text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="block text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className="pt-4 space-y-2">
                <Link 
                  href="/login" 
                  className="block w-full text-center py-2 text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="block w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
