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
      className="w-1/3 h-full bg-yellow-400"
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
      color: "bg-yellow-400",
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
      color: "bg-black",
      textColor: "text-white",
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
              Visual Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter"
          >
            Showcase properties<br />like never before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform ordinary listings into extraordinary cinematic experiences. Our AI-driven showcase engine delivers high-impact results every time.
          </motion.p>
        </div>
      </section>

      {/* Showcase Types Section */}
      <section className="py-20 px-4 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseTypes.map((showcase, index) => (
              <motion.div
                key={showcase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-10 md:p-12 h-full flex flex-col ${showcase.color} ${showcase.textColor || 'text-black'} shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group`}
              >
                <div className="absolute top-0 right-0 bg-black text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 z-10 flex gap-4">
                  <span>{showcase.views} VIEWS</span>
                  <span className="text-yellow-400">{showcase.engagement} ENGAGEMENT</span>
                </div>

                <div className="mb-8">
                  <HiFilm className={`w-12 h-12 ${showcase.color === 'bg-black' ? 'text-yellow-400' : 'text-black'}`} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-none">
                  {showcase.title}
                </h3>
                
                <p className={`mb-8 text-sm leading-relaxed opacity-80 ${showcase.color === 'bg-black' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {showcase.description}
                </p>

                <div className="mt-auto">
                  <button className={`w-full py-4 font-black transition-all text-sm tracking-widest uppercase ${showcase.color === 'bg-black' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-black text-white hover:bg-gray-800'}`}>
                    VIEW STYLE →
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
                  <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase leading-none">{feature.title}</h3>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Market Impact</h2>
            <div className="w-24 h-2 bg-yellow-400 mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="w-16 h-16 bg-white flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-400 transition-colors">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-5xl font-black mb-2 tracking-tighter text-yellow-400">{metric.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-4">{metric.label}</div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[200px] mx-auto">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
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
                  <h3 className="text-3xl font-black tracking-tighter uppercase">{style.name}</h3>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                    <HiArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-lg text-gray-500 font-medium mb-6 leading-relaxed">
                  {style.description}
                </p>
                <div className="bg-gray-100 p-6 flex flex-wrap gap-4">
                   {style.preview.split(',').map((tag, i) => (
                     <span key={i} className="text-[10px] font-black uppercase tracking-widest text-gray-400">{tag.trim()}</span>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 px-4 bg-[#f9f9f7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter">THE TRANSFORMATION</h2>
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
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Legacy Standard</span>
                  <p className="font-bold text-gray-400 grayscale">{comparison.before}</p>
                </div>
                <div className="bg-black p-8 group overflow-hidden relative">
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-4 block">Loomo Power</span>
                  <p className="font-bold text-white relative z-10">{comparison.after}</p>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-24 md:py-32 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to showcase your <span className="text-yellow-400">masterpiece?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the elite circle of agents who are using loomo to dominate their local markets. Faster, cheaper, and more cinematic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all">
                Get Started Free →
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all">
                Talk to an Expert
              </button>
            </div>

            <p className="mt-10 text-gray-500 text-sm font-medium uppercase tracking-widest">
              25 Credits Free • Ready in 60s • No CC Required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowCase;