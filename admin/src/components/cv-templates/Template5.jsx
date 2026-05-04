// Template 5 — Bold (Deep Purple + Gold Accent)
export default function Template5({ cvData }) {
  const { name='', title='', email='', phone='', location='', linkedin='', github='', profileImage='', summary='', education=[], experience=[], skills=[], projects=[] } = cvData || {};

  const byCategory = {};
  skills.forEach(s => { const c = s.category||'Technical'; if(!byCategory[c]) byCategory[c]=[]; byCategory[c].push(s.name); });

  const li = (url='') => { const m=url.match(/linkedin\.com\/in\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };
  const gh = (url='') => { const m=url.match(/github\.com\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };

  const purple = '#3b0764';
  const gold = '#f59e0b';
  const lightGold = '#fef3c7';

  const sL = { fontSize:'7.5px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:gold, marginBottom:'6px', paddingBottom:'4px', borderBottom:`1px solid rgba(245,158,11,0.4)` };
  const sR = { fontSize:'9.5px', fontWeight:'800', letterSpacing:'1.5px', textTransform:'uppercase', color:purple, marginBottom:'7px', paddingBottom:'5px', borderBottom:`2px solid ${gold}` };

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:'11px', lineHeight:'1.4', backgroundColor:'#fff' }}>

      {/* LEFT */}
      <div style={{ width:'250px', flexShrink:0, backgroundColor:purple, padding:'24px 16px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'14px', overflow:'hidden' }}>

        {/* Photo + Name */}
        <div style={{ textAlign:'center' }}>
          {profileImage
            ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'88px', height:'88px', borderRadius:'50%', objectFit:'cover', border:`4px solid ${gold}`, display:'block', margin:'0 auto 10px' }} />
            : <div style={{ width:'88px', height:'88px', borderRadius:'50%', backgroundColor:'rgba(245,158,11,0.15)', border:`4px solid ${gold}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', color:gold, margin:'0 auto 10px' }}>{name.charAt(0).toUpperCase()}</div>
          }
          <div style={{ fontSize:'16px', fontWeight:'800', color:'#fff', lineHeight:1.15, letterSpacing:'-0.3px' }}>{name}</div>
          <div style={{ fontSize:'9px', color:gold, marginTop:'4px', fontWeight:'600', letterSpacing:'1.5px', textTransform:'uppercase' }}>{title}</div>
          <div style={{ width:'40px', height:'2px', backgroundColor:gold, margin:'8px auto 0', borderRadius:'1px' }} />
        </div>

        {/* Contact */}
        <div>
          <div style={sL}>Contact</div>
          {email    && <GR k="Email"    v={email} gold={gold} />}
          {phone    && <GR k="Phone"    v={phone} gold={gold} />}
          {location && <GR k="Location" v={location} gold={gold} />}
          {linkedin && <GR k="LinkedIn" v={`li/${li(linkedin)}`} gold={gold} />}
          {github   && <GR k="GitHub"   v={`gh/${gh(github)}`} gold={gold} />}
        </div>

        {/* Skills */}
        {Object.keys(byCategory).length>0 && (
          <div>
            <div style={sL}>Skills</div>
            {Object.entries(byCategory).slice(0,4).map(([cat,sk])=>(
              <div key={cat} style={{ marginBottom:'9px' }}>
                <div style={{ fontSize:'6.5px', color:'rgba(245,158,11,0.65)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'3px' }}>{cat}</div>
                <p style={{ fontSize:'9px', color:'#e9d5ff', lineHeight:'1.6', margin:0 }}>{sk.slice(0,6).join(' · ')}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.filter(e=>e.degree).length>0 && (
          <div>
            <div style={sL}>Education</div>
            {education.filter(e=>e.degree).slice(0,2).map((e,i)=>(
              <div key={i} style={{ marginBottom:'8px' }}>
                <div style={{ fontWeight:'700', fontSize:'10px', color:'#f3e8ff' }}>{e.degree}</div>
                <div style={{ fontSize:'9px', color:'#c4b5fd', marginTop:'1px' }}>{e.institution}</div>
                {e.year && <div style={{ fontSize:'9px', color:gold, marginTop:'1px' }}>{e.year}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Right header accent bar */}
        <div style={{ height:'6px', backgroundColor:gold, flexShrink:0 }} />

        <div style={{ flex:1, padding:'20px 22px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'15px', overflow:'hidden' }}>

          {summary && <div><div style={sR}>Profile</div><p style={{ fontSize:'10.5px', color:'#374151', lineHeight:'1.65', margin:0 }}>{summary.length>400?summary.slice(0,400)+'…':summary}</p></div>}

          {experience.filter(e=>e.title).length>0 && (
            <div>
              <div style={sR}>Experience</div>
              {experience.filter(e=>e.title).slice(0,3).map((e,i)=>(
                <div key={i} style={{ marginBottom:'12px', paddingLeft:'10px', borderLeft:`3px solid ${gold}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div><div style={{ fontWeight:'700', fontSize:'12px', color:purple }}>{e.title}</div><div style={{ fontSize:'10px', color:'#6b7280', marginTop:'1px' }}>{e.company}</div></div>
                    {e.period && <span style={{ fontSize:'9px', color:gold, backgroundColor:lightGold, padding:'2px 8px', borderRadius:'10px', whiteSpace:'nowrap', marginLeft:'6px', flexShrink:0, fontWeight:'700' }}>{e.period}</span>}
                  </div>
                  {e.description && <p style={{ fontSize:'10.5px', color:'#4b5563', marginTop:'4px', lineHeight:'1.5', margin:'4px 0 0' }}>{e.description.length>155?e.description.slice(0,155)+'…':e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length>0 && (
            <div>
              <div style={sR}>Projects</div>
              {projects.slice(0,5).map((p,i)=>(
                <div key={i} style={{ marginBottom:'10px', paddingLeft:'10px', borderLeft:`2px solid rgba(59,7,100,0.2)` }}>
                  <div style={{ fontWeight:'700', fontSize:'11px', color:purple }}>{p.title}</div>
                  {p.description && <p style={{ fontSize:'10px', color:'#4b5563', marginTop:'2px', lineHeight:'1.45', margin:'2px 0 0' }}>{p.description.length>110?p.description.slice(0,110)+'…':p.description}</p>}
                  {p.techStack?.length>0 && <p style={{ fontSize:'9px', color:'#9ca3af', marginTop:'2px', margin:'2px 0 0' }}>{p.techStack.slice(0,6).join(' · ')}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function GR({ k, v, gold }) {
  return (
    <div style={{ display:'flex', gap:'5px', marginBottom:'5px', fontSize:'9px', alignItems:'flex-start' }}>
      <span style={{ color:gold, fontWeight:'700', minWidth:'42px', flexShrink:0 }}>{k}</span>
      <span style={{ color:'#ddd6fe', wordBreak:'break-word', flex:1 }}>{v}</span>
    </div>
  );
}
