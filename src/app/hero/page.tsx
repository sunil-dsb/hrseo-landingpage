"use client";

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import GradientSection from '@/components/sections/GradientSection';

export default function Hero2() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="HRSEO" 
                width={32} 
                height={32} 
                className="w-8 h-8" 
              />
              <span className="text-xl font-bold text-gray-900 font-brand">
                HRSEO
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/hero1" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Hero1
              </Link>
              <Link href="/hero" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Hero2
              </Link>
              <Link href="/hero3" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Hero3
              </Link>
              <Link href="/hero4" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Hero4
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="/signup"
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Animated Grid Background with Yellow/Orange */}
        <div className="absolute inset-0 -z-10">
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Animated Yellow/Orange Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slower"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slowest"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          {/* Orange Gradient at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[400px] pointer-events-none">
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'radial-gradient(ellipse 150% 100% at 50% 100%, #F15A29 0%, #FFA500 30%, transparent 70%)'
              }}
            ></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 text-yellow-400 text-sm font-medium shadow-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                AI-POWERED SEO PLATFORM
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-brand">
                  Revolutionize Your
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    SEO Strategy
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-modern">
                  Transform your digital presence with HRSEO's cutting-edge AI technology. 
                  <span className="text-yellow-400 font-semibold"> Track, analyze, and dominate </span>
                  search results like never before.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-lg font-bold rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 font-brand">
                  Get Started Free →
                </button>
                
                <button className="px-8 py-4 text-yellow-400 text-lg font-semibold border-2 border-yellow-500/50 rounded-lg hover:border-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-brand">
                  Watch Demo ▶
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-12 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50K+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Features Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-brand">
                Enterprise Features
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Built for scale with enterprise-grade security and support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-brand">Enterprise Security</h3>
                <p className="text-gray-600 text-sm">
                  SOC 2 compliant with advanced security features
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-brand">Team Management</h3>
                <p className="text-gray-600 text-sm">
                  Advanced user roles and permissions
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-brand">API Access</h3>
                <p className="text-gray-600 text-sm">
                  Full API access for custom integrations
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-brand">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated support team available 24/7
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-orange-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-brand">
                Ready to Scale Your SEO?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Join hundreds of enterprise companies already using HRSEO to dominate search results.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-semibold rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl font-brand">
                Schedule Enterprise Demo
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <GradientSection />
      <Footer />
    </div>
  );
}
