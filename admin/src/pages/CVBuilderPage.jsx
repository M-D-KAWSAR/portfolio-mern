import { useState, useRef, useCallback, useEffect } from 'react';
import { getProfile, getProjects, getSkills, getCVConfig, saveCVConfig } from '../api';
import { TEMPLATES, getTemplate } from '../components/cv-templates';

const STORAGE_KEY = 'cv_builder_state';

const BLANK_CV = {
  name: '', title: '', email: '', phone: '', location: '',
  linkedin: '', github: '', profileImage: '', summary: '',
  education: [{ degree: '', institution: '', year: '' }],
  experience: [{ title: '', company: '', period: '', description: '' }],
  skills: [], projects: [],
};

const inp = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-colors';

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

async function capturePDF(wrapperRef, cvRef, filename) {
  const wrapper = wrapperRef.current;
  const target = cvRef.current;
  if (!wrapper || !target) throw new Error('No element');
  const saved = { position: wrapper.style.position, left: wrapper.style.left, top: wrapper.style.top, visibility: wrapper.style.visibility, zIndex: wrapper.style.zIndex };
  wrapper.style.position = 'fixed'; wrapper.style.left = '0px'; wrapper.style.top = '0px';
  wrapper.style.visibility = 'visible'; wrapper.style.zIndex = '99999';
  try {
    await new Promise(r => setTimeout(r, 80));
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
    const canvas = await html2canvas(target, { scale: 2, useCORS: true, backgroundColor: '#ffffff', width: 794, windowWidth: 794, logging: false });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, (canvas.height * pdfW) / canvas.width);
    pdf.save(filename);
  } finally {
    Object.assign(wrapper.style, saved);
  }
}

export default function CVBuilderPage() {
  const [mode, setMode] = useState(null);
  const [cvData, setCvData] = useState(BLANK_CV);
  const [templateId, setTemplateId] = useState('classic');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [publishedMsg, setPublishedMsg] = useState(false);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const cvRef = useRef(null);
  const cvWrapperRef = useRef(null);

  const TemplateComponent = getTemplate(templateId);

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { mode: m, cvData: d, templateId: tid, selectedProjectIds: ids, portfolioProjects: pp } = JSON.parse(raw);
        if (m) setMode(m);
        if (d) setCvData(d);
        if (tid) setTemplateId(tid);
        if (ids) setSelectedProjectIds(ids);
        if (pp) setPortfolioProjects(pp);
      }
    } catch { /* ignore */ }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, cvData, templateId, selectedProjectIds, portfolioProjects }));
    setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2200);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await saveCVConfig({ templateId, cvData });
      setPublishedMsg(true); setTimeout(() => setPublishedMsg(false), 3000);
    } catch (err) {
      console.error('Publish failed:', err);
      alert('Publish failed. Check backend connection.');
    } finally {
      setPublishing(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMode(null); setCvData(BLANK_CV); setTemplateId('classic');
    setPortfolioProjects([]); setSelectedProjectIds([]);
  };

  const loadFromPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const [profile, projects, skills] = await Promise.all([getProfile(), getProjects(), getSkills()]);
      setPortfolioProjects(projects);
      setSelectedProjectIds(projects.map(p => p._id));
      setCvData({
        name: profile.name || '', title: profile.titles?.[0] || '',
        email: profile.email || '', phone: '',
        location: profile.location || '', linkedin: profile.linkedin || '',
        github: profile.github || '', profileImage: profile.profileImage || '',
        summary: profile.bio || profile.shortBio || '',
        education: [{ degree: '', institution: '', year: '' }],
        experience: [{ title: '', company: '', period: '', description: '' }],
        skills: skills.map(s => ({ name: s.name, category: s.category })),
        projects: projects.map(p => ({ _id: p._id, title: p.title, description: p.description, techStack: p.techStack || [] })),
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  const handleModeSelect = (m) => {
    setMode(m);
    if (m === 'portfolio') loadFromPortfolio();
    else { setCvData(BLANK_CV); setPortfolioProjects([]); setSelectedProjectIds([]); }
  };

  const update = (f, v) => setCvData(p => ({ ...p, [f]: v }));
  const updateEdu = (i, f, v) => setCvData(p => { const a=[...p.education]; a[i]={...a[i],[f]:v}; return {...p,education:a}; });
  const addEdu = () => setCvData(p => ({ ...p, education:[...p.education,{degree:'',institution:'',year:''}] }));
  const removeEdu = i => setCvData(p => ({ ...p, education:p.education.filter((_,idx)=>idx!==i) }));
  const updateExp = (i, f, v) => setCvData(p => { const a=[...p.experience]; a[i]={...a[i],[f]:v}; return {...p,experience:a}; });
  const addExp = () => setCvData(p => ({ ...p, experience:[...p.experience,{title:'',company:'',period:'',description:''}] }));
  const removeExp = i => setCvData(p => ({ ...p, experience:p.experience.filter((_,idx)=>idx!==i) }));

  const updateSkillRaw = raw => {
    const skills = raw.split('\n').map(line => { const [name,category]=line.split('|').map(s=>s.trim()); return name?{name,category:category||'Technical'}:null; }).filter(Boolean);
    setCvData(p => ({ ...p, skills }));
  };
  const skillsRaw = cvData.skills.map(s=>`${s.name}|${s.category}`).join('\n');

  const toggleProject = id => {
    const newIds = selectedProjectIds.includes(id) ? selectedProjectIds.filter(p=>p!==id) : [...selectedProjectIds, id];
    setSelectedProjectIds(newIds);
    setCvData(p => ({ ...p, projects: portfolioProjects.filter(pr=>newIds.includes(pr._id)).map(pr=>({_id:pr._id,title:pr.title,description:pr.description,techStack:pr.techStack||[]})) }));
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try { await capturePDF(cvWrapperRef, cvRef, `CV_${(cvData.name||'Portfolio').replace(/\s+/g,'_')}.pdf`); }
    catch (err) { console.error(err); }
    finally { setDownloading(false); }
  };

  // ── Mode selector ───────────────────────────────────────────────────────────
  if (!mode) {
    return (
      <div className="max-w-2xl mx-auto mt-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">CV Builder</h1>
          <p className="text-slate-400">Choose how you want to build your CV</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <button onClick={() => handleModeSelect('portfolio')} className="card p-8 text-left hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-600/30 transition-colors">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">From Portfolio</h3>
            <p className="text-sm text-slate-400">Auto-fill from your portfolio data. Still fully editable.</p>
          </button>
          <button onClick={() => handleModeSelect('customize')} className="card p-8 text-left hover:border-violet-500/50 hover:bg-slate-800/80 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-600/30 transition-colors">
              <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Customize</h3>
            <p className="text-sm text-slate-400">Build your CV from scratch with full control.</p>
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-2 border-transparent border-t-indigo-400 border-r-violet-500 rounded-full animate-spin" /></div>;

  // ── Builder ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">CV Builder</h1>
            <p className="text-xs text-slate-500">{mode === 'portfolio' ? 'From Portfolio' : 'Customize'} · Template: <span className="text-indigo-400">{TEMPLATES.find(t=>t.id===templateId)?.name}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={handleSave} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm border border-slate-700 transition-colors">
            {savedMsg ? <><svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-emerald-400">Saved!</span></> : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>Save</>}
          </button>
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm border border-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Preview
          </button>
          <button onClick={handleDownloadPDF} disabled={downloading} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-60 text-white text-sm transition-colors">
            {downloading ? 'Generating…' : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download</>}
          </button>
          <button onClick={handlePublish} disabled={publishing} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors">
            {publishing ? 'Publishing…' : publishedMsg
              ? <><svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-emerald-300">Published!</span></>
              : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>Publish to Portfolio</>}
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="card p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
          Choose Template
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setTemplateId(t.id)}
              className={`flex-shrink-0 rounded-xl border-2 transition-all duration-200 overflow-hidden ${templateId === t.id ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105' : 'border-slate-700 hover:border-slate-500'}`}
            >
              {/* Color swatch preview */}
              <div style={{ width:'120px', height:'70px', backgroundColor: t.accent, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                <div style={{ width:'35%', height:'100%', backgroundColor:'rgba(255,255,255,0.1)', position:'absolute', right:0, top:0 }} />
                <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                  <div style={{ width:'24px', height:'24px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', margin:'0 auto 4px' }} />
                  <div style={{ width:'50px', height:'3px', backgroundColor:'rgba(255,255,255,0.4)', borderRadius:'2px', margin:'0 auto 3px' }} />
                  <div style={{ width:'35px', height:'2px', backgroundColor:'rgba(255,255,255,0.2)', borderRadius:'2px', margin:'0 auto' }} />
                </div>
              </div>
              <div className={`px-2 py-1.5 text-center ${templateId === t.id ? 'bg-indigo-600/20' : 'bg-slate-800'}`}>
                <div className="text-xs font-semibold text-white">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5 truncate" style={{maxWidth:'116px'}}>{t.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form + Preview */}
      <div className="grid xl:grid-cols-2 gap-6">
        <div className="space-y-6">

          {/* Basic Info */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"/>Basic Info</h2>
            <Field label="Full Name"><input className={inp} value={cvData.name} onChange={e=>update('name',e.target.value)} placeholder="Kawsar Ahmed" /></Field>
            <Field label="Job Title"><input className={inp} value={cvData.title} onChange={e=>update('title',e.target.value)} placeholder="Full Stack Developer" /></Field>
            <Field label="Profile Photo URL"><input className={inp} value={cvData.profileImage} onChange={e=>update('profileImage',e.target.value)} placeholder="https://..." /></Field>
          </div>

          {/* Contact */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"/>Contact</h2>
            <Field label="Email"><input className={inp} value={cvData.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com" /></Field>
            <Field label="Phone"><input className={inp} value={cvData.phone} onChange={e=>update('phone',e.target.value)} placeholder="+880 1234 567890" /></Field>
            <Field label="Location"><input className={inp} value={cvData.location} onChange={e=>update('location',e.target.value)} placeholder="Dhaka, Bangladesh" /></Field>
            <Field label="LinkedIn URL"><input className={inp} value={cvData.linkedin} onChange={e=>update('linkedin',e.target.value)} placeholder="https://linkedin.com/in/..." /></Field>
            <Field label="GitHub URL"><input className={inp} value={cvData.github} onChange={e=>update('github',e.target.value)} placeholder="https://github.com/..." /></Field>
          </div>

          {/* Summary */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full"/>Profile Summary</h2>
            <textarea className={`${inp} resize-none`} rows={5} value={cvData.summary} onChange={e=>update('summary',e.target.value)} placeholder="Brief professional summary..." />
          </div>

          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>Education</h2>
              <button onClick={addEdu} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>Add</button>
            </div>
            {cvData.education.map((edu,i)=>(
              <div key={i} className="relative mb-4 bg-slate-800/50 rounded-lg p-4">
                <button onClick={()=>removeEdu(i)} className="absolute top-3 right-3 text-slate-600 hover:text-red-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Degree"><input className={inp} value={edu.degree} onChange={e=>updateEdu(i,'degree',e.target.value)} placeholder="B.Sc. in CSE"/></Field>
                  <Field label="Year"><input className={inp} value={edu.year} onChange={e=>updateEdu(i,'year',e.target.value)} placeholder="2020–2024"/></Field>
                </div>
                <Field label="Institution"><input className={inp} value={edu.institution} onChange={e=>updateEdu(i,'institution',e.target.value)} placeholder="University Name"/></Field>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"/>Experience</h2>
              <button onClick={addExp} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>Add</button>
            </div>
            {cvData.experience.map((exp,i)=>(
              <div key={i} className="relative mb-4 bg-slate-800/50 rounded-lg p-4">
                <button onClick={()=>removeExp(i)} className="absolute top-3 right-3 text-slate-600 hover:text-red-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Job Title"><input className={inp} value={exp.title} onChange={e=>updateExp(i,'title',e.target.value)} placeholder="Software Engineer"/></Field>
                  <Field label="Period"><input className={inp} value={exp.period} onChange={e=>updateExp(i,'period',e.target.value)} placeholder="Jan 2023 – Present"/></Field>
                </div>
                <Field label="Company"><input className={inp} value={exp.company} onChange={e=>updateExp(i,'company',e.target.value)} placeholder="Company Name"/></Field>
                <Field label="Description"><textarea className={`${inp} resize-none`} rows={3} value={exp.description} onChange={e=>updateExp(i,'description',e.target.value)} placeholder="What did you do?"/></Field>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-pink-400 rounded-full"/>Skills</h2>
            <p className="text-xs text-slate-500 mb-2">One per line. Format: <code className="text-indigo-400">Skill Name|Category</code></p>
            <textarea className={`${inp} resize-none font-mono`} rows={10} value={skillsRaw} onChange={e=>updateSkillRaw(e.target.value)} placeholder={`Python|AI / Machine Learning\nReact|Web Development\nDocker|Tools`}/>
          </div>

          {/* Projects */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Projects
              {mode==='portfolio' && <span className="text-slate-500 font-normal text-xs ml-1">(select to include)</span>}
            </h2>
            {mode==='portfolio' ? (
              <div className="space-y-2">
                {portfolioProjects.map(proj=>(
                  <label key={proj._id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 cursor-pointer">
                    <input type="checkbox" checked={selectedProjectIds.includes(proj._id)} onChange={()=>toggleProject(proj._id)} className="mt-0.5 rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"/>
                    <div><div className="text-sm font-medium text-slate-200">{proj.title}</div><div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{proj.description}</div></div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Switch to "From Portfolio" mode to select projects.</p>
            )}
          </div>
        </div>

        {/* Live mini-preview */}
        <div className="hidden xl:block">
          <div className="sticky top-20">
            <p className="text-xs text-slate-500 mb-3 text-center">Live Preview</p>
            <div style={{ width:'430px', height:'608px', overflow:'hidden', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 0 40px rgba(0,0,0,0.5)' }}>
              <div style={{ transform:'scale(0.541)', transformOrigin:'top left', width:'794px' }}>
                <TemplateComponent cvData={cvData} />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">{cvData.skills.length} skills · {cvData.projects.length} projects</p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col max-h-[95vh] w-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h3 className="font-semibold text-white">Preview — {TEMPLATES.find(t=>t.id===templateId)?.name}</h3>
              <div className="flex items-center gap-3">
                <button onClick={handleDownloadPDF} disabled={downloading} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-60 text-white text-sm transition-colors">
                  {downloading?'Generating…':'Download PDF'}
                </button>
                <button onClick={handlePublish} disabled={publishing} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold transition-colors">
                  {publishing?'Publishing…':publishedMsg?'Published!':'Publish to Portfolio'}
                </button>
                <button onClick={()=>setShowPreview(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div className="overflow-auto p-4">
              <div style={{ width:'794px', boxShadow:'0 4px 32px rgba(0,0,0,0.6)', borderRadius:'4px', overflow:'hidden' }}>
                <TemplateComponent cvData={cvData} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden capture target */}
      <div ref={cvWrapperRef} style={{ position:'fixed', left:'-9999px', top:'0px', visibility:'hidden', pointerEvents:'none', zIndex:-1 }}>
        <div ref={cvRef}><TemplateComponent cvData={cvData} /></div>
      </div>
    </div>
  );
}
