import { ArrowRight, BriefcaseBusiness, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getSkills } from '../services/api';
import type { Project, Skill } from '../types';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getProjects()
      .then((items) => setProjects(items.slice(0, 3)))
      .catch(() => setProjects([]));

    getSkills()
      .then((items) => setSkills(items.slice(0, 8)))
      .catch(() => setSkills([]));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
            MCA Student • Cloud Computing Focus
          </p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Building scalable cloud and full-stack experiences.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            I&apos;m Pavan, an MCA student passionate about cloud architecture, backend engineering, and creating reliable digital solutions that help people and businesses scale.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-cyan-400 hover:text-cyan-300">
              Contact Me
            </Link>
            <a href="https://github.com/PAVAN2004583/PORTFOLIO" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-cyan-400 hover:text-cyan-300">
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-slate-300">
            <a href="https://github.com/PAVAN2004583" aria-label="GitHub" target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 p-2 hover:border-cyan-400 hover:text-cyan-300"><Github className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 p-2 hover:border-cyan-400 hover:text-cyan-300"><Linkedin className="h-4 w-4" /></a>
            <a href="mailto:admin@portfolio.dev" aria-label="Email" className="rounded-full border border-slate-700 p-2 hover:border-cyan-400 hover:text-cyan-300"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Profile</span>
            <Sparkles className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/15 to-slate-900 p-5">
            <p className="text-sm text-slate-300">Currently learning</p>
            <p className="mt-2 text-2xl font-semibold text-white">AWS, Azure & Full-Stack Systems</p>
          </div>
          <div className="mt-6 grid gap-4 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 p-3">
              <span>Cloud</span>
              <span className="text-cyan-300">Learning</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 p-3">
              <span>Web Development</span>
              <span className="text-cyan-300">Strong</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 p-3">
              <span>Problem Solving</span>
              <span className="text-cyan-300">Focused</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Skills Snapshot</h2>
          <Link to="/about" className="text-sm font-medium text-cyan-300">Learn more</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-lg font-semibold text-white">{skill.name}</p>
              <p className="mt-2 text-sm text-slate-400">{skill.category}</p>
              <span className="mt-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/5 px-2 py-1 text-xs text-cyan-300">{skill.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>
          <Link to="/projects" className="text-sm font-medium text-cyan-300">See all</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
              <img src={project.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'} alt={project.title} className="h-48 w-full object-cover" />
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  {project.featured && <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">Featured</span>}
                </div>
                <p className="text-sm text-slate-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3 text-sm text-cyan-300">
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer">Code</a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Demo</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <BriefcaseBusiness className="mx-auto h-8 w-8 text-cyan-300" />
        <h2 className="mt-4 text-2xl font-semibold text-white">Learning, building, and shipping with purpose.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          I&apos;m focused on technologies that bridge cloud infrastructure, DevOps, and responsive product development.
        </p>
      </section>
    </main>
  );
}
