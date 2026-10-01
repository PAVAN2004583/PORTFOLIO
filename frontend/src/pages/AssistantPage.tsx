import { ArrowUpRight, Bot } from 'lucide-react';
import { useState } from 'react';
import { askAI } from '../services/api';

export function AssistantPage() {
  const [question, setQuestion] = useState('What technologies does Pavan know?');
  const [answer, setAnswer] = useState('Ask the assistant anything about my portfolio.');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await askAI(question.trim());
      setAnswer(response.answer);
    } catch (error) {
      setAnswer(error instanceof Error ? error.message : 'Unable to answer right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="mb-6 flex items-center gap-3 text-cyan-300">
          <Bot className="h-5 w-5" />
          <p className="text-sm font-medium uppercase tracking-[0.2em]">AI Portfolio Assistant</p>
        </div>
        <h1 className="text-4xl font-bold text-white">Ask about my portfolio</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" />
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 disabled:opacity-70">
            {loading ? 'Thinking...' : 'Ask the Assistant'} <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Response</p>
          <p className="mt-4 text-lg leading-8 text-slate-200">{answer}</p>
        </div>
      </div>
    </main>
  );
}
