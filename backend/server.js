import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory and inquiries.json exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Rate Limiter for contact/quote inquiries
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: { success: false, message: 'Too many submissions from this IP, please try again in 15 minutes.' }
});

// Helper to read data safely
const readJsonFile = (filename, defaultVal = []) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    if (!fs.existsSync(filePath)) {
      return defaultVal;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultVal;
  }
};

// API Routes

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Freelance Web Dev Business API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Portfolio Projects
app.get('/api/projects', (req, res) => {
  const projects = readJsonFile('projects.json');
  res.json({ success: true, count: projects.length, data: projects });
});

// 3. Services Offered
app.get('/api/services', (req, res) => {
  const services = readJsonFile('services.json');
  res.json({ success: true, count: services.length, data: services });
});

// 4. Testimonials
app.get('/api/testimonials', (req, res) => {
  const testimonials = readJsonFile('testimonials.json');
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

// 5. Submit Contact Inquiry or Project Quote
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, projectType, budget, timeline, message, estimatedCost } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const newInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      company: company || 'Not specified',
      projectType: projectType || 'General Inquiry',
      budget: budget || 'To be discussed',
      timeline: timeline || 'Flexible',
      estimatedCost: estimatedCost || null,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    // Store in JSON file database
    let inquiries = [];
    try {
      inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
    } catch {
      inquiries = [];
    }
    inquiries.unshift(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));

    // Optional: Send email notification if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Website Leads" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_RECEIVER || process.env.SMTP_USER,
          subject: `🚀 New Project Inquiry from ${name} (${projectType || 'General'})`,
          text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Estimate: ${estimatedCost ? '$' + estimatedCost : 'N/A'}

Message:
${message}
          `
        });
      } catch (mailError) {
        console.warn('SMTP forwarding failed (inquiry saved locally):', mailError.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your project inquiry has been received. I will review it and reply within 24 hours.',
      inquiryId: newInquiry.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your request.'
    });
  }
});

// 6. View Inquiries (Admin list)
app.get('/api/inquiries', (req, res) => {
  // Simple view endpoint for checking submitted client inquiries
  const inquiries = readJsonFile('inquiries.json');
  res.json({
    success: true,
    total: inquiries.length,
    data: inquiries
  });
});

// 7. User Registration
app.post('/api/register', (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }
    let users = [];
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch {
      users = [];
    }

    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      email: email.toLowerCase(),
      password,
      company: company || '',
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// 8. User Login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    let users = [];
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch {
      users = [];
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    return res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// 9. Delete Registered Users
app.all(['/api/users/delete', '/api/users'], (req, res) => {
  if (req.method === 'DELETE' || req.method === 'POST') {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
      return res.json({
        success: true,
        message: 'All registered users have been deleted successfully.'
      });
    } catch (error) {
      console.error('Error deleting users:', error);
      return res.status(500).json({ success: false, message: 'Server error while deleting users.' });
    }
  }
  if (req.method === 'GET') {
    const users = readJsonFile('users.json');
    return res.json({ success: true, count: users.length, data: users });
  }
  return res.status(405).json({ success: false, message: 'Method not allowed' });
});

app.listen(PORT, () => {
  console.log(`🚀 Freelance Business API running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive client inquiries and serve portfolio data`);
});
