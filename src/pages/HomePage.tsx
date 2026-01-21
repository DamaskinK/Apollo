import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import Card from '../components/Card';
import MobileWarning from '../components/MobileWarning';
import { useNotification } from '../context/NotificationContext';

type Page = 'home' | 'hospitacija' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface HomePageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
}

export default function HomePage({ onNavigate, isLoggedIn, user, onLogout }: HomePageProps) {
    const { showNotification } = useNotification();

    const handleCardClick = (type: 'HP' | 'ER' | 'ISP') => {
        switch (type) {
            case 'HP':
                onNavigate('hospitacija');
                break;
            case 'ER':
                // onNavigate('erasmus');
                showNotification('Work in Progress', 'Erasmus module is currently under development.');
                break;
            case 'ISP':
                // onNavigate('isp');
                showNotification('Work in Progress', 'ISP module is currently under development.');
                break;
        }
    };

    return (
        <>
            <MobileWarning />
            <div className="home-page">
                <Header
                    onLogoClick={() => onNavigate('home')}
                    onLoginClick={() => onNavigate('login')}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />

                <div className="home-subheader">
                    <Subheader
                        variant="Big"
                        title="Welcome to Apollo!"
                        subtitle="User-friendly services for everyone"
                    />
                </div>

                <main className="home-main">
                    <div className="home-cards-container">
                        {/* Row 1 */}
                        <div className="home-cards-row">
                            <Card type="HP" onClick={() => handleCardClick('HP')} />
                            <Card type="ER" onClick={() => handleCardClick('ER')} />
                            <Card type="ISP" onClick={() => handleCardClick('ISP')} />
                        </div>

                        {/* Row 2 - Hidden on mobile via CSS */}
                        <div className="home-cards-row desktop-only-row">
                            <Card type="HP" onClick={() => handleCardClick('HP')} />
                            <Card type="ER" onClick={() => handleCardClick('ER')} />
                            <Card type="ISP" onClick={() => handleCardClick('ISP')} />
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
