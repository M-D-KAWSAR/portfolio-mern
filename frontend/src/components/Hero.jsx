import { useState, useEffect, useRef } from 'react';
import { fetchCVConfig } from '../api';
import { getTemplate } from './cv-templates';

function useTyping(texts, speed = 90) {
  const [display, setDisplay] = useState('');
  const idx = useRef(0);
  const char = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    if (!texts?.length) return;
    let timer;

    const tick = () => {
      const current = texts[idx.current % texts.length];

      if (!deleting.current) {
        char.current += 1;
        setDisplay(current.slice(0, char.current));

        if (char.current >= current.length) {
          deleting.current = true;
          timer = setTimeout(tick, 2200);
          return;
        }
      } else {
        char.current -= 1;
        setDisplay(current.slice(0, char.current));

        if (char.current <= 0) {
          deleting.current = false;
          idx.current += 1;
          timer = setTimeout(tick, 400);
          return;
        }
      }

      timer = setTimeout(tick, deleting.current ? 45 : speed);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [texts, speed]);

  return display;
}

export default function Hero({ profile, skills = [], projects = [] }) {
  const typedText = useTyping(profile?.titles);
  const cvRef = useRef(null);
  const cvWrapperRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [cvConfig, setCvConfig] = useState(null);

  useEffect(() => {
    fetchCVConfig().then(setCvConfig).catch(() => {});
  }, []);

  const TemplateComponent = getTemplate(cvConfig?.templateId || 'classic');

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleDownloadCV = async () => {
    const wrapper = cvWrapperRef.current;
    const target = cvRef.current;
    if (!wrapper || !target) return;
    setDownloading(true);

    // Temporarily reveal element so html2canvas can capture it
    const saved = { position: wrapper.style.position, left: wrapper.style.left, top: wrapper.style.top, visibility: wrapper.style.visibility, zIndex: wrapper.style.zIndex };
    wrapper.style.position = 'fixed';
    wrapper.style.left = '0px';
    wrapper.style.top = '0px';
    wrapper.style.visibility = 'visible';
    wrapper.style.zIndex = '99999';

    try {
      await new Promise((r) => setTimeout(r, 80));
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${profile?.name?.replace(/\s+/g, '_') || 'Portfolio'}.pdf`);
    } catch (err) {
      console.error('CV generation failed:', err);
    } finally {
      Object.assign(wrapper.style, saved);
      setDownloading(false);
    }
  };

  // Use published CV data from admin if available, else fall back to portfolio data
  const cvData = cvConfig?.cvData?.name
    ? cvConfig.cvData
    : {
        name: profile?.name || '',
        title: profile?.titles?.[0] || '',
        email: profile?.email || '',
        phone: '',
        location: profile?.location || '',
        linkedin: profile?.linkedin || '',
        github: profile?.github || '',
        profileImage: profile?.profileImage || '',
        summary: profile?.bio || profile?.shortBio || '',
        education: [],
        experience: [],
        skills: skills.map((s) => ({ name: s.name, category: s.category })),
        projects: projects.map((p) => ({ title: p.title, description: p.description, techStack: p.techStack || [] })),
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-up order-2 md:order-1">
            {profile?.openToWork && (
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6 border border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for hire
              </div>
            )}

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              Hi, I&apos;m{' '}
              <span className="gradient-text text-glow block">
                {profile?.name ?? 'Developer'}
              </span>
            </h1>

            <div className="h-10 mb-5 flex items-center">
              <span className="text-xl sm:text-2xl text-slate-300 font-medium">
                {typedText}
                <span className="animate-blink text-cyan-400 ml-0.5">|</span>
              </span>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              {profile?.shortBio ?? 'Building intelligent, scalable applications at the intersection of AI and modern web technology.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('#projects')} className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Projects
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-outline">
                Get in Touch
              </button>
              <button
                onClick={handleDownloadCV}
                disabled={downloading}
                className="btn-outline"
              >
                {downloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CV
                  </>
                )}
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 mt-10">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center order-1 md:order-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 animate-spin-slow p-0.5">
                <div className="w-full h-full rounded-full bg-navy-900" />
              </div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 blur-xl" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-white/10 animate-float">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center">
                    <svg className="w-24 h-24 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {profile?.location && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 flex items-center gap-1.5 whitespace-nowrap border border-white/10">
                  <span>📍</span> {profile.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>

      {/* Off-screen CV for PDF capture — visibility toggled programmatically */}
      <div
        ref={cvWrapperRef}
        style={{ position: 'fixed', left: '-9999px', top: '0px', visibility: 'hidden', pointerEvents: 'none', zIndex: -1 }}
      >
        <div ref={cvRef}>
          <TemplateComponent cvData={cvData} />
        </div>
      </div>
    </section>
  );
}
