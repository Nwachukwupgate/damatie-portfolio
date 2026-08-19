"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail, ArrowRight, Sparkles, Zap, Target, TrendingUp, ExternalLink, Briefcase, Building2, Heart, Rocket, Inbox } from 'lucide-react';

// Floating geometric shapes component
const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '10%', left: '-10%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-600/15 via-purple-500/10 to-transparent blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '20%', right: '-5%' }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 360], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        >
          <div
            style={{
              width: `${12 + i * 6}px`,
              height: `${12 + i * 6}px`,
              background: i % 3 === 0
                ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.4), transparent)'
                : i % 3 === 1
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), transparent)'
                : 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), transparent)',
              borderRadius: i % 2 === 0 ? '4px' : '50%',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
      const duration = 1600;
      const steps = 50;
      const increment = numericValue / steps;
      let current = 0;
      setDisplayValue('0');

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current).toString() + (value.includes('+') ? '+' : '') + (value.includes('%') ? '%' : ''));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// Magnetic button component
const MagneticButton = ({ children, href, className, variant = 'primary' }: {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - left - width / 2) * 0.3, y: (clientY - top - height / 2) * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles = variant === 'primary'
    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50'
    : 'border-2 border-cyan-400 hover:bg-cyan-400/10';

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${baseStyles} ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

// Text reveal animation
const TextReveal = ({ children, className = '', delay = 0 }: {
  children: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Parallax wrapper
const ParallaxSection = ({ children, className = '', speed = 0.5 }: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

// Tilt card
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setRotateX(-y * 10);
    setRotateY(x * 10);
  };

  const reset = () => { setRotateX(0); setRotateY(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 768);
    const handleScroll = () => setScrolled(window.scrollY > 50);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.9]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const navItems = ['About', 'Services', 'Work', 'Articles', 'Experience', 'Contact'];

  return (
    <div ref={containerRef} className="bg-slate-950 text-white overflow-hidden">
      <FloatingShapes />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold" whileHover={{ scale: 1.05 }}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              NEFE CLARKE
            </span>
          </motion.div>

          {!mobile && (
            <motion.div className="hidden md:flex gap-8" variants={staggerContainer} initial="hidden" animate="show">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={item === 'Articles' ? '/articles' : `#${item.toLowerCase()}`}
                  className="relative group"
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                >
                  <span className="hover:text-cyan-400 transition-colors">{item}</span>
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>
          )}

          <motion.button onClick={() => setNav(!nav)} className="md:hidden relative z-50" whileTap={{ scale: 0.9 }}>
            <AnimatePresence mode="wait">
              {nav ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {nav && mobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 overflow-hidden"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={item === 'Articles' ? '/articles' : `#${item.toLowerCase()}`}
                  className="block px-6 py-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50"
                  onClick={() => setNav(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen pt-20 px-4 flex items-center relative overflow-hidden">
        <motion.div
          className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-10"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div className="mb-6 text-center md:text-left" variants={staggerItem}>
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-sm"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.2)" }}
              >
                <Sparkles size={16} className="animate-pulse" />
                Welcome to my portfolio
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl text-center md:text-left font-bold mb-6 leading-[1.1] tracking-tight flex flex-col gap-1"
              variants={staggerItem}
            >
              <TextReveal>Get heard. Get results.</TextReveal>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                <TextReveal delay={0.1}>Get your time back.</TextReveal>
              </span>
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl text-center md:text-left font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              variants={staggerItem}
            >
              Communications &amp; Marketing Specialist
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-center md:text-left text-gray-400 mb-8 max-w-xl leading-relaxed"
              variants={staggerItem}
            >
              I&apos;m Nefe Clarke. I write the words that get your message heard, run the campaigns that turn
              attention into results, and
              <span className="text-cyan-400"> take the day-to-day communications work off your plate</span>.
            </motion.p>

            <motion.div className="flex gap-4 flex-wrap justify-center md:justify-start" variants={staggerItem}>
              <MagneticButton href="#contact" variant="primary">
                Let&apos;s Work Together <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton href="#services" variant="secondary">
                See My Services
              </MagneticButton>
            </motion.div>

            <motion.div className="flex gap-6 mt-12 justify-center md:justify-start" variants={staggerItem}>
              {[
                { icon: Linkedin, url: 'https://www.linkedin.com/in/nefe-damatie-/', label: 'LinkedIn' },
                { icon: Mail, url: 'mailto:nefeclarke@gmail.com', label: 'Email' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative w-14 h-14 border border-cyan-400/50 rounded-full flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon size={22} className="relative z-10 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-96 md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/20" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute w-[350px] h-[350px] rounded-full border border-blue-500/20" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute w-[300px] h-[300px] rounded-full border border-purple-500/20" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

            <TiltCard className="relative w-full h-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-1 backdrop-blur-sm border border-white/10">
                <div className="relative h-full w-full bg-gradient-to-br from-slate-700/50 via-slate-800/50 to-slate-900/50 rounded-3xl overflow-hidden flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/bvcDK8rY/OFFICIAL-STANDING-POTRAIT.png"
                    alt="Nefe Clarke"
                    className="h-full w-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 pointer-events-none rounded-3xl" />
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-1"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap size={12} /> Storyteller
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 text-xs text-blue-400 flex items-center gap-1"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Target size={12} /> Author
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex justify-center pt-2">
            <motion.div className="w-1.5 h-3 bg-cyan-400 rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50" />
        <ParallaxSection speed={0.3}>
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { number: '5+', label: 'Years in Communication', icon: TrendingUp },
              { number: '40%', label: 'Engagement Growth', icon: Target },
              { number: '25%', label: 'Renewal Improvement', icon: Zap },
              { number: '94%', label: 'On-Time Delivery', icon: Sparkles }
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center group">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-7 h-7 text-cyan-400" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </ParallaxSection>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 relative">
        <ParallaxSection speed={0.2}>
          <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">Get to know me</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                <TextReveal>About Me</TextReveal>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <TiltCard className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-50" />
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <img src="https://i.postimg.cc/yxzcXJpN/gray-suit.png" alt="Nefe Clarke" className="w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.p className="text-lg text-gray-300 leading-relaxed" variants={staggerItem}>
                  I&apos;m a communications and marketing specialist based in Lagos, Nigeria. For over
                  <span className="text-cyan-400 font-semibold"> five years</span> I&apos;ve worked where communication
                  meets people, managing client relationships, running campaigns, and coordinating projects that
                  actually get delivered.
                </motion.p>

                <motion.p className="text-lg text-gray-300 leading-relaxed" variants={staggerItem}>
                  My work spans three things. I build email and campaign strategy, from segmentation and lifecycle
                  sequences to the reporting that shows what actually worked. I write and produce, whether that is
                  articles, scripts, podcasts, or documentary storytelling. And I support founders and small teams
                  directly as a virtual assistant, handling inbox, scheduling, research, and the admin that quietly
                  eats their week. Underneath all of it I use AI-assisted workflows to move faster without losing the
                  human tone. If you have a message worth hearing, my job is to make sure it reaches the people who
                  need it.
                </motion.p>

                <motion.div className="grid grid-cols-2 gap-4 pt-6" variants={staggerItem}>
                  {[
                    { value: 'Author', label: 'Dawn at Dusk (in progress)' },
                    { value: 'Host', label: 'True Crimes with Dawn' },
                    { value: '3', label: 'Published Essays' },
                    { value: '5+', label: 'Years in Media' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors group"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{item.value}</div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4">
        <ParallaxSection speed={0.2}>
          <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">What I Offer</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                <TextReveal>Services</TextReveal>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: 'Email & Campaign Strategy',
                  icon: Target,
                  color: 'cyan',
                  skills: [
                    'Lifecycle and nurture sequences',
                    'Segmentation and behavioural triggers',
                    'A/B testing and reporting',
                    'CRM setup and list health'
                  ]
                },
                {
                  category: 'Content & Storytelling',
                  icon: Zap,
                  color: 'cyan',
                  skills: [
                    'Articles, essays, and editorial',
                    'Scripts for video and podcast',
                    'Confidential ghostwriting',
                    'Brand messaging and copy'
                  ]
                },
                {
                  category: 'Voice & Video',
                  icon: Target,
                  color: 'blue',
                  skills: [
                    'Podcast hosting and production',
                    'Documentary storytelling',
                    'On-camera presenting',
                    'Voiceover and narration'
                  ]
                },
                {
                  category: 'Virtual Assistance & Support',
                  icon: Inbox,
                  color: 'purple',
                  featured: true,
                  skills: [
                    'Inbox management and correspondence',
                    'Calendar and scheduling',
                    'Research, reporting, and admin',
                    'Email campaigns and CRM upkeep'
                  ]
                },
                {
                  category: 'AI Content Systems',
                  icon: TrendingUp,
                  color: 'cyan',
                  skills: [
                    'Prompt engineering and AI workflows',
                    'AI-assisted research and drafting',
                    'Automation with Zapier and Notion',
                    'More output, same size team'
                  ]
                }
              ].map((skillSet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="h-full">
                    <div className={`relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border ${skillSet.featured ? 'border-purple-500/50' : 'border-slate-700/50'} hover:border-cyan-500/30 transition-all group`}>
                      {skillSet.featured && (
                        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                          Now Available
                        </div>
                      )}
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-6"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <skillSet.icon className="w-7 h-7 text-cyan-400" />
                      </motion.div>

                      <h3 className="text-xl font-bold mb-5 group-hover:text-cyan-400 transition-colors">{skillSet.category}</h3>

                      <div className="space-y-3">
                        {skillSet.skills.map((skill, j) => (
                          <motion.div
                            key={j}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                          >
                            <div className="w-2 h-2 mt-2 bg-cyan-400 rounded-full flex-shrink-0" />
                            <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-4">
        <ParallaxSection speed={0.2}>
          <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">Featured Work</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                <TextReveal>Selected Work</TextReveal>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Dawn at Dusk',
                  description: 'My debut book. The story of losing a job, a relationship, and a sense of self, and the slow, deliberate work of coming back to light.',
                  role: 'Author · In Progress',
                  icon: Sparkles,
                  link: null,
                  contributions: [
                    'Long-form narrative nonfiction',
                    'The flagship of the Nefe Clarke brand',
                    'Companion podcast in development',
                    'Launch details coming soon'
                  ]
                },
                {
                  title: 'True Crimes with Dawn',
                  description: 'My documentary storytelling channel. Research-driven true crime narratives I script, narrate, and produce end to end.',
                  role: 'Creator · Host · Narrator',
                  icon: Rocket,
                  link: 'https://www.youtube.com/@TruecrimeswithDawn',
                  contributions: [
                    'Deep research into real cases',
                    'Narrative scripting and structure',
                    'Voiceover and narration',
                    'End-to-end video storytelling'
                  ]
                },
                {
                  title: 'EdTech Campaign Videos',
                  description: 'An EdTech brand needed to fill its next learner cohort. I scripted the campaign messaging and presented on camera.',
                  role: 'Scriptwriter & Presenter',
                  icon: Briefcase,
                  link: null,
                  contributions: [
                    'Scripted end-to-end campaign messaging',
                    'On-camera presenting',
                    'Product storytelling',
                    'Enrollment-driving calls to action'
                  ]
                },
                {
                  title: 'Articles & Essays',
                  description: 'Original opinion pieces and commentary, from youth climate action in Lagos to what street interviews taught me about listening.',
                  role: 'Writer',
                  icon: Heart,
                  link: '/articles',
                  contributions: [
                    'Opinion and commentary writing',
                    'Personal essay storytelling',
                    'Clear, human-first voice',
                    'Published on this site'
                  ]
                },
                {
                  title: 'Project Leadership',
                  description: 'Behind the storytelling is operational discipline. I have led cross-functional teams from planning to launch, including JobMatch, HealthPaddy, an enterprise banking engagement, and Releazze.',
                  role: 'Project Manager & QA',
                  icon: Building2,
                  link: 'https://jobmatch.vercel.app',
                  contributions: [
                    'Cross-functional team leadership',
                    'Timelines, risk plans, stakeholder comms',
                    'QA standards through to release',
                    '94% on-time delivery rate'
                  ]
                }
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="h-full">
                    <div className="relative h-full group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-600/50 to-cyan-500/50 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                      <div className="relative h-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 group-hover:border-slate-600/50 transition-all backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div
                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30"
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <project.icon className="w-6 h-6 text-cyan-400" />
                          </motion.div>

                          {project.link && (
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${project.title}`}
                              className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                          {project.role}
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                        <div className="space-y-2">
                          <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Key Contributions</span>
                          {project.contributions.map((contribution, j) => (
                            <motion.div
                              key={j}
                              className="flex items-start gap-2 text-sm text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 + j * 0.05 }}
                            >
                              <span className="w-1.5 h-1.5 mt-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                              {contribution}
                            </motion.div>
                          ))}
                        </div>

                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all group/btn"
                            whileHover={{ x: 5 }}
                          >
                            {project.title === 'True Crimes with Dawn' ? 'Watch an Episode' : project.title === 'Articles & Essays' ? 'Read Articles' : 'Visit Project'}
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </motion.a>
                        )}

                        {!project.link && (
                          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-gray-500 text-sm font-medium">
                            <Building2 size={16} />
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 relative">
        <ParallaxSection speed={0.2}>
          <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">Kind Words</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                <TextReveal>What Clients Say</TextReveal>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: 'Before Nefe stepped in, things were clumsy. I was missing deadlines and taking too long to reply to emails, and I could never decide what to deal with first. She shaped my days, filtered the inbox, told me what actually mattered that morning, and stayed on top of the follow ups. I stopped dropping things, and I got noticeably more done.',
                  name: 'Isaiah Okhufu',
                  role: 'Founder, Releazze'
                },
                {
                  quote: 'Running three businesses at once means everything competes for attention, and I was drowning in it. Nefe came in and handled the email enquiries, kept my deliveries on track, and made sure I never missed a meeting with my manufacturers overseas. She worked out what mattered most each day so I did not have to. She is my real life angel.',
                  name: 'Precious Ayeshung',
                  role: 'Entrepreneur'
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <TiltCard className="h-full">
                    <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                      <div className="text-5xl text-cyan-400/40 leading-none mb-2">&ldquo;</div>
                      <p className="text-gray-300 leading-relaxed mb-6 italic">{t.quote}</p>
                      <div className="pt-4 border-t border-slate-700/50">
                        <div className="text-cyan-400 font-semibold">{t.name}</div>
                        <div className="text-gray-500 text-sm">{t.role}</div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50" />
        <ParallaxSection speed={0.15}>
          <motion.div className="max-w-6xl mx-auto relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">My Journey</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2">
                <TextReveal>Experience</TextReveal>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

              <div className="space-y-12">
                {[
                  {
                    title: 'Virtual Assistant & Communications Support',
                    company: 'Freelance',
                    location: 'Remote',
                    period: 'Jan 2024 – Present',
                    highlights: [
                      'Inbox management, correspondence, and follow ups for clients',
                      'Calendar coordination and deadline tracking across time zones',
                      'Research, reporting, and content scheduling',
                      'AI-assisted workflows to speed up repetitive admin'
                    ]
                  },
                  {
                    title: 'AI Automation & Prompt Engineering',
                    company: 'Freelance',
                    location: 'Remote',
                    period: 'Jan 2024 – Present',
                    highlights: [
                      'Build AI-assisted workflows that automate repetitive research, drafting, and admin',
                      'Design and refine prompts to improve accuracy and tone consistency',
                      'Train and evaluate AI models on conversational style and language variation',
                      'Quality-check AI output before it reaches a client or customer'
                    ]
                  },
                  {
                    title: 'Communications & Email Marketing Specialist',
                    company: 'Qwoted',
                    location: 'Remote, USA',
                    period: 'Jan 2023 – Mar 2026',
                    highlights: [
                      'Segmented, personalized email campaigns across the customer lifecycle',
                      'Consistent brand voice across 300+ monthly interactions',
                      'Rebuilt the knowledge base, cutting repeat queries by 15%',
                      'Planned and tracked campaigns in HubSpot and Zendesk'
                    ]
                  },
                  {
                    title: 'Media Success Manager',
                    company: 'Qwoted',
                    location: 'Remote, USA',
                    period: 'Nov 2023 – 2024',
                    highlights: [
                      'Managed media campaigns and client storytelling',
                      'Grew client engagement by 40%',
                      'Improved renewal rates by 25% through proactive communication',
                      'Connected journalists with expert sources for stories'
                    ]
                  },
                  {
                    title: 'Project Manager',
                    company: 'Intelligent Innovations',
                    location: 'Lagos, Nigeria',
                    period: 'Nov 2021 – Oct 2023',
                    highlights: [
                      'Delivered concurrent projects at a 94% on-time rate',
                      'Scripted and presented EdTech recruitment campaign videos',
                      'Coordinated cross-functional teams and stakeholders',
                      'Improved operational efficiency by 35%'
                    ]
                  },
                  {
                    title: 'Customer Care Executive',
                    company: 'Phixeon Technologies',
                    location: 'Lagos, Nigeria',
                    period: 'Sep 2019 – Oct 2021',
                    highlights: [
                      'Handled high-volume customer communication',
                      'Cut duplicate inquiries by 30% with clearer processes',
                      'Reduced average resolution time from 48 to 36 hours',
                      'Built a foundation in listening to audiences'
                    ]
                  }
                ].map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative pl-8 md:pl-20"
                  >
                    <motion.div
                      className="absolute left-0 md:left-8 top-2 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-4 border-slate-950"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    />

                    <motion.div
                      className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
                      whileHover={{ x: 10, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                          <p className="text-cyan-400 font-semibold">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-gray-400 whitespace-nowrap px-3 py-1 bg-slate-700/50 rounded-full text-sm">{exp.period}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.highlights.map((h, j) => (
                          <motion.div
                            key={j}
                            className="flex items-start gap-2 text-sm text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + j * 0.05 }}
                          >
                            <span className="w-1.5 h-1.5 mt-2 bg-cyan-400 rounded-full flex-shrink-0" />
                            {h}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-950" />
        <ParallaxSection speed={0.1}>
          <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-medium uppercase tracking-wider text-sm">Get in touch</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-6">
                <TextReveal>What would you hand over first?</TextReveal>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Whether it&apos;s a story that needs telling or a week that needs lightening, tell me what you&apos;re working on.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MagneticButton href="mailto:nefeclarke@gmail.com" variant="primary" className="px-10 py-4">
                <Mail size={20} /> Let&apos;s Work Together
              </MagneticButton>

              <MagneticButton href="https://www.linkedin.com/in/nefe-damatie-/" variant="secondary" className="px-10 py-4">
                <Linkedin size={20} /> LinkedIn Profile
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-12 border-t border-slate-800 space-y-4"
            >
              <p className="text-gray-400">Lagos, Nigeria | +234 813 929 6581</p>
              <p className="text-gray-500 text-sm">© 2026 Nefe Clarke. All rights reserved.</p>
            </motion.div>
          </motion.div>
        </ParallaxSection>
      </section>

      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 z-40"
          >
            <ArrowRight size={22} className="rotate-[-90deg]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
