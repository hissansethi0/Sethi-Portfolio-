import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio-store.json');

interface PortfolioStore {
  profile: any;
  projects: any[];
  skills: any[];
  experience: any[];
  education: any[];
  settings: any;
  messages: any[];
  lastUpdated: number;
}

function loadStore(): PortfolioStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed reading store file:', err);
  }

  const defaultStore: PortfolioStore = {
    profile: {
      name: 'Hissan Sethi',
      title: 'Full Stack Web Developer',
      status: 'Student',
      location: 'Peshawar, Pakistan',
      introHighlight: 'I build modern, fast and scalable web applications with a focus on clean code, thoughtful UX and real-world solutions.',
      bio: 'I am a Full Stack Web Developer and computer science student based in Peshawar, Pakistan. Dedicated to creating high-performance web applications, I combine solid architectural foundations with deliberate visual design to ship websites that feel fast, intuitive, and reliable.',
      philosophy: 'Code should be readable, interfaces should be effortless, and every layout decision must serve the user. I avoid bloated templates and focus on building purposeful, production-grade web solutions.',
      email: 'hissansethi0@gmail.com',
      whatsapp: '+92 313 3492982',
      linkedin: 'https://pk.linkedin.com/in/hissan-sethi-7a3682415',
      github: 'https://github.com/hissansethi0',
      avatarUrl: 'https://res.cloudinary.com/dcaomiuls/image/upload/v1791564824/elpowimn3utpjfl2skdt.jpg',
      availableForWork: true,
    },
    projects: [],
    skills: [],
    experience: [],
    education: [],
    settings: {
      allowDirectMessages: true,
      displayFeaturedOnlyByDefault: false,
      cloudinaryCloudName: 'dcaomiuls',
      cloudinaryUploadPreset: 'Sethi-Portfolio',
    },
    messages: [],
    lastUpdated: Date.now(),
  };

  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(store: PortfolioStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    store.lastUpdated = Date.now();
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing store file:', err);
  }
}

let currentStore: PortfolioStore = loadStore();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json({ limit: '25mb' }));

  // CORS headers for all requests
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now(), lastUpdated: currentStore.lastUpdated });
  });

  // Complete bundle endpoint for instant multi-device load
  app.get('/api/portfolio', (_req, res) => {
    // Always reload from disk to ensure freshest multi-tab / multi-process data
    currentStore = loadStore();
    res.json(currentStore);
  });

  // Profile endpoints
  app.get('/api/profile', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.profile);
  });

  app.post('/api/profile', (req, res) => {
    currentStore = loadStore();
    const updatedProfile = { ...currentStore.profile, ...req.body };
    currentStore.profile = updatedProfile;
    saveStore(currentStore);
    console.log('[Server] Saved updated profile! avatarUrl:', updatedProfile.avatarUrl);
    res.json({ success: true, profile: currentStore.profile });
  });

  // Projects endpoints
  app.get('/api/projects', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.projects);
  });

  app.post('/api/projects', (req, res) => {
    currentStore = loadStore();
    const project = req.body;
    if (!project || !project.id) {
      res.status(400).json({ error: 'Project must contain an id' });
      return;
    }
    const idx = currentStore.projects.findIndex((p: any) => p.id === project.id);
    if (idx >= 0) {
      currentStore.projects[idx] = { ...currentStore.projects[idx], ...project };
    } else {
      currentStore.projects = [project, ...currentStore.projects];
    }
    saveStore(currentStore);
    res.json({ success: true, project });
  });

  app.delete('/api/projects/:id', (req, res) => {
    currentStore = loadStore();
    currentStore.projects = currentStore.projects.filter((p: any) => p.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Skills endpoints
  app.get('/api/skills', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.skills);
  });

  app.post('/api/skills', (req, res) => {
    currentStore = loadStore();
    const skill = req.body;
    const idx = currentStore.skills.findIndex((s: any) => s.id === skill.id);
    if (idx >= 0) {
      currentStore.skills[idx] = skill;
    } else {
      currentStore.skills.push(skill);
    }
    saveStore(currentStore);
    res.json({ success: true, skill });
  });

  app.delete('/api/skills/:id', (req, res) => {
    currentStore = loadStore();
    currentStore.skills = currentStore.skills.filter((s: any) => s.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Experience endpoints
  app.get('/api/experience', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.experience);
  });

  app.post('/api/experience', (req, res) => {
    currentStore = loadStore();
    const exp = req.body;
    const idx = currentStore.experience.findIndex((e: any) => e.id === exp.id);
    if (idx >= 0) {
      currentStore.experience[idx] = exp;
    } else {
      currentStore.experience = [exp, ...currentStore.experience];
    }
    saveStore(currentStore);
    res.json({ success: true, experience: exp });
  });

  app.delete('/api/experience/:id', (req, res) => {
    currentStore = loadStore();
    currentStore.experience = currentStore.experience.filter((e: any) => e.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Education endpoints
  app.get('/api/education', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.education);
  });

  app.post('/api/education', (req, res) => {
    currentStore = loadStore();
    const edu = req.body;
    const idx = currentStore.education.findIndex((e: any) => e.id === edu.id);
    if (idx >= 0) {
      currentStore.education[idx] = edu;
    } else {
      currentStore.education = [edu, ...currentStore.education];
    }
    saveStore(currentStore);
    res.json({ success: true, education: edu });
  });

  app.delete('/api/education/:id', (req, res) => {
    currentStore = loadStore();
    currentStore.education = currentStore.education.filter((e: any) => e.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Settings endpoints
  app.get('/api/settings', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.settings);
  });

  app.post('/api/settings', (req, res) => {
    currentStore = loadStore();
    currentStore.settings = { ...currentStore.settings, ...req.body };
    saveStore(currentStore);
    res.json({ success: true, settings: currentStore.settings });
  });

  // Messages endpoints
  app.get('/api/messages', (_req, res) => {
    currentStore = loadStore();
    res.json(currentStore.messages);
  });

  app.post('/api/messages', (req, res) => {
    currentStore = loadStore();
    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: req.body.name || '',
      email: req.body.email || '',
      subject: req.body.subject || '',
      message: req.body.message || '',
      timestamp: Date.now(),
      read: false,
    };
    currentStore.messages = [newMsg, ...(currentStore.messages || [])];
    saveStore(currentStore);
    res.json({ success: true, message: newMsg });
  });

  app.patch('/api/messages/:id', (req, res) => {
    currentStore = loadStore();
    const idx = currentStore.messages.findIndex((m: any) => m.id === req.params.id);
    if (idx >= 0) {
      currentStore.messages[idx].read = Boolean(req.body.read);
      saveStore(currentStore);
      res.json({ success: true, message: currentStore.messages[idx] });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  });

  app.delete('/api/messages/:id', (req, res) => {
    currentStore = loadStore();
    currentStore.messages = currentStore.messages.filter((m: any) => m.id !== req.params.id);
    saveStore(currentStore);
    res.json({ success: true });
  });

  // Vite development vs production static file serving
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Full-Stack Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Full-Stack Server] Startup failed:', err);
  process.exit(1);
});
