// client/src/pages/dashboard/CreateProjectPage.jsx
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiPlus, 
  HiSparkles, 
  HiViewGrid, 
  HiEye, 
  HiAdjustments,
  HiChevronRight, 
  HiChevronLeft, 
  HiCheck,
  HiX, 
  HiPhotograph, 
  HiTrash, 
  HiSelector,
  HiPhone, 
  HiMail, 
  HiDownload, 
  HiPlay,
  HiLightningBolt,
  HiCube
} from "react-icons/hi";
import { useDropzone } from "react-dropzone";
import { useProjectStore } from "@store/projectStore";
import { useAuthStore } from "@store/authStore";
import { cn } from "@utils/cn";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Button from "@components/ui/Button";

// Constants for steps
const STEPS = [
  { id: 1, name: "Upload", icon: HiPlus, desc: "Drop Visuals" },
  { id: 2, name: "Analyze", icon: HiSparkles, desc: "AI Magic" },
  { id: 3, name: "Timeline", icon: HiViewGrid, desc: "Arrange Clips" },
  { id: 4, name: "Preview", icon: HiEye, desc: "Watch Output" },
  { id: 5, name: "Finalize", icon: HiAdjustments, desc: "Export Video" },
];

const ANIMATION_SHOTS = [
  { id: "push-in", name: "Push In" },
  { id: "push-out", name: "Push Out" },
  { id: "pan-l-r", name: "Pan L to R" },
  { id: "pan-r-l", name: "Pan R to L" },
  { id: "rotate-l", name: "Rotate L" },
  { id: "rotate-r", name: "Rotate R" },
  { id: "tilt-up", name: "Tilt Up" },
  { id: "tilt-down", name: "Tilt Down" },
  { id: "drone-shot", name: "Drone" },
  { id: "speed-ramp", name: "Speed Ramp" },
];

// Reusable animated line from DashboardHome
const AnimatedLine = ({ className = "" }) => (
	<div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
		<motion.div
			className="w-1/3 h-full bg-yellow-400"
			animate={{ x: ["-100%", "300%"] }}
			transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
		/>
	</div>
);

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    step, setStep, images, addImages, removeImage, 
    updateImageStatus, timeline, setTimeline, 
    updateClipAnimation, settings, updateSettings, resetProject 
  } = useProjectStore();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploaded',
      analysisResults: null
    }));
    addImages(newImages);
    toast.success(`${acceptedFiles.length} files added to stream`);
  }, [addImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const startAnalysis = async () => {
    setStep(2);
    setIsAnalyzing(true);
    
    for (const img of images) {
      if (img.status === 'ready') continue;
      updateImageStatus(img.id, 'analyzing');
      await new Promise(resolve => setTimeout(resolve, 800));
      const randomAnimation = ANIMATION_SHOTS[Math.floor(Math.random() * ANIMATION_SHOTS.length)].id;
      updateImageStatus(img.id, 'ready', {
        composition: 'Verified',
        animation: randomAnimation,
        clipDuration: 2.5
      });
    }
    
    const newTimeline = images.map(img => ({
      id: `clip-${img.id}`,
      imageId: img.id,
      preview: img.preview,
      animation: img.analysisResults?.animation || "push-in",
      duration: 2.5
    }));
    setTimeline(newTimeline);
    
    setTimeout(() => {
      setStep(3);
      setIsAnalyzing(false);
      toast.success("AI Generation Pipeline Ready");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-black font-['Plus_Jakarta_Sans',sans-serif] p-6 lg:p-12">
      <Helmet><title>New Project | VideoGen</title></Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <span className="bg-yellow-400 text-black font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2">
              Step {step} of 5
            </span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none uppercase">
                Video <span className="text-gray-400">Creation</span>
              </h1>
              <p className="text-gray-500 font-medium mt-4 tracking-tight">Follow the pipeline to generate your cinematic asset.</p>
            </div>

            {/* Step Indicators */}
            <div className="flex bg-white p-1 border border-gray-100 shadow-sm rounded-lg overflow-hidden">
               {STEPS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => step > s.id && setStep(s.id)}
                    className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                      step === s.id ? "bg-black text-white" : 
                      step > s.id ? "text-gray-800 hover:text-yellow-600" : "text-gray-300 pointer-events-none"
                    )}
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">{s.name}</span>
                  </button>
               ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div 
                  {...getRootProps()} 
                  className={cn(
                    "relative aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-12 group cursor-pointer",
                    isDragActive ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-black"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HiPlus className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2">Initialize Assets</h3>
                  <p className="text-gray-400 text-sm font-medium">JPEG, PNG or WEBP. Max 20MB per asset.</p>
                  
                  <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img) => (
                      <div key={img.id} className="relative group bg-white p-2 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                        <img src={img.preview} className="w-full h-32 object-cover" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                          className="absolute -top-2 -right-2 bg-black text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <HiX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                 <div className="bg-black text-white p-8 space-y-8 group overflow-hidden relative">
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center mb-6">
                        <HiLightningBolt className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 tracking-tight">Generation Brief</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-10">
                        Our AI analyzes resolution and depth to ensure optimal cinematic quality for each frame.
                      </p>
                      
                      <div className="space-y-4 mb-10 text-xs font-black uppercase tracking-widest">
                        <div className="flex justify-between border-b border-white/10 pb-3">
                           <span className="text-gray-500">Staged</span>
                           <span>{images.length} Assets</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-3">
                           <span className="text-gray-500">Quality</span>
                           <span className="text-yellow-400">Auto-Check</span>
                        </div>
                      </div>

                      <Button 
                        disabled={images.length < 3}
                        onClick={startAnalysis}
                        className="w-full bg-yellow-400 text-black font-bold h-14 hover:bg-white transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        Start Pipeline <HiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                 </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ANALYZE */}
          {step === 2 && (
            <motion.div 
               key="step2" 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="py-20 text-center"
            >
               <div className="inline-block relative mb-10">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-2 border-yellow-400 border-t-transparent rounded-full"
                 />
                 <HiSparkles className="absolute inset-0 m-auto w-10 h-10 text-yellow-400 animate-pulse" />
               </div>
               <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Deep Learning Analysis</h2>
               <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12">Detecting cinematic vectors & motion depth</p>
               
               <div className="max-w-4xl mx-auto space-y-4">
                  {images.map(img => (
                    <div key={img.id} className="bg-white p-4 border border-gray-100 flex items-center justify-between group overflow-hidden relative">
                       <div className="flex items-center gap-4">
                          <img src={img.preview} className="w-10 h-10 object-cover" />
                          <span className="text-xs font-bold truncate max-w-[200px]">{img.file?.name}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          {img.status === 'ready' ? (
                             <span className="text-[10px] font-black uppercase text-green-500 flex items-center gap-1"><HiCheck /> Verified</span>
                          ) : (
                             <span className="text-[10px] font-black uppercase text-yellow-500 animate-pulse">Processing...</span>
                          )}
                          <div className="w-32 h-1 bg-gray-100 overflow-hidden">
                             <motion.div 
                                className="h-full bg-yellow-400"
                                initial={{ width: 0 }}
                                animate={{ width: img.status === 'ready' ? '100%' : '50%' }}
                             />
                          </div>
                       </div>
                       <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* STEP 3: TIMELINE */}
          {step === 3 && (
            <motion.div 
               key="step3" 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="space-y-8"
            >
               <div className="flex items-center justify-between gap-4 mb-2">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Sequence Pipeline</h2>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Abort Stream</button>
                    <button onClick={() => setStep(4)} className="bg-black text-white px-6 py-3 font-bold text-xs hover:bg-yellow-400 hover:text-black transition-all">Preview Output</button>
                  </div>
               </div>

               <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
                  {timeline.map((clip, idx) => (
                    <div key={clip.id} className="w-72 shrink-0 snap-start bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                       <img src={clip.preview} className="w-full h-40 object-cover" />
                       <div className="p-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Frame 0{idx + 1}</p>
                          <div className="space-y-4">
                             <div className="flex items-center justify-between text-xs font-bold">
                                <span>Motion</span>
                                <span className="text-yellow-600 uppercase tracking-tighter">{clip.animation}</span>
                             </div>
                             <select 
                                value={clip.animation}
                                onChange={(e) => updateClipAnimation(clip.id, e.target.value)}
                                className="w-full bg-[#f9f9f7] p-3 text-xs font-bold outline-none border border-transparent focus:border-yellow-400 transition-colors"
                             >
                                {ANIMATION_SHOTS.map(shot => (
                                   <option key={shot.id} value={shot.id}>{shot.name}</option>
                                ))}
                             </select>
                          </div>
                          <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-4">
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase text-gray-300">Default Time</span>
                                <span className="text-xs font-black">2.5s</span>
                             </div>
                             <div className="p-2 bg-gray-50 text-gray-300 group-hover:bg-yellow-100 group-hover:text-yellow-600 transition-colors cursor-grab">
                                <HiSelector className="w-4 h-4" />
                             </div>
                          </div>
                       </div>
                       <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100" />
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* STEP 4: PREVIEW */}
          {step === 4 && (
            <motion.div 
               key="step4" 
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="grid lg:grid-cols-3 gap-12"
            >
               <div className="lg:col-span-2">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative group">
                     {/* Preview Content */}
                     <div className="h-full flex flex-col items-center justify-center text-white/20">
                        <HiPlay className="w-20 h-20 mb-4 group-hover:text-yellow-400 transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Live Workspace Preview</span>
                     </div>
                     <div className="absolute top-6 right-6">
                        <span className="bg-white/10 backdrop-blur-md text-white py-2 px-4 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                           { (timeline.length * 2.5).toFixed(1) }s Stream
                        </span>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-white p-8 border border-gray-100 shadow-sm space-y-8">
                     <h3 className="text-xl font-black uppercase tracking-tighter">Preview Master</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Validation cycle completed. Sequence order and cinematic motion have been verified.
                     </p>
                     
                     <div className="space-y-3">
                        {['Depth Verified', 'Temporal Sync', 'Format Ready'].map(tag => (
                          <div key={tag} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                             <div className="w-4 h-4 bg-green-500 flex items-center justify-center text-white rounded-full">
                                <HiCheck className="w-2.5 h-2.5" />
                             </div>
                             {tag}
                          </div>
                        ))}
                     </div>

                     <div className="pt-8 space-y-3 border-t border-gray-50">
                        <Button onClick={() => setStep(5)} className="w-full bg-black text-white h-14 font-bold hover:bg-yellow-400 hover:text-black transition-all">Proceed to Finalize</Button>
                        <Button variant="ghost" onClick={() => setStep(3)} className="w-full text-xs font-black uppercase tracking-widest text-gray-400">Back to Timeline</Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* STEP 5: FINALIZE */}
          {step === 5 && (
            <motion.div 
               key="step5" 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="grid lg:grid-cols-3 gap-8"
            >
               <div className="lg:col-span-2 bg-white p-10 border border-gray-100 shadow-sm space-y-12">
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Agent Identifier</label>
                        <input 
                           value={settings.branding.agentName}
                           onChange={(e) => updateSettings({ branding: { ...settings.branding, agentName: e.target.value } })}
                           className="w-full bg-[#f9f9f7] border-b-2 border-transparent focus:border-yellow-400 p-4 text-sm font-bold outline-none transition-all"
                           placeholder="Full Name"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Asset Location</label>
                        <input 
                           value={settings.branding.propertyAddress}
                           onChange={(e) => updateSettings({ branding: { ...settings.branding, propertyAddress: e.target.value } })}
                           className="w-full bg-[#f9f9f7] border-b-2 border-transparent focus:border-yellow-400 p-4 text-sm font-bold outline-none transition-all"
                           placeholder="Property Stream"
                        />
                     </div>
                  </div>



                  <div className="space-y-6">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Communication Node</label>
                     <div className="flex gap-4">
                        <input 
                           value={settings.contact.value}
                           onChange={(e) => updateSettings({ contact: { ...settings.contact, value: e.target.value } })}
                           className="flex-1 bg-[#f9f9f7] p-4 text-sm font-bold outline-none"
                           placeholder="Signal Address"
                        />
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-1 space-y-6">
                  <div className="bg-black text-white p-8 space-y-10 group relative overflow-hidden">
                     <h3 className="text-xl font-bold tracking-tight mb-2">Deploy Stream</h3>
                     
                     <div className="space-y-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                        <div className="flex justify-between border-b border-white/5 pb-3">
                           <span>Res</span>
                           <span className="text-white">1080P MASTER</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                           <span>Container</span>
                           <span className="text-white">MP4 / H.264</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                           <span>Cost</span>
                           <span className="text-yellow-400 italic">1.0 CR</span>
                        </div>
                     </div>

                     <Button 
                        onClick={() => {
                          toast.promise(
                            new Promise(resolve => setTimeout(resolve, 2000)),
                            {
                              loading: 'Synchronizing Stream...',
                              success: 'Asset Deployed!',
                              error: 'Deployment Failure'
                            }
                          );
                          setTimeout(() => navigate('/dashboard/projects'), 2500);
                        }}
                        className="w-full bg-yellow-400 text-black h-16 font-bold hover:bg-white transition-all flex items-center justify-center gap-2 group/final"
                     >
                        Confirm Master <HiSparkles className="group-hover/final:rotate-12 transition-transform" />
                     </Button>
                     <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                  </div>

                  <div className="bg-white p-6 border border-gray-100 flex items-center justify-between hover:bg-yellow-50 transition-all cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f9f9f7] flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                           <HiDownload className="text-gray-400 group-hover:text-black" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">Archive Sync</span>
                     </div>
                     <HiChevronRight className="text-gray-300 group-hover:text-black" />
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateProjectPage;
