import Link from "next/link";
import Image from "next/image";

export default function FooterHero1() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Navigation and Email */}
        <div className="py-16 border-b border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            {/* Left - Navigation */}
            <nav className="flex flex-wrap gap-8 md:gap-12">
              {["Key Features", "Explore", "Solutions", "Tools"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right - Email Contact */}
            <div className="relative group">
              <a
                href="mailto:hello@hrseo.io"
                className="text-2xl md:text-3xl text-white transition-all duration-300 relative inline-flex items-center"
                aria-label="Contact us via email"
              >
                <span>hello</span>
                <span className="relative inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9">
                  <span className="absolute transition-all duration-500 group-hover:opacity-0 group-hover:scale-0 group-hover:rotate-180">
                    @
                  </span>
                  <span className="absolute opacity-0 scale-0 -rotate-180 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0">
                    <Image
                      src="/logo-white.png"
                      alt="HRSEO"
                      width={18}
                      height={18}
                      className="w-8 h-8"
                    />
                  </span>
                </span>
                <span>hrseo.io</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15A29] group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Product */}
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Product</h3>
              <ul className="space-y-3">
                {["Functions", "Business models", "Pricing", "Integration", "API"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Resources</h3>
              <ul className="space-y-3">
                {["Documentation", "Guides", "Blog", "Medium"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-lg font-medium mb-6">Company</h3>
              <ul className="space-y-3">
                {["About", "Jobs", "Privacy Policy", "Terms of service"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end space-y-8 lg:space-y-0">
            {/* Left - Brand Name */}
            <div>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                HRSEO
              </h2>
            </div>

            {/* Right - Made by and Logo */}
            <div className="flex items-center lg:items-end space-y-4 gap-4">
              <p className="text-gray-400 text-sm">By Hazlo Rentable</p>
              <a
                href="https://hrseo.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/logo.png"
                  alt="HRSEO"
                  width={32}
                  height={32}
                  className="w-10 h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
