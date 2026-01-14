// client/src/components/layout/AuthLayout.jsx
import {Outlet, Link} from "react-router-dom";
import {motion} from "framer-motion";
import {HiCheckCircle, HiVideoCamera, HiSparkles, HiLightningBolt, HiTemplate, HiArrowRight} from "react-icons/hi";

// Color palette matching Loomo - Premium High-Contrast
const colors = {
  primary: "bg-[#E7F014]",
  primaryHover: "bg-[#E7F014]/90",
  secondary: "bg-black",
  surface: "bg-white",
  border: "border-gray-100",
  text: {
    primary: "text-black",
    secondary: "text-gray-500",
    accent: "text-[#E7F014]"
  }
};

const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[2px] bg-gray-100 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full"
      style={{ backgroundColor: '#E7F014' }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const AuthLayout = () => {
  const features = [
    { icon: HiSparkles, text: "Elite AI Generation", sub: "Proprietary models for cinematic results" },
    { icon: HiTemplate, text: "Premium Templates", sub: "Expertly crafted for real estate agents" },
    { icon: HiLightningBolt, text: "Ultra Fast Rendering", sub: "Ready in under 60 seconds" },
  ];

  return (
    <div className="min-h-screen bg-white flex relative overflow-hidden" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      {/* Left Side - Branding & Visual Impact */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-[#F2F2ED]">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(231,240,20,0.1),_transparent_70%)]" />

        {/* Brand Header */}
        <motion.div 
          className="absolute top-12 left-12 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center">
            <span className="text-3xl font-[900] tracking-tight text-black">l</span>
            <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
              <motion.div 
                className="w-full h-full rounded-full border-[4px] border-black"
                animate={{ 
                  borderRadius: ["50%", "30%", "50%"],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#E7F014' }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
              <motion.div 
                className="w-full h-full rounded-full border-[4px] border-black"
                animate={{ 
                  rotate: 360
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#E7F014' }} />
            </div>
            <span className="text-3xl font-[900] tracking-tight text-black">mo</span>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block text-black font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 mb-8" style={{ backgroundColor: '#E7F014' }}>
              The Real Estate AI Standard
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Build your legacy<br />
              <span style={{ color: '#C5C2BF' }}>frame by frame.</span>
            </h1>

            <p className="text-base mb-8" style={{ color: '#C5C2BF' }}>
              Join the elite circle of agents using loomo to dominate their local markets with high-impact AI property films.
            </p>

            <div className="space-y-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:bg-[#E7F014] transition-all duration-300 shadow-sm border border-gray-100">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-black font-bold text-lg">{feature.text}</h3>
                    <p className="text-sm" style={{ color: '#C5C2BF' }}>{feature.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Brand Credit */}
        <div className="absolute bottom-12 left-12 z-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: '#C5C2BF', opacity: 0.6 }}>
            © 2024 Loomo AI • All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-12">
            <div className="flex items-center">
              <span className="text-3xl font-[900] tracking-tight text-black">l</span>
              <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
                <motion.div 
                  className="w-full h-full rounded-full border-[4px] border-black"
                  animate={{ 
                    borderRadius: ["50%", "30%", "50%"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#E7F014' }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
                <motion.div 
                  className="w-full h-full rounded-full border-[4px] border-black"
                  animate={{ 
                    rotate: 360
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#E7F014' }} />
              </div>
              <span className="text-3xl font-[900] tracking-tight text-black">mo</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-4"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
