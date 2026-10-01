import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getResume } from '../services/api';

export function ResumePage() {
  const [resume, setResume] = useState<{ name: string; url: string }>({
    name: 'Pavan Resume',
    url: 'https://github.com/PAVAN2004583/PORTFOLIO',
  });

  useEffect(() => {
    getResume()
      .then((data) => setResume({ ...data, url: data.url || 'https://github.com/PAVAN2004583/PORTFOLIO' }))
      .catch(() => setResume({ name: 'Pavan Resume', url: 'https://github.com/PAVAN2004583/PORTFOLIO' }));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Resume</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Professional profile and experience summary.</h1>
        <p className="mt-5 text-slate-300">A concise snapshot of my technical skills, academic background, and cloud-focused objectives.</p>
        <a href={resume.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950">
          <Download className="h-4 w-4" /> View / Download {resume.name}
        </a>
      </div>
    </main>
  );
}
