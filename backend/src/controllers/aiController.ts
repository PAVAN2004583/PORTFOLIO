import type { Request, Response } from 'express';
import OpenAI from 'openai';
import { portfolioState } from '../data/portfolio.js';
import { env } from '../config/env.js';

const buildPortfolioContext = () => ({
  name: 'Pavan',
  focus: 'Cloud Computing',
  summary: 'MCA student with a focus on cloud computing, software engineering, and modern web applications.',
  technologies: portfolioState.skills.map((skill) => `${skill.name} (${skill.category})`),
  projects: portfolioState.projects.map((project) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    live_url: project.live_url,
    github_url: project.github_url,
  })),
  education: portfolioState.education,
});

const generateLocalAnswer = (question: string) => {
  const normalized = question.toLowerCase();

  if (normalized.includes('technology') || normalized.includes('skills') || normalized.includes('know')) {
    return `Pavan works with ${portfolioState.skills.map((skill) => skill.name).join(', ')}. His strongest focus is cloud computing, web development, and software engineering.`;
  }

  if (normalized.includes('project') || normalized.includes('built')) {
    const projectTitles = portfolioState.projects.map((project) => project.title).join(', ');
    return `Pavan has worked on the following projects: ${projectTitles}.`;
  }

  if (normalized.includes('education') || normalized.includes('study') || normalized.includes('degree')) {
    return `Pavan is pursuing an MCA degree with a focus on software engineering and cloud technologies. His education includes ${portfolioState.education.map((entry) => entry.degree).join(' and ')}.`;
  }

  if (normalized.includes('cloud') || normalized.includes('learning')) {
    return `Pavan is actively learning AWS, Azure, Docker, Linux, and cloud operations fundamentals as part of his professional growth in cloud computing.`;
  }

  return `Based on the portfolio data available, Pavan is focused on cloud computing and modern full-stack development. His skills include ${portfolioState.skills.slice(0, 6).map((skill) => skill.name).join(', ')}.`;
};

export const askAI = async (req: Request, res: Response) => {
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';

  if (!question) {
    return res.status(400).json({ success: false, error: 'A question is required.' });
  }

  if (!env.openAIApiKey) {
    return res.json({
      success: true,
      data: {
        answer: generateLocalAnswer(question),
        source: 'portfolio-data',
      },
    });
  }

  try {
    const client = new OpenAI({ apiKey: env.openAIApiKey });
    const portfolioContext = JSON.stringify(buildPortfolioContext(), null, 2);

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'system',
          content: 'Use only the provided portfolio data. Never invent jobs, skills, projects, degrees, or certifications. If information is missing, say it is unavailable.',
        },
        {
          role: 'user',
          content: `Portfolio data:\n${portfolioContext}\n\nAnswer this question using only the data above:\n${question}`,
        },
      ],
    });

    const answer = response.output_text || 'I do not have enough information to answer that accurately.';
    return res.json({ success: true, data: { answer, source: 'openai' } });
  } catch {
    return res.json({
      success: true,
      data: {
        answer: generateLocalAnswer(question),
        source: 'fallback-portfolio-data',
      },
    });
  }
};
