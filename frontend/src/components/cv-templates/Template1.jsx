// Template 1 — Classic (Dark Navy Sidebar)
export default function Template1({ cvData }) {
  const { name='', title='', email='', phone='', location='', linkedin='', github='', profileImage='', summary='', education=[], experience=[], skills=[], projects=[] } = cvData || {};

  const byCategory = {};
  skills.forEach(s => { const c = s.category||'Technical'; if(!byCategory[c]) byCategory[c]=[]; byCategory[c].push(s.name); });

  const li = (url='') => { const m=url.match(/linkedin\.com\/in\/([^/?#]+)/); return m?`linkedin.com/in/${m[1]}`:url.replace(/^https?:\/\/(www\.)?/,'').split('?')[0]; };
  const gh = (url='') => { const m=url.match(/github\.com\/([^/?#]+)/); return m?`github.com/${m[1]}`:url.replace(/^https?:\/\/(www\.)?/,'').split('?')[0]; };

  const sL = { fontSize:'8px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'#60a5fa', marginBottom:'6px', paddingBottom:'4px', borderBottom:'1px solid rgba(96,165,250,0.3)' };
  const sR = { fontSize:'10px', fontWeight:'700', letterSpacing:'1px', textTransform:'uppercase', color:'#1a2744', marginBottom:'7px', paddingBottom:'4px', borderBottom:'2px solid #60a5fa' };

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:'11px', lineHeight:'1.4', backgroundColor:'#fff' }}>
      <div style={{ width:'245px', height:'1123px', overflow:'hidden', flexShrink:0, backgroundColor:'#1a2744', color:'#fff', padding:'20px 15px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'12px' }}>
        <div style={{ textAlign:'center' }}>
          {profileImage ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover', border:'3px solid #60a5fa', display:'block', margin:'0 auto 8px' }} />
            : <div style={{ width:'80px', height:'80px', borderRadius:'50%', backgroundColor:'#2d4a6e', border:'3px solid #60a5fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', color:'#60a5fa', margin:'0 auto 8px' }}>{name.charAt(0).toUpperCase()}</div>}
          <div style={{ fontSize:'14px', fontWeight:'700', color:'#f1f5f9', lineHeight:1.2 }}>{name}</div>
          <div style={{ fontSize:'9px', color:'#60a5fa', fontStyle:'italic', marginTop:'3px' }}>{title}</div>
        </div>
        <div>
          <div style={sL}>Contact</div>
          {email    && <CR k="Email"    v={email} />}
          {phone    && <CR k="Phone"    v={phone} />}
          {location && <CR k="Location" v={location} />}
          {linkedin && <CR k="LinkedIn" v={li(linkedin)} />}
          {github   && <CR k="GitHub"   v={gh(github)} />}
        </div>
        {education.filter(e=>e.degree).length>0 && (
          <div>
            <div style={sL}>Education</div>
            {education.filter(e=>e.degree).slice(0,2).map((e,i)=>(
              <div key={i} style={{ marginBottom:'7px' }}>
                <div style={{ fontWeight:'600', fontSize:'10px', color:'#e2e8f0' }}>{e.degree}</div>
                <div style={{ fontSize:'9px', color:'#94a3b8', marginTop:'1px' }}>{e.institution}</div>
                {e.year && <div style={{ fontSize:'9px', color:'#60a5fa', marginTop:'1px' }}>{e.year}</div>}
              </div>
            ))}
          </div>
        )}
        {Object.keys(byCategory).length>0 && (
          <div>
            <div style={sL}>Skills</div>
            {Object.entries(byCategory).slice(0,4).map(([cat,sk])=>(
              <div key={cat} style={{ marginBottom:'8px' }}>
                <div style={{ fontSize:'6.5px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'3px' }}>{cat}</div>
                <p style={{ fontSize:'9px', color:'#93c5fd', lineHeight:'1.6', margin:0 }}>{sk.slice(0,6).join(' · ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex:1, height:'1123px', overflow:'hidden', padding:'24px 22px', backgroundColor:'#fff', color:'#1e293b', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'16px' }}>
        {summary && <div><div style={sR}>Profile</div><p style={{ color:'#475569', lineHeight:'1.6', fontSize:'11px', margin:0 }}>{summary.length>420?summary.slice(0,420)+'…':summary}</p></div>}
        {experience.filter(e=>e.title).length>0 && (
          <div>
            <div style={sR}>Experience</div>
            {experience.filter(e=>e.title).slice(0,3).map((e,i)=>(
              <div key={i} style={{ marginBottom:'11px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div><div style={{ fontWeight:'700', fontSize:'12px', color:'#1e293b' }}>{e.title}</div><div style={{ fontSize:'10px', color:'#475569', marginTop:'1px' }}>{e.company}</div></div>
                  {e.period && <span style={{ fontSize:'9px', color:'#2563eb', backgroundColor:'#eff6ff', padding:'2px 7px', borderRadius:'7px', whiteSpace:'nowrap', marginLeft:'6px', flexShrink:0 }}>{e.period}</span>}
                </div>
                {e.description && <p style={{ fontSize:'10.5px', color:'#64748b', marginTop:'4px', lineHeight:'1.5', margin:'4px 0 0' }}>{e.description.length>150?e.description.slice(0,150)+'…':e.description}</p>}
              </div>
            ))}
          </div>
        )}
        {projects.length>0 && (
          <div>
            <div style={sR}>Projects</div>
            {projects.slice(0,5).map((p,i)=>(
              <div key={i} style={{ marginBottom:'10px' }}>
                <div style={{ fontWeight:'700', fontSize:'11px', color:'#1e293b' }}>{p.title}</div>
                {p.description && <p style={{ fontSize:'10px', color:'#64748b', marginTop:'2px', lineHeight:'1.45', margin:'2px 0 0' }}>{p.description.length>100?p.description.slice(0,100)+'…':p.description}</p>}
                {p.techStack?.length>0 && <p style={{ fontSize:'9px', color:'#94a3b8', marginTop:'2px', margin:'2px 0 0' }}>{p.techStack.slice(0,6).join(' · ')}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function CR({ k, v }) {
  return <div style={{ display:'flex', gap:'5px', marginBottom:'5px', fontSize:'9.5px', alignItems:'flex-start' }}><span style={{ color:'#60a5fa', fontWeight:'600', minWidth:'44px', flexShrink:0 }}>{k}</span><span style={{ color:'#e2e8f0', wordBreak:'break-word', flex:1 }}>{v}</span></div>;
}
