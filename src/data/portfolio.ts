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
  type: 'Web' | 'Mobile' | 'Full Stack' | 'HRIS' | 'Gamification';
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
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'Database' | 'Soft Skills';
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
  ],
  projects: [
    {
      id: 'sipena-hris',
      title: 'SIPENA HRIS System',
      description: 'Comprehensive HR Management System with geofencing-based attendance, leave management, and employee performance tracking. Modern solution for enterprise workforce management.',
      tech: ['Laravel', 'Ionic', 'Angular', 'Geofencing', 'MySQL', 'REST API'],
      image: '/images/sipena.jpg',
      highlight: '2nd Place Expo Technovision 2024',
      type: 'HRIS',
      repoUrl: 'https://github.com/haerulyudaaditiya/sipena-hris',
      results: [
        'Reduced manual HR processes by 80%',
        'Improved attendance accuracy by 95%',
        'Scalable to 1000+ employees'
      ]
    },
    {
      id: 'aksaraquest',
      title: 'AksaraQuest - Gamified Learning',
      description: 'Interactive Sundanese script learning platform combining gamification with cultural education.',
      tech: ['Vue.js', 'Laravel', 'Gamification', 'WebSockets', 'MySQL'],
      image: '/images/aksaraquest.jpg',
      highlight: '1st Place National Media Competition',
      type: 'Gamification',
      liveUrl: 'https://aksaraquest.com',
      repoUrl: 'https://github.com/haerulyudaaditiya/aksaraquest',
      results: [
        'Increased student engagement by 300%',
        'Winner of national innovation competition',
        'Adopted by 5 educational institutions'
      ]
    },
    {
      id: 'wejeatrans',
      title: 'WejeaTrans Booking System',
      description: 'Complete vehicle rental booking system with real-time availability, payment processing, and fleet management dashboard.',
      tech: ['PHP', 'Laravel', 'Bootstrap', 'MySQL', 'Payment Gateway'],
      image: '/images/wejea.png',
      type: 'Web',
      liveUrl: 'https://wejeatrans.com',
      results: [
        'Increased bookings by 150%',
        'Reduced manual work by 70%',
        '24/7 automated operations'
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