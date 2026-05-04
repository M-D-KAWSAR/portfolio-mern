// Template 4 — Minimal (Pure White, Elegant Typography)
export default function Template4({ cvData }) {
  const { name='', title='', email='', phone='', location='', linkedin='', github='', profileImage='', summary='', education=[], experience=[], skills=[], projects=[] } = cvData || {};

  const byCategory = {};
  skills.forEach(s => { const c = s.category||'Technical'; if(!byCategory[c]) byCategory[c]=[]; byCategory[c].push(s.name); });

  const li = (url='') => { const m=url.match(/linkedin\.com\/in\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };
  const gh = (url='') => { const m=url.match(/github\.com\/([^/?#]+)/); return m?m[1]:url.split('/').pop(); };

  const sH = { fontSize:'8px', fontWeight:'800', letterSpacing:'2.5px', textTransform:'uppercase', color:'#374151', marginBottom:'8px', paddingBottom:'5px', borderBottom:'1px solid #d1d5db' };

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', flexDirection:'column', fontFamily:"'Garamond','Georgia','Times New Roman',serif", fontSize:'11px', lineHeight:'1.5', backgroundColor:'#fff', color:'#1f2937' }}>

      {/* TOP HEADER */}
      <div style={{ padding:'28px 32px 20px', borderBottom:'2px solid #1f2937', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          {profileImage && <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'68px', height:'68px', borderRadius:'4px', objectFit:'cover', flexShrink:0 }} />}
          <div>
            <div style={{ fontSize:'26px', fontWeight:'700', color:'#111827', letterSpacing:'-1px', lineHeight:1 }}>{name}</div>
            <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'5px', letterSpacing:'2px', textTransform:'uppercase', fontStyle:'italic' }}>{title}</div>
          </div>
        </div>
        <div style={{ textAlign:'right', display:'flex', flexDirection:'column', gap:'3px' }}>
          {email    && <span style={{ fontSize:'9.5px', color:'#374151' }}>{email}</span>}
          {phone    && <span style={{ fontSize:'9.5px', color:'#374151' }}>{phone}</span>}
          {location && <span style={{ fontSize:'9.5px', color:'#374151' }}>{location}</span>}
          {linkedin && <span style={{ fontSize:'9.5px', color:'#374151' }}>linkedin.com/in/{li(linkedin)}</span>}
          {github   && <span style={{ fontSize:'9.5px', color:'#374151' }}>github.com/{gh(github)}</span>}
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* LEFT */}
        <div style={{ width:'240px', flexShrink:0, padding:'20px 18px 20px 32px', boxSizing:'border-box', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', gap:'16px', overflow:'hidden' }}>

          {summary && (
            <div>
              <div style={sH}>Profile</div>
              <p style={{ fontSize:'10.5px', color:'#374151', lineHeight:'1.65', margin:0 }}>{summary.length>280?summary.slice(0,280)+'…':summary}</p>
            </div>
          )}

          {Object.keys(byCategory).length>0 && (
            <div>
              <div style={sH}>Skills</div>
              {Object.entries(byCategory).slice(0,4).map(([cat,sk])=>(
                <div key={cat} style={{ marginBottom:'9px' }}>
                  <div style={{ fontSize:'7px', color:'#9ca3af', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'3px' }}>{cat}</div>
                  <p style={{ fontSize:'10px', color:'#374151', lineHeight:'1.6', margin:0 }}>{sk.slice(0,6).join(', ')}</p>
                </div>
              ))}
            </div>
          )}

          {education.filter(e=>e.degree).length>0 && (
            <div>
              <div style={sH}>Education</div>
              {education.filter(e=>e.degree).slice(0,2).map((e,i)=>(
                <div key={i} style={{ marginBottom:'9px' }}>
                  <div style={{ fontWeight:'700', fontSize:'10.5px', color:'#111827' }}>{e.degree}</div>
                  <div style={{ fontSize:'9.5px', color:'#6b7280', marginTop:'1px' }}>{e.institution}</div>
                  {e.year && <div style={{ fontSize:'9px', color:'#9ca3af', marginTop:'1px' }}>{e.year}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ flex:1, padding:'20px 32px 20px 22px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'15px', overflow:'hidden' }}>

          {experience.filter(e=>e.title).length>0 && (
            <div>
              <div style={sH}>Experience</div>
              {experience.filter(e=>e.title).slice(0,3).map((e,i)=>(
                <div key={i} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <div><span style={{ fontWeight:'700', fontSize:'12px', color:'#111827' }}>{e.title}</span>{e.company && <span style={{ fontSize:'10px', color:'#6b7280', marginLeft:'6px' }}>— {e.company}</span>}</div>
                    {e.period && <span style={{ fontSize:'9px', color:'#9ca3af', flexShrink:0 }}>{e.period}</span>}
                  </div>
                  {e.description && <p style={{ fontSize:'10.5px', color:'#4b5563', marginTop:'4px', lineHeight:'1.55', margin:'4px 0 0' }}>{e.description.length>160?e.description.slice(0,160)+'…':e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length>0 && (
            <div>
              <div style={sH}>Projects</div>
              {projects.slice(0,5).map((p,i)=>(
                <div key={i} style={{ marginBottom:'10px' }}>
                  <div style={{ fontWeight:'700', fontSize:'11px', color:'#111827' }}>{p.title}</div>
                  {p.description && <p style={{ fontSize:'10.5px', color:'#4b5563', marginTop:'2px', lineHeight:'1.5', margin:'2px 0 0' }}>{p.description.length>110?p.description.slice(0,110)+'…':p.description}</p>}
                  {p.techStack?.length>0 && <p style={{ fontSize:'9px', color:'#9ca3af', marginTop:'2px', fontStyle:'italic', margin:'2px 0 0' }}>{p.techStack.slice(0,6).join(', ')}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
