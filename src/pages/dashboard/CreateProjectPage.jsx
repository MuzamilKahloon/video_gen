import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiLink, HiPhotograph, HiLightningBolt, HiArrowRight, HiCheck,
  HiChevronLeft, HiCloudUpload, HiXCircle, HiFilm, HiCalendar,
  HiCreditCard, HiSparkles
} from "react-icons/hi";
import toast from "react-hot-toast";

// Minimal self-contained components
const Button = ({ children, className = "", variant = "primary", size = "md", loading = false, disabled, ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
  };
  const sizes = { sm: "px-3 py-2 text-sm", md: "px-4 py-2.5", lg: "px-6 py-3 text-lg" };
  return <button className={`${variants[variant]} ${sizes[size]} font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} disabled={disabled || loading} {...props}>{loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}{children}</button>;
};

const Input = ({ label, error, helperText, leftIcon, className = "", ...props }) => {
  const Icon = leftIcon;
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
        <input className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-black outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 placeholder-gray-400`} {...props} />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

const Select = ({ label, options, className = "", ...props }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <select className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-black outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20" {...props}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, rows = 3, className = "", ...props }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
    <textarea rows={rows} className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-black outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 placeholder-gray-400 resize-none" {...props} />
  </div>
);

const Card = ({ children, className = "" }) => <div className={`bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all ${className}`}>{children}</div>;
Card.Header = ({ children }) => <div className="p-6 border-b border-gray-200">{children}</div>;
Card.Body = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
Card.Footer = ({ children }) => <div className="p-6 pt-0">{children}</div>;

const Alert = ({ type = "info", message, title, className = "" }) => {
  const colors = { info: { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-700" }, warning: { bg: "bg-amber-100", border: "border-amber-200", text: "text-amber-700" } };
  const color = colors[type];
  return (
    <div className={`${color.bg} ${color.border} border rounded-xl p-4 ${className}`}>
      {title && <h4 className={`font-medium ${color.text} mb-1`}>{title}</h4>}
      <p className={`${color.text} text-sm`}>{message}</p>
    </div>
  );
};

const EmptyState = ({ icon, title, description }) => (
  <div className="py-12 text-center">
    {icon && <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">{icon}</div>}
    {title && <h4 className="text-lg font-medium text-black mb-1">{title}</h4>}
    {description && <p className="text-gray-600 mb-4">{description}</p>}
  </div>
);

// Main component
export default function CreateProjectPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore?.() || { user: { credits: { balance: 0 } } };
  const { scrapeImages, createProject } = useProject?.() || { scrapeImages: async () => ({ success: true, data: [] }), createProject: async () => ({ success: true, data: { _id: '123' } }) };

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ url: "https://www.realestate.com.au/property-house-qld-brisbane-12345678", title: "", template: "cinematic", aspectRatio: "16:9", quality: "1080p", description: "" });
  const [scrapedImages, setScrapedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleScrapeImages = async () => {
    setErrors({});
    if (!formData.url) return setErrors({ url: "URL is required" });
    setLoading(true);
    const result = await scrapeImages(formData.url);
    setLoading(false);
    if (result.success) {
      setScrapedImages(result.data || [{ id: 1, url: "/api/placeholder/400/300" }, { id: 2, url: "/api/placeholder/400/300" }, { id: 3, url: "/api/placeholder/400/300" }]);
      setSelectedImages((result.data || []).map(img => img.id));
      setStep(2);
    }
  };

  const handleCreateProject = async () => {
    if (selectedImages.length === 0) return toast.error("Please select at least one image");
    const selectedTemplate = VIDEO_TEMPLATES.find(t => t.id === formData.template);
    if ((user?.credits?.balance || 0) < selectedTemplate.credits) return toast.error("Insufficient credits");
    setLoading(true);
    const result = await createProject({ title: formData.title || `Property Video - ${new Date().toLocaleDateString()}`, url: formData.url, images: selectedImages, template: formData.template, aspectRatio: formData.aspectRatio, quality: formData.quality, description: formData.description });
    setLoading(false);
    if (result.success) navigate(`/dashboard/projects/${result.data._id}`);
  };

  const toggleImageSelection = (imageId) => setSelectedImages(prev => prev.includes(imageId) ? prev.filter(id => id !== imageId) : [...prev, imageId]);

  const steps = [
    { num: 1, label: "Property URL", icon: HiLink },
    { num: 2, label: "Select Images", icon: HiPhotograph },
    { num: 3, label: "Configure", icon: HiLightningBolt },
  ];

  const VIDEO_TEMPLATES = [
    { id: "cinematic", name: "Cinematic", credits: 1, icon: "🎬", description: "Dramatic camera movements with depth" },
    { id: "dynamic", name: "Dynamic", credits: 1, icon: "⚡", description: "Fast-paced, energetic transitions" },
    { id: "elegant", name: "Elegant", credits: 2, icon: "✨", description: "Smooth, sophisticated motion" },
    { id: "property", name: "Property", credits: 2, icon: "🏠", description: "Optimized for real estate" },
  ];

  const ASPECT_RATIOS = [
    { id: "16:9", name: "Landscape (16:9)", subtext: "Best for social media" },
    { id: "9:16", name: "Portrait (9:16)", subtext: "Best for Stories/Reels" },
    { id: "1:1", name: "Square (1:1)", subtext: "Best for feed posts" },
  ];

  const selectedTemplate = VIDEO_TEMPLATES.find(t => t.id === formData.template);
  const canProceed = (user?.credits?.balance || 0) >= (selectedTemplate?.credits || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-4 md:p-6 lg:p-8">
      <Helmet><title>Create New Project - VideoGen AI</title></Helmet>
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"><div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px]" /></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all">
            <div className="flex items-center justify-between">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const isCompleted = step > item.num;
                return (
                  <div key={item.num} className="flex items-center flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${isCompleted ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" : step === item.num ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}>
                        {isCompleted ? <HiCheck className="w-5 h-5" /> : item.num}
                      </div>
                      <div className="hidden md:block">
                        <p className={`text-sm font-medium ${step >= item.num ? "text-black" : "text-gray-400"}`}>{item.label}</p>
                      </div>
                    </div>
                    {index < 2 && <div className={`flex-1 h-0.5 mx-4 ${step > item.num ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gray-200"}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Step 1: URL Input */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <Card.Header><h2 className="text-2xl font-normal text-black">Enter Property URL</h2></Card.Header>
              <Card.Body>
                <Alert type="info" title="Supported Platform" message="Currently, we support scraping images from realestate.com.au listings only." />
                <Input label="Property URL" name="url" value={formData.url} onChange={handleChange} error={errors.url} helperText="Paste the full URL of the property listing" leftIcon={HiLink} disabled={loading} placeholder="https://www.realestate.com.au/property/..." />
                <div className="mt-6"><Button size="lg" onClick={handleScrapeImages} loading={loading} disabled={!formData.url}>Continue<HiArrowRight className="w-5 h-5" /></Button></div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Select Images */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-normal text-black">Select Images <span className="text-lg font-normal text-gray-500">({selectedImages.length} selected)</span></h2>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedImages(scrapedImages.map(img => img.id))}>Select All</Button>
                    <Button variant="secondary" size="sm" onClick={() => setSelectedImages([])}>Deselect All</Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {scrapedImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {scrapedImages.map(image => (
                      <div key={image.id} onClick={() => toggleImageSelection(image.id)} className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImages.includes(image.id) ? "border-amber-500 ring-2 ring-amber-200" : "border-gray-200 hover:border-gray-300"}`}>
                        <img src={image.url} alt={`Property ${image.id}`} className="w-full h-full object-cover" />
                        <AnimatePresence>{selectedImages.includes(image.id) && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-amber-500/20 flex items-center justify-center"><div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center"><HiCheck className="w-5 h-5 text-white" /></div></motion.div>}</AnimatePresence>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={<HiPhotograph className="w-8 h-8 text-gray-400" />} title="No images found" description="We couldn't find any images from this URL" />
                )}
                <div className="flex items-center justify-between">
                  <Button variant="secondary" onClick={() => setStep(1)}><HiChevronLeft className="w-5 h-5" />Back</Button>
                  <Button onClick={() => setStep(3)} disabled={selectedImages.length === 0}>Continue<HiArrowRight className="w-5 h-5" /></Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Configure */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <Card.Header><h2 className="text-2xl font-normal text-black">Configure Video</h2></Card.Header>
                  <Card.Body>
                    <Input label="Project Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Modern Villa Showcase" />
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Template</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {VIDEO_TEMPLATES.map(template => (
                          <div key={template.id} onClick={() => setFormData(prev => ({ ...prev, template: template.id }))} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.template === template.id ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}>
                            <div className="flex items-start gap-3">
                              <span className="text-3xl">{template.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-black">{template.name}</h4>
                                  <span className="text-sm font-medium text-amber-600">{template.credits} credit{template.credits > 1 ? 's' : ''}</span>
                                </div>
                                <p className="text-sm text-gray-600">{template.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Select label="Aspect Ratio" name="aspectRatio" value={formData.aspectRatio} onChange={handleChange} options={ASPECT_RATIOS.map(r => ({ value: r.id, label: `${r.name} (${r.subtext})` }))} />
                      <Select label="Quality" name="quality" value={formData.quality} onChange={handleChange} options={[{ value: "720p", label: "720p HD" }, { value: "1080p", label: "1080p Full HD" }, { value: "4k", label: "4K Ultra HD (Premium)" }]} />
                    </div>

                    <Textarea label="Description (Required)" name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Add any additional notes or requirements..." />
                  </Card.Body>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div>
                <Card className="sticky top-6">
                  <Card.Header><h3 className="text-lg font-medium text-black">Summary</h3></Card.Header>
                  <Card.Body className="space-y-4">
                    <div><p className="text-sm text-gray-600 mb-1">Selected Images</p><p className="text-2xl font-light text-black">{selectedImages.length}</p></div>
                    <div className="h-px bg-gray-200" />
                    <div><p className="text-sm text-gray-600 mb-1">Template</p><p className="font-medium text-black">{selectedTemplate?.name}</p></div>
                    <div className="h-px bg-gray-200" />
                    <div><p className="text-sm text-gray-600 mb-1">Credits Required</p><p className="text-2xl font-light text-amber-600">{selectedTemplate?.credits || 0}</p></div>
                    <div><p className="text-sm text-gray-600 mb-1">Your Balance</p><p className="font-medium text-black">{user?.credits?.balance || 0} credits</p></div>
                    {!canProceed && <Alert type="warning" message="Insufficient credits. Please purchase more credits to continue." />}
                    <div className="h-px bg-gray-200" />
                    <div className="space-y-3">
                      <Button size="lg" onClick={handleCreateProject} loading={loading} disabled={!canProceed} className="w-full">
                        <AnimatePresence mode="wait">
                          {loading ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Generating...</motion.span> : <motion.span key="generate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Generate Video <HiSparkles className="w-5 h-5" /></motion.span>}
                        </AnimatePresence>
                      </Button>
                      <Button variant="secondary" onClick={() => setStep(2)} className="w-full"><HiChevronLeft className="w-5 h-5" />Back</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}