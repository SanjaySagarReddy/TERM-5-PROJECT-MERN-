# 💰 MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Track your income and expenses with beautiful charts, dark mode support, and a responsive design.

![MERN Expense Tracker](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-blue)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password hashing with bcrypt

### 📊 Dashboard
- **Financial Overview**: Total income, expenses, and net balance
- **Interactive Charts**: Pie charts and bar charts for expense categories
- **Transaction Management**: View, add, edit, and delete transactions
- **Search & Filter**: Find transactions by category or type
- **Pagination**: Navigate through large transaction lists

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Professional Design**: Clean, modern interface with TailwindCSS
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with loading indicators

### 📱 Mobile-First
- Fully responsive design
- Touch-friendly interface
- Optimized for all screen sizes

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **react-hot-toast** - Toast notifications
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
mern-expense-tracker/
├── backend/                 # Node.js backend (deploy to Render/Railway)
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/          # Custom middleware
│   ├── package.json
│   └── server.js
├── frontend/               # React frontend (deploy to Netlify/Vercel)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── pages/          # Page components
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-expense-tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   **Backend (.env in backend folder):**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env in frontend folder):**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start the application**
   
   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment Guide

### Backend Deployment (Render/Railway)

#### Option 1: Deploy to Render

1. **Push your code to GitHub**
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up and connect your GitHub account
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the `backend` folder as the root directory

3. **Configure Environment Variables:**
   ```
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   ```

4. **Deploy Settings:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18

#### Option 2: Deploy to Railway

1. **Push your code to GitHub**
2. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up and connect your GitHub account
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository and choose the `backend` folder

3. **Configure Environment Variables:**
   ```
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   ```

### Frontend Deployment (Netlify/Vercel)

#### Option 1: Deploy to Netlify

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up and connect your GitHub account
   - Click "New site from Git"
   - Connect your repository
   - Select the `frontend` folder as the base directory

3. **Configure Build Settings:**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

4. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

#### Option 2: Deploy to Vercel

1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up and connect your GitHub account
   - Click "New Project"
   - Import your repository
   - Select the `frontend` folder as the root directory

2. **Configure Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

3. **Deploy Settings:**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats` - Get financial statistics
- `GET /api/transactions/categories` - Get category breakdown

## 🎯 Key Features Explained

### Authentication Flow
1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent with each API request
4. Protected routes check authentication

### Dashboard Analytics
- **Real-time Stats**: Income, expenses, and balance calculations
- **Visual Charts**: Interactive pie and bar charts using Recharts
- **Category Analysis**: Expense breakdown by category
- **Transaction History**: Paginated transaction list

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Optimized for sm, md, lg, xl screens
- **Touch-Friendly**: Large buttons and touch targets
- **Dark Mode**: System preference detection with manual toggle

## 🎨 UI Components

### Design System
- **Colors**: Primary (green), Secondary (red), Neutral (gray)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using TailwindCSS
- **Shadows**: Subtle shadows for depth and elevation
- **Animations**: Smooth transitions and hover effects

### Component Library
- **Cards**: Reusable card components for stats and content
- **Buttons**: Primary, secondary, and danger button variants
- **Forms**: Consistent form styling with validation
- **Navigation**: Responsive navbar with mobile menu
- **Charts**: Interactive data visualization components

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication with expiration
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored in .env

## 📱 Mobile Optimization

- **Responsive Grid**: Flexible layouts that adapt to screen size
- **Touch Gestures**: Optimized for touch interactions
- **Performance**: Lazy loading and optimized bundle size
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Production Deployment Checklist

### Backend Checklist
- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables set in hosting platform
- [ ] CORS configured for production frontend URL
- [ ] Health check endpoint working
- [ ] SSL certificate enabled

### Frontend Checklist
- [ ] Environment variables set for production API URL
- [ ] Build process working without errors
- [ ] All assets loading correctly
- [ ] API calls pointing to production backend
- [ ] Error handling for network issues

### Domain Configuration
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Redirects configured for SPA routing
- [ ] Analytics tracking set up (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TailwindCSS** for the amazing utility-first CSS framework
- **Recharts** for beautiful and responsive charts
- **Lucide React** for the comprehensive icon library
- **React Hot Toast** for elegant notifications
- **Vite** for the lightning-fast build tool

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.

---

**Built with ❤️ using the MERN stack**

## 🔗 Live Demo

- **Frontend**: [Your Netlify/Vercel URL]
- **Backend API**: [Your Render/Railway URL]
- **GitHub Repository**: [Your GitHub URL]