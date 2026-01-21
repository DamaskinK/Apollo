# Apollo - Academic Hospitacija Management System

<div align="center">
  
  ![Apollo Banner](https://img.shields.io/badge/Apollo-Academic_Management-blue?style=for-the-badge)
  ![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?style=for-the-badge&logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css)

  **A modern, user-friendly web application for managing academic peer observations (Hospitacija) in educational institutions.**

  [Demo Video](https://youtu.be/Cc3RsriVOZg) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

---

## 📖 Overview

**Apollo** is a comprehensive management system designed to streamline the process of academic peer observations (Hospitacija) in universities and educational institutions. The application provides an intuitive interface for creating, submitting, approving, and managing observation plans with role-based access control and workflow management.

### What is Hospitacija?

Hospitacija is a peer observation process where teachers observe each other's classes to improve teaching quality, share best practices, and foster professional development in academic environments.

---

## 📺 Demo

Watch the full demo video: [Apollo Demo on YouTube](https://youtu.be/Cc3RsriVOZg)

---

## ✨ Features

### 🎯 Core Functionality

- **Multi-Module System**
  - 🏛️ **Hospitacija Module** - Full peer observation management (implemented)
  - 🌍 **Erasmus Module** - International exchange program management (planned)
  - 📚 **ISP Module** - Individual study plan management (planned)

### 👥 User Management

- **Authentication System**
  - Secure login/logout functionality
  - Role-based access control
  - User session management
  - Protected routes for authorized users

- **Role-Based Workflows**
  - Department heads can create observation plans
  - Administrators can approve/decline plans
  - Teachers can view and correct returned plans
  - Multi-level approval process

### 📋 Plan Management

- **Create & Submit Plans**
  - Interactive plan creation wizard
  - Structured data entry forms
  - Validation and error handling
  - Draft saving capability

- **Approval Workflow**
  - Submit plans for approval
  - Review and approve/decline submissions
  - Return plans for corrections
  - Status tracking (Processed, Approved, Declined, Returned)

- **Plan Operations**
  - View approved plans
  - Correct declined/returned plans
  - Download plan files
  - Export functionality

### 🎨 User Interface

- **Modern Design**
  - Clean, professional interface
  - Responsive layout with mobile support
  - Smooth animations using Animate.css
  - Consistent design system

- **Interactive Components**
  - Dynamic data tables with sorting
  - Status indicators and badges
  - Contextual notifications
  - Loading states and loaders
  - Info cards with detailed information

- **Mobile Experience**
  - Mobile-optimized views
  - Touch-friendly controls
  - Responsive pagination
  - Mobile warning for unsupported features

### 🔔 Notifications

- Real-time user feedback
- Success/error notifications
- Work-in-progress alerts
- Context-aware messages

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.0.0** - Modern UI library with latest features
- **TypeScript 5.6.2** - Type-safe development
- **Vite 6.0.3** - Fast build tool and dev server

### Styling
- **TailwindCSS 3.4.16** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Animate.css** - Pre-built animations
- **Custom CSS Modules** - Component-specific styles

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class management

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast refresh and JSX support

---

## 📁 Project Structure

```
Apollo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI elements (buttons, inputs, etc.)
│   │   ├── mobile/         # Mobile-specific components
│   │   ├── Card.tsx        # Service selection cards
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Page footer
│   │   ├── Loader.tsx      # Loading animation
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── HomePage.tsx              # Landing page
│   │   ├── LoginPage.tsx             # Authentication
│   │   ├── HospitacijaPage.tsx       # Main dashboard
│   │   ├── CreateNewPlanPage.tsx     # Plan creation
│   │   ├── ApprovePlanPage.tsx       # Plan approval
│   │   ├── CorrectPlanPage.tsx       # Plan correction
│   │   ├── ApprovedPlanPage.tsx      # View approved plans
│   │   └── ...
│   ├── context/            # React Context providers
│   │   └── NotificationContext.tsx   # Notification system
│   ├── hooks/              # Custom React hooks
│   │   └── useIsMobile.tsx           # Mobile detection
│   ├── types/              # TypeScript type definitions
│   │   └── common.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── assets/             # Static assets
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── scripts/                # Build and deployment scripts
├── public/                 # Public static files
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Apollo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

---

## 🎯 Key Components

### Pages

- **HomePage** - Service selection landing page
- **LoginPage** - User authentication
- **HospitacijaPage** - Main dashboard with plan overview
- **CreateNewPlanPage** - Multi-step plan creation form
- **ApprovePlanPage** - Plan review and approval interface
- **ApprovedPlanPage** - View finalized plans
- **CorrectPlanPage** - Edit returned/declined plans

### Reusable Components

- **Card** - Service selection cards
- **Header/Footer** - Layout components
- **Notification System** - User feedback mechanism
- **Status Badge** - Visual status indicators
- **BigButton/SmallButton** - Action buttons
- **InputField/SelectField** - Form inputs
- **TableCell** - Data table cells

---

## 📱 Responsive Design

Apollo is built with a mobile-first approach:

- **Desktop**: Full-featured interface with data tables
- **Tablet**: Optimized layout with responsive grids
- **Mobile**: Simplified views with mobile-specific components
- **Mobile Warning**: Alerts for features best viewed on desktop

---

## 🔐 Security Features

- Client-side authentication
- Protected routes
- Role-based access control
- Session management
- Secure form validation

---

## 🎨 Design Highlights

- **Consistent Color Scheme**: Professional blue and neutral palette
- **Smooth Animations**: Fade-ins, slide transitions
- **Accessibility**: Radix UI components for screen reader support
- **Loading States**: Skeleton screens and loaders
- **Error Handling**: User-friendly error messages

---


## 🙏 Acknowledgments

- Built with React and modern web technologies
- UI components inspired by academic management systems
- Icons by Lucide
- Animations by Animate.css

---


<div align="center">

**Made with ❤️ for modern educational institutions**

⭐ Star this repo if you find it helpful!

</div>
