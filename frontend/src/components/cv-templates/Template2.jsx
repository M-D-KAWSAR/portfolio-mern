// Template 2 — Executive (Corporate Blue Header)
export default function Template2({ cvData }) {
  const { name='', title='', email='', phone='', location='', linkedin='', github='', profileImage='', summary='', education=[], experience=[], skills=[], projects=[] } = cvData || {};

  const byCategory = {};
  skills.forEach(s => { const c = s.category||'Technical'; if(!byCategory[c]) byCategory[c]=[]; byCategory[c].push(s.name); });

  const li = (url='') => { const m=url.match(/linkedin\.com\/in\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };
  const gh = (url='') => { const m=url.match(/github\.com\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };

  const accent = '#1e3a8a';
  const accentLight = '#dbeafe';
  const sHead = { fontSize:'9px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:accent, marginBottom:'7px', paddingBottom:'5px', borderBottom:`2px solid ${accent}` };

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:'11px', lineHeight:'1.4', backgroundColor:'#fff' }}>

      {/* HEADER */}
      <div style={{ backgroundColor:accent, padding:'20px 28px', display:'flex', alignItems:'center', gap:'20px', flexShrink:0 }}>
        {profileImage
          ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'78px', height:'78px', borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,0.4)', flexShrink:0 }} />
          : <div style={{ width:'78px', height:'78px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', border:'3px solid rgba(255,255,255,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', color:'#fff', flexShrink:0 }}>{name.charAt(0).toUpperCase()}</div>
        }
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'#fff', lineHeight:1.1 }}>{name}</div>
          <div style={{ fontSize:'11px', color:'#93c5fd', marginTop:'4px', fontWeight:'500', letterSpacing:'0.5px' }}>{title}</div>
        </div>
        <div style={{ textAlign:'right', display:'flex', flexDirection:'column', gap:'4px' }}>
          {email    && <ContactLine icon="✉" v={email} />}
          {phone    && <ContactLine icon="☏" v={phone} />}
          {location && <ContactLine icon="⌖" v={location} />}
          {linkedin && <ContactLine icon="in" v={`linkedin.com/in/${li(linkedin)}`} />}
          {github   && <ContactLine icon="⌨" v={`github.com/${gh(github)}`} />}
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* LEFT */}
        <div style={{ width:'250px', flexShrink:0, backgroundColor:'#f8faff', padding:'20px 16px', boxSizing:'border-box', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:'16px', overflow:'hidden' }}>

          {summary && (
            <div>
              <div style={sHead}>Profile</div>
              <p style={{ fontSize:'10.5px', color:'#374151', lineHeight:'1.6', margin:0 }}>{summary.length>300?summary.slice(0,300)+'…':summary}</p>
            </div>
          )}

          {education.filter(e=>e.degree).length>0 && (
            <div>
              <div style={sHead}>Education</div>
              {education.filter(e=>e.degree).slice(0,2).map((e,i)=>(
                <div key={i} style={{ marginBottom:'8px' }}>
                  <div style={{ fontWeight:'700', fontSize:'10.5px', color:'#1e293b' }}>{e.degree}</div>
                  <div style={{ fontSize:'9.5px', color:'#64748b', marginTop:'1px' }}>{e.institution}</div>
                  {e.year && <div style={{ fontSize:'9px', color:accent, marginTop:'1px', fontWeight:'600' }}>{e.year}</div>}
                </div>
              ))}
            </div>
          )}

          {Object.keys(byCategory).length>0 && (
            <div>
              <div style={sHead}>Skills</div>
              {Object.entries(byCategory).slice(0,4).map(([cat,sk])=>(
                <div key={cat} style={{ marginBottom:'9px' }}>
                  <div style={{ fontSize:'7px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'3px' }}>{cat}</div>
                  <p style={{ fontSize:'9.5px', color:'#334155', lineHeight:'1.6', margin:0 }}>{sk.slice(0,6).join(' · ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ flex:1, padding:'20px 22px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'16px', overflow:'hidden' }}>

          {experience.filter(e=>e.title).length>0 && (
            <div>
              <div style={sHead}>Experience</div>
              {experience.filter(e=>e.title).slice(0,3).map((e,i)=>(
                <div key={i} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontWeight:'700', fontSize:'12px', color:'#1e293b' }}>{e.title}</div>
                      <div style={{ fontSize:'10px', color:'#64748b', marginTop:'1px' }}>{e.company}</div>
                    </div>
                    {e.period && <span style={{ fontSize:'9px', color:accent, backgroundColor:accentLight, padding:'2px 8px', borderRadius:'20px', whiteSpace:'nowrap', marginLeft:'8px', flexShrink:0, fontWeight:'600' }}>{e.period}</span>}
                  </div>
                  {e.description && <p style={{ fontSize:'10.5px', color:'#475569', marginTop:'5px', lineHeight:'1.5', margin:'5px 0 0' }}>{e.description.length>160?e.description.slice(0,160)+'…':e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length>0 && (
            <div>
              <div style={sHead}>Projects</div>
              {projects.slice(0,5).map((p,i)=>(
                <div key={i} style={{ marginBottom:'10px' }}>
                  <div style={{ fontWeight:'700', fontSize:'11px', color:'#1e293b' }}>{p.title}</div>
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
function ContactLine({ icon, v }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'5px', justifyContent:'flex-end' }}>
      <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.6)' }}>{icon}</span>
      <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.9)' }}>{v}</span>
    </div>
  );
}
