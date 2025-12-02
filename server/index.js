
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI, Type } from "@google/genai";
import { verifyToken } from './middleware/auth.js';
import { db } from './firebaseAdmin.js';

dotenv.config();

const app = express();

// 1. Strict CORS
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// 2. Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);
app.use('/api/', verifyToken);

app.use(express.json());

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Warning: API_KEY is not set in environment variables.");
}

const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// Helper to check client
const getClient = () => {
    if (!genAI) {
        throw new Error("API Key not configured on server.");
    }
    return genAI;
}

// Helper for consistent error handling
const handleError = (res, error, context) => {
    console.error(`${context} Error:`, error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({
        error: message,
        code: error.code || 'INTERNAL_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
};

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// --- Job CRUD Endpoints ---

app.get('/api/jobs', async (req, res) => {
    try {
        const jobsSnapshot = await db.collection('users').doc(req.user.uid).collection('jobs').get();
        const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(jobs);
    } catch (error) {
        handleError(res, error, "Get Jobs");
    }
});

app.post('/api/jobs', async (req, res) => {
    try {
        const job = req.body;
        // Ensure we don't overwrite the ID if passed, or let Firestore generate one
        const docRef = await db.collection('users').doc(req.user.uid).collection('jobs').add(job);
        res.json({ id: docRef.id, ...job });
    } catch (error) {
        handleError(res, error, "Add Job");
    }
});

app.put('/api/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const job = req.body;
        await db.collection('users').doc(req.user.uid).collection('jobs').doc(id).update(job);
        res.json({ id, ...job });
    } catch (error) {
        handleError(res, error, "Update Job");
    }
});

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('users').doc(req.user.uid).collection('jobs').doc(id).delete();
        res.json({ success: true, id });
    } catch (error) {
        handleError(res, error, "Delete Job");
    }
});

// --- AI Endpoints ---

app.post('/api/search-jobs', async (req, res) => {
    try {
        const { query, location } = req.body;
        if (!query) return res.status(400).json({ error: "Query is required" });

        const client = getClient();

        const locationStr = location ? ` in ${location}` : '';
        const prompt = `
        Find 20 active, individual job posting URLs for: "${query}"${locationStr}.
        
        CRITICAL INSTRUCTIONS:
        1.  **Individual Jobs Only**: Do NOT return search result pages (e.g., "30 jobs found"). Return links to specific job descriptions.
        2.  **Extract Details**: For each job, extract the Title, Company, Location, and Salary (if available).
        3.  **Salary**: Look for salary ranges (e.g., "£40k - £50k", "$80,000/yr"). If not found, use "Competitive" or "Not specified".
        4.  **Direct Links**: Prioritize direct company career pages or specific job board listings (LinkedIn, Indeed, Glassdoor individual pages).
        
        Return a JSON object with a "jobs" array.
        `;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        jobs: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    company: { type: Type.STRING },
                                    location: { type: Type.STRING },
                                    salary: { type: Type.STRING },
                                    url: { type: Type.STRING },
                                    snippet: { type: Type.STRING, description: "Brief summary of the role (1-2 sentences)" }
                                },
                                required: ["title", "company", "url", "snippet"]
                            }
                        }
                    }
                }
            },
        });

        if (response.text) {
            const data = JSON.parse(response.text);
            res.json(data.jobs || []);
        } else {
            throw new Error("No response from AI");
        }
    } catch (error) {
        handleError(res, error, "Search");
    }
});

app.post('/api/match-score', async (req, res) => {
    try {
        const { jobTitle, jobSnippet, userSkills } = req.body;
        if (!jobTitle || !userSkills) return res.status(400).json({ error: "Missing required fields" });

        const client = getClient();

        const prompt = `
        Role: Hiring Manager.
        Candidate Skills: ${userSkills.join(', ')}.
        Job: ${jobTitle} - ${jobSnippet}.
        
        Task: Estimate the probability (0-100) that this candidate is a good match for this job based ONLY on the skills provided.
        Return ONLY the number.
        `;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const text = response.text?.trim();
        const score = parseInt(text || "0");
        res.json({ score: isNaN(score) ? 50 : score });
    } catch (error) {
        handleError(res, error, "Match Score");
    }
});

app.post('/api/job-advice', async (req, res) => {
    try {
        const { jobTitle, company } = req.body;
        const client = getClient();

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Give me 3 short, actionable tips for interviewing for a ${jobTitle} position at ${company}. Keep it under 100 words.`
        });
        res.json({ advice: response.text || "No advice generated." });
    } catch (error) {
        handleError(res, error, "Advice");
    }
});

app.post('/api/analyze-cv', async (req, res) => {
    try {
        const { cvText } = req.body;
        if (!cvText) return res.status(400).json({ error: "CV Text is required" });

        const client = getClient();

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert Career Mentor and Senior Recruiter. Analyze the following resume content deeply.
            
            Resume Content:
            ${cvText}
            
            Provide a structured analysis including:
            1. A professional summary.
            2. Key skills extracted.
            3. Suggested job titles that fit this profile perfectly.
            4. Top 3 Strengths.
            5. Top 3 Weaknesses or Gaps to address.
            6. A "Mentor Verdict" (1-2 sentences on overall hirability).
            7. A specific "searchQuery" string optimized for finding jobs for this candidate (e.g. "Senior React Developer remote London").
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING, description: "Professional summary" },
                        skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Extracted skills" },
                        suggestedRoles: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Best fit job titles" },
                        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key strong points" },
                        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Areas for improvement" },
                        mentorVerdict: { type: Type.STRING, description: "Overall professional assessment" },
                        searchQuery: { type: Type.STRING, description: "Optimized search query string" }
                    },
                    required: ["summary", "skills", "suggestedRoles", "strengths", "weaknesses", "mentorVerdict", "searchQuery"]
                }
            }
        });

        if (response.text) {
            res.json(JSON.parse(response.text));
        } else {
            throw new Error("No response from AI");
        }
    } catch (error) {
        handleError(res, error, "CV Analysis");
    }
});

app.post('/api/interview-prep', async (req, res) => {
    try {
        const { role, company } = req.body;
        const client = getClient();

        const prompt = `Create a comprehensive interview preparation guide for a "${role}" position${company ? ` at ${company}` : ''}. 
        Include a brief overview, 5 technical questions, 5 behavioral questions, and 3 key success tips.`;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        roleOverview: { type: Type.STRING, description: "A summary of the role responsibilities." },
                        technicalQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 technical interview questions." },
                        behavioralQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 behavioral questions." },
                        tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 strategic tips." }
                    },
                    required: ["roleOverview", "technicalQuestions", "behavioralQuestions", "tips"]
                }
            }
        });

        if (response.text) {
            res.json(JSON.parse(response.text));
        } else {
            throw new Error("No response from AI");
        }
    } catch (error) {
        handleError(res, error, "Interview Prep");
    }
});

app.post('/api/search-videos', async (req, res) => {
    try {
        const { query } = req.body;
        const client = getClient();

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Find 5 excellent YouTube video tutorials or mock interviews for: "${query} interview preparation".
            Ensure the results are from site:youtube.com.`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const videos = [];

        if (groundingChunks) {
            groundingChunks.forEach((chunk) => {
                if (chunk.web && (chunk.web.uri.includes('youtube.com') || chunk.web.uri.includes('youtu.be'))) {
                    if (!videos.some(v => v.url === chunk.web.uri)) {
                        videos.push({
                            title: chunk.web.title || "Interview Guide",
                            url: chunk.web.uri,
                            channel: "YouTube"
                        });
                    }
                }
            });
        }
        res.json(videos.slice(0, 5));
    } catch (error) {
        handleError(res, error, "Video Search");
    }
});

app.post('/api/cover-letter', async (req, res) => {
    try {
        const { cvText, jobDescription, companyName } = req.body;
        const client = getClient();

        const prompt = `
        Role: You are an expert Career Consultant specializing in writing effective cover letters based on specific industry guidelines.

        Guidelines for Structure and Content:
        1. **Greeting**: Use a name if available, otherwise 'Dear Hiring Manager'.
        2. **Introduction**: State who the candidate is, their situation, and why they are applying.
        3. **Why Them? (The Company)**: Demonstrate specific knowledge of the company. Avoid vague flattery. Test: If you can replace the company name with a competitor and it still makes sense, it's too vague.
        4. **Why You? (The Candidate)**: Link skills/experience directly to job requirements. Use 3-4 specific examples backed by evidence.
        5. **Tone**: Use positive 'power words' (e.g., 'initiated', 'instrumental', 'succeeded'). Be succinct and professional.
        6. **Ending**: State availability and thank them.

        Task:
        1. Analyze the 'Candidate CV' and 'Job Description'.
        2. Calculate a 'Compatibility Score' (0-100) based on how well the CV fits the Job Description.
        3. Write the cover letter following the guidelines above.
        4. Provide customization tips.

        Input Data:
        - Company Name: ${companyName}
        - Candidate CV: "${cvText}"
        - Job Description: "${jobDescription}"
        `;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        letterContent: { type: Type.STRING, description: "The full text of the cover letter." },
                        compatibilityScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating fit." },
                        gapAnalysis: { type: Type.STRING, description: "A brief analysis of why the score is what it is (missing skills vs matched skills)." },
                        customizationTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 tips to make this specific letter better manually." }
                    },
                    required: ["letterContent", "compatibilityScore", "gapAnalysis", "customizationTips"]
                }
            }
        });

        if (response.text) {
            res.json(JSON.parse(response.text));
        } else {
            throw new Error("No response from AI");
        }
    } catch (error) {
        handleError(res, error, "Cover Letter");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
