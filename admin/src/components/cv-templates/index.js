import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';

export const TEMPLATES = [
  { id: 'classic',      name: 'Classic',      desc: 'Dark navy sidebar, clean white body', accent: '#1a2744', component: Template1 },
  { id: 'executive',    name: 'Executive',    desc: 'Corporate blue header, two-column', accent: '#1e3a8a', component: Template2 },
  { id: 'modern',       name: 'Modern',       desc: 'Dark header, emerald accents', accent: '#10b981', component: Template3 },
  { id: 'minimal',      name: 'Minimal',      desc: 'Pure white, elegant typography', accent: '#374151', component: Template4 },
  { id: 'bold',         name: 'Bold',         desc: 'Deep purple, gold highlights', accent: '#3b0764', component: Template5 },
  { id: 'professional', name: 'Professional', desc: 'B&W two-column with icons', accent: '#2c2c2c', component: Template6 },
];

export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id)?.component || Template1;
}
