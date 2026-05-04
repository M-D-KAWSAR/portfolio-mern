import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api';

const FIELDS = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Kawsar Ahmed' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { key: 'location', label: 'Location', type: 'text', placeholder: 'Dhaka, Bangladesh' },
  { key: 'yearsOfExperience', label: 'Years of Experience', type: 'text', placeholder: '3+' },
  { key: 'profileImage', label: 'Profile Image URL', type: 'url', placeholder: 'https://...' },
  { key: 'resumeLink', label: 'Resume / CV Link', type: 'url', placeholder: 'https://...' },
  { key: 'github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/...' },
  { key: 'twitter', label: 'Twitter URL', type: 'url', placeholder: 'https://twitter.com/...' },
];

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '', email: '', location: '', yearsOfExperience: '',
    profileImage: '', resumeLink: '', github: '', linkedin: '', twitter: '',
    shortBio: '', bio: '', titles: '', openToWork: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile()
      .then((p) => setForm({
        ...p,
        titles: Array.isArray(p.titles) ? p.titles.join('\n') : (p.titles ?? ''),
      }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess(false);
    try {
      const payload = {
        ...form,
        titles: form.titles.split('\n').map((t) => t.trim()).filter(Boolean),
      };
      await updateProfile(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your public portfolio profile</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Basic fields */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-5">Basic Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-input"
                  placeholder={placeholder}
                  value={form[key] ?? ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Typing titles */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-1">Typing Animation Titles</h2>
          <p className="text-xs text-slate-500 mb-4">One title per line — shown in the hero typing effect</p>
          <textarea
            className="form-input h-28 resize-none"
            placeholder="AI Developer&#10;Data Scientist&#10;Full Stack Developer"
            value={form.titles}
            onChange={(e) => handleChange('titles', e.target.value)}
          />
        </div>

        {/* Bio */}
        <div className="card p-6">
          <h2 className="font-semibold text-white mb-5">Bio</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Short Bio (Hero section)</label>
              <input
                type="text"
                className="form-input"
                placeholder="One-line introduction shown in hero..."
                value={form.shortBio ?? ''}
                onChange={(e) => handleChange('shortBio', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Full Bio (About section)</label>
              <textarea
                className="form-input h-36 resize-none"
                placeholder="Longer biography shown in the About section. Separate paragraphs with a blank line."
                value={form.bio ?? ''}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Open to work */}
        <div className="card p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
              checked={form.openToWork ?? true}
              onChange={(e) => handleChange('openToWork', e.target.checked)}
            />
            <div>
              <div className="text-sm font-medium text-white">Open to Work</div>
              <div className="text-xs text-slate-500">Shows the &ldquo;Available for hire&rdquo; badge on the portfolio</div>
            </div>
          </label>
        </div>

        {/* Feedback */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 text-sm text-emerald-400">
            Profile saved successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            'Save Profile'
          )}
        </button>
      </form>
    </div>
  );
}
