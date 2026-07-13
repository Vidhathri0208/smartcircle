/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Building, Landmark, Compass, AlertCircle, Check } from 'lucide-react';
import { PageRoute } from '../types';

interface ContactProps {
  onNavigate: (path: PageRoute) => void;
  presetService: string;
  onClearPreset: () => void;
}

export default function Contact({ onNavigate, presetService, onClearPreset }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: presetService || 'Movie Production & Marketing',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const servicesOpts = [
    'Movie Production & Marketing',
    'Brand Marketing',
    'Celebrity PR & Representation',
    'Creative Production',
    'YouTube Management & Strategy'
  ];

  // Real-time validation function
  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    // Name Validation
    if (!formData.name) {
      newErrors.name = 'Your name or organization is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Must be at least 3 characters.';
    }

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address (e.g., name@domain.com).';
    }

    // Phone Validation
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required for direct alignment.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Enter at least 10 digits (e.g., +91 98765 43210).';
    }

    // Message Validation
    if (!formData.message) {
      newErrors.message = 'A brief project description is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Description must be at least 10 characters.';
    }

    return newErrors;
  };

  const derivedErrors = validate();
  const hasErrors = Object.values(derivedErrors).some(err => err !== '');

  const handleBlur = (field: 'name' | 'email' | 'phone' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: 'name' | 'email' | 'phone' | 'message', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Instantly validate once they've started interacting
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    // Mark all as touched to show errors if any
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    if (hasErrors) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitted(true);
        onClearPreset();
      } else {
        setSubmitError(result.error || 'Failed to send email. Please check your credentials.');
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError('An error occurred. Please check your connection and SMTP settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#050505] text-[#e0e0e0] w-full overflow-hidden" id="contact-page">
      
      {/* HEADER SPLASH */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              GET IN TOUCH
            </span>
          </div>

          <h1 className="font-sans font-bold text-4xl sm:text-6xl tracking-tighter leading-tight text-white">
            Apply to the Circle.
          </h1>

          <p className="font-sans text-white/40 text-sm md:text-lg max-w-xl mx-auto tracking-wide leading-relaxed font-light">
            We operate fully customized, highly discreet, and resource-intensive strategic partnerships. Onboard secure alignment today.
          </p>
        </div>
      </section>

      {/* CORE CONTACT INTERFACES */}
      <section className="py-24 md:py-32 relative z-10 px-6 md:px-12 bg-[#050505] min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: INFO CARD */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold">OUR HEADQUARTERS</div>
              <h2 className="font-sans font-bold text-3xl text-white tracking-tight leading-tight">
                The Star Circle Directorate.
              </h2>
              <p className="font-sans text-white/40 text-sm tracking-wide leading-relaxed font-light">
                We are situated in the prestigious tech corridor of Hyderabad. All consultations and casting evaluations require a pre-scheduled appointment.
              </p>
            </div>

            {/* LOCATION DETAILS LIST */}
            <div className="space-y-6" id="contact-details-panel">
              <div className="flex items-start space-x-4 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-colors">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-sans font-semibold text-sm text-white">Registered Address</h3>
                  <p className="font-sans text-zinc-400 text-xs tracking-wide leading-relaxed">
                    Road No. 3, Banjara Hills, Hyderabad, Telangana State, Pin: 500034, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-colors">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-sans font-semibold text-sm text-white">Direct Terminal</h3>
                  <p className="font-sans text-zinc-400 text-xs tracking-wide leading-relaxed">
                    +91 40 4600 7890 <br />
                    Mon – Fri, 10:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-amber-400/30 transition-colors">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-sans font-semibold text-sm text-white">Discreet Contact Email</h3>
                  <p className="font-sans text-zinc-400 text-xs tracking-wide leading-relaxed">
                    hello@thestarcircle.com <br />
                    partner@thestarcircle.com
                  </p>
                </div>
              </div>
            </div>

            {/* DISCRETION STAMP */}
            <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl flex items-start space-x-3 text-zinc-500 font-mono text-[10px] tracking-wide leading-relaxed select-none">
              <Compass className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                AUTHENTICITY NOTICE: All queries undergo primary evaluation. Script structures and client IP values sent to Star Circle are held under secure credential custody.
              </span>
            </div>
          </div>

          {/* RIGHT: FLOATING GLASSMORPHISM FORM */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl" id="floating-glass-contact">
              
              {/* Background ambient glow inside container */}
              <div className="absolute top-0 right-1/4 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="text-sm font-semibold tracking-widest text-amber-500 uppercase border-b border-white/5 pb-4 mb-4 font-mono flex items-center justify-between">
                      <span>CONSULTATION INQUIRY</span>
                      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                    </div>

                    {/* NAME Input Field */}
                    <div className="space-y-2" id="contact-field-name-group">
                      <div className="flex justify-between items-center">
                        <label htmlFor="form-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                          Your Name / Organization
                        </label>
                        {touched.name && (
                          <span className="font-mono text-[10px] uppercase tracking-wider flex items-center">
                            {derivedErrors.name ? (
                              <span className="text-red-500 flex items-center gap-1 font-semibold">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Invalid
                              </span>
                            ) : (
                              <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                                <Check className="w-3.5 h-3.5 shrink-0" /> Verified
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Enter full name"
                        className={`w-full bg-[#050505] border rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all font-sans ${
                          touched.name
                            ? derivedErrors.name
                              ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                            : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        }`}
                      />
                      {touched.name && derivedErrors.name && (
                        <p className="text-xs text-red-500/80 font-sans tracking-wide pl-1 animate-pulse" id="name-error-msg">
                          {derivedErrors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL & PHONE Grid container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* EMAIL Input Field */}
                      <div className="space-y-2" id="contact-field-email-group">
                        <div className="flex justify-between items-center">
                          <label htmlFor="form-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                            Contact Email Address
                          </label>
                          {touched.email && (
                            <span className="font-mono text-[10px] uppercase tracking-wider flex items-center">
                              {derivedErrors.email ? (
                                <span className="text-red-500 flex items-center gap-1 font-semibold">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Invalid
                                </span>
                              ) : (
                                <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                                  <Check className="w-3.5 h-3.5 shrink-0" /> Verified
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        <input
                          type="email"
                          id="form-email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="partner@studio.com"
                          className={`w-full bg-[#050505] border rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all font-sans ${
                            touched.email
                              ? derivedErrors.email
                                ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                              : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                          }`}
                        />
                        {touched.email && derivedErrors.email && (
                          <p className="text-xs text-red-500/80 font-sans tracking-wide pl-1 animate-pulse" id="email-error-msg">
                            {derivedErrors.email}
                          </p>
                        )}
                      </div>

                      {/* PHONE Input Field */}
                      <div className="space-y-2" id="contact-field-phone-group">
                        <div className="flex justify-between items-center">
                          <label htmlFor="form-phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                            Direct Phone Terminal
                          </label>
                          {touched.phone && (
                            <span className="font-mono text-[10px] uppercase tracking-wider flex items-center">
                              {derivedErrors.phone ? (
                                <span className="text-red-500 flex items-center gap-1 font-semibold">
                                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Invalid
                                </span>
                              ) : (
                                <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                                  <Check className="w-3.5 h-3.5 shrink-0" /> Verified
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                        <input
                          type="tel"
                          id="form-phone"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="e.g., +91 98765 43210"
                          className={`w-full bg-[#050505] border rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all font-sans ${
                            touched.phone
                              ? derivedErrors.phone
                                ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                              : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                          }`}
                        />
                        {touched.phone && derivedErrors.phone && (
                          <p className="text-xs text-red-500/80 font-sans tracking-wide pl-1 animate-pulse" id="phone-error-msg">
                            {derivedErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* SERVICE DROPDOWN SELECT */}
                    <div className="space-y-2" id="contact-field-service-group">
                      <label htmlFor="form-service" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                        Service Needed
                      </label>
                      <select
                        id="form-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                      >
                        {servicesOpts.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* MESSAGE Message Area */}
                    <div className="space-y-2" id="contact-field-message-group">
                      <div className="flex justify-between items-center">
                        <label htmlFor="form-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                          Brief Project Description
                        </label>
                        {touched.message && (
                          <span className="font-mono text-[10px] uppercase tracking-wider flex items-center">
                            {derivedErrors.message ? (
                              <span className="text-red-500 flex items-center gap-1 font-semibold">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> Invalid
                              </span>
                            ) : (
                              <span className="text-emerald-500 flex items-center gap-1 font-semibold">
                                <Check className="w-3.5 h-3.5 shrink-0" /> Verified
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Briefly state your timeline, requirements, and goal objectives..."
                        className={`w-full bg-[#050505] border rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none transition-all font-sans resize-none ${
                          touched.message
                            ? derivedErrors.message
                              ? 'border-red-500/40 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                            : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        }`}
                      />
                      {touched.message && derivedErrors.message && (
                        <p className="text-xs text-red-500/80 font-sans tracking-wide pl-1 animate-pulse" id="message-error-msg">
                          {derivedErrors.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-500 font-sans tracking-wide text-center" id="submit-error-msg">
                        {submitError}
                      </p>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      id="contact-form-submit"
                      disabled={loading || (hasErrors && Object.values(touched).some(v => v))}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none disabled:cursor-not-allowed text-black py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_4px_15px_rgba(245,158,11,0.2)]"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 px-4 space-y-6 flex flex-col items-center justify-center"
                    id="contact-success-panel"
                  >
                    <CheckCircle className="w-16 h-16 text-amber-500 shadow-xl" />
                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-2xl text-white">Message Sent Successfully</h3>
                      <p className="font-sans text-white/40 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-light">
                        Thank you for your submission, <strong className="text-white">{formData.name}</strong>. Your inquiries have been received securely. An agent will evaluate your request and contact you within 24 hours.
                      </p>
                    </div>

                    <div className="pt-4 flex w-full flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto px-6 py-3 bg-zinc-900 border border-white/5 hover:border-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Return Home
                      </button>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-black rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Send Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
