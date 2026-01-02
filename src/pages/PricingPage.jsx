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
      className="w-1/3 h-full bg-yellow-400"
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
      color: "bg-yellow-400",
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
      color: "bg-black",
      textColor: "text-white",
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
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter"
          >
            Scale your production<br />without the overhead
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
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
              className="w-14 h-8 bg-black p-1 transition-all duration-300"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                className="w-6 h-6 bg-yellow-400"
              />
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-black' : 'text-gray-400'}`}>
              Annual <span className="text-yellow-500 ml-1 text-xs font-black">SAVE 20%</span>
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
                  className={`relative p-10 md:p-12 h-full flex flex-col ${plan.color} ${plan.textColor || 'text-black'} shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-black text-yellow-400 font-black text-[10px] uppercase tracking-widest px-4 py-2">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <plan.icon className={`w-12 h-12 ${plan.color === 'bg-black' ? 'text-yellow-400' : 'text-black'}`} />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter">${price}</span>
                    <span className="text-sm font-bold opacity-60">/mo</span>
                  </div>
                  
                  <p className={`mb-8 opacity-80 text-sm leading-relaxed ${plan.color === 'bg-black' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-10">
                    <button className={`w-full py-4 font-black transition-all ${plan.color === 'bg-black' ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-black text-white hover:bg-gray-800'}`}>
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
          <div className="bg-yellow-400 p-8 md:p-20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
                <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-0 max-w-xl tracking-tight leading-tight">
                  Detailed Feature Comparison
                </h2>
                <div className="bg-black text-yellow-400 font-bold text-[10px] uppercase tracking-wider px-4 py-2">
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
                      <th className="py-6 font-black uppercase text-xs tracking-widest p-4 text-white">Pro</th>
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
                <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center mb-6 mx-auto">
                  <stat.icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-4xl font-black mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter">Everything else</h2>
            <div className="w-24 h-2 bg-yellow-400 mx-auto" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-2 border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-black tracking-tight">{faq.question}</span>
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
                      <p className="text-gray-500 font-medium leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              Ready to transform your <span className="text-yellow-400">real estate marketing?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of agents using loomo to create stunning AI videos in seconds. No credit card required to start.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all">
                Get Started Free →
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all">
                Contact Sales
              </button>
            </div>

            <p className="mt-10 text-gray-500 text-sm font-medium">
              25 Credits Free • No Subscription Required • Cancel Anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
