import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiTemplate,
  HiSparkles,
  HiLightningBolt,
  HiClock,
  HiStar,
  HiEye,
  HiHeart,
  HiDownload,
  HiPlay,
  HiCheckCircle,
  HiArrowRight,
  HiFilm,
  HiColorSwatch,
  HiAdjustments,
  HiTrendingUp,
  HiCube,
  HiRefresh,
  HiFilter,
  HiBeaker,
  HiUsers,
} from "react-icons/hi";

const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full"
      style={{ backgroundColor: '#E7F014' }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [activeFilter, setActiveFilter] = useState("popular");

  const categories = [
    { id: "all", name: "All Templates", icon: HiTemplate, count: 12 },
    { id: "luxury", name: "Luxury", icon: HiStar, count: 4 },
    { id: "modern", name: "Modern", icon: HiCube, count: 3 },
    { id: "cinematic", name: "Cinematic", icon: HiFilm, count: 3 },
    { id: "dynamic", name: "Dynamic", icon: HiLightningBolt, count: 2 },
  ];

  const templates = [
    {
      id: 1,
      name: "Golden Hour Estate",
      category: "luxury",
      duration: "12s",
      credits: 2,
      popularity: 98,
      views: "24.5K",
      color: "bg-yellow-400",
      description: "Warm, luxurious transitions with golden lighting effects",
      features: ["4K Quality", "Smooth Pans", "Color Grading"],
      style: "Elegant & Timeless",
    },
    {
      id: 2,
      name: "Urban Pulse",
      category: "dynamic",
      duration: "8s",
      credits: 1,
      popularity: 95,
      views: "18.2K",
      color: "bg-gray-100",
      description: "Fast-paced energy perfect for city properties",
      features: ["Quick Cuts", "Dynamic Zoom", "Urban Vibe"],
      style: "Energetic & Bold",
    },
    {
      id: 3,
      name: "Minimalist Elegance",
      category: "modern",
      duration: "10s",
      credits: 2,
      popularity: 92,
      views: "21.8K",
      color: "bg-[#F2F2ED]",
      description: "Clean lines and subtle sophistication",
      features: ["Minimal Design", "Smooth Motion", "Professional"],
      style: "Energetic & Bold",
    },
    {
      id: 4,
      name: "Fast-Paced Action",
      category: "social",
      duration: "15s",
      credits: 3,
      popularity: 85,
      views: "15.4K",
      color: "style-yellow",
      description: "Keep attention high with rapid cuts",
      features: ["Quick Cuts", "Modern Music", "High Energy"],
      style: "Corporate & Clean",
    },
    {
      id: 5,
      name: "Real Estate Focus",
      category: "classic",
      duration: "20s",
      credits: 4,
      popularity: 95,
      views: "28.1K",
      color: "bg-white",
      description: "Highlight every detail perfectly",
      features: ["Detail Focused", "Slow Pans", "Informative"],
      style: "Calm & Premium",
    },
    {
      id: 6,
      name: "Prestige Showcase",
      category: "luxury",
      duration: "12s",
      credits: 2,
      popularity: 94,
      views: "28.9K",
      color: "bg-black",
      textColor: "text-white",
      description: "Premium presentation for high-end estates",
      features: ["Luxury Feel", "Premium Effects", "Elegant Pacing"],
      style: "Prestigious & Refined",
    },
    {
      id: 7,
      name: "Velocity Rush",
      category: "dynamic",
      duration: "7s",
      credits: 1,
      popularity: 91,
      views: "19.3K",
      color: "bg-yellow-400",
      description: "High-energy showcase with rapid transitions",
      features: ["Fast Pace", "Bold Cuts", "Energetic"],
      style: "Bold & Exciting",
    },
    {
      id: 8,
      name: "Architectural Vision",
      category: "modern",
      duration: "11s",
      credits: 2,
      popularity: 93,
      views: "23.1K",
      color: "bg-gray-100",
      description: "Focus on structure and design excellence",
      features: ["Architectural Focus", "Clean Lines", "Professional"],
      style: "Architectural & Modern",
    },
    {
      id: 9,
      name: "Sunset Serenity",
      category: "cinematic",
      duration: "14s",
      credits: 3,
      popularity: 96,
      views: "26.7K",
      color: "bg-black",
      textColor: "text-white",
      description: "Breathtaking golden hour cinematography",
      features: ["Golden Hour", "Slow Motion", "Atmospheric"],
      style: "Serene & Beautiful",
    },
    {
      id: 10,
      name: "Crystal Clear",
      category: "luxury",
      duration: "13s",
      credits: 2,
      popularity: 90,
      views: "17.4K",
      color: "bg-yellow-400",
      description: "Pristine quality with crystal-clear visuals",
      features: ["Ultra HD", "Perfect Clarity", "Premium"],
      style: "Clear & Luxurious",
    },
    {
      id: 11,
      name: "Epic Panorama",
      category: "cinematic",
      duration: "16s",
      credits: 3,
      popularity: 99,
      views: "35.2K",
      color: "bg-gray-100",
      description: "Sweeping wide shots with epic scope",
      features: ["Wide Angle", "Sweeping", "Grand Scale"],
      style: "Epic & Majestic",
    },
    {
      id: 12,
      name: "Modern Luxe",
      category: "luxury",
      duration: "11s",
      credits: 2,
      popularity: 88,
      views: "16.9K",
      color: "bg-black",
      textColor: "text-white",
      description: "Contemporary luxury with refined touches",
      features: ["Modern Luxury", "Refined", "Stylish"],
      style: "Contemporary & Chic",
    },
  ];

  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "all" || template.category === selectedCategory
  );

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (activeFilter === "popular") return b.popularity - a.popularity;
    if (activeFilter === "newest") return b.id - a.id;
    if (activeFilter === "duration") return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  const templateStats = [
    { label: "Total Templates", value: "12+", icon: HiTemplate },
    { label: "Average Rating", value: "4.9", icon: HiStar },
    { label: "Total Views", value: "278K+", icon: HiEye },
    { label: "Active Users", value: "2,500+", icon: HiUsers },
  ];

  const features = [
    {
      icon: HiAdjustments,
      title: "Fully Customizable",
      description: "Adjust every aspect to match your vision perfectly",
    },
    {
      icon: HiLightningBolt,
      title: "Instant Generation",
      description: "Create professional videos in seconds, not hours",
    },
    {
      icon: HiColorSwatch,
      title: "Color Grading",
      description: "Professional color correction for stunning results",
    },
    {
      icon: HiCube,
      title: "3D Motion Effects",
      description: "Advanced camera movements and transitions",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white text-black" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <span className="text-black font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-2" style={{ backgroundColor: '#E7F014' }}>
              Premium Library
            </span>
          </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Cinematic styles<br />for every property
            </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base mb-8 max-w-2xl mx-auto text-black opacity-60"
          >
            Crafted for maximum impact and conversion. Professional templates designed specifically for the modern agent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-gray-100"
          >
            {templateStats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl md:text-4xl font-bold text-black group-hover:text-[#E7F014] transition-colors">{stat.value}</div>
                <div className="text-[10px] font-bold text-black opacity-40 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#F2F2ED] p-4 md:p-6 flex flex-wrap justify-center gap-2 md:gap-4 rounded-xl border border-gray-100">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-bold text-sm tracking-tight transition-all ${
                    selectedCategory === category.id
                      ? "text-black"
                      : "text-black/60 hover:bg-white/10"
                  }`}
                  style={{ backgroundColor: selectedCategory === category.id ? '#E7F014' : 'transparent' }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name.toUpperCase()}</span>
                  <span className={`text-[10px] ${selectedCategory === category.id ? 'text-black opacity-60' : 'text-black opacity-30'}`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-black opacity-40">Sort By</span>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {["popular", "newest", "duration"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{ 
                      backgroundColor: activeFilter === filter ? '#E7F014' : 'transparent',
                    }}
                    className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-md ${activeFilter === filter ? 'text-black shadow-sm' : 'text-black opacity-40'}`}
                  >
                    {filter.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs font-bold text-black opacity-40 tracking-tight uppercase">
              {sortedTemplates.length} Templates Available
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F2F2ED' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  className={`relative p-10 md:p-12 h-full flex flex-col text-black shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                  style={{ backgroundColor: template.color === 'style-yellow' ? '#E7F014' : template.color === 'bg-[#F2F2ED]' ? '#F2F2ED' : '#FFFFFF' }}
                >
                  {/* Card Header/Badge */}
                  <div className="absolute top-0 right-0 font-black text-[10px] uppercase tracking-widest px-4 py-3" style={{ backgroundColor: '#E7F014', color: 'black' }}>
                    {template.style}
                  </div>

                  {/* Visual Preview Placeholder */}
                  <div className="relative aspect-video overflow-hidden bg-black/5">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-9xl font-black opacity-10 select-none tracking-tighter">
                        {String(template.id).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
                    >
                      <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                        <HiPlay className="w-8 h-8 ml-1" />
                      </div>
                    </motion.div>
                    
                    <div className="absolute bottom-4 left-6 flex gap-4 text-xs font-bold text-black opacity-40">
                       <span className="flex items-center gap-1"><HiEye className="w-4 h-4"/> {template.views}</span>
                       <span className="flex items-center gap-1 uppercase tracking-tighter">{template.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-black">
                      {template.name}
                    </h3>
                    
                    <p className="mb-8 font-medium text-sm leading-relaxed text-black opacity-60">
                      {template.description}
                    </p>

                    <div className="mt-auto pt-8" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {template.features.map((feature) => (
                          <span key={feature} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/5 text-black">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <button 
                        className="w-full py-4 font-black transition-all text-black hover:opacity-80"
                        style={{ 
                          backgroundColor: '#E7F014'
                        }}
                      >
                        PREVIEW TEMPLATE →
                      </button>
                    </div>
                  </div>

                  <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-10 shadow-sm border border-gray-100 text-center hover:border-yellow-400/50 transition-colors group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform" style={{ backgroundColor: '#E7F014' }}>
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-black">{feature.title}</h3>
                  <p className="text-black opacity-60">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-24 md:py-32 px-4" style={{ backgroundColor: '#F2F2ED' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Don't see a <span style={{ color: '#E7F014' }}>perfect match?</span>
            </h2>
            <p className="text-base mb-8 max-w-2xl mx-auto text-black opacity-60">
              Our team creates custom templates for enterprise clients. Let's build something unique for your brand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-5 text-black font-bold transition-all shadow-xl hover:-translate-y-1" style={{ backgroundColor: '#E7F014' }}>
                Contact Custom Team →
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border-2 text-black font-bold hover:opacity-80 transition-all" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                View All Features
              </button>
            </div>

            <p className="mt-10 font-medium text-sm uppercase tracking-widest text-black opacity-40">
              Custom Branding • Unique Animations • Dedicated Support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Templates;