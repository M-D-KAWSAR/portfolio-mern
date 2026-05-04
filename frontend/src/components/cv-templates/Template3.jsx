// Template 3 — Modern (Dark Header + Emerald Accent)
export default function Template3({ cvData }) {
  const { name='', title='', email='', phone='', location='', linkedin='', github='', profileImage='', summary='', education=[], experience=[], skills=[], projects=[] } = cvData || {};

  const byCategory = {};
  skills.forEach(s => { const c = s.category||'Technical'; if(!byCategory[c]) byCategory[c]=[]; byCategory[c].push(s.name); });

  const li = (url='') => { const m=url.match(/linkedin\.com\/in\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };
  const gh = (url='') => { const m=url.match(/github\.com\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };

  const emerald = '#10b981';
  const dark = '#0f172a';
  const sideW = '220px';

  const sL = { fontSize:'7.5px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:emerald, marginBottom:'6px', paddingBottom:'4px', borderBottom:`1px solid rgba(16,185,129,0.35)` };
  const sR = { fontSize:'9.5px', fontWeight:'800', letterSpacing:'1.5px', textTransform:'uppercase', color:dark, marginBottom:'7px', paddingBottom:'4px', borderBottom:`2px solid ${emerald}` };

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:'11px', lineHeight:'1.4', backgroundColor:'#fff' }}>

      {/* DARK HEADER */}
      <div style={{ backgroundColor:dark, padding:'18px 28px', display:'flex', alignItems:'center', gap:'18px', flexShrink:0, borderBottom:`3px solid ${emerald}` }}>
        {profileImage
          ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'74px', height:'74px', borderRadius:'50%', objectFit:'cover', border:`3px solid ${emerald}`, flexShrink:0 }} />
          : <div style={{ width:'74px', height:'74px', borderRadius:'50%', backgroundColor:'#1e293b', border:`3px solid ${emerald}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', color:emerald, flexShrink:0 }}>{name.charAt(0).toUpperCase()}</div>
        }
        <div>
          <div style={{ fontSize:'24px', fontWeight:'800', color:'#f1f5f9', lineHeight:1.1, letterSpacing:'-0.5px' }}>{name}</div>
          <div style={{ fontSize:'11px', color:emerald, marginTop:'5px', fontWeight:'600', letterSpacing:'1px', textTransform:'uppercase' }}>{title}</div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width:sideW, flexShrink:0, backgroundColor:'#1e293b', padding:'18px 14px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'14px', overflow:'hidden' }}>

          <div>
            <div style={sL}>Contact</div>
            {email    && <ML k="Email"    v={email} c={emerald} />}
            {phone    && <ML k="Phone"    v={phone} c={emerald} />}
            {location && <ML k="Location" v={location} c={emerald} />}
            {linkedin && <ML k="LinkedIn" v={`linkedin.com/in/${li(linkedin)}`} c={emerald} />}
            {github   && <ML k="GitHub"   v={`github.com/${gh(github)}`} c={emerald} />}
          </div>

          {Object.keys(byCategory).length>0 && (
            <div>
              <div style={sL}>Skills</div>
              {Object.entries(byCategory).slice(0,4).map(([cat,sk])=>(
                <div key={cat} style={{ marginBottom:'9px' }}>
                  <div style={{ fontSize:'6.5px', color:'rgba(16,185,129,0.7)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'3px' }}>{cat}</div>
                  <p style={{ fontSize:'9px', color:'#cbd5e1', lineHeight:'1.6', margin:0 }}>{sk.slice(0,6).join(' · ')}</p>
                </div>
              ))}
            </div>
          )}

          {education.filter(e=>e.degree).length>0 && (
            <div>
              <div style={sL}>Education</div>
              {education.filter(e=>e.degree).slice(0,2).map((e,i)=>(
                <div key={i} style={{ marginBottom:'8px' }}>
                  <div style={{ fontWeight:'700', fontSize:'10px', color:'#e2e8f0' }}>{e.degree}</div>
                  <div style={{ fontSize:'9px', color:'#94a3b8', marginTop:'1px' }}>{e.institution}</div>
                  {e.year && <div style={{ fontSize:'9px', color:emerald, marginTop:'1px' }}>{e.year}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ flex:1, padding:'20px 22px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'15px', overflow:'hidden' }}>
          {summary && <div><div style={sR}>Profile</div><p style={{ fontSize:'10.5px', color:'#475569', lineHeight:'1.65', margin:0 }}>{summary.length>400?summary.slice(0,400)+'…':summary}</p></div>}

          {experience.filter(e=>e.title).length>0 && (
            <div>
              <div style={sR}>Experience</div>
              {experience.filter(e=>e.title).slice(0,3).map((e,i)=>(
                <div key={i} style={{ marginBottom:'11px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div><div style={{ fontWeight:'700', fontSize:'12px', color:'#0f172a' }}>{e.title}</div><div style={{ fontSize:'10px', color:'#64748b', marginTop:'1px' }}>{e.company}</div></div>
                    {e.period && <span style={{ fontSize:'9px', color:emerald, backgroundColor:'#ecfdf5', padding:'2px 8px', borderRadius:'10px', whiteSpace:'nowrap', marginLeft:'6px', flexShrink:0, fontWeight:'600' }}>{e.period}</span>}
                  </div>
                  {e.description && <p style={{ fontSize:'10.5px', color:'#64748b', marginTop:'4px', lineHeight:'1.5', margin:'4px 0 0' }}>{e.description.length>155?e.description.slice(0,155)+'…':e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length>0 && (
            <div>
              <div style={sR}>Projects</div>
              {projects.slice(0,5).map((p,i)=>(
                <div key={i} style={{ marginBottom:'10px' }}>
                  <div style={{ fontWeight:'700', fontSize:'11px', color:'#0f172a' }}>{p.title}</div>
                  {p.description && <p style={{ fontSize:'10px', color:'#64748b', marginTop:'2px', lineHeight:'1.45', margin:'2px 0 0' }}>{p.description.length>110?p.description.slice(0,110)+'…':p.description}</p>}
                  {p.techStack?.length>0 && <p style={{ fontSize:'9px', color:'#94a3b8', marginTop:'2px', margin:'2px 0 0' }}>{p.techStack.slice(0,6).join(' · ')}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function ML({ k, v, c }) {
  return (
    <div style={{ display:'flex', gap:'5px', marginBottom:'5px', fontSize:'9px', alignItems:'flex-start' }}>
      <span style={{ color:c, fontWeight:'700', minWidth:'42px', flexShrink:0 }}>{k}</span>
      <span style={{ color:'#cbd5e1', wordBreak:'break-word', flex:1 }}>{v}</span>
    </div>
  );
}
