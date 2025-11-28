"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight, Download } from 'lucide-react';

export default function Home() {
  const [mobile, setMobile] = React.useState(false);
  const [nav, setNav] = React.useState(false);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            NEFE CLARKE
          </motion.div>
          
          {!mobile && (
            <div className="hidden md:flex gap-8">
              {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          )}
          
          <button onClick={() => setNav(!nav)} className="md:hidden">
            {nav ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {nav && mobile && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border-t border-slate-800">
            {['About', 'Experience', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-3 hover:bg-slate-800 transition-colors" onClick={() => setNav(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-20 px-4 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          ref={parallaxRef}
          className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div {...fadeInUp}>
            <motion.div className="mb-6 text-center! md:text-left!" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-cyan-400 font-semibold">Welcome to my portfolio</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl text-center! md:text-left! font-bold mb-6 leading-tight">
              Customer Success Specialist, Project Manager,  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Automation Engineer</span>
            </h1>
            
            <p className="text-xl text-center! md:text-left! text-gray-300 mb-8 max-w-xl">
              Customer focused professional transforming support into strategic growth. 5+ years driving retention, satisfaction, and revenue through human first solutions and project manager.
            </p>
            
            <div className="flex gap-4 flex-wrap justify-center! md:justify-start!">
              <motion.a href="#contact" whileHover={{ scale: 1.05 }} className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Get in Touch <ArrowRight size={20} />
              </motion.a>
              <motion.a href="#experience" whileHover={{ scale: 1.05 }} className="px-8 py-3 border-2 border-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all">
                View Experience
              </motion.a>
            </div>

            <div className="flex gap-6 mt-12 justify-center! md:justify-start!">
              {[
                { icon: Linkedin, url: 'https://www.linkedin.com/in/nefe-damatie-/', label: 'LinkedIn' },
                { icon: Mail, url: 'mailto:nefeclarke@gmail.com', label: 'Email' }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 border border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400/20 transition-all"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* <motion.div 
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl"></div>
            <img 
              src="https://ik.imagekit.io/iqrpbu3nv/WhatsApp_Image_2025-11-28_at_3.08.32_PM-removebg-preview.png?w=600&h=600&fit=crop"
              alt="Professional"
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/30"></div>
          </motion.div> */}
          <motion.div 
            className="relative h-96 md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Animated background circles */}
            <div className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute w-80 h-80 bg-gradient-to-tl from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            
            {/* Image container with enhanced styling */}
            <div className="relative w-full h-full max-w-sm">
              {/* Outer glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-cyan-500/50 rounded-3xl blur-xl opacity-75 -z-10"></div>
              
              {/* Inner card */}
              <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-1">
                {/* Glass effect border */}
                <div className="absolute inset-0 rounded-3xl border border-cyan-400/40 pointer-events-none"></div>
                
                {/* Image with proper background */}
                <div className="relative h-full w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl overflow-hidden flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/iqrpbu3nv/WhatsApp_Image_2025-11-28_at_12.59.02_PM-removebg-preview.png?updatedAt=1764337265102"
                    alt="Professional"
                    className="h-full w-full object-contain p-4"
                  />
                  
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20 pointer-events-none rounded-3xl"></div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-3xl"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {[
            { number: '5+', label: 'Years Experience' },
            { number: '8500+', label: 'Issues Resolved' },
            { number: '97%', label: 'Satisfaction Rate' },
            { number: '87%', label: 'LTV Increase' }
          ].map((stat, i) => (
            <motion.div key={i} {...fadeInUp} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <motion.div className="max-w-6xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img 
                src="https://ik.imagekit.io/iqrpbu3nv/WhatsApp%20Image%202025-11-28%20at%203.13.28%20PM.jpeg?w=800&q=80"
                alt="Customer Support"
                className="rounded-xl border border-cyan-400/20"
              />
            </motion.div>
            
            <motion.div {...fadeInUp} className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a customer focused professional dedicated to transforming support into strategic growth. With 5+ years spanning customer support, project management, and email marketing, I've consistently delivered tangible outcomes that directly impact bottom line metrics.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                My approach combines empathetic communication with data driven insights. I don't just resolve issues I identify patterns, anticipate needs, and create retention strategies that turn customers into advocates.
              </p>

              <div className="grid grid-cols-2 gap-4 py-6">
                {['87% LTV Increase', '92% Retention', '48% Email Open Rate', '342% Lead Growth'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/50">
        <motion.div className="max-w-6xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Experience</h2>
          
          <div className="space-y-8">
            {[
              
              {
                title: 'Customer Support & Email Marketing',
                company: 'Qwoted',
                location: 'New York, USA',
                period: 'Jan 2023 - Present',
                highlights: ['8,500+ inquiries resolved', '97% satisfaction rate', '187% lead quality increase', '68% response time reduction']
              },
              {
                title: 'Project Manager',
                company: 'Intelligent Innovations',
                location: 'Lagos, Nigeria',
                period: 'Nov 2021 - Oct 2023',
                highlights: ['Managed 5-6 concurrent projects with 94% on-time delivery', 'Reduced team idle time by 35%, boosting utilization to 57%', 'Developed proactive risk mitigation strategies preventing delays', 'Created detailed timelines reducing scope surprises by 40%']
              },
              {
                title: 'Customer Care Executive',
                company: 'Phixeon Technologies',
                location: 'Lagos, Nigeria',
                period: 'Sep 2019 - Oct 2021',
                highlights: ['30% duplicate reduction', '36 hour resolution time', '40% satisfaction increase', 'Quarterly trend reports']
              }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border-l-4 border-cyan-400 pl-8 py-4"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <p className="text-cyan-400 font-semibold">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-gray-400 whitespace-nowrap">{exp.period}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {exp.highlights.map((h, j) => (
                    <div key={j} className="text-sm bg-slate-800 px-3 py-2 rounded text-gray-300">{h}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <motion.div className="max-w-6xl mx-auto" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Customer Relations',
                skills: ['CRM & HubSpot', 'Conflict Resolution', 'Customer Retention', 'Multi-channel Support', 'First Contact Resolution']
              },
              {
                category: 'Project Management',
                skills: ['Timeline Development', 'Resource Allocation', 'Risk Management', 'Stakeholder Communication', 'Agile Methodology']
              },
              {
                category: 'Marketing & Analytics',
                skills: ['Email Marketing Campaigns', 'A/B Testing', 'Data Segmentation', 'KPI Analysis', 'Lead Generation']
              }
            ].map((skillSet, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">{skillSet.category}</h3>
                <div className="space-y-2">
                  {skillSet.skills.map((skill, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/50">
        <motion.div className="max-w-6xl mx-auto text-center" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to discuss how I can drive customer success for your organization? Let's connect.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.a 
              href="mailto:nefeclarke@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <Mail size={20} /> Send Email
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/in/nefe-damatie-/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 border-2 border-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all flex items-center gap-2"
            >
              <Linkedin size={20} /> LinkedIn Profile
            </motion.a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-12 border-t border-slate-800 space-y-4"
          >
            <p className="text-gray-400">📍 Lagos, Nigeria | 📞 +234 8139296581</p>
            <p className="text-gray-500 text-sm">© 2025 Damatie Ufuomanefe. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 transition-all z-40"
      >
        <ArrowRight size={20} className="rotate-[-90deg]" />
      </motion.button>
    </div>
  );
};

