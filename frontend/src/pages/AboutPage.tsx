import { Cloud, Database, Network, Rocket } from 'lucide-react';

const focusAreas = [
  { title: 'Cloud Computing', description: 'Exploring AWS and Azure architecture, automation, and efficient infrastructure design.', icon: Cloud },
  { title: 'Networking', description: 'Building a strong understanding of connectivity, security, and system resilience.', icon: Network },
  { title: 'Databases', description: 'Learning relational and modern data models to support scalable applications.', icon: Database },
  { title: 'Product Mindset', description: 'Combining engineering practices with clear problem solving and user-centered thinking.', icon: Rocket },
];

export function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 lg:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">About Me</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Driven by learning, systems, and cloud-first thinking.</h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          I am an MCA student focused on cloud computing, backend technologies, and creating practical software systems that solve modern challenges. I enjoy learning how applications scale from code to deployment and how cloud infrastructure makes digital products resilient.
        </p>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {focusAreas.map(({ title, description, icon: Icon }) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <h2 className="text-2xl font-semibold text-white">My professional direction</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 p-5">
            <h3 className="text-lg font-semibold text-white">Technical interests</h3>
            <p className="mt-3 text-slate-300">
              I enjoy building web applications, understanding backend systems, exploring APIs, and learning how cloud environments support scalable business solutions.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-5">
            <h3 className="text-lg font-semibold text-white">Career focus</h3>
            <p className="mt-3 text-slate-300">
              My long-term goal is to work in cloud computing and modern engineering roles where I can contribute to automation, platform reliability, and business transformation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
