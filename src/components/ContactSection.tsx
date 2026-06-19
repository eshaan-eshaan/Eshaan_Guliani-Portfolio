import React, { useState } from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const SERVICES = [
  "Website",
  "Mobile App",
  "Web App",
  "E-Commerce",
  "Visual Identity",
  "3D & Motion",
  "Digital Marketing",
  "Growth & Consulting",
  "Other"
];

interface SocialBtnProps {
  href: string;
  icon: React.ReactNode;
  className: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ href, icon, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
  >
    {icon}
  </a>
);

export const ContactSection: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleService = (service: string) => {
    if (selected.includes(service)) {
      setSelected(selected.filter(item => item !== service));
    } else {
      setSelected([...selected, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSending(true);
    setError(null);

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;

    // Fallback/Demo mode if webhook is not configured yet
    if (!webhookUrl) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSending(false);
      setSent(true);
      return;
    }

    try {
      // Send message to Google Sheets script
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Bypasses CORS requirements for Google Apps Script Web Apps
        body: JSON.stringify({
          name,
          email,
          message,
          services: selected
        })
      });
      
      setSent(true);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please check your connection or contact me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-[#0C0C0C] p-3 sm:p-4 md:p-6 flex flex-col justify-center relative w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Outer Card Container */}
      <div className="relative w-full mx-auto max-w-7xl rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)] flex flex-col">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          src={VIDEO_URL} 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8 gap-6 min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full w-full">


          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Bottom Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 w-full">
            {/* Headline (Left) */}
            <p className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0 select-none">
              We craft bold ideas
              <br />
              and ship them as <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>products</span>
            </p>

            {/* Contact Form Card (Right) */}
            <div id="contact-form-anchor" className="w-full lg:w-[min(480px,45%)] shrink-0 z-10">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                {/* 1. Heading */}
                <h3 className="text-xl sm:text-2xl font-semibold text-black tracking-tight select-none">
                  Say hello! , Let&apos;s Connect!👋
                </h3>

                {/* 2. Email & Socials Row */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                  <div className="flex flex-col truncate">
                    <span className="text-xs text-gray-400 select-none">Drop us a line</span>
                    <a 
                      href="mailto:eshaan1311@gmail.com" 
                      className="text-sm text-blue-600 font-semibold hover:underline truncate"
                    >
                      eshaan1311@gmail.com
                    </a>
                  </div>
                  
                  {/* Social Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <SocialBtn 
                      href="https://sites.google.com/view/eshaanguliani/home?authuser=0" 
                      icon={<Globe size={16} />} 
                      className="bg-purple-100 text-purple-600 hover:bg-purple-200" 
                    />
                    <SocialBtn 
                      href="https://github.com/eshaan-eshaan" 
                      icon={<Github size={16} />} 
                      className="bg-gray-100 text-gray-900 hover:bg-gray-200" 
                    />
                    <SocialBtn 
                      href="https://www.linkedin.com/in/eshaan-guliani-b14489344" 
                      icon={<Linkedin size={16} />} 
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200" 
                    />
                  </div>
                </div>

                {/* 3. OR Divider */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 font-medium text-xs select-none">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* 4. Form / Success State */}
                {!sent ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-black select-none">
                        Tell us about your vision
                      </label>
                      
                      {/* Name + Email Inputs */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you looking to build or improve..."
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none transition"
                    />

                    {/* Service Tags */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium text-gray-500 select-none">I need help with...</span>
                      <div className="flex flex-wrap gap-1.5">
                        {SERVICES.map(service => {
                          const isActive = selected.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                                isActive 
                                  ? "bg-gray-100 text-black border-black" 
                                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Error message */}
                    {error && (
                      <p className="text-xs text-red-500 text-center select-none font-medium">
                        {error}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sending || !name || !email || !message}
                      className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      {sending ? "Sending..." : "Send my message"}
                    </button>
                  </form>
                ) : (
                  /* 5. Success State */
                  <div className="py-6 gap-3 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-semibold select-none">
                      ✓
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 select-none">
                      You&apos;re all set!
                    </h4>
                    <p className="text-sm text-gray-500 select-none">
                      Expect a reply within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
