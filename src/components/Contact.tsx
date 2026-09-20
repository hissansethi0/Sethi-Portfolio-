import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Linkedin, Github, Send, 
  CheckCircle2, AlertCircle, Phone, MapPin, ArrowRight 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { profile, sendContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full Stack Web App',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanWhatsAppNumber = profile.whatsapp.replace(/[^0-9]/g, '');

  const projectTypes = [
    'Full Stack Web App',
    'Responsive Website',
    'E-commerce Store',
    'Admin Dashboard',
    'API & Backend',
    'Other Inquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all contact fields before submitting.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `[${formData.projectType}] Portfolio Inquiry from ${formData.name.trim()}`,
        message: formData.message.trim(),
      });

      setSuccess(true);
      setFormData({ name: '', email: '', projectType: 'Full Stack Web App', message: '' });
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      setError(err?.message || 'Failed to dispatch message. Please try again or reach out directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/[0.08] bg-[#05070A] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2 mb-14">
          <div className="text-xs font-mono font-semibold tracking-wider text-[#2D8CFF] uppercase">
            CONTACT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have a project <span className="text-[#2D8CFF]">in mind?</span>
          </h2>
          <p className="text-[#7F8A9A] text-base max-w-2xl">
            Let's build something useful, fast and well-designed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Highlight */}
            <div className="p-6 rounded-2xl bg-[#0D141E] border border-[#1683FF]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#1683FF]/15 border border-[#1683FF]/30 flex items-center justify-center text-[#2D8CFF]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-[#1683FF]/20 text-[#2D8CFF] border border-[#1683FF]/40">
                  Fastest Response
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Direct WhatsApp</h3>
                <p className="text-xs text-[#7F8A9A] mt-1 leading-relaxed">
                  Available for immediate project scoping, consultation, and inquiries.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#080C12] border border-white/[0.08] font-mono text-sm text-[#2D8CFF] font-semibold flex items-center justify-between">
                <span>{profile.whatsapp}</span>
                <span className="text-xs text-[#7F8A9A]">Peshawar, PK</span>
              </div>

              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hi Hissan, I saw your portfolio and would like to discuss a project!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(22,131,255,0.35)]"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Details Card */}
            <div className="p-6 rounded-2xl bg-[#0D141E] border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#7F8A9A]">
                Contact Information
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080C12] border border-white/[0.04]">
                  <MapPin className="w-4 h-4 text-[#2D8CFF] shrink-0" />
                  <div>
                    <div className="text-[#7F8A9A]">Location</div>
                    <div className="font-semibold text-white">{profile.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080C12] border border-white/[0.04]">
                  <Phone className="w-4 h-4 text-[#2D8CFF] shrink-0" />
                  <div>
                    <div className="text-[#7F8A9A]">Phone / WhatsApp</div>
                    <div className="font-semibold text-white">{profile.whatsapp}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080C12] border border-white/[0.04]">
                  <Mail className="w-4 h-4 text-[#2D8CFF] shrink-0" />
                  <div>
                    <div className="text-[#7F8A9A]">Email Address</div>
                    <div className="font-semibold text-white">{profile.email}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#080C12] hover:bg-[#111A26] border border-white/[0.08] hover:border-[#2D8CFF]/40 text-[#B7C1D1] hover:text-[#2D8CFF] text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#080C12] hover:bg-[#111A26] border border-white/[0.08] hover:border-[#2D8CFF]/40 text-[#B7C1D1] hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141E] border border-white/[0.08] shadow-2xl">
              
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-[#7F8A9A] mb-6">
                Fill out the project details below and I'll respond within 24 hours.
              </p>

              {/* Success notification */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-[#1683FF]/15 border border-[#1683FF]/40 flex items-start gap-3 text-[#2D8CFF] text-xs animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-white">Message Received!</div>
                    <div className="mt-0.5 text-[#B7C1D1]">Thank you for reaching out. Your inquiry has been stored securely, and I will get back to you shortly.</div>
                  </div>
                </div>
              )}

              {/* Error notification */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-400 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-white">Message Submission Issue</div>
                    <div className="mt-0.5">{error}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#B7C1D1]">
                      Your Name <span className="text-[#2D8CFF]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#080C12] border border-white/[0.08] focus:border-[#2D8CFF] focus:outline-none text-white text-sm placeholder-[#7F8A9A] transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#B7C1D1]">
                      Email Address <span className="text-[#2D8CFF]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#080C12] border border-white/[0.08] focus:border-[#2D8CFF] focus:outline-none text-white text-sm placeholder-[#7F8A9A] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#B7C1D1]">
                    Project Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3 py-2 text-xs font-mono rounded-xl border transition-all text-left truncate ${
                          formData.projectType === type
                            ? 'bg-[#1683FF]/15 text-[#2D8CFF] border-[#2D8CFF]'
                            : 'bg-[#080C12] text-[#7F8A9A] border-white/[0.06] hover:text-[#B7C1D1]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#B7C1D1]">
                    Project Details & Scope <span className="text-[#2D8CFF]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you're looking to build, expected timelines, or any key features..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#080C12] border border-white/[0.08] focus:border-[#2D8CFF] focus:outline-none text-white text-sm placeholder-[#7F8A9A] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#1683FF] hover:bg-[#2D8CFF] text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(22,131,255,0.35)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
