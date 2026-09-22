export const person = {
  name: "Othmane Ferrah",
  role: "Data Scientist / AI Engineer (Intern)",
  tagline:
    "Master's student in Data Science & AI — Machine Learning, Computer Vision, LLMs & VLMs",
  avatar: "/Pined/IMG_9846-Pano.jpg",
  email: "0x0red.me@gmail.com",
  phone: "+212 636 85 13 43",
  location: "Meknès, Morocco",
  languages: ["Arabic", "French", "English", "Italian"],
  primaryFocus: "Data Science & AI",
  secondaryFocus: "Design & Photography",
  seeking: "Data Science / AI internship (Master's, 2025–2027)",
  availability: "Seeking internship — Master's 2025–2027",
};

export const social = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/othmaneferrah-148a0b160",
    essential: true,
  },
  {
    name: "GitHub",
    link: "https://github.com/0x0red",
    essential: true,
  },
  {
    name: "Unsplash",
    link: "https://unsplash.com/@0x0red",
    essential: true,
  },
  {
    name: "Instagram",
    link: "https://instagram.com/0x0red",
    essential: true,
  },
  {
    name: "Behance",
    link: "https://www.behance.net/othmaneferrah",
    essential: false,
  },
  {
    name: "Email",
    link: "mailto:0x0red.me@gmail.com",
    essential: true,
  },
] as const;

export const about = {
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Profile",
    description:
      "Master's student in Data Science & AI seeking a data science / AI internship. Hands-on across the ML stack — computer vision, NLP, LLMs/VLMs, and graph learning — through a broad portfolio of applied projects spanning medical imaging (VLMs + LoRA), retrieval-augmented (RAG) chatbots, real-time gesture recognition, and graph neural networks. Comfortable owning a problem end-to-end: data pipeline, model fine-tuning, evaluation, and deployment.",
    secondary:
      "Alongside the technical work, Othmane is a creative director, multidisciplinary designer, and photographer — co-founder of two AI startups and President of his university's Computer Science Club, with a photography portfolio that has passed 16.5M+ views.",
  },
  studies: {
    display: true,
    title: "Education",
    logo: "/about/logos/umi.png",
    institutions: [
      {
        name: "Université Moulay Ismaïl — Faculté des Sciences, Meknès",
        description:
          "Master's — Parcours d'Excellence, Data Science & AI · Sep 2025 – Sep 2027",
      },
      {
        name: "Université Moulay Ismaïl — Licence",
        description:
          "Licence — Parcours d'Excellence, Data Science & AI · Nov 2024 – Jul 2025",
      },
      {
        name: "Université Moulay Ismaïl — DEUG",
        description: "DEUG — Mathematics & Computer Science · 2019 – 2022",
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming",
        description: "Core languages for software, data, and systems work.",
        tags: ["Python", "Java", "JavaScript/TypeScript", "SQL", "C/C++"],
      },
      {
        title: "Machine Learning & AI",
        description:
          "Applied ML across vision, language, retrieval, and graph learning.",
        tags: [
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "LLMs & VLMs",
          "RAG",
          "Graph Neural Networks",
          "PEFT (LoRA)",
          "Model Evaluation",
        ],
      },
      {
        title: "Frameworks & Libraries",
        description: "Tooling used to train, evaluate, and ship models and apps.",
        tags: [
          "PyTorch",
          "TensorFlow/Keras",
          "Scikit-learn",
          "OpenCV",
          "MediaPipe",
          "YOLO",
          "PyTorch Geometric",
          "XGBoost",
          "LightGBM",
          "NetworkX",
          "Next.js",
          "Spring Boot",
          "Django",
        ],
      },
      {
        title: "Data & Tools",
        description: "Databases, local LLMs, and everyday engineering tools.",
        tags: [
          "PostgreSQL",
          "MySQL",
          "pgvector",
          "Ollama",
          "Git",
          "Jupyter",
          "Linux",
        ],
      },
      {
        title: "Design & Creative",
        description:
          "Brand, product, and visual craft across digital and photography work.",
        tags: [
          "UX/UI Design",
          "Brand & Identity",
          "Graphic Design",
          "Data Visualization",
          "Photography",
          "Videography",
          "Figma",
          "Photoshop",
          "Illustrator",
          "Lightroom",
        ],
      },
      {
        title: "Languages",
        description: "Working languages across Arabic, French, English, and Italian.",
        tags: [
          "Arabic (Native)",
          "French (Full Professional)",
          "English (Native/Bilingual)",
          "Italian (Elementary)",
        ],
      },
    ],
  },
  projects: {
    display: true,
    title: "Projects",
    items: [
      {
        title: "Brain Tumor MRI Classification — Deep Learning & VLMs",
        timeframe: "May 2026 – Present · Université Moulay Ismaïl",
        summary:
          "Research project tracing the evolution of medical image analysis for brain-tumor MRI classification: from handcrafted features to deep learning to Vision-Language Models.",
        highlights: [
          "Handcrafted feature engineering: GLCM, LBP, DWT, HOG and statistical descriptors, with feature selection and ablation studies.",
          "Benchmarked 8+ ML models: SVM, Random Forest, XGBoost, LightGBM, Logistic Regression, MLP, Extra Trees.",
          "Evaluated and adapted SOTA Vision-Language Models (VLMs) using LoRA fine-tuning and Teacher Forcing.",
          "Full comparative analysis across accuracy, interpretability, computational efficiency, and clinical applicability.",
        ],
        tech: [
          "Python",
          "Scikit-learn",
          "XGBoost",
          "LightGBM",
          "PyTorch",
          "TensorFlow/Keras",
          "OpenCV",
          "VLMs",
          "LoRA",
        ],
        tags: ["Computer Vision", "VLM", "LoRA", "Medical AI"],
        documents: [
          {
            label: "Project Report",
            kind: "report" as const,
            href: "/projects/brain-tumor/report.pdf",
            preview: "/projects/brain-tumor/report-preview.png",
            pages: 59,
          },
        ],
      },
      {
        title: "Sign Language Recognition & Action Classification",
        timeframe: "Apr 2025 – Jul 2025",
        summary:
          "An AI system that detects and classifies hand/body gestures in real time from video for accessibility and HCI.",
        highlights: [
          "Real-time landmark extraction with MediaPipe (hand, pose, body).",
          "Person/region localization with YOLO.",
          "Temporal sequence modeling with LSTM networks for dynamic gestures.",
        ],
        tech: [
          "Python",
          "YOLO",
          "MediaPipe",
          "TensorFlow/Keras",
          "LSTM",
          "OpenCV",
        ],
        tags: ["Computer Vision", "Deep Learning"],
        documents: [
          {
            label: "Project Presentation",
            kind: "presentation" as const,
            href: "/projects/sign-language/presentation.pdf",
            preview: "/projects/sign-language/presentation-preview.png",
            pages: 31,
          },
        ],
      },
      {
        title: "Social-Graph Community Detection (Louvain, Leiden & GNN)",
        timeframe: "May 2026 – Jul 2026 · Université Moulay Ismaïl",
        summary:
          "A complete graph-analytics pipeline for detecting densely connected communities in large-scale social networks.",
        highlights: [
          "Built and preprocessed large social-network datasets (Pokec, YouTube).",
          "Implemented and compared Louvain and Leiden algorithms.",
          "Developed a GNN-based approach for node representations and community discovery.",
          "Designed a community-driven recommender for friend/content suggestions.",
        ],
        tech: [
          "Python",
          "NetworkX",
          "Louvain",
          "Leidenalg",
          "PyTorch",
          "PyTorch Geometric",
          "Scikit-learn",
        ],
        tags: ["Graph ML", "GNN"],
        documents: [
          {
            label: "Project Report",
            kind: "report" as const,
            href: "/projects/social-graph/report.pdf",
            preview: "/projects/social-graph/report-preview.png",
            pages: 42,
          },
        ],
      },
      {
        title: "Real-Estate Recommendation Chatbot (RAG)",
        timeframe: "Mar 2025 – May 2025",
        summary:
          "A modern web platform centered on a conversational assistant that recommends properties via Retrieval-Augmented Generation so the model never invents listings.",
        highlights: [
          "Frontend in Next.js with SSR, client dashboard, and admin catalogue management.",
          "Backend in Spring Boot with JWT security and business logic for listings, users, appointments, and agents.",
          "PostgreSQL/MySQL + pgvector for property embeddings; local Llama 3 via Ollama and Spring AI.",
        ],
        tech: [
          "Next.js",
          "Spring Boot",
          "Spring AI",
          "PostgreSQL/pgvector",
          "Ollama",
          "Llama 3",
          "RAG",
        ],
        tags: ["LLM", "RAG", "Full-Stack"],
      },
      {
        title: "Asteroid Sprint — Arcade Game with AI Hand-Gesture Controls",
        timeframe: "Feb 2025 – Jul 2025 · Computer Science Club (FSM)",
        summary:
          "An arcade survival game steered entirely by hand gestures via computer vision — no controller required. Publicly released.",
        highlights: [
          "Real-time hand-gesture recognition with MediaPipe + OpenCV.",
          "Automatic fallback to mouse/keyboard when no webcam is present.",
          "Released on itch.io with source on GitHub (GPL-3.0); showcased at the Moroccan Gaming Expo.",
        ],
        tech: ["Python", "MediaPipe", "OpenCV", "pygame-ce", "ModernGL"],
        tags: ["Computer Vision", "Game Dev", "Shipped"],
      },
      {
        title: "Solar System VR — Interactive Space Exploration",
        timeframe: "Jan 2025 – Aug 2025 · Computer Science Club (FSM)",
        summary:
          "An immersive VR experience for exploring the solar system and interacting with celestial bodies in real time.",
        highlights: [
          "Interactive 3D environment with planetary rotation and orbital mechanics.",
          "Showcased at the Moroccan Gaming Expo representing Université Moulay Ismaïl.",
        ],
        tech: ["VR", "3D", "Game Development"],
        tags: ["VR", "Game Dev"],
      },
      {
        title: "Intelligent Agriculture System",
        timeframe: "2025 · Computer Science Club (FSM)",
        summary:
          "An IoT + AI system that optimizes water use with precise, predictive irrigation.",
        highlights: [
          "Connected weather station with real-time environmental and soil sensors.",
          "Predicts reference evapotranspiration (ET₀) using Penman-Monteith (FAO-56) and/or ML models.",
          "Automated irrigation decisions driving solenoid valves.",
        ],
        tech: ["IoT", "Machine Learning", "Penman-Monteith (FAO-56)"],
        tags: ["IoT", "Machine Learning", "Embedded"],
      },
      {
        title: "Self-Balancing Robot — Inverted Pendulum with PID Control",
        timeframe: "Sep 2025 – Dec 2025 · Université Moulay Ismaïl",
        summary:
          "A two-wheeled robot that stays upright through real-time active control of an inherently unstable inverted-pendulum system.",
        highlights: [
          "Tilt estimation from MPU6050 IMU fused with a complementary filter.",
          "PID controller driving DC motors via PWM with iterative Kp/Ki/Kd tuning.",
          "Full hardware integration: Arduino Mega, L298N, DC motors, 12V supply.",
        ],
        tech: ["Arduino", "C/C++", "Control Systems", "Sensor Fusion"],
        tags: ["Embedded", "Control Systems"],
      },
      {
        title: "GestMag — Store Management Application",
        timeframe: "Mar 2025 – Jul 2025 · Université Moulay Ismaïl",
        summary:
          "A desktop store-management application for SMBs, centralizing daily retail operations.",
        highlights: [
          "Product & inventory management with stock monitoring.",
          "Sales/purchase tracking, customer & supplier management, invoice generation.",
          "Activity dashboard with secure authentication and role management.",
        ],
        tech: ["WinDev", "HFSQL", "Database Design", "CRUD"],
        tags: ["Desktop App"],
      },
      {
        title: "FSUMI-LIB — Library Management Platform",
        timeframe: "Apr 2024 – Jun 2024 · Université Moulay Ismaïl",
        summary:
          "A web platform that simplifies book borrowing and reservations, delivered iteratively with Scrum.",
        highlights: [
          "Advanced search by title, author, genre, or availability.",
          "Reservations and loans with automated return tracking.",
          "Admin dashboard for books, members, and borrowing history.",
        ],
        tech: ["Django", "MySQL", "HTML", "Tailwind CSS", "Scrum"],
        tags: ["Web", "Agile"],
      },
    ],
  },
  work: {
    display: true,
    title: "Professional Experience",
    experiences: [
      {
        company: "Sihati",
        logo: "/about/logos/sihati.png",
        timeframe: "Sep 2025 – Present · Fès-Meknès, Morocco",
        role: "Data Extraction Developer & Graphic Designer",
        achievements: [
          "Data Extraction: Built scripts and workflows to extract and structure raw sources into clean, usable datasets for the product.",
          "Design & Video: Produced brand visuals and video content for the health platform.",
        ],
      },
      {
        company: "NebrasAI",
        logo: "/about/logos/nebrasai.png",
        timeframe: "Sep 2024 – Present · Meknès, Morocco",
        role: "Co-Founder & Creative Director",
        achievements: [
          "Co-founded an AI startup; shaped product direction and led the full brand and design identity across products and communication.",
        ],
      },
      {
        company: "MowajihAI",
        logo: "/about/logos/mowajihai.png",
        timeframe: "Jan 2023 – Sep 2024 · Meknès, Morocco",
        role: "Lead Designer (Co-Founder)",
        achievements: [
          "Co-founded an AI-driven student-orientation platform and led its product design and brand identity.",
        ],
      },
      {
        company: "Twareg Esports",
        logo: "/about/logos/twareg-esports.png",
        timeframe: "Aug 2025 – Jan 2026 · Remote",
        role: "Graphic Designer",
        achievements: [
          "Delivered graphic design assets and visual identity work as a long-term design partner for the esports brand.",
        ],
      },
      {
        company: "RAWD Newton",
        logo: "/about/logos/rawd-newton.png",
        timeframe: "Jan 2025 – Feb 2025 · Freelance",
        role: "Graphic Designer (Logo Design)",
        achievements: [
          "Designed the logo and supporting brand assets.",
        ],
      },
    ],
  },
  leadership: {
    display: true,
    title: "Leadership & Community",
    items: [
      {
        org: "Computer Science Club — FSM (UMI)",
        logo: "/about/logos/cs-club.png",
        location: "Meknès, Morocco",
        timeframe: "Jul 2022 – Oct 2026",
        headline:
          "President • Lead Designer • Former Communications Manager • Photographer",
        roles: [
          {
            title: "President",
            period: "since Nov 2024",
            summary:
              "Lead a 21-person board and 460 active members, setting the club's direction and running its events end to end.",
            bullets: [
              "Run planning, delegation, and follow-through across events, workshops, and competitions.",
              "Represent the club with faculty, sponsors, and other student organizations.",
              "Drove AI / computer-vision project teams to the Moroccan Gaming Expo.",
            ],
          },
          {
            title: "Lead Designer",
            period: "since Jul 2022",
            summary:
              "Own the club's visual identity and keep it consistent across every platform we publish on.",
            bullets: [
              "Build and maintain the logo, color system, typography, and layout rules.",
              "Design posters, social posts, event branding, and certificates.",
              "Adapt the identity per platform (Instagram, LinkedIn, print, web).",
            ],
          },
          {
            title: "Communications Manager",
            period: "Nov 2023 – Nov 2024",
            summary:
              "Ran the club's content pipeline and built the tools behind it — WhatsApp bot, website, and email campaigns.",
            bullets: [
              "Owned the posting workflow: calendar, copywriting, scheduling, and publishing.",
              "Built a WhatsApp chatbot to automate announcements and member questions.",
              "Built and maintained the club website.",
            ],
          },
          {
            title: "Photographer",
            period: "Jul 2022 – Oct 2026",
            summary:
              "Documented the club from day one — events, workshops, competitions, and community moments that became the visual memory of the CS Club.",
            bullets: [
              "Shot and edited coverage for major events, including the Moroccan Gaming Expo.",
              "Built a reusable photo library used across social, posters, and the club website.",
              "Trained members on framing, lighting, and a consistent visual style.",
            ],
          },
        ],
        gallery: [
          { src: "/CSC/20241211-IMG_0578-Pano.jpg", width: 1920, height: 918 },
          { src: "/CSC/2S6A4912-Pano.jpg", width: 1920, height: 600 },
          { src: "/CSC/2S6A5092.jpg", width: 1920, height: 1280 },
          { src: "/CSC/2S6A5115.jpg", width: 1920, height: 1280 },
          { src: "/CSC/2S6A5134.jpg", width: 1920, height: 1280 },
          { src: "/CSC/2S6A5181.jpg", width: 1920, height: 1280 },
          { src: "/CSC/DSC_5927-Pano.jpg", width: 1920, height: 1101 },
          { src: "/CSC/DSC_5990-Pano.jpg", width: 1920, height: 787 },
          { src: "/CSC/IMG_0730-Pano-2.jpg", width: 1920, height: 1023 },
          { src: "/CSC/IMG_0973.jpg", width: 1920, height: 2880 },
          { src: "/CSC/IMG_1006.jpg", width: 1920, height: 1280 },
          { src: "/CSC/IMG_3252-Pano.jpg", width: 1920, height: 993 },
          { src: "/CSC/IMG_3298-Pano.jpg", width: 1920, height: 1145 },
          { src: "/CSC/IMG_3763-Pano.jpg", width: 1920, height: 1259 },
          { src: "/CSC/IMG_4018.jpg", width: 1920, height: 1280 },
          { src: "/CSC/IMG_4174-Pano.jpg", width: 1920, height: 897 },
          { src: "/CSC/IMG_4189-Pano.jpg", width: 1920, height: 857 },
          { src: "/CSC/IMG_4813-Pano.jpg", width: 1920, height: 1080 },
          { src: "/CSC/IMG_4844.jpg", width: 1920, height: 1280 },
          { src: "/CSC/IMG_5132-Pano.jpg", width: 1920, height: 938 },
          { src: "/CSC/IMG_6073-Pano-2.jpg", width: 1920, height: 808 },
          { src: "/CSC/IMG_9006-15.jpg", width: 1920, height: 1280 },
        ],
      },
    ],
  },
  design: {
    display: true,
    title: "Design & Photography",
    description:
      "A second pillar: creative direction, brand design, and photography alongside the AI work.",
    highlights: [
      "Photography portfolio with 16.5M+ views on Unsplash.",
      "Brand & graphic design for Sihati, Twareg Esports, RAWD Newton, NebrasAI, MowajihAI, and the CS Club.",
      "Style: modern, minimalist; adapts the visual language to each brand's identity.",
      "Disciplines: UX/UI design, brand & identity, graphic design, videography.",
      "Tools: Figma, Photoshop, Illustrator, Lightroom & Lightroom Classic.",
    ],
  },
  awards: {
    display: true,
    title: "Awards & Honors",
    items: [
      "Best Young Enterprise 2023 — Meknès region.",
      "Best Service Award.",
      "Responsible Entrepreneur Award.",
      '2nd Prize — "Out of The Box" competition.',
    ],
  },
  certifications: {
    display: true,
    title: "Certifications",
    items: [
      "Company Program regional competition (certificate of participation).",
      '"Personal Branding: Steps to Brand Yourself" training.',
      "Organizing committee — 10th Conference on Environmental Instrumentation and Measurements.",
      "Kaggle: Computer Vision, Intermediate Machine Learning, Deep Learning.",
    ],
  },
  interests: {
    display: true,
    title: "Interests",
    items: [
      "Photography",
      "Programming",
      "Security",
      "Research",
      "Gaming",
      "Football",
      "Volleyball",
      "Competitive programming",
    ],
  },
};
