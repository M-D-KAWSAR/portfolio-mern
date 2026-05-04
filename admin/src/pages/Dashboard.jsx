import { useState, useEffect } from 'react';
import { getProfile, getProjects, getSkills } from '../api';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color ?? 'text-white'}`}>{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProfile(), getProjects(), getSkills()])
      .then(([p, pr, sk]) => { setProfile(p); setProjects(pr); setSkills(sk); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const byCategory = (arr, field = 'category') =>
    arr.reduce((acc, item) => {
      acc[item[field]] = (acc[item[field]] ?? 0) + 1;
      return acc;
    }, {});

  const projectCats = byCategory(projects);
  const skillCats = byCategory(skills);

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
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Overview of your portfolio — {profile?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Projects" value={projects.length} color="text-indigo-400" />
        <StatCard label="Total Skills" value={skills.length} color="text-emerald-400" />
        <StatCard label="Featured Projects" value={projects.filter((p) => p.featured).length} color="text-amber-400" />
        <StatCard label="Open to Work" value={profile?.openToWork ? 'Yes' : 'No'} color={profile?.openToWork ? 'text-emerald-400' : 'text-red-400'} />
      </div>

      {/* Projects breakdown */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-5">
          <h2 className="font-semibold text-white mb-4">Projects by Category</h2>
          <div className="space-y-3">
            {Object.entries(projectCats).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-400">{cat}</span>
                  <span className="text-slate-300 font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(count / projects.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold text-white mb-4">Skills by Category</h2>
          <div className="space-y-3">
            {Object.entries(skillCats).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-400">{cat}</span>
                  <span className="text-slate-300 font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(count / skills.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent projects */}
      <div className="card">
        <div className="p-5 border-b border-slate-700/50">
          <h2 className="font-semibold text-white">Recent Projects</h2>
        </div>
        <div className="divide-y divide-slate-700/50">
          {projects.slice(0, 5).map((p) => (
            <div key={p._id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{p.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{p.category}</p>
              </div>
              {p.featured && (
                <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured
                </span>
              )}
              <div className="flex gap-2">
                {p.githubLink && (
                  <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-slate-300">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
