// client/src/pages/auth/RegisterPage.jsx
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff, HiSparkles, HiArrowRight} from "react-icons/hi";
import Button from "@components/ui/Button";
import {useAuth} from "@hooks/useAuth";
import {
	validateEmail,
	validatePassword,
	getPasswordStrength,
} from "@utils/validators";

const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-100 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full"
      style={{ backgroundColor: '#E7F014' }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const {register, loading} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({...prev, [name]: ""}));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Complexity required";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mismatch";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await register({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password,
    });
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const passwordStrength = formData.password
    ? getPasswordStrength(formData.password)
    : null;

  const renderInput = ({ name, type, label, icon: Icon, placeholder, rightElement }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
          {label}
        </label>
        {errors[name] && (
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">
            {errors[name]}
          </span>
        )}
      </div>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${
          focusedField === name ? "text-black" : "text-gray-400"
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          className={`w-full bg-white text-black placeholder-gray-300 border-2 rounded-none py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold
            ${errors[name] 
              ? "border-red-500" 
              : focusedField === name ? "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "border-gray-100 hover:border-gray-200"
            }`}
        />
        
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-white border-2 border-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 mb-6"
          style={{ color: 'black' }}
        >
          Priority Onboarding
        </motion.div>
        
        <h1 className="text-4xl font-bold text-black mb-4 md:mb-6 leading-tight uppercase">
          Request <span style={{ color: '#C5C2BF' }}>Access</span>
        </h1>
        <p className="text-base mb-8" style={{ color: '#C5C2BF' }}>
          Join the elite circle of agents using the next generation of real estate AI.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderInput({
          name: "name",
          type: "text",
          label: "Full Name",
          icon: HiUser,
          placeholder: "John Smith"
        })}

        {renderInput({
          name: "email",
          type: "email",
          label: "Business Email",
          icon: HiMail,
          placeholder: "john@eliteagency.com"
        })}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput({
            name: "password",
            type: showPassword ? "text" : "password",
            label: "Security Key",
            icon: HiLockClosed,
            placeholder: "••••••••",
            rightElement: (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-black focus:outline-none transition-colors"
              >
                {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
              </button>
            )
          })}

          {renderInput({
            name: "confirmPassword",
            type: showConfirmPassword ? "text" : "password",
            label: "Verify Key",
            icon: HiLockClosed,
            placeholder: "••••••••",
            rightElement: (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-black focus:outline-none transition-colors"
              >
                {showConfirmPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
              </button>
            )
          })}
        </div>

        {/* Strength Indicator */}
        {formData.password && passwordStrength && (
          <div className="px-1">
            <div className="flex justify-between mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>Security Strength</span>
              <span className={passwordStrength.level === 'Strong' ? 'text-green-500' : 'text-yellow-500'}>{passwordStrength.level}</span>
            </div>
            <div className="h-2 bg-gray-100 flex">
              <motion.div 
                animate={{ width: `${passwordStrength.percentage}%` }}
                className="h-full"
                style={{ backgroundColor: passwordStrength.level === 'Strong' ? '#22c55e' : '#E7F014' }}
              />
            </div>
          </div>
        )}

        <div className="flex items-start justify-center pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="peer h-5 w-5 cursor-pointer appearance-none border-2 border-gray-200 bg-white transition-all checked:border-black checked:bg-black"
              />
              <HiSparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity w-3 h-3" style={{ color: '#E7F014' }} />
            </div>
            <span className="text-[10px] font-bold transition-colors uppercase tracking-widest leading-tight" style={{ color: '#C5C2BF' }}>
              I accept the Loomo <Link to="/terms" className="text-black border-b" style={{ borderBottomColor: '#E7F014' }}>Terms of Elite Service</Link> & <Link to="/privacy" className="text-black border-b" style={{ borderBottomColor: '#E7F014' }}>Privacy Protocols</Link>
            </span>
          </label>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 text-black font-black uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 group mt-12"
          style={{ backgroundColor: '#E7F014' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              Establish Account
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      <div className="my-10 relative flex items-center justify-center">
        <AnimatedLine className="absolute w-full" />
        <span className="relative z-10 bg-white px-6 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#C5C2BF' }}>
          Social Connect
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          className="flex items-center justify-center gap-3 py-4 border-2 border-gray-100 hover:border-black transition-all font-bold text-sm tracking-tight"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          GOOGLE
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          className="flex items-center justify-center gap-3 py-4 border-2 border-gray-100 hover:border-black transition-all font-bold text-sm tracking-tight"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GITHUB
        </motion.button>
      </div>

      <p className="text-center mt-12 font-bold text-xs uppercase tracking-widest" style={{ color: '#C5C2BF' }}>
        Already an Agent?{" "}
        <Link
          to="/login"
          className="text-black border-b-2 hover:border-black transition-all ml-1"
          style={{ borderBottomColor: '#E7F014' }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;