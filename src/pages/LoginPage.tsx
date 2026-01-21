import { useState } from 'react';
import './LoginPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import MobileWarning from '../components/MobileWarning';
import Loader from '../components/Loader';
import { useNotification } from '../context/NotificationContext';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface LoginPageProps {
    onNavigate: (page: Page) => void;
    onLogin: (user: User) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Show loader for demo purposes
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // Call onLogin with user data
            onLogin({
                name: 'Katarína Nováková',
                role: 'Referentka'
            });
            // Show success notification
            showNotification('Login Successful', 'Welcome back, Katarína!');
        }, 2000);
    };

    return (
        <>
            {isLoading && <Loader />}

            <div className="login-page">
                <Header onLogoClick={() => onNavigate('home')} />

                <div className="login-subheader">
                    <Subheader
                        variant="Small"
                        title="Log in to Apollo"
                        subtitle="Access your account"
                    />
                </div>

                <main className="login-main">
                    <div className="login-container">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <a href="#" className="forgot-password-link">
                                    Forgot password?
                                </a>
                            </div>

                            <button type="submit" className="login-submit-button">
                                Log in
                            </button>

                            <div className="signup-section">
                                <p className="signup-text">
                                    Don't have an account?{' '}
                                    <a href="#" className="signup-link">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
