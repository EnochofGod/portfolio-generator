const defaultData = {
  template: null, // Must be explicitly set to 'modern' or 'classic' by user
  personal: {
    fullName: 'Jane Doe',
    title: 'Senior Platform Architect',
    tagline: 'Building scalable applications with a focus on resilient cloud architecture and developer tooling.',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    location: 'San Francisco, CA',
    availability: 'Open to opportunities',
    website: 'https://janedoe.dev',
    github: 'https://github.com/janedoe',
    linkedin: 'https://linkedin.com/in/janedoe',
    twitter: 'https://twitter.com/janedoe',
    profileImage: 'https://placehold.co/128x128/0891b2/ffffff?text=JD',
    about: `I am a highly motivated and results-driven engineer with 8 years of experience in full-stack development. I specialize in React, Go, and cloud architecture (AWS/GCP).

Key highlights:
• Led multiple successful cloud migrations and infrastructure optimizations
• Reduced operational costs by 40% through efficient resource utilization
• Mentored junior developers and established best practices
• Regular speaker at tech conferences and active open-source contributor

I thrive in fast-paced environments and enjoy solving complex technical challenges to deliver robust, high-performance solutions.`,
    cvFile: '',
    cvFileName: '',
  },
  education: [
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      year: '2014 - 2016',
      highlights: 'Specialized in Distributed Systems and Cloud Computing',
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'University of California, Berkeley',
      year: '2010 - 2014',
      highlights: 'Graduated with Honors, Dean\'s List all semesters',
    }
  ],
  skills: {
    technical: [
      'React', 'TypeScript', 'Node.js', 'Go', 'Python',
      'AWS', 'GCP', 'Kubernetes', 'Docker',
      'PostgreSQL', 'MongoDB', 'Redis',
      'GraphQL', 'REST APIs', 'gRPC',
      'CI/CD', 'Infrastructure as Code',
    ],
    soft: [
      'Team Leadership',
      'Project Management',
      'Technical Writing',
      'Public Speaking',
      'Mentoring'
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        year: '2023',
        expires: '2026'
      },
      {
        name: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation',
        year: '2022',
        expires: '2025'
      }
    ]
  },
  experience: [
    {
      id: 1,
      year: '2022 - Present',
      title: 'Senior Platform Architect',
      company: 'Fusion Systems',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Spearheaded migration to microservices architecture using Kubernetes and Istio, resulting in 99.99% uptime and 25% cost reduction.',
      achievements: [
        'Led a team of 8 engineers in modernizing legacy infrastructure',
        'Implemented GitOps practices reducing deployment time by 70%',
        'Designed and implemented multi-region disaster recovery system',
        'Reduced cloud costs by $500K annually through optimization'
      ],
      technologies: ['Kubernetes', 'Istio', 'AWS', 'Terraform', 'Go', 'React']
    },
    {
      id: 2,
      year: '2018 - 2022',
      title: 'Software Engineer',
      company: 'Data Solutions Co.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Developed high-throughput API services using Go and PostgreSQL, processing over 1 million daily requests.',
      achievements: [
        'Optimized database queries, cutting latency by 50ms',
        'Implemented real-time analytics dashboard used by 50+ enterprise clients',
        'Mentored 4 junior developers who were promoted to mid-level',
        'Contributed to open-source projects with 1000+ stars on GitHub'
      ],
      technologies: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker']
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Real-Time Data Stream Processor',
      description: 'Built a serverless pipeline using AWS Kinesis and Lambda to process and store high-velocity event data.',
      role: 'Lead Developer',
      year: '2023',
      achievements: [
        'Processes 10,000 events/second with sub-100ms latency',
        'Reduced data processing costs by 60%',
        'Implemented automated scaling and failover'
      ],
      technologies: ['AWS Lambda', 'Kinesis', 'DynamoDB', 'Terraform'],
      demoUrl: 'https://demo.datastream.dev',
      sourceUrl: 'https://github.com/janedoe/data-stream'
    },
    {
      id: 2,
      title: 'Portfolio Generator (React)',
      description: 'A single-page React application for generating professional portfolios.',
      role: 'Creator & Maintainer',
      year: '2023',
      achievements: [
        'Used by 1000+ developers worldwide',
        'Featured in React Weekly newsletter',
        '500+ stars on GitHub'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://portfolio-gen.dev',
      sourceUrl: 'https://github.com/janedoe/portfolio-generator'
    }
  ],
  publications: [
    {
      id: 1,
      title: 'Scaling Microservices: Lessons from the Trenches',
      publisher: 'Medium - Better Programming',
      year: '2023',
      url: 'https://medium.com/@janedoe/scaling-microservices'
    }
  ],
  speaking: [
    {
      id: 1,
      title: 'Modern Cloud Architecture Patterns',
      event: 'KubeCon North America',
      year: '2023',
      url: 'https://kubecon.io/talks/2023/cloud-patterns'
    }
  ],
  awards: [
    {
      id: 1,
      title: 'Outstanding Technical Achievement',
      issuer: 'Fusion Systems',
      year: '2023',
      description: 'Awarded for leading successful cloud transformation initiative'
    }
  ]
};

export default defaultData;
