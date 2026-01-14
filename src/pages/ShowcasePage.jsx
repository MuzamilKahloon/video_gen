import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiCamera,
  HiFilm,
  HiSparkles,
  HiEye,
  HiTrendingUp,
  HiHeart,
  HiStar,
  HiLightningBolt,
  HiGlobe,
  HiCube,
  HiColorSwatch,
  HiAdjustments,
  HiCheckCircle,
  HiArrowRight,
  HiPlay,
  HiRefresh,
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

const ShowCase = () => {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const showcaseTypes = [
    {
      id: 1,
      title: "Luxury Residences",
      description: "Cinematic tours that highlight architectural excellence and premium finishes",
      views: "15K+",
      engagement: "94%",
      color: "style-yellow",
    },
    {
      id: 2,
      title: "Commercial Spaces",
      description: "Professional presentations that showcase business potential and location advantages",
      views: "8K+",
      engagement: "89%",
      color: "bg-gray-100",
    },
    {
      id: 3,
      title: "Development Projects",
      description: "Dynamic visualizations bringing future possibilities to life with stunning clarity",
      views: "12K+",
      engagement: "92%",
      color: "bg-[#F2F2ED]",
    },
  ];

  const visualFeatures = [
    {
      icon: HiCamera,
      title: "4K Quality Output",
      desc: "Crystal-clear resolution that captures every detail of your property in stunning clarity.",
      color: "from-violet-400 to-purple-500",
    },
    {
      icon: HiCube,
      title: "3D Camera Movements",
      desc: "Smooth, professional camera motions that create immersive viewing experiences.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: HiColorSwatch,
      title: "Color Grading",
      desc: "Professional color correction that makes properties look their absolute best.",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: HiAdjustments,
      title: "Smart Transitions",
      desc: "Seamless scene transitions that maintain viewer engagement throughout.",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const impactMetrics = [
    {
      icon: HiEye,
      value: "3.5x",
      label: "More Views",
      description: "Video listings receive significantly higher engagement",
    },
    {
      icon: HiTrendingUp,
      value: "67%",
      label: "Faster Sales",
      description: "Properties with videos sell faster than static listings",
    },
    {
      icon: HiHeart,
      value: "89%",
      label: "Buyer Preference",
      description: "Buyers prefer listings with professional video tours",
    },
    {
      icon: HiGlobe,
      value: "10x",
      label: "Reach Expansion",
      description: "Videos get shared more frequently across platforms",
    },
  ];

  const showcaseStyles = [
    {
      name: "Modern Minimalist",
      description: "Clean lines and subtle elegance for contemporary properties",
      preview: "Smooth pans, neutral tones, architectural focus",
    },
    {
      name: "Luxury Cinematic",
      description: "Dramatic movements and rich colors for high-end estates",
      preview: "Sweeping aerials, golden hour lighting, lifestyle emphasis",
    },
    {
      name: "Urban Dynamic",
      description: "Fast-paced energy perfect for city center properties",
      preview: "Quick cuts, vibrant colors, location highlights",
    },
    {
      name: "Natural Organic",
      description: "Warm and inviting for family homes and suburban properties",
      preview: "Gentle movements, natural light, comfort-focused",
    },
  ];

  const beforeAfter = [
    {
      before: "Static image galleries that buyers scroll past",
      after: "Engaging video tours that captivate and convert",
    },
    {
      before: "Hours of manual video editing and production",
      after: "Minutes of AI-powered automated video creation",
    },
    {
      before: "Limited reach with traditional marketing",
      after: "Viral potential across social media platforms",
    },
    {
      before: "Expensive professional videography services",
      after: "Affordable, unlimited video generation",
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
              Visual Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Showcase properties<br />like never before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base mb-8 max-w-2xl mx-auto"
            style={{ color: '#C5C2BF' }}
          >
            See how Loomo AI transforms real estate marketing with cinematic property videos that drive real results.
          </motion.p>
        </div>
      </section>

      {/* Showcase Types Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F2F2ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseTypes.map((showcase, index) => (
              <motion.div
                key={showcase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-10 md:p-12 h-full flex flex-col text-black shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                style={{ backgroundColor: showcase.color === 'style-yellow' ? '#E7F014' : showcase.color === 'bg-[#F2F2ED]' ? '#F2F2ED' : '#FFFFFF' }}
              >
                <div className="absolute top-0 right-0 font-black text-[10px] uppercase tracking-widest px-4 py-3 flex gap-4" style={{ backgroundColor: '#E7F014', color: 'black' }}>
                  <span>{showcase.views} VIEWS</span>
                  <span style={{ color: 'black' }}>{showcase.engagement} ENGAGEMENT</span>
                </div>

                <div className="mb-8">
                  <HiFilm className="w-12 h-12" style={{ color: 'black' }} />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-black">
                  {showcase.title}
                </h3>
                
                <p className="mb-8 font-medium text-sm leading-relaxed" style={{ color: '#C5C2BF' }}>
                  {showcase.description}
                </p>

                <div className="mt-auto">
                  <button 
                    className="w-full py-4 font-black transition-all text-black hover:opacity-80 text-sm tracking-widest uppercase"
                    style={{ 
                      backgroundColor: '#E7F014',
                    }}
                  >
                    VIEW SHOWCASE →
                  </button>
                </div>

                <AnimatedLine className="absolute bottom-0 left-0 right-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {visualFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-12 shadow-sm border border-gray-100 flex gap-8 items-start group hover:border-yellow-400/50 transition-colors"
                >
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#E7F014' }}>
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
                    <p className="text-gray-500">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 md:py-32 px-4" style={{ backgroundColor: '#F2F2ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-8 md:p-20 relative overflow-hidden border border-gray-100 rounded-3xl">
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-black mb-6 leading-tight">
                    Market impact that <span style={{ color: '#C5C2BF' }}>speaks for itself.</span>
                  </h2>
                  <p className="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-xl" style={{ color: '#C5C2BF' }}>
                    Videos created with Loomo don't just look good—they drive engagement, leads, and sales for real estate agents globally.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-black">400%</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-80" style={{ color: '#C5C2BF' }}>More Engagement</div>
                    </div>
                    <div>
                      <div className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-black">8.5x</div>
                      <div className="text-sm font-bold uppercase tracking-widest opacity-80" style={{ color: '#C5C2BF' }}>Higher Reach</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {impactMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center group"
                      >
                        <div className="w-16 h-16 bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-[#E7F014] transition-colors border border-gray-100">
                          <Icon className="w-8 h-8 text-black" />
                        </div>
                        <div className="text-2xl md:text-4xl font-bold mb-2" style={{ color: '#E7F014' }}>{metric.value}</div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-4">{metric.label}</div>
                        <p className="text-sm font-medium leading-relaxed max-w-[200px] mx-auto" style={{ color: '#C5C2BF' }}>
                          {metric.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Styles Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {showcaseStyles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-gray-100 pb-12 group hover:border-black transition-colors"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">{style.name}</h3>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center group-hover:bg-[#E7F014] transition-colors">
                    <HiArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="mb-6" style={{ color: '#C5C2BF' }}>
                  {style.description}
                </p>
                <div className="mt-auto pt-8" style={{ borderTop: '1px solid rgba(197, 194, 191, 0.2)' }}>
                   {style.preview.split(',').map((tag, i) => (
                     <span key={i} className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#C5C2BF' }}>{tag.trim()}</span>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F2F2ED' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">THE TRANSFORMATION</h2>
            <div className="w-24 h-2 bg-black mx-auto" />
          </div>

          <div className="space-y-4">
            {beforeAfter.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-px bg-gray-200 border-2 border-gray-200"
              >
                <div className="bg-white p-8">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-4 block" style={{ color: '#C5C2BF' }}>Legacy Standard</span>
                  <p className="font-bold grayscale" style={{ color: '#C5C2BF' }}>{comparison.before}</p>
                </div>
                <div className="bg-white p-8 group overflow-hidden relative">
                  <span className="text-[10px] font-black uppercase tracking-widest mb-4 block" style={{ color: '#E7F014' }}>Loomo Power</span>
                  <p className="font-bold text-black relative z-10">{comparison.after}</p>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" style={{ backgroundColor: '#E7F014' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-24 md:py-32 px-4 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Ready to showcase your <span style={{ color: '#E7F014' }}>masterpiece?</span>
            </h2>
            <p className="text-base mb-8 max-w-2xl mx-auto" style={{ color: '#C5C2BF' }}>
              Join the elite circle of agents who are using loomo to dominate their local markets. Faster, cheaper, and more cinematic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-5 text-black font-bold transition-all hover:opacity-90" style={{ backgroundColor: '#E7F014' }}>
                Get Started Free →
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-black/20 text-black font-bold hover:bg-black hover:text-white transition-all">
                Talk to an Expert
              </button>
            </div>

            <p className="mt-10 text-sm font-medium uppercase tracking-widest" style={{ color: '#C5C2BF' }}>
              25 Credits Free • Ready in 60s • No CC Required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowCase;