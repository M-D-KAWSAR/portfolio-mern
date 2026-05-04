import { useEffect, useRef, useState } from 'react';

function StatCard({ value, label }) {
  return (
    <div className="glass rounded-2xl p-5 text-center card-glow">
      <div className="font-display font-bold text-3xl gradient-text mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

export default function About({ profile }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!profile) return null;

  return (
    <section id="about" className="section-divider">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Who I Am</span>
          <h2 className="section-heading mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Bio */}
          <div className="md:col-span-3 space-y-5">
            <div className="glass rounded-2xl p-8 card-glow">
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                {profile.name}
              </h3>
              {profile.bio ? (
                profile.bio.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-400 leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-slate-400 leading-relaxed">
                  {profile.shortBio}
                </p>
              )}
            </div>

            {/* Quick info */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📍', label: 'Location', value: profile.location },
                { icon: '✉️', label: 'Email', value: profile.email },
                { icon: '💼', label: 'Status', value: profile.openToWork ? 'Open to work' : 'Not available' },
                { icon: '⏳', label: 'Experience', value: profile.yearsOfExperience ? `${profile.yearsOfExperience} years` : null },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label} className="flex items-start gap-3 glass rounded-xl p-4 glass-hover">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
                      <div className="text-sm text-slate-200 font-medium mt-0.5">{item.value}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 space-y-4">
            <StatCard value={profile.yearsOfExperience ? `${profile.yearsOfExperience}+` : '3+'} label="Years Experience" />
            <StatCard value="15+" label="Projects Built" />
            <StatCard value="3" label="Domains" />

            {/* Links */}
            <div className="glass rounded-2xl p-5 space-y-3">
              {[
                { href: profile.github, label: 'GitHub', icon: '🐙' },
                { href: profile.linkedin, label: 'LinkedIn', icon: '💼' },
                { href: profile.resumeLink, label: 'Resume / CV', icon: '📄' },
              ]
                .filter((l) => l.href)
                .map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span>{l.icon}</span>
                    <span className="group-hover:underline">{l.label}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
