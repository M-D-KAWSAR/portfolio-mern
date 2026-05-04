import { useState, useEffect, useCallback } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../api';

const CATEGORIES = ['Web Development', 'AI / Machine Learning', 'Data Science', 'Tools'];
const EMPTY = { name: '', category: 'Web Development', proficiency: 80, icon: '', order: 0 };

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function SkillForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, proficiency: Number(form.proficiency), order: Number(form.order) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Skill Name *</label>
        <input className="form-input" value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="e.g. React" />
      </div>
      <div>
        <label className="form-label">Category *</label>
        <select className="form-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="form-label">Proficiency: {form.proficiency}%</label>
        <input
          type="range" min={0} max={100} step={5}
          className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
          value={form.proficiency}
          onChange={(e) => set('proficiency', e.target.value)}
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Display Order</label>
          <input type="number" className="form-input" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </div>
        <div>
          <label className="form-label">Icon URL (optional)</label>
          <input type="url" className="form-input" value={form.icon ?? ''} onChange={(e) => set('icon', e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Skill'}
        </button>
      </div>
    </form>
  );
}

const CAT_COLORS = {
  'Web Development': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'AI / Machine Learning': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Data Science': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Tools': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const load = useCallback(() => {
    setLoading(true);
    getSkills().then(setSkills).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (modal === 'edit') await updateSkill(editTarget._id, data);
      else await createSkill(data);
      load();
      setModal(null);
      setEditTarget(null);
    } catch (err) {
      alert(err.response?.data?.message ?? 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSkill(deleteTarget._id);
      load();
      setDeleteTarget(null);
    } catch (err) {
      alert(err.response?.data?.message ?? 'Failed to delete');
    }
  };

  const filtered = filterCat === 'All' ? skills : skills.filter((s) => s.category === filterCat);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-slate-500 text-sm mt-0.5">{skills.length} total</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditTarget(null); setModal('add'); }}>
          + Add Skill
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterCat === c ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700/50">
                <tr>
                  <th className="table-th">Skill</th>
                  <th className="table-th hidden sm:table-cell">Category</th>
                  <th className="table-th">Proficiency</th>
                  <th className="table-th hidden md:table-cell">Order</th>
                  <th className="table-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="table-td font-medium text-white">{s.name}</td>
                    <td className="table-td hidden sm:table-cell">
                      <span className={`badge border ${CAT_COLORS[s.category] ?? 'bg-slate-700 text-slate-300'}`}>
                        {s.category}
                      </span>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden w-24 sm:w-32">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${s.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{s.proficiency}%</span>
                      </div>
                    </td>
                    <td className="table-td hidden md:table-cell text-slate-500">{s.order}</td>
                    <td className="table-td text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn text-xs py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300"
                          onClick={() => { setEditTarget(s); setModal('edit'); }}
                        >
                          Edit
                        </button>
                        <button className="btn-danger text-xs py-1.5" onClick={() => setDeleteTarget(s)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="table-td text-center text-slate-600 py-12">
                      No skills found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {modal && (
        <Modal
          title={modal === 'edit' ? 'Edit Skill' : 'Add Skill'}
          onClose={() => { setModal(null); setEditTarget(null); }}
        >
          <SkillForm
            initial={modal === 'edit' ? editTarget : EMPTY}
            onSave={handleSave}
            onCancel={() => { setModal(null); setEditTarget(null); }}
            saving={saving}
          />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <Modal title="Delete Skill" onClose={() => setDeleteTarget(null)}>
          <p className="text-slate-300 mb-6">
            Delete <span className="font-semibold text-white">{deleteTarget.name}</span>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button className="btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button className="btn bg-red-600 hover:bg-red-500 text-white" onClick={handleDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
