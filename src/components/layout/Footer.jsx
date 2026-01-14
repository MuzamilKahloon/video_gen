import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Templates", href: "/templates" },
        { name: "Showcase", href: "/showcase" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Mission", href: "/mission" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Docs", href: "/docs" },
        { name: "API", href: "/api" },
        { name: "Status", href: "/status" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "#" },
    { icon: FaLinkedin, href: "#" },
    { icon: FaGithub, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  return (
    <footer className="py-12 md:py-20 border-t" style={{ backgroundColor: '#F2F2ED', borderTopColor: 'rgba(197, 194, 191, 0.2)', fontFamily: "'Neue Montreal', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Logo Section */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <Link to="/" className="group flex items-center gap-1">
              <div className="flex items-center">
                <span className="text-2xl font-[900] tracking-tighter text-black">l</span>
                <div className="relative w-4 h-4 flex items-center justify-center mx-[1px]">
                  <motion.div 
                    className="w-full h-full rounded-full border-[3px] border-black"
                    animate={{ 
                      borderRadius: ["50%", "30%", "50%"],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#E7F014' }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="relative w-4 h-4 flex items-center justify-center mx-[1px]">
                  <motion.div 
                    className="w-full h-full rounded-full border-[3px] border-black"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#E7F014' }} />
                </div>
                <span className="text-2xl font-[900] tracking-tighter text-black">mo</span>
              </div>
            </Link>
            
            <p className="text-base md:text-lg leading-relaxed max-w-sm text-black opacity-60">
              The fastest way to create property videos. Period. Just paste your link and let AI do the rest.
            </p>
            
            <div className="flex items-center gap-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="text-black transition-colors duration-300 hover:opacity-100 opacity-60"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-4 md:space-y-6">
                <h3 className="text-xs font-bold text-black tracking-widest uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        to={link.href}
                        className="group flex items-center gap-1 transition-all duration-200 text-black hover:opacity-100 opacity-60"
                      >
                        <span className="text-sm font-semibold">{link.name}</span>
                        <HiChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="mt-16 md:mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left" style={{ borderTopColor: 'rgba(0, 0, 0, 0.1)' }}>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-xs font-bold tracking-wider uppercase text-black opacity-60">
            <span>© 2025 loomo AI</span>
            <div className="hidden md:block h-3 w-[1px] bg-black/10" />
            <a href="/status" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Systems Online</span>
            </a>
          </div>

          <p className="text-[10px] font-bold tracking-[0.2em] uppercase italic text-black opacity-60">
            Made with love for Real Estate Agents
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


