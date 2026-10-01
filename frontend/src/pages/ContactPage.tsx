import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { sendContactMessage } from '../services/api';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      setFeedback('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setStatus('idle');

    try {
      await sendContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      });

      setStatus('success');
      setFeedback('Message sent successfully. I will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Let&apos;s talk about ideas and opportunities.</h1>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-cyan-300" /> hello@example.com</p>
            <p>Based in India with a focus on cloud engineering, web products, and career growth.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-200">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-200">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-200">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Tell me a little about your project or idea." />
            </div>

            {feedback && (
              <p className={status === 'success' ? 'text-sm text-emerald-400' : 'text-sm text-red-400'}>{feedback}</p>
            )}

            <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
              <Send className="h-4 w-4" /> {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
