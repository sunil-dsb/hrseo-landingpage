import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background-page to-background-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-primary-subtle px-4 py-1.5 text-sm font-medium text-primary">
            <span>🚀 New: Advanced Keyword Analytics</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
            Powerful SEO Tools for{' '}
            <span className="text-primary">Modern Marketers</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
            Discover high-performing keywords, analyze your competition, and optimize your content with HRSEO's comprehensive SEO toolkit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary-hover active:bg-primary-active transition-colors focus:outline-none focus:ring-2 focus:ring-ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              Get Started Free
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link 
              href="/demo"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-background-page px-8 py-3 text-base font-medium text-text-primary hover:bg-background-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-ring-info focus:ring-offset-2"
            >
              Watch Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-hover border-2 border-background-page"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary">
                Trusted by <strong className="text-text-primary">10,000+</strong> marketers
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-text-muted">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-secondary mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <span>•</span>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-subtle to-secondary-subtle" />
        </div>
      </div>
    </section>
  );
}
