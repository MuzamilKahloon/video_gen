import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="w-full overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      

      {/* Hero Section */}
      <section className="bg-white pt-24 md:pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight"
          >
            Property video in<br />under 60 seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-base mb-1"
          >
            No editing. No videographers. No learning curve.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-base mb-8"
          >
            Just paste your listing link.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 flex-wrap justify-center mb-6"
          >
            <button className="bg-yellow-400 text-black font-medium text-sm px-5 py-2.5 hover:bg-yellow-500 transition">
              Create a video →
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 font-medium text-sm px-5 py-2.5 hover:bg-gray-50 transition flex items-center gap-2">
              ▶ See how it works
            </button>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 text-xs"
          >
            Trusted by 2,000+ agents worldwide
          </motion.p>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
            style={{ aspectRatio: '16/9' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=675&fit=crop" 
              alt="Property Interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-gray-800 border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Cards Section */}
      <section className="bg-[#f5f5f0] py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-black max-w-2xl leading-tight tracking-tight mb-4 md:mb-0">
              The fastest way to create property videos. Period.
            </h2>
            <button className="bg-yellow-400 text-black font-semibold text-[10px] uppercase tracking-wider px-4 py-2 whitespace-nowrap md:ml-4 mb-0 md:mb-1">
              The easiest platform, ever.
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Paste your listing link</h3>
              <div className="bg-gray-100 rounded-lg h-48 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-4">ZILLOW.COM • RIGHTMOVE.COM</div>
                  <div className="flex items-center justify-center gap-2">
                    <input 
                      type="text" 
                      placeholder="paste a link..." 
                      className="bg-white border border-gray-300 px-4 py-2 rounded text-sm"
                    />
                    <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm">
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Copy the URL from any property listing site. That's all we need.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Loomo builds your video</h3>
              <div className="bg-gray-100 rounded-lg h-48 mb-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" 
                  alt="Property" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600">
                Our software extracts photos and creates a polished property video automatically.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Download and post</h3>
              <div className="bg-gray-100 rounded-lg h-48 mb-6"></div>
              <p className="text-gray-600">
                Get your video in under 60 seconds. Share it everywhere.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-yellow-400 rounded-2xl p-6 md:p-10"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-100 rounded-xl p-6 md:p-8 text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">20k+</div>
                  <div className="text-lg text-gray-700">
                    Hours reclaimed for<br />agents across the globe.
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-6 md:p-8 text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">1M+</div>
                  <div className="text-base md:text-lg text-gray-700">
                    Dollars eliminated from<br className="hidden md:block" />unnecessary production costs
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-6 md:p-8 text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">0</div>
                  <div className="text-base md:text-lg text-gray-700">
                    Friction from listing<br className="hidden md:block" />to video
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-6 md:p-8 text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">20k+</div>
                  <div className="text-base md:text-lg text-gray-700">
                    hours reclaimed for<br className="hidden md:block" />agents across the globe.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-[#f5f5f0] py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16">
            Loomo vs The Old Way
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-10"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-400">The Old Way</h3>
              <div className="space-y-4">
                {[
                  'Book a videographer',
                  'Coordinate schedules',
                  '$500+ per video',
                  'Weeks to deliver',
                  'Vendor coordination',
                  'Dependent on weather and daylight',
                  'Inconsistent output quality',
                  'Slow to scale across multiple listings',
                  'Not practical for rentals or lower value campaigns',
                  'Manual process from start to finish'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-1 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black rounded-2xl p-6 md:p-10 relative"
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span className="bg-yellow-400 text-black text-[10px] font-bold px-3 py-1">
                  The easiest platform, ever.
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">loomo</h3>
              <div className="space-y-4">
                {[
                  'Paste a link',
                  'Instant video',
                  'Low, predictable cost',
                  'Under 60 seconds',
                  'Uses existing listing photos',
                  'Works anytime in any conditions',
                  'Consistent output every time',
                  'Works for sales and leasing',
                  'Reusable across portals and socials',
                  'Automated end to end'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-white mt-1 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 md:py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 md:mb-10 text-center md:text-left gap-4">
            <h2 className="text-2xl md:text-4xl font-bold max-w-md">
              The fastest growing<br />agents use Loomo
            </h2>
            <p className="text-gray-600 text-sm max-w-sm md:text-right">
              Our software extracts photos and creates a<br className="hidden md:block" />polished property video automatically.
            </p>
          </div>
          
          <div className="relative">
            <motion.div 
              animate={{ x: [0, -1200] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 w-[320px] h-[280px] flex flex-col justify-between flex-shrink-0 shadow-sm">
                  <p className="text-base font-semibold leading-relaxed">
                    {i % 3 === 0 && '"We no longer lose time scheduling and revising videos"'}
                    {i % 3 === 1 && '"No longer requires a decision on every property"'}
                    {i % 3 === 2 && '"Now every property gets a complete video"'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-sm">Huseyin Ozselishitoglu</div>
                        <div className="text-gray-500 text-xs">Sales Agent</div>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      belle
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-12 md:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="px-4 md:pl-12 text-center md:text-left"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight">
                Create your listing<br />video in under<br />60 seconds
              </h2>
              
              <div className="flex justify-center md:justify-start">
                <button className="bg-yellow-400 text-black font-semibold px-6 py-3 mb-6 md:mb-8 hover:bg-yellow-500 transition flex items-center gap-2">
                  Create a video →
                </button>
              </div>
              
              <p className="text-gray-500 mt-4 leading-relaxed">
                No editing. No videographers. No learning curve.<br />
                Just paste your listing link.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[300px] md:h-[500px] overflow-hidden shadow-2xl mt-8 md:mt-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop" 
                alt="Beautiful Home Interior" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;