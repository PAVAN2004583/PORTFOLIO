import { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import type { Project } from '../types';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((items) => setProjects(items))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <main className="mx-auto max-w-6xl px-4 py-12 text-slate-300">Loading projects...</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Projects</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Selected work and learning builds.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
            <img src={project.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'} alt={project.title} className="h-56 w-full object-cover" />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                {project.featured && <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">Featured</span>}
              </div>
              <p className="text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={`${project.id}-${tech}`} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-200">{tech}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-cyan-300">
                {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer">GitHub</a>}
                {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Live Demo</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
