import { LucideIcon, Trophy, Award, Star } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  highlight?: string;
  type: 'Web' | 'Mobile' | 'Full Stack' | 'HRIS' | 'Gamification' | 'AI' | 'Desktop';
  results: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  achievements: string[];
  tech: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-10
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'Database' | 'Soft Skills' | 'AI/ML';
  years: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  credentialId: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    title: string;
    university: string;
    semester: number;
    gpa: number;
    bio: string;
    location: string;
    email: string;
    phone: string;
    summary: string;
    social: {
      github: string;
      linkedin: string;
      whatsapp: string;
      instagram: string;
    };
  };
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certificates: Certificate[];
  awards: {
    title: string;
    issuer: string;
    year: string;
    description: string;
    icon: string;
  }[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Haerul Yuda Aditiya',
    role: 'Full Stack Web & Mobile Developer',
    title: 'Software Engineer',
    university: 'Universitas Buana Perjuangan Karawang',
    semester: 5,
    gpa: 3.84,
    bio: 'Results-oriented Software Developer and Computer Science student seeking a Web Developer position to apply expertise in Full-Stack Development. Proven track record in building scalable web applications (HRIS & Gamification) and optimizing corporate internal systems. Proficient in PHP (CodeIgniter/Laravel), React.js, and SQL Server to create efficient, user-centered digital solutions.',
    location: 'Karawang, West Java',
    email: 'haerulyudaaditiya@gmail.com',
    phone: '+62 881 6147 969',
    summary: 'Results-oriented Software Developer and Informatics student seeking a Web Developer position to apply expertise in Full-Stack Development. Proven track record in building scalable web applications (HRIS & Gamification) and optimizing corporate internal systems. Proficient in PHP (CodeIgniter/Laravel), React.js, and SQL Server to create efficient, user-centered digital solutions.',
    social: {
      github: 'https://github.com/haerulyudaaditiya',
      linkedin: 'https://linkedin.com/in/haerul-yuda-aditiya',
      whatsapp: 'https://wa.me/628816147969',
      instagram: 'https://instagram.com/haerulyuda',
    },
  },
  skills: [
    { name: 'Laravel', level: 9, category: 'Backend', years: 3 },
    { name: 'React.js', level: 8, category: 'Frontend', years: 2 },
    { name: 'Vue.js', level: 8, category: 'Frontend', years: 2 },
    { name: 'Ionic/Angular', level: 8, category: 'Mobile', years: 2 },
    { name: 'TypeScript', level: 7, category: 'Frontend', years: 2 },
    { name: 'MySQL/SQL Server', level: 9, category: 'Database', years: 3 },
    { name: 'CodeIgniter', level: 8, category: 'Backend', years: 2 },
    { name: 'RESTful API', level: 9, category: 'Backend', years: 3 },
    { name: 'Linux System Admin', level: 7, category: 'DevOps', years: 2 },
    { name: 'Git & CI/CD', level: 8, category: 'DevOps', years: 2 },
    { name: 'Problem Solving', level: 10, category: 'Soft Skills', years: 4 },
    { name: 'Team Collaboration', level: 9, category: 'Soft Skills', years: 4 },
    { name: 'Python', level: 8, category: 'Backend', years: 2 },
    { name: 'Computer Vision', level: 8, category: 'AI/ML', years: 1 },
    { name: 'FilamentPHP', level: 9, category: 'Backend', years: 1 },
    { name: 'Supabase', level: 8, category: 'Database', years: 1 },
    { name: 'PostgreSQL', level: 8, category: 'Database', years: 1 },
  ],
  projects: [
    {
      id: 'simpligudang-erp',
      title: 'SimpliGudang - Enterprise Asset ERP',
      description: 'A comprehensive Enterprise Resource Planning (ERP) solution for Asset Management designed for multi-tenant environments. It integrates Procurement workflows with Asset Lifecycle Management, featuring automatic Total Cost of Ownership (TCO) calculation, preventive maintenance scheduling, and official document generation (BAST).',
      tech: ['Laravel', 'FilamentPHP', 'Livewire', 'MySQL', 'DomPDF', 'Chart.js'],
      image: '/images/simpli-gudang.png',
      type: 'Full Stack',
      repoUrl: 'https://github.com/haerulyudaaditiya/simpligudang',
      results: [
        'End-to-End Procurement: Integrated Purchase Orders with automatic Goods Receipt logic',
        'Financial Analytics: Real-time TCO calculation & Maintenance Cost tracking',
        'Corporate Compliance: Auto-generated PDF Legal Documents (BAST) & Digital Asset Labeling (QR)'
      ]
    },
    {
      id: 'opencv-face-recognition',
      title: 'Face Detection & Recognition (OpenCV)',
      description: 'Computer Vision project capable of detecting and recognizing faces in real-time. Utilizes Haar Cascade Classifiers for detection and LBPH (Local Binary Patterns Histograms) algorithm for accurate face recognition, implemented via Jupyter Notebooks.',
      tech: ['Python', 'OpenCV', 'Haar Cascade', 'LBPH', 'Jupyter'],
      image: '/images/face-detection.png',
      type: 'AI',
      repoUrl: 'https://github.com/haerulyudaaditiya/OpenCV-Face-Recognition',
      results: [
        'Real-time face detection/recognition from video stream',
        'Custom dataset training workflow',
        'High-accuracy identification using LBPH algorithm'
      ]
    },
    {
      id: 'handwritten-digit',
      title: 'Handwritten Digit Recognition (CNN)',
      description: 'Real-time desktop application for recognizing handwritten digits. Powered by a Convolutional Neural Network (CNN) trained on the MNIST dataset, featuring an interactive drawing canvas with instant prediction confidence scores.',
      tech: ['Python', 'TensorFlow', 'Keras', 'Tkinter', 'OpenCV'],
      image: '/images/handwritten.png',
      type: 'AI',
      repoUrl: 'https://github.com/haerulyudaaditiya/Handwritten-Digit-Recognition',
      results: [
        '99% Accuracy on MNIST test set using Custom CNN',
        'Real-time interactive drawing & prediction interface',
        'Automated image preprocessing pipeline (Grayscale/Threshold)'
      ]
    },
    {
      id: 'idarma-profile',
      title: 'Idarma Digital Technology - Company Profile',
      description: 'Corporate profile website designed for branding and information dissemination. Built with Laravel to ensure performance and security, featuring a custom CMS for easy content management and role-based access control.',
      tech: ['Laravel', 'PHP', 'Bootstrap', 'MySQL'],
      image: '/images/idarma.png',
      type: 'Web',
      repoUrl: 'https://github.com/haerulyudaaditiya/idarma_profile',
      results: [
        'Professional corporate branding presence',
        'Responsive UI with Bootstrap',
        'Secure Role-Based Access Control (RBAC)'
      ]
    },
    {
      id: 'snapchef-ai',
      title: 'SnapChef AI - Culinary Assistant',
      description: 'An AI-powered culinary assistant that generates cooking ideas from ingredients. Leveraging Google Gemini Multimodal AI, it analyzes food images to provide personalized, healthy, and easy-to-follow recipes based on dietary preferences and available ingredients.',
      tech: ['Python', 'Streamlit', 'Google Gemini AI', 'Computer Vision', 'Pillow'],
      image: '/images/snapchef.png',
      type: 'AI',
      liveUrl: 'https://snapchef-ai.streamlit.app/',
      repoUrl: 'https://github.com/haerulyudaaditiya/snapchef-ai',
      results: [
        'Visual ingredient analysis using Google Gemini Computer Vision',
        'Personalized recipe generation (Vegan, Keto, etc.)',
        'Automated nutritional estimation',
      ]
    },
    {
      id: 'karawang-mart',
      title: 'KarawangMart - Hyperlocal Marketplace',
      description: 'A modern, hyperlocal marketplace platform bridging the gap between local MSMEs (UMKM) and customers. Engineered with a robust multi-role architecture, it features a real-time order tracking system, a comprehensive "Digital Kitchen" dashboard for merchants to manage products & orders, and precise geolocation-based store discovery.',
      tech: ['React.js', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Leaflet Maps', 'PostgreSQL'],
      image: '/images/karawangmart.png',
      type: 'Full Stack',
      liveUrl: 'https://karawangmart.netlify.app/',
      repoUrl: 'https://github.com/haerulyudaaditiya/direktori-umkm-web-in-action',
      results: [
        'End-to-end Realtime Order Flow (User to Merchant) via WebSockets',
        'Secure Multi-Tenant Architecture with Row Level Security (RLS)',
        'Advanced Merchant Tools: GPS Pinning, Product CRUD, & Live Order Handling'
      ]
    },
    {
      id: 'musma-voting',
      title: 'MUSMA HIMATIF 2025 E-Voting',
      description: 'Secure, real-time E-Voting platform designed for high-stakes student council elections. Features strict QR-based attendance verification with time-gating logic, instant vote tallying via Supabase Realtime, and a comprehensive admin dashboard for participant management.',
      tech: ['React.js', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Real-time API'],
      image: '/images/musma.png',
      type: 'Full Stack',
      liveUrl: 'https://musmahimatif.netlify.app/',
      repoUrl: 'https://github.com/haerulyudaaditiya/musma-himatif-2025',
      results: [
        'Guaranteed 100% unique votes via QR-gated access',
        'Real-time Quick Count with zero latency',
        'Secure admin panel with manual & QR time-validation'
      ]
    },
    {
      id: 'mymoney-finance',
      title: 'MyMoney - Family Finance',
      description: 'Comprehensive family finance platform empowering parents to monitor children\'s spending while providing students with tools for personal budget tracking, savings goals, and multi-currency transaction management.',
      tech: ['PHP Native', 'MySQL', 'Bootstrap 5', 'Chart.js', 'DataTables'],
      image: '/images/mymoney.png',
      type: 'Full Stack',
      liveUrl: 'https://mymoney.luno.my.id/',
      results: [
        'Centralized family financial monitoring',
        'Multi-currency support with auto-conversion',
        'Visual expense analysis & goal tracking'
      ]
    },
    {
      id: 'sipena-hris',
      title: 'SIPENA HRIS System',
      description: 'Comprehensive HR Management System with geofencing-based attendance, leave management, and employee performance tracking. Modern solution for enterprise workforce management.',
      tech: ['Laravel', 'Ionic', 'Angular', 'Geofencing', 'MySQL', 'REST API'],
      image: '/images/sipena.jpg',
      highlight: '2nd Place - EXPO TECHNOVISION 2025',
      type: 'HRIS',
      repoUrl: 'https://github.com/haerulyudaaditiya/sipena-ionic-app',
      results: [
        '2nd Place Winner at EXPO MAHASISWA - TECHNOVISION 2025 (UBP Karawang)',
        'Advanced Geofencing implementation for verified onsite attendance',
        'Integrated Payroll & Performance Management Module'
      ]
    },
    {
      id: 'aksaraquest',
      title: 'AksaraQuest - Gamified Learning',
      description: 'Interactive Sundanese script learning platform combining gamification with cultural education.',
      tech: ['Vue.js', 'Laravel', 'Gamification', 'WebSockets', 'MySQL'],
      image: '/images/aksaraquest.jpg',
      highlight: '1st Place Web Dev - INSYFEST 2025',
      type: 'Gamification',
      liveUrl: 'https://aksaraquest.newhimatif.com/',
      repoUrl: 'https://github.com/haerulyudaaditiya/aksaraquest',
      results: [
        'Champion of INSYFEST 2025 Web Development Competition (UBP Karawang)',
        'Innovative gamification platform for preserving Sundanese culture',
        'Recognized for technical excellence in Full-Stack implementation'
      ]
    },
    {
      id: 'wejeatrans',
      title: 'WejeaTrans Booking System',
      description: 'Complete vehicle rental booking system with real-time availability, payment processing, and fleet management dashboard.',
      tech: ['PHP', 'Laravel', 'Bootstrap', 'MySQL', 'Payment Gateway'],
      image: '/images/wejea.png',
      type: 'Full Stack',
      repoUrl: 'https://github.com/haerulyudaaditiya/final_project',
      results: [
        'Successfully digitalized manual rental validation processes',
        'Implemented real-world client requirements for Final Year Project',
        'Automated penalty calculation & fleet availability management'
      ]
    }
  ],
  experiences: [
    {
      id: 'century-batteries',
      role: 'Web Developer Intern',
      company: 'PT Century Batteries Indonesia',
      duration: 'Sep 2025 - Present',
      description: [
        'Spearheaded the development of custom features for internal web applications using PHP CodeIgniter, accelerating departmental workflows and reducing manual data entry.',
        'Managed Microsoft SQL Server database integrity, ensuring daily operational data accuracy.',
        'Resolved critical frontend and backend bugs, significantly improving application stability and user satisfaction.'
      ],
      achievements: [
        'Accelerated department workflow by 40%',
        'Maintained 99.9% data accuracy',
        'Improved application stability significantly'
      ],
      tech: ['PHP', 'CodeIgniter', 'SQL Server', 'JavaScript', 'Bootstrap']
    },
    {
      id: 'idarma-frontend',
      role: 'Frontend Developer',
      company: 'PT Idarma Digital Technology',
      duration: 'Mar 2025 - Jun 2025',
      description: [
        'Transformed design mockups into high-performance web interfaces, achieving optimal compatibility across desktop and mobile devices.',
        'Coordinated feature implementation with cross-functional teams in Agile sprints, ensuring strict adherence to design specifications.',
        'Optimized application styling using utility-first CSS, contributing to a responsive and consistent user experience.'
      ],
      achievements: [
        'Achieved optimal compatibility across desktop and mobile',
        'Ensured design specification compliance in Agile sprints',
        'Contributed to responsive and consistent UX'
      ],
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Agile']
    },
    {
      id: 'meiji-operator',
      role: 'Packaging Operator',
      company: 'Meiji Food Indonesia',
      duration: 'Dec 2023 - Jun 2024',
      description: [
        'Operated packaging machinery to achieve daily production targets while strictly adhering to corporate quality standards.',
        'Conducted regular visual inspections and quality testing to minimize defect rates in the final product.',
        'Disciplined implementation of Good Manufacturing Practices (GMP) to maintain workplace cleanliness, orderliness, and safety.'
      ],
      achievements: [
        'Maintained strict quality standards',
        'Minimized defect rates significantly',
        'Ensured workplace cleanliness and safety'
      ],
      tech: ['GMP', 'Quality Control', 'Production Management']
    },
    {
      id: 'peruri-operator',
      role: 'Warehouse Operator',
      company: 'Peruri',
      duration: 'Jul 2022 - Dec 2022',
      description: [
        'Executed efficient goods reception, storage, and dispatch processes to ensure smooth logistical distribution flows.',
        'Ensured stock data accuracy through routine inventory audits and meticulous warehouse administration.',
        'Operated warehouse equipment in compliance with OHS (Occupational Health & Safety) procedures to minimize operational risks.'
      ],
      achievements: [
        'Ensured stock data accuracy',
        'Efficient logistics distribution',
        'Zero safety incidents'
      ],
      tech: ['Warehouse Management', 'Inventory Control', 'K3']
    }
  ],
  certificates: [
    {
      id: 'linux-admin',
      title: 'Linux System Administrator',
      issuer: 'Dicoding Indonesia',
      date: '2023',
      image: '/images/linux_sys_dicoding.png',
      link: 'https://www.dicoding.com/certificates/JMZV97W03PN9',
      credentialId: 'JMZV97W03PN9'
    },
    {
      id: 'backend-developer',
      title: 'Back-End Developer',
      issuer: 'Dicoding Indonesia',
      date: '2023',
      image: '/images/backend_dicoding.png',
      link: 'https://www.dicoding.com/certificates/2VX3J4VE3PYQ',
      credentialId: '2VX3J4VE3PYQ'
    },
    {
      id: 'rest-api',
      title: 'RESTful API Development',
      issuer: 'Codepolitan',
      date: '2023',
      image: '/images/restapi_codepolitan.png',
      link: 'https://www.codepolitan.com/c/RWVXKUY/',
      credentialId: 'RWVXKUY'
    }
  ],
  awards: [
    {
      title: '1st Place - INSYIFEST National Competition',
      issuer: 'Ministry of Education & Culture',
      year: '2024',
      description: 'For AksaraQuest gamified learning platform',
      icon: '🥇'
    },
    {
      title: '2nd Place - Expo Technovision',
      issuer: 'Technology University Consortium',
      year: '2024',
      description: 'For SIPENA HRIS integrated system',
      icon: '🥈'
    },
    {
      title: 'Outstanding Academic Achievement',
      issuer: 'Universitas Buana Perjuangan',
      year: '2023-2024',
      description: 'Maintained 3.78 GPA for consecutive semesters',
      icon: '⭐'
    }
  ]
};