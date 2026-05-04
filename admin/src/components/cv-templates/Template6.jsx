// Template 6 — Professional B&W (Matching two-column reference layout)

function IconCircle({ size = 22, bg = '#111', children }) {
  return (
    <div style={{ width:`${size}px`, height:`${size}px`, minWidth:`${size}px`, borderRadius:'50%', backgroundColor:bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {children}
    </div>
  );
}

const SVG_PHONE = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>;
const SVG_EMAIL = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const SVG_WEB   = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>;
const SVG_ADDR  = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const SVG_EDU   = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>;
const SVG_SKILL = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.62.07-.93s-.03-.63-.07-.93l2.04-1.57c.18-.14.23-.41.12-.62l-1.93-3.32c-.12-.22-.37-.29-.59-.22l-2.4.96c-.5-.38-1.03-.69-1.62-.93l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.85c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.55-1.62.93l-2.4-.96c-.22-.07-.47 0-.59.22L2.46 8.55c-.12.21-.07.48.12.62l2.03 1.57c-.04.3-.07.62-.07.93s.03.63.07.93L2.58 13.17c-.18.14-.23.41-.12.62l1.93 3.32c.12.22.37.29.59.22l2.4-.96c.5.38 1.03.69 1.62.93l.36 2.54c.05.24.24.41.48.41h3.85c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.55 1.62-.93l2.4.96c.22.07.47 0 .59-.22l1.93-3.32c.12-.21.07-.48-.12-.62l-2.01-1.57z"/></svg>;
const SVG_LANG  = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>;
const SVG_REF   = <svg viewBox="0 0 24 24" width="11" height="11" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const SVG_ABOUT = <svg viewBox="0 0 24 24" width="10" height="10" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SVG_WORK  = <svg viewBox="0 0 24 24" width="10" height="10" fill="white"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>;
const SVG_STAR  = <svg viewBox="0 0 24 24" width="10" height="10" fill="white"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const SVG_CERT  = <svg viewBox="0 0 24 24" width="10" height="10" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>;

function CRow({ svg, label, value }) {
  return (
    <div style={{ display:'flex', gap:'8px', marginBottom:'9px', alignItems:'flex-start' }}>
      <IconCircle size={21}>{svg}</IconCircle>
      <div>
        <div style={{ fontSize:'7.5px', fontWeight:'700', color:'#aaa', textTransform:'uppercase', letterSpacing:'0.6px', lineHeight:1 }}>{label}</div>
        <div style={{ fontSize:'9.5px', color:'#ddd', lineHeight:'1.35', marginTop:'1px', wordBreak:'break-word' }}>{value}</div>
      </div>
    </div>
  );
}

function LH({ svg, title }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
      <IconCircle size={22}>{svg}</IconCircle>
      <span style={{ fontSize:'10px', fontWeight:'800', letterSpacing:'1.8px', color:'#fff', textTransform:'uppercase' }}>{title}</span>
    </div>
  );
}

function RH({ svg, title }) {
  return (
    <div style={{ marginBottom:'10px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'5px' }}>
        <IconCircle size={20}>{svg}</IconCircle>
        <span style={{ fontSize:'11px', fontWeight:'800', letterSpacing:'1.5px', color:'#111', textTransform:'uppercase' }}>{title}</span>
      </div>
      <div style={{ height:'1.5px', backgroundColor:'#222' }} />
    </div>
  );
}

function Bullet({ text, color = '#333' }) {
  return (
    <div style={{ display:'flex', gap:'5px', marginBottom:'3px', lineHeight:'1.5' }}>
      <span style={{ color, flexShrink:0, marginTop:'1px' }}>•</span>
      <span style={{ fontSize:'10px', color, lineHeight:'1.5' }}>{text}</span>
    </div>
  );
}

export default function Template6({ cvData }) {
  const {
    name = '', surname = '', title = '',
    email = '', phone = '', location = '', website = '', address = '',
    profileImage = '', summary = '',
    education = [], experience = [], skills = [],
    languages = [], references = [], achievements = [], certifications = [],
  } = cvData || {};

  const byCategory = {};
  skills.forEach(s => {
    const c = s.category || 'Technical';
    if (!byCategory[c]) byCategory[c] = [];
    byCategory[c].push(s.name);
  });

  const displayAddress = address || location;

  return (
    <div style={{ width:'794px', height:'1123px', overflow:'hidden', display:'flex', fontFamily:"Arial,'Helvetica Neue',sans-serif", backgroundColor:'#fff', fontSize:'11px' }}>

      {/* ── LEFT COLUMN ── */}
      <div style={{ width:'262px', minWidth:'262px', height:'1123px', overflow:'hidden', backgroundColor:'#2c2c2c', color:'#fff', padding:'28px 18px', boxSizing:'border-box', display:'flex', flexDirection:'column', gap:'0' }}>

        {/* Photo */}
        <div style={{ textAlign:'center', marginBottom:'22px' }}>
          {profileImage
            ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'100px', height:'100px', borderRadius:'50%', objectFit:'cover', border:'3px solid #fff', display:'block', margin:'0 auto' }} />
            : <div style={{ width:'100px', height:'100px', borderRadius:'50%', backgroundColor:'#555', border:'3px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'36px', color:'#ccc', margin:'0 auto' }}>{(name||'?').charAt(0).toUpperCase()}</div>
          }
        </div>

        {/* Contact */}
        <div style={{ marginBottom:'14px' }}>
          {phone         && <CRow svg={SVG_PHONE} label="Phone"   value={phone} />}
          {email         && <CRow svg={SVG_EMAIL} label="Email"   value={email} />}
          {website       && <CRow svg={SVG_WEB}   label="Website" value={website} />}
          {displayAddress && <CRow svg={SVG_ADDR}  label="Address" value={displayAddress} />}
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.18)', marginBottom:'14px' }} />

        {/* Education */}
        {education.filter(e => e.degree).length > 0 && (
          <div style={{ marginBottom:'14px' }}>
            <LH svg={SVG_EDU} title="Education" />
            {education.filter(e => e.degree).slice(0, 3).map((e, i) => (
              <div key={i} style={{ marginBottom:'11px' }}>
                <div style={{ fontWeight:'700', fontSize:'10.5px', color:'#fff' }}>{e.degree}</div>
                {e.institution && <div style={{ fontSize:'9.5px', color:'#ccc', marginTop:'2px' }}>{e.institution}</div>}
                {e.location    && <div style={{ fontSize:'9px',   color:'#aaa', marginTop:'1px' }}>{e.location}</div>}
                {e.year        && <div style={{ fontSize:'9px',   color:'#aaa', marginTop:'1px' }}>{e.year}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {Object.keys(byCategory).length > 0 && (
          <div style={{ marginBottom:'14px' }}>
            <LH svg={SVG_SKILL} title="Skills" />
            {Object.entries(byCategory).slice(0, 5).map(([cat, sks]) => (
              <div key={cat} style={{ marginBottom:'9px' }}>
                <div style={{ fontWeight:'700', fontSize:'9.5px', color:'#fff', marginBottom:'3px' }}>{cat}</div>
                {sks.slice(0, 6).map((sk, i) => (
                  <div key={i} style={{ display:'flex', gap:'5px', fontSize:'9.5px', color:'#ccc', marginBottom:'2px' }}>
                    <span style={{ flexShrink:0 }}>•</span><span>{sk}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom:'14px' }}>
            <LH svg={SVG_LANG} title="Languages" />
            {languages.map((l, i) => (
              <div key={i} style={{ display:'flex', gap:'5px', fontSize:'9.5px', color:'#ccc', marginBottom:'3px' }}>
                <span style={{ flexShrink:0 }}>•</span>
                <span><strong style={{ color:'#fff' }}>{l.language}</strong>{l.proficiency ? ` – ${l.proficiency}` : ''}</span>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <LH svg={SVG_REF} title="References" />
            {references.slice(0, 2).map((r, i) => (
              <div key={i} style={{ marginBottom:'11px' }}>
                <div style={{ fontWeight:'700', fontSize:'10.5px', color:'#fff' }}>{r.name}</div>
                {(r.position || r.company) && <div style={{ fontSize:'9.5px', color:'#ccc', marginTop:'2px' }}>{[r.position, r.company].filter(Boolean).join(' / ')}</div>}
                {r.email && <div style={{ fontSize:'9px', color:'#aaa', marginTop:'1px' }}>Email: {r.email}</div>}
                {r.phone && <div style={{ fontSize:'9px', color:'#aaa', marginTop:'1px' }}>Phone: {r.phone}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ flex:1, backgroundColor:'#fff', padding:'28px 26px', boxSizing:'border-box', overflow:'hidden' }}>

        {/* Name + Photo row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'38px', fontWeight:'900', lineHeight:'1', color:'#111', letterSpacing:'-1px', textTransform:'uppercase' }}>{name}</div>
            {surname && <div style={{ fontSize:'34px', fontWeight:'900', lineHeight:'1', color:'#111', letterSpacing:'-1px', textTransform:'uppercase', marginTop:'2px' }}>{surname}</div>}
            <div style={{ fontSize:'12px', fontWeight:'600', color:'#555', marginTop:'8px', letterSpacing:'0.8px', textTransform:'uppercase' }}>{title}</div>
          </div>
          <div style={{ flexShrink:0, marginLeft:'16px' }}>
            {profileImage
              ? <img src={profileImage} alt={name} crossOrigin="anonymous" style={{ width:'78px', height:'78px', borderRadius:'50%', objectFit:'cover', border:'2px solid #ccc' }} />
              : <div style={{ width:'78px', height:'78px', borderRadius:'50%', backgroundColor:'#eee', border:'2px solid #ccc', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', color:'#888' }}>{(name||'?').charAt(0).toUpperCase()}</div>
            }
          </div>
        </div>

        <div style={{ height:'2px', backgroundColor:'#222', marginBottom:'16px' }} />

        {/* About Me */}
        {summary && (
          <div style={{ marginBottom:'15px' }}>
            <RH svg={SVG_ABOUT} title="About Me" />
            <p style={{ fontSize:'10px', lineHeight:'1.65', color:'#333', margin:0 }}>{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience.filter(e => e.title).length > 0 && (
          <div style={{ marginBottom:'15px' }}>
            <RH svg={SVG_WORK} title="Work Experience" />
            {experience.filter(e => e.title).slice(0, 4).map((exp, i, arr) => (
              <div key={i} style={{ marginBottom:'11px', paddingBottom: i < arr.length - 1 ? '10px' : 0, borderBottom: i < arr.length - 1 ? '1px solid #eee' : 'none' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'2px' }}>
                  <div style={{ fontWeight:'700', fontSize:'10.5px', textTransform:'uppercase', color:'#111', letterSpacing:'0.3px' }}>{exp.title}</div>
                  <div style={{ fontSize:'9.5px', color:'#555', flexShrink:0, marginLeft:'10px' }}>{exp.period}</div>
                </div>
                {exp.company && <div style={{ fontSize:'9.5px', color:'#666', marginBottom:'5px' }}>{exp.company}</div>}
                {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                  <Bullet key={j} text={line} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div style={{ marginBottom:'15px' }}>
            <RH svg={SVG_STAR} title="Achievements" />
            {achievements.slice(0, 6).map((a, i) => (
              <Bullet key={i} text={typeof a === 'string' ? a : a.text || ''} />
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <RH svg={SVG_CERT} title="Certifications" />
            {certifications.slice(0, 6).map((c, i) => (
              <Bullet key={i} text={[c.name, c.issuedBy ? `Issued by ${c.issuedBy}` : '', c.year ? `(${c.year})` : ''].filter(Boolean).join(' – ')} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
