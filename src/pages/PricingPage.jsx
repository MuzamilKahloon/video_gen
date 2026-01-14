import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiX,
  HiLightningBolt,
  HiSparkles,
  HiArrowRight,
  HiCheckCircle,
  HiStar,
  HiChartBar,
  HiUsers,
  HiClock,
  HiShieldCheck,
  HiGlobe,
  HiPhotograph,
  HiCog,
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

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      credits: 25,
      popular: false,
      icon: HiSparkles,
      description: "Perfect for getting started with AI video generation.",
      color: "bg-gray-100",
      features: [
        "25 credits per month",
        "Luma AI Engine",
        "1080p video quality",
        "3 basic templates",
        "Custom watermark",
        "Email support (48h)",
      ],
    },
    {
      id: "creator",
      name: "Creator",
      price: 79,
      credits: 70,
      popular: true,
      icon: HiLightningBolt,
      description: "The most popular choice for professional agents.",
      color: "style-yellow",
      features: [
        "70 credits per month",
        "Luma + Backup AI",
        "1080p video quality",
        "All 5 templates",
        "Priority processing",
        "Background music library",
        "Custom watermark",
        "Priority support (24h)",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: 149,
      credits: 160,
      popular: false,
      icon: HiStar,
      description: "For high-volume users needing maximum quality.",
      color: "bg-[#F2F2ED]",
      features: [
        "160 credits per month",
        "Veo 3 AI Engine",
        "4K video quality",
        "All templates + Custom",
        "Priority processing",
        "Advanced enhancements",
        "Batch processing (10 videos)",
        "Priority support (12h)",
      ],
    },
  ];

  const faqs = [
    {
      question: "How do credits work?",
      answer: "Each video generation consumes credits based on duration and template complexity. Basic 8-second videos cost 1 credit, while premium templates may cost more. You can see the cost before generating.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time with no penalties. Your plan remains active until the end of the billing period.",
    },
    {
      question: "What happens to unused credits?",
      answer: "Credits roll over to the next month as long as you maintain an active subscription.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
    },
  ];

  const comparisonFeatures = [
    {
      category: "Generation",
      features: [
        { name: "AI Engine", starter: "Luma", creator: "Luma + Backup", pro: "Veo 3" },
        { name: "Monthly Credits", starter: "25", creator: "70", pro: "160" },
        { name: "Video Quality", starter: "1080p", creator: "1080p", pro: "4K" },
      ],
    },
    {
      category: "Features",
      features: [
        { name: "Custom Watermark", starter: true, creator: true, pro: true },
        { name: "Batch Processing", starter: false, creator: false, pro: true },
        { name: "Support", starter: "48h", creator: "24h", pro: "12h" },
      ],
    },
  ];

  const stats = [
    { icon: HiUsers, value: "2,500+", label: "Active Users" },
    { icon: HiChartBar, value: "10,000+", label: "Videos Produced" },
    { icon: HiClock, value: "50,000+", label: "Hours Saved" },
    { icon: HiShieldCheck, value: "99.8%", label: "Success Rate" },
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
              Transparent Pricing
            </span>
          </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Scale your production<br />without the overhead
            </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base mb-8 max-w-2xl mx-auto text-black opacity-60"
          >
            Choose a plan that fits your volume. Start for free and upgrade as your real estate business grows.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex items-center justify-center gap-4 mb-12"
          >
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-black' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 p-1 transition-all duration-300 rounded-full"
              style={{ backgroundColor: '#F2F2ED' }}
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: '#E7F014' }}
              />
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-black' : 'text-gray-400'}`}>
              Annual <span className="ml-1 text-xs font-black" style={{ color: '#E7F014' }}>SAVE 20%</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 md:py-32 px-4 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, index) => {
               const price = billingCycle === "annual" ? Math.floor(plan.price * 0.8) : plan.price;
               return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative p-10 md:p-12 h-full flex flex-col text-black shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                  style={{ backgroundColor: plan.color === 'style-yellow' ? '#E7F014' : plan.color === 'bg-[#F2F2ED]' ? '#F2F2ED' : '#FFFFFF' }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 font-black text-[10px] uppercase tracking-widest px-4 py-3" style={{ backgroundColor: '#E7F014', color: 'black' }}>
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <plan.icon className="w-12 h-12 text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl md:text-5xl font-black tracking-tight">${price}</span>
                    <span className="text-sm font-bold opacity-60">/mo</span>
                  </div>
                  
                  <p className="mb-8 text-black opacity-60 text-sm leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-10">
                    <button 
                      className="w-full py-4 font-black transition-all text-black hover:opacity-80"
                      style={{ 
                        backgroundColor: '#E7F014'
                      }}
                    >
                      SELECT PLAN →
                    </button>
                  </div>

                  <div className="mt-auto pt-8 border-t border-black/10">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm font-bold opacity-90 tracking-tight">
                          <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                </motion.div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-32 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-20 relative overflow-hidden" style={{ backgroundColor: '#E7F014' }}>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-black mb-6 max-w-xl leading-tight">
                  Detailed Feature Comparison
                </h2>
                <div className="font-bold text-[10px] uppercase tracking-wider px-4 py-2" style={{ backgroundColor: '#E7F014', color: 'black' }}>
                  Full Catalog
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-black/10">
                      <th className="py-6 font-black uppercase text-xs tracking-widest p-4">Feature</th>
                      <th className="py-6 font-black uppercase text-xs tracking-widest p-4">Starter</th>
                      <th className="py-6 font-black uppercase text-xs tracking-widest p-4">Creator</th>
                      <th className="py-6 font-black uppercase text-xs tracking-widest p-4" style={{ color: '#000000' }}>Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {comparisonFeatures.map((cat) => (
                      <React.Fragment key={cat.category}>
                        <tr>
                          <td colSpan={4} className="py-4 font-black text-xs uppercase tracking-widest opacity-40 px-4">{cat.category}</td>
                        </tr>
                        {cat.features.map((feat) => (
                          <tr key={feat.name} className="group hover:bg-black/5 transition-colors">
                            <td className="py-4 font-bold p-4">{feat.name}</td>
                            <td className="py-4 p-4 font-medium">{typeof feat.starter === 'boolean' ? (feat.starter ? <HiCheckCircle className="w-5 h-5"/> : <HiX className="w-5 h-5 opacity-20"/>) : feat.starter}</td>
                            <td className="py-4 p-4 font-medium">{typeof feat.creator === 'boolean' ? (feat.creator ? <HiCheckCircle className="w-5 h-5"/> : <HiX className="w-5 h-5 opacity-20"/>) : feat.creator}</td>
                            <td className="py-4 p-4 font-black">{typeof feat.pro === 'boolean' ? (feat.pro ? <HiCheckCircle className="w-5 h-5"/> : <HiX className="w-5 h-5 opacity-20"/>) : feat.pro}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white opacity-10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4 bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: '#E7F014' }}>
                  <stat.icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-2xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Everything else</h2>
            <div className="w-24 h-2 mx-auto" style={{ backgroundColor: '#E7F014' }} />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-black">{faq.question}</span>
                  <HiArrowRight className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="px-6 md:px-8 pb-8"
                    >
                      <p className="text-base font-medium leading-relaxed text-black opacity-60">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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
              Ready to transform your <span className="opacity-40">real estate marketing?</span>
            </h2>
            <p className="text-base mb-8 max-w-2xl mx-auto text-black opacity-60">
              Join thousands of agents using loomo to create stunning AI videos in seconds. No credit card required to start.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-5 text-black font-bold transition-all shadow-xl hover:-translate-y-1" style={{ backgroundColor: '#E7F014' }}>
                Get Started Free →
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border-2 text-black font-bold hover:opacity-80 transition-all" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                Contact Sales
              </button>
            </div>

            <p className="mt-10 font-medium text-sm uppercase tracking-widest text-black opacity-40">
              25 Credits Free • No Subscription Required • Cancel Anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
