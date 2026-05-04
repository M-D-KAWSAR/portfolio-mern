export default function Footer({ profile }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {year}{' '}
          <span className="gradient-text font-semibold">{profile?.name ?? 'Portfolio'}</span>
          {' '}— Built with React & Node.js
        </p>
        <div className="flex items-center gap-6">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-white text-sm transition-colors"
            >
              GitHub
            </a>
          )}
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-white text-sm transition-colors"
            >
              LinkedIn
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-600 hover:text-cyan-400 text-sm transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
