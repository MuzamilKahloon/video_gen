import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiLightningBolt,
  HiClock,
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiChartBar,
  HiShieldCheck,
  HiCog,
  HiDownload,
  HiGlobe,
  HiPhotograph,
} from "react-icons/hi";

const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full bg-yellow-400"
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const FeaturesPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const mainFeatures = [
    {
      icon: HiLightningBolt,
      title: "AI-Powered Generation",
      description:
        "State-of-the-art AI models from Luma, Runway, and Sora create stunning cinematic videos from your images in seconds.",
      benefits: [
        "Multiple AI engines for best results",
        "Automatic fallback for reliability",
        "Continuous quality improvements",
      ],
      color: "bg-yellow-400",
    },
    {
      icon: HiPhotograph,
      title: "Automatic Image Scraping",
      description:
        "Just paste a realestate.com.au URL and we automatically extract all property images for instant processing.",
      benefits: [
        "No manual image uploads needed",
        "Batch processing support",
        "Smart image selection & ordering",
      ],
      color: "bg-black",
      textColor: "text-white",
    },
    {
      icon: HiSparkles,
      title: "Professional Templates",
      description:
        "Choose from 5+ expertly crafted templates designed specifically for real estate showcase videos.",
      benefits: [
        "Cinematic camera movements",
        "Smooth transitions & effects",
        "Fully customizable styles",
      ],
      color: "bg-gray-100",
    },
    {
      icon: HiClock,
      title: "Real-Time Processing",
      description:
        "Watch your video come to life with live progress updates, status notifications, and instant previews.",
      benefits: [
        "Socket.io real-time updates",
        "Live progress tracking",
        "Instant notification system",
      ],
      color: "bg-gray-100",
    },
    {
      icon: HiDownload,
      title: "Multiple Export Options",
      description:
        "Export in various formats and resolutions to suit any platform, from social media to 4K presentations.",
      benefits: [
        "720p, 1080p, and 4K quality",
        "MP4, WebM, and GIF formats",
        "16:9, 9:16, 1:1 aspect ratios",
      ],
      color: "bg-yellow-400",
    },
    {
      icon: HiShieldCheck,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption, secure cloud storage, and full compliance standards.",
      benefits: ["SSL encryption standard", "Secure AWS S3 storage", "GDPR compliant system"],
      color: "bg-black",
      textColor: "text-white",
    },
  ];

  const additionalFeatures = [
    { icon: HiCog, title: "Custom Watermarks", description: "Add your brand logo and maintain identity across all videos" },
    { icon: HiChartBar, title: "Analytics Dashboard", description: "Track performance metrics and engagement statistics" },
    { icon: HiGlobe, title: "CDN Delivery", description: "Lightning-fast global content delivery network" },
    { icon: HiLightningBolt, title: "Priority Queue", description: "Get faster processing with premium priority access" },
  ];

  return (
    <div className="w-full overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-white text-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <span className="bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-2">
              The Loomo Feature Set
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter"
          >
            Built for agents who<br />value their time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We've combined elite AI generation with a workflow so simple, it feels like cheating. Professional videos in under 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all shadow-xl hover:-translate-y-1">
              Start Free Today →
            </button>
            <button className="w-full sm:w-auto px-10 py-5 border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 md:py-32 px-4 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight tracking-tight mb-6 md:mb-0">
              The fastest way to create property videos. Period.
            </h2>
            <div className="bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-wider px-4 py-2">
              Core Capabilities
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`relative p-10 md:p-12 h-full flex flex-col ${feature.color} ${feature.textColor || 'text-black'} shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className="mb-8">
                  <feature.icon className={`w-12 h-12 ${feature.color === 'bg-black' ? 'text-yellow-400' : 'text-black'}`} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight leading-tight">
                  {feature.title}
                </h3>
                
                <p className={`mb-8 opacity-80 leading-relaxed ${feature.color === 'bg-black' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>

                <div className="mt-auto pt-8 border-t border-black/10">
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-3 text-sm font-bold opacity-90 tracking-tight">
                        <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-400 p-8 md:p-20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                    Why waste weeks when you can have it in minutes?
                  </h2>
                  <p className="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-xl">
                    Traditional video production is expensive, slow, and tedious. loomo is built to disrupt the old way.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">100x</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-80">Faster Delivery</div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">90%</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-80">Cost Reduction</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="bg-white/40 backdrop-blur-md p-8 shadow-xl">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-black/40">The Legacy Way</h4>
                    <p className="text-xl md:text-2xl font-bold text-black/60 line-through mb-2">2 Weeks Production</p>
                    <p className="text-xl md:text-2xl font-bold text-black/60 line-through">$2,000+ Per Video</p>
                  </div>
                  <div className="bg-black p-8 shadow-2xl scale-105">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-yellow-400">The loomo Way</h4>
                    <p className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter">60 Seconds</p>
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">$10/Video or Less</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white opacity-10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Bento Grid Additional Features */}
      <section className="py-20 md:py-32 px-4 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tighter">Even more capabilities</h2>
            <div className="w-24 h-2 bg-yellow-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-10 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center mb-8">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-none tracking-tighter">
                READY TO<br />START<br />SAVING TIME?
              </h2>
              <div className="flex justify-center md:justify-start">
                <button className="bg-yellow-400 text-black font-black px-10 py-5 hover:bg-yellow-500 transition shadow-2xl hover:-translate-y-1">
                  CREATE A VIDEO →
                </button>
              </div>
              <p className="mt-8 text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                25 Credits Free • No CC Required • 60s Setup
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[600px] bg-black shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1200&fit=crop"
                alt="Modern Luxury Home"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-yellow-400/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
