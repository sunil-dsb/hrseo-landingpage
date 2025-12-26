import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.png"
                    alt="HRSEO Logo"
                    fill
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src="/logo-white.png"
                    alt="HRSEO Logo"
                    fill
                    className="object-contain hidden dark:block"
                  />
                </div>
                <span className="text-xl font-bold text-[#F15A29]">HRSEO</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Professional SEO tools for keyword research and modern SEO needs.
                Turn information into advantage.
              </p>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-2">CHANGE LOCATION</p>
                <button className="text-sm text-foreground hover:text-[#F15A29] transition-colors flex items-center gap-1">
                  Global
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Services Section */}
            <nav aria-label="Services">
              <h3 className="font-semibold text-foreground mb-6 text-sm tracking-wide uppercase">Services</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/keyword-research" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Keyword Research
                  </Link>
                </li>
                <li>
                  <Link href="/competitor-analysis" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Competitor Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/rank-tracking" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Rank Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/backlink-analysis" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Backlink Analysis
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Company Section */}
            <nav aria-label="Company">
              <h3 className="font-semibold text-foreground mb-6 text-sm tracking-wide uppercase">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/impact-report" className="text-sm text-muted-foreground hover:text-[#F15A29] transition-colors">
                    Impact Report
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Newsletter & Social Section */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm tracking-wide uppercase">
                  Subscribe to Our Newsletter
                </h3>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#F15A29] focus:border-transparent"
                  />
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-[#F15A29] rounded-md hover:bg-[#D14924] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4 text-sm tracking-wide uppercase">
                  Get in Touch with Us
                </h3>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://instagram.com/hrseo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#F15A29] transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <span className="text-xs font-medium">INSTAGRAM</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/hrseo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#F15A29] transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <span className="text-xs font-medium">LINKEDIN</span>
                  </a>
                  <a
                    href="https://tiktok.com/@hrseo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#F15A29] transition-colors"
                    aria-label="Follow us on TikTok"
                  >
                    <span className="text-xs font-medium">TIKTOK</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orange Bottom Bar - Simple with Grid Lines */}
      <div className="bg-[#F15A29] text-white relative overflow-hidden">
        {/* Full grid lines overlay */}
        <div className="absolute inset-0 text-white/10 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center py-4 min-h-[70px]">
            {/* Centered HRSEO */}
            <span className="text-2xl font-black tracking-tight">HRSEO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
