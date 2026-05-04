require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const profileData = {
  name: 'Kawsar Ahmed',
  titles: ['AI Developer', 'Data Scientist', 'Full Stack Developer', 'ML Engineer'],
  shortBio: 'Passionate developer building intelligent web applications at the intersection of AI and modern web tech.',
  bio: `I'm a Full Stack Developer and AI enthusiast with a strong background in building scalable web applications and machine learning solutions. I specialize in Python, JavaScript, and the MERN stack, and love turning complex data problems into elegant, user-friendly products.

With experience spanning web development, data science, and AI/ML, I bring a holistic engineering perspective to every project. I'm passionate about open-source, clean code, and continuous learning.`,
  profileImage: 'https://avatars.githubusercontent.com/u/583231?v=4',
  email: 'kawsar@example.com',
  github: 'https://github.com/kawsar',
  linkedin: 'https://linkedin.com/in/kawsar',
  location: 'Dhaka, Bangladesh',
  yearsOfExperience: '3+',
  openToWork: true,
};

const projectsData = [
  {
    title: 'DevConnect — Social Platform',
    description: 'Full-featured social platform for developers to share projects, follow each other, and collaborate in real time.',
    longDescription: 'Built with MERN stack featuring real-time chat via Socket.IO, JWT authentication, GitHub OAuth, and a responsive feed system.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Tailwind CSS'],
    category: 'Web Development',
    githubLink: 'https://github.com/kawsar/devconnect',
    liveLink: 'https://devconnect.example.com',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80',
    featured: true,
    order: 1,
  },
  {
    title: 'ShopEase — E-Commerce',
    description: 'Full-stack e-commerce platform with product management, cart, payment integration, and admin dashboard.',
    techStack: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
    category: 'Web Development',
    githubLink: 'https://github.com/kawsar/shopease',
    liveLink: 'https://shopease.example.com',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    featured: false,
    order: 2,
  },
  {
    title: 'TaskFlow — Project Manager',
    description: 'Kanban-style project management tool with drag-and-drop, team collaboration, and deadline tracking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'DnD Kit', 'WebSockets'],
    category: 'Web Development',
    githubLink: 'https://github.com/kawsar/taskflow',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    featured: false,
    order: 3,
  },
  {
    title: 'SentimentLens',
    description: 'Real-time sentiment analysis tool for product reviews using BERT fine-tuned on domain-specific data.',
    techStack: ['Python', 'PyTorch', 'HuggingFace', 'FastAPI', 'React'],
    category: 'AI / Machine Learning',
    githubLink: 'https://github.com/kawsar/sentimentlens',
    liveLink: 'https://sentimentlens.example.com',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    featured: true,
    order: 1,
  },
  {
    title: 'ObjectDetect Pro',
    description: 'YOLO-based object detection system with custom training pipeline and a real-time web interface.',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'React'],
    category: 'AI / Machine Learning',
    githubLink: 'https://github.com/kawsar/objectdetect',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
    featured: false,
    order: 2,
  },
  {
    title: 'ChatBot Builder',
    description: 'No-code platform to build, train, and deploy domain-specific chatbots powered by LLMs.',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Next.js'],
    category: 'AI / Machine Learning',
    githubLink: 'https://github.com/kawsar/chatbot-builder',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    featured: false,
    order: 3,
  },
  {
    title: 'FinSight — Stock Analyzer',
    description: 'Predictive stock analysis dashboard using LSTM models, technical indicators, and interactive charts.',
    techStack: ['Python', 'TensorFlow', 'Pandas', 'Plotly', 'Streamlit'],
    category: 'Data Science',
    githubLink: 'https://github.com/kawsar/finsight',
    liveLink: 'https://finsight.example.com',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    featured: true,
    order: 1,
  },
  {
    title: 'COVID-19 Dashboard',
    description: 'Interactive visualization dashboard tracking global COVID-19 spread with geospatial heatmaps.',
    techStack: ['Python', 'Dash', 'Plotly', 'Pandas', 'Folium'],
    category: 'Data Science',
    githubLink: 'https://github.com/kawsar/covid-dashboard',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80',
    featured: false,
    order: 2,
  },
  {
    title: 'Customer Churn Predictor',
    description: 'ML pipeline for telecom customer churn prediction with 94% accuracy using ensemble methods.',
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'FastAPI'],
    category: 'Data Science',
    githubLink: 'https://github.com/kawsar/churn-predictor',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: false,
    order: 3,
  },
];

const skillsData = [
  // Web Development
  { name: 'React', category: 'Web Development', proficiency: 92, order: 1 },
  { name: 'Node.js', category: 'Web Development', proficiency: 88, order: 2 },
  { name: 'Express.js', category: 'Web Development', proficiency: 87, order: 3 },
  { name: 'MongoDB', category: 'Web Development', proficiency: 85, order: 4 },
  { name: 'TypeScript', category: 'Web Development', proficiency: 80, order: 5 },
  { name: 'Tailwind CSS', category: 'Web Development', proficiency: 90, order: 6 },
  { name: 'Next.js', category: 'Web Development', proficiency: 78, order: 7 },
  { name: 'PostgreSQL', category: 'Web Development', proficiency: 75, order: 8 },
  // AI / ML
  { name: 'Python', category: 'AI / Machine Learning', proficiency: 95, order: 1 },
  { name: 'PyTorch', category: 'AI / Machine Learning', proficiency: 85, order: 2 },
  { name: 'TensorFlow', category: 'AI / Machine Learning', proficiency: 82, order: 3 },
  { name: 'HuggingFace', category: 'AI / Machine Learning', proficiency: 84, order: 4 },
  { name: 'LangChain', category: 'AI / Machine Learning', proficiency: 78, order: 5 },
  { name: 'OpenCV', category: 'AI / Machine Learning', proficiency: 80, order: 6 },
  // Data Science
  { name: 'Pandas', category: 'Data Science', proficiency: 92, order: 1 },
  { name: 'NumPy', category: 'Data Science', proficiency: 90, order: 2 },
  { name: 'Scikit-learn', category: 'Data Science', proficiency: 88, order: 3 },
  { name: 'Plotly / Dash', category: 'Data Science', proficiency: 82, order: 4 },
  { name: 'SQL', category: 'Data Science', proficiency: 85, order: 5 },
  { name: 'Jupyter', category: 'Data Science', proficiency: 90, order: 6 },
  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 92, order: 1 },
  { name: 'Docker', category: 'Tools', proficiency: 80, order: 2 },
  { name: 'Linux / Bash', category: 'Tools', proficiency: 82, order: 3 },
  { name: 'VS Code', category: 'Tools', proficiency: 95, order: 4 },
  { name: 'Postman', category: 'Tools', proficiency: 88, order: 5 },
  { name: 'AWS (S3/EC2)', category: 'Tools', proficiency: 72, order: 6 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Profile.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // Create admin user
  await User.create({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  console.log(`Admin user created — username: ${ADMIN_USERNAME}  password: ${ADMIN_PASSWORD}`);

  // Create profile
  await Profile.create(profileData);
  console.log('Profile seeded');

  // Create projects
  await Project.insertMany(projectsData);
  console.log(`${projectsData.length} projects seeded`);

  // Create skills
  await Skill.insertMany(skillsData);
  console.log(`${skillsData.length} skills seeded`);

  console.log('\nSeed completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
