import { useState, useEffect, useCallback } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api';

const CATEGORIES = ['Web Development', 'AI / Machine Learning', 'Data Science'];

const EMPTY = {
  title: '', description: '', longDescription: '', techStack: '',
  category: 'Web Development', githubLink: '', liveLink: '', image: '', featured: false, order: 0,
};

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
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

function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    ...EMPTY,
    ...initial,
    techStack: Array.isArray(initial?.techStack) ? initial.techStack.join(', ') : (initial?.techStack ?? ''),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="form-label">Title *</label>
          <input className="form-input" value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Short Description *</label>
          <textarea className="form-input h-20 resize-none" value={form.description} onChange={(e) => set('description', e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Long Description</label>
          <textarea className="form-input h-24 resize-none" value={form.longDescription} onChange={(e) => set('longDescription', e.target.value)} />
        </div>
        <div>
          <label className="form-label">Category *</label>
          <select className="form-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Display Order</label>
          <input type="number" className="form-input" value={form.order} onChange={(e) => set('order', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Tech Stack (comma-separated)</label>
          <input className="form-input" placeholder="React, Node.js, MongoDB" value={form.techStack} onChange={(e) => set('techStack', e.target.value)} />
        </div>
        <div>
          <label className="form-label">GitHub URL</label>
          <input type="url" className="form-input" value={form.githubLink} onChange={(e) => set('githubLink', e.target.value)} />
        </div>
        <div>
          <label className="form-label">Live URL</label>
          <input type="url" className="form-input" value={form.liveLink} onChange={(e) => set('liveLink', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Image URL</label>
          <input type="url" className="form-input" value={form.image} onChange={(e) => set('image', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-600" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            <span className="text-sm text-slate-300">Featured project</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const load = useCallback(() => {
    setLoading(true);
    getProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (modal === 'edit') await updateProject(editTarget._id, data);
      else await createProject(data);
      load();
      setModal(null);
      setEditTarget(null);
    } catch (err) {
      alert(err.response?.data?.message ?? 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteTarget._id);
      load();
      setDeleteTarget(null);
    } catch (err) {
      alert(err.response?.data?.message ?? 'Failed to delete');
    }
  };

  const filtered = filterCat === 'All' ? projects : projects.filter((p) => p.category === filterCat);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">{projects.length} total</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditTarget(null); setModal('add'); }}>
          + Add Project
        </button>
      </div>

      {/* Category filter */}
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
                  <th className="table-th">Project</th>
                  <th className="table-th hidden md:table-cell">Category</th>
                  <th className="table-th hidden lg:table-cell">Tech Stack</th>
                  <th className="table-th">Featured</th>
                  <th className="table-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="table-td">
                      <div className="font-medium text-white">{p.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{p.description}</div>
                    </td>
                    <td className="table-td hidden md:table-cell">
                      <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {p.category}
                      </span>
                    </td>
                    <td className="table-td hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.techStack?.slice(0, 3).map((t) => (
                          <span key={t} className="badge bg-slate-700 text-slate-300">{t}</span>
                        ))}
                        {p.techStack?.length > 3 && <span className="badge bg-slate-700 text-slate-500">+{p.techStack.length - 3}</span>}
                      </div>
                    </td>
                    <td className="table-td">
                      {p.featured ? (
                        <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20">⭐ Yes</span>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="table-td text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn text-xs py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300"
                          onClick={() => { setEditTarget(p); setModal('edit'); }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger text-xs py-1.5"
                          onClick={() => setDeleteTarget(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="table-td text-center text-slate-600 py-12">
                      No projects found.
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
          title={modal === 'edit' ? 'Edit Project' : 'Add Project'}
          onClose={() => { setModal(null); setEditTarget(null); }}
        >
          <ProjectForm
            initial={modal === 'edit' ? editTarget : EMPTY}
            onSave={handleSave}
            onCancel={() => { setModal(null); setEditTarget(null); }}
            saving={saving}
          />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <Modal title="Delete Project" onClose={() => setDeleteTarget(null)}>
          <p className="text-slate-300 mb-6">
            Delete <span className="font-semibold text-white">{deleteTarget.title}</span>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button className="btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button className="btn bg-red-600 hover:bg-red-500 text-white" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
