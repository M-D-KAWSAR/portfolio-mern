import { useState, useEffect, useRef } from 'react';

const CATEGORIES = ['All', 'Web Development', 'AI / Machine Learning', 'Data Science', 'Tools'];

const CATEGORY_COLORS = {
  'Web Development': 'from-cyan-500 to-blue-600',
  'AI / Machine Learning': 'from-violet-500 to-purple-600',
  'Data Science': 'from-emerald-500 to-teal-600',
  'Tools': 'from-orange-500 to-amber-600',
};

function SkillBar({ skill, animate }) {
  return (
    <div className="glass rounded-xl p-4 glass-hover card-glow group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-200">{skill.name}</span>
        <span className="text-xs text-slate-500 font-mono">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${CATEGORY_COLORS[skill.category] ?? 'from-cyan-500 to-violet-600'} transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${skill.proficiency}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  const [active, setActive] = useState('All');
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimate(true), 200);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = active === 'All' ? skills : skills.filter((s) => s.category === active);
  const availableCategories = CATEGORIES.filter(
    (c) => c === 'All' || skills.some((s) => s.category === c)
  );

  return (
    <section id="skills" className="section-divider bg-navy-800/30">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">What I Know</span>
          <h2 className="section-heading mt-2">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Spanning web development, AI/ML, and data science with hands-on project experience.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setAnimate(false); setTimeout(() => setAnimate(true), 50); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'glass text-slate-400 hover:text-white glass-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        {active === 'All' ? (
          CATEGORIES.filter((c) => c !== 'All' && skills.some((s) => s.category === c)).map((cat) => (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-6 rounded-full bg-gradient-to-b ${CATEGORY_COLORS[cat]}`} />
                <h3 className="font-display font-semibold text-white">{cat}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {skills.filter((s) => s.category === cat).map((skill) => (
                  <SkillBar key={skill._id} skill={skill} animate={animate} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((skill) => (
              <SkillBar key={skill._id} skill={skill} animate={animate} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
