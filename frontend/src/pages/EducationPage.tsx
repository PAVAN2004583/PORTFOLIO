import { useEffect, useState } from 'react';
import { getEducation } from '../services/api';
import type { Education } from '../types';

export function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    getEducation().then((items) => setEducation(items)).catch(() => setEducation([]));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Education</p>
      <h1 className="mt-3 text-4xl font-bold text-white">Academic foundation and continuing growth.</h1>

      <div className="mt-10 space-y-6">
        {education.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{item.degree}</h2>
                <p className="mt-2 text-lg text-cyan-300">{item.institution}</p>
              </div>
              <p className="text-sm text-slate-400">
                {item.start_date} — {item.end_date ?? 'Present'}
              </p>
            </div>
            <p className="mt-4 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
