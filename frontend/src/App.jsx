import { useState, useEffect } from 'react';
import { fetchProfile, fetchProjects, fetchSkills } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Loader() {
  return (
    <div className="fixed inset-0 bg-navy-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }) {
  return (
    <div className="fixed inset-0 bg-navy-900 flex items-center justify-center z-50">
      <div className="text-center glass rounded-2xl p-10 max-w-md mx-4">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Could not load portfolio</h2>
        <p className="text-slate-400 text-sm">{message}</p>
        <p className="text-slate-500 text-xs mt-3">Make sure the backend server is running on port 5000</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary mt-6"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchProjects(), fetchSkills()])
      .then(([prof, projs, skls]) => {
        setProfile(prof);
        setProjects(projs);
        setSkills(skls);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <div className="min-h-screen">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </div>
  );
}
