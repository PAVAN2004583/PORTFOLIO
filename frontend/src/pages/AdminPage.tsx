import { useEffect, useState } from 'react';
import {
  createEducationAdmin,
  createProjectAdmin,
  createSkillAdmin,
  deleteEducationAdmin,
  deleteProjectAdmin,
  deleteSkillAdmin,
  getContactMessages,
  getEducation,
  getMe,
  getProjects,
  getResume,
  getSkills,
  loginAdmin,
  logoutAdmin,
  updateContactMessageStatus,
  updateEducationAdmin,
  updateProjectAdmin,
  updateResumeAdmin,
  updateSkillAdmin,
} from '../services/api';
import type { ContactMessage, Education, Project, Skill, UserSession } from '../types';

const emptyProjectForm = { title: '', description: '', technologies: '', github_url: '', live_url: '', image_url: '', featured: false };
const emptySkillForm = { name: '', category: '', level: 'Intermediate' };
const emptyEducationForm = { degree: '', institution: '', description: '', start_date: '', end_date: '' };

export function AdminPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [resumeUrl, setResumeUrl] = useState('https://github.com/PAVAN2004583/PORTFOLIO');
  const [loginForm, setLoginForm] = useState({ email: 'admin@portfolio.dev', password: 'admin123' });
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [skillForm, setSkillForm] = useState(emptySkillForm);
  const [educationForm, setEducationForm] = useState(emptyEducationForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);

  const loadPortfolioData = async () => {
    try {
      const [projectList, skillList, educationList, messageList, resume] = await Promise.all([
        getProjects(),
        getSkills(),
        getEducation(),
        getContactMessages(),
        getResume(),
      ]);
      setProjects(projectList);
      setSkills(skillList);
      setEducation(educationList);
      setContactMessages(messageList);
      setResumeUrl(resume.url || 'https://github.com/PAVAN2004583/PORTFOLIO');
    } catch {
      setProjects([]);
      setSkills([]);
      setEducation([]);
      setContactMessages([]);
      setResumeUrl('https://github.com/PAVAN2004583/PORTFOLIO');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (!token) return;

    getMe()
      .then((currentUser) => {
        setUser(currentUser);
        void loadPortfolioData();
      })
      .catch(() => {
        localStorage.removeItem('portfolio_token');
      });
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginAdmin(loginForm.email, loginForm.password);
      setUser(response.user);
      await loadPortfolioData();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setUser(null);
      localStorage.removeItem('portfolio_token');
    }
  };

  const resetProjectForm = () => {
    setProjectForm(emptyProjectForm);
    setEditingProjectId(null);
  };

  const resetSkillForm = () => {
    setSkillForm(emptySkillForm);
    setEditingSkillId(null);
  };

  const resetEducationForm = () => {
    setEducationForm(emptyEducationForm);
    setEditingEducationId(null);
  };

  const populateProjectForm = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      github_url: project.github_url,
      live_url: project.live_url,
      image_url: project.image_url,
      featured: project.featured,
    });
  };

  const populateSkillForm = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
  };

  const populateEducationForm = (item: Education) => {
    setEditingEducationId(item.id);
    setEducationForm({
      degree: item.degree,
      institution: item.institution,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date ?? '',
    });
  };

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map((item) => item.trim()).filter(Boolean),
        github_url: projectForm.github_url,
        live_url: projectForm.live_url,
        image_url: projectForm.image_url,
        featured: projectForm.featured,
      };

      if (editingProjectId) {
        const updated = await updateProjectAdmin(editingProjectId, payload);
        setProjects((current) => current.map((item) => item.id === editingProjectId ? updated : item));
      } else {
        const created = await createProjectAdmin(payload);
        setProjects((current) => [created, ...current]);
      }
      resetProjectForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to save project.');
    }
  };

  const handleSkillSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingSkillId) {
        const updated = await updateSkillAdmin(editingSkillId, skillForm);
        setSkills((current) => current.map((item) => item.id === editingSkillId ? updated : item));
      } else {
        const created = await createSkillAdmin(skillForm);
        setSkills((current) => [created, ...current]);
      }
      resetSkillForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to save skill.');
    }
  };

  const handleEducationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingEducationId) {
        const updated = await updateEducationAdmin(editingEducationId, educationForm);
        setEducation((current) => current.map((item) => item.id === editingEducationId ? updated : item));
      } else {
        const created = await createEducationAdmin(educationForm);
        setEducation((current) => [created, ...current]);
      }
      resetEducationForm();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to save education record.');
    }
  };

  const handleResumeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updated = await updateResumeAdmin(resumeUrl);
      setResumeUrl(updated.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to update resume link.');
    }
  };

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:py-16">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-200">Email</label>
              <input value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-200">Password</label>
              <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
            </div>
            <button type="submit" className="rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950">Login</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Admin Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Welcome, {user.name}</h1>
        </div>
        <button onClick={handleLogout} className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-white">Logout</button>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Projects</h2>
            {editingProjectId && <button onClick={resetProjectForm} className="text-xs text-cyan-300">Cancel edit</button>}
          </div>
          <form onSubmit={handleProjectSubmit} className="mt-4 space-y-3 text-sm">
            <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Project title" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} placeholder="Description" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} placeholder="React, Node.js, AWS" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={projectForm.github_url} onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })} placeholder="GitHub URL" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={projectForm.live_url} onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })} placeholder="Live URL" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={projectForm.image_url} onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })} placeholder="Image URL" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <label className="flex items-center gap-2 text-slate-200"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} /> Featured</label>
            <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">{editingProjectId ? 'Save project changes' : 'Add project'}</button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Skills</h2>
            {editingSkillId && <button onClick={resetSkillForm} className="text-xs text-cyan-300">Cancel edit</button>}
          </div>
          <form onSubmit={handleSkillSubmit} className="mt-4 space-y-3 text-sm">
            <input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="Skill name" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} placeholder="Category" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })} placeholder="Level" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">{editingSkillId ? 'Save skill changes' : 'Add skill'}</button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Education</h2>
            {editingEducationId && <button onClick={resetEducationForm} className="text-xs text-cyan-300">Cancel edit</button>}
          </div>
          <form onSubmit={handleEducationSubmit} className="mt-4 space-y-3 text-sm">
            <input value={educationForm.degree} onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })} placeholder="Degree" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={educationForm.institution} onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })} placeholder="Institution" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <textarea value={educationForm.description} onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })} rows={3} placeholder="Description" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={educationForm.start_date} onChange={(e) => setEducationForm({ ...educationForm, start_date: e.target.value })} placeholder="Start date" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <input value={educationForm.end_date} onChange={(e) => setEducationForm({ ...educationForm, end_date: e.target.value })} placeholder="End date" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
            <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">{editingEducationId ? 'Save education changes' : 'Add education'}</button>
          </form>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Projects</h2>
          <div className="mt-4 space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-2xl border border-slate-800 p-3">
                <p className="font-medium text-white">{project.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => populateProjectForm(project)} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">Edit</button>
                  <button onClick={async () => { const updated = await updateProjectAdmin(project.id, { featured: !project.featured }); setProjects((current) => current.map((item) => item.id === project.id ? updated : item)); }} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">{project.featured ? 'Featured' : 'Mark featured'}</button>
                  <button onClick={async () => { await deleteProjectAdmin(project.id); setProjects((current) => current.filter((item) => item.id !== project.id)); }} className="rounded-full border border-red-500/50 px-3 py-1 text-xs text-red-300">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Skills</h2>
          <div className="mt-4 space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="rounded-2xl border border-slate-800 p-3">
                <p className="font-medium text-white">{skill.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => populateSkillForm(skill)} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">Edit</button>
                  <button onClick={async () => { const updated = await updateSkillAdmin(skill.id, { level: skill.level === 'Advanced' ? 'Intermediate' : 'Advanced' }); setSkills((current) => current.map((item) => item.id === skill.id ? updated : item)); }} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">Toggle level</button>
                  <button onClick={async () => { await deleteSkillAdmin(skill.id); setSkills((current) => current.filter((item) => item.id !== skill.id)); }} className="rounded-full border border-red-500/50 px-3 py-1 text-xs text-red-300">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Education</h2>
          <div className="mt-4 space-y-3">
            {education.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 p-3">
                <p className="font-medium text-white">{item.degree}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => populateEducationForm(item)} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">Edit</button>
                  <button onClick={async () => { await deleteEducationAdmin(item.id); setEducation((current) => current.filter((entry) => entry.id !== item.id)); }} className="rounded-full border border-red-500/50 px-3 py-1 text-xs text-red-300">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold text-white">Contact & Resume</h2>
          <form onSubmit={handleResumeSubmit} className="mt-4 space-y-3 text-sm">
            <label className="block text-slate-200">Resume URL</label>
            <input value={resumeUrl} onChange={(event) => setResumeUrl(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white" placeholder="https://..." />
            <button type="submit" className="w-full rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">Update resume link</button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Contact Messages</h3>
            <div className="mt-4 space-y-3">
              {contactMessages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-slate-800 p-3">
                  <p className="font-medium text-white">{message.name}</p>
                  <p className="text-sm text-slate-300">{message.email}</p>
                  <p className="mt-2 text-sm text-slate-400">{message.message}</p>
                  <div className="mt-2 flex gap-2">
                    <button onClick={async () => { const updated = await updateContactMessageStatus(message.id, message.status === 'new' ? 'read' : 'new'); setContactMessages((current) => current.map((item) => item.id === message.id ? updated : item)); }} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">{message.status === 'new' ? 'Mark read' : 'Mark new'}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
