import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import HospitacijaPage from './pages/HospitacijaPage'
import CreateNewPlanPage from './pages/CreateNewPlanPage'
import EnterNewPlanPage from './pages/EnterNewPlanPage'
import ApprovePlanPage from './pages/ApprovePlanPage'
import ViewDeclinedPlanPage from './pages/ViewDeclinedPlanPage'
import CorrectPlanPage from './pages/CorrectPlanPage'
import ApprovedPlanPage from './pages/ApprovedPlanPage'
import ViewReturnedPlanPage from './pages/ViewReturnedPlanPage'
import LoginPage from './pages/LoginPage'
import Loader from './components/Loader';

import { NotificationProvider } from './context/NotificationContext'

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
  name: string;
  role: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  // State to track if we are correcting a returned or declined plan
  const [correctionStatus, setCorrectionStatus] = useState<'returned' | 'declined'>('returned');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: Page) => {
    // List of pages that require authentication
    const protectedPages: Page[] = ['hospitacija', 'createNewPlan', 'enterNewPlan', 'approvePlan', 'viewDeclinedPlan', 'correctPlan', 'viewApprovedPlan', 'viewReturnedPlan', 'erasmus', 'isp'];

    // If trying to access protected page without being logged in, redirect to login
    if (protectedPages.includes(page) && !isLoggedIn) {
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const renderPage = () => {
    // Show Login page
    if (currentPage === 'login') {
      return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />;
    }

    // Show Hospitacija page
    if (currentPage === 'hospitacija') {
      return <HospitacijaPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }

    // Show Create New Plan page
    if (currentPage === 'createNewPlan') {
      return <CreateNewPlanPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }

    // Show Enter New Plan page
    if (currentPage === 'enterNewPlan') {
      return <EnterNewPlanPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }

    // Show Approve Plan page
    if (currentPage === 'approvePlan') {
      return <ApprovePlanPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }

    // Show View Declined Plan page
    if (currentPage === 'viewDeclinedPlan') {
      return <ViewDeclinedPlanPage
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        setCorrectionStatus={setCorrectionStatus}
      />;
    }

    // Show Correct Plan page
    if (currentPage === 'correctPlan') {
      return <CorrectPlanPage
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        correctionStatus={correctionStatus}
      />;
    }

    // Show View Approved Plan page
    if (currentPage === 'viewApprovedPlan') {
      return <ApprovedPlanPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }

    // Show View Returned Plan page
    if (currentPage === 'viewReturnedPlan') {
      return <ViewReturnedPlanPage
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        setCorrectionStatus={setCorrectionStatus}
      />;
    }

    // Home page (default)
    return <HomePage onNavigate={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NotificationProvider>
      <div className="fade-in" key={currentPage}>
        {renderPage()}
      </div>
    </NotificationProvider>
  );
}

export default App
