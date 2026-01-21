import { useState } from 'react';
import './CreateNewPlanPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
import SelectField from '../components/ui/SelectField';
import InputField from '../components/ui/InputField';
import MobileWarning from '../components/MobileWarning';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface CreateNewPlanPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
}

const departmentOptions = [
    { value: 'Enter department name', label: 'Enter department name' },
    { value: 'kpi', label: 'KPI - Katedra počítačov a informatiky' },
    { value: 'kemt', label: 'KEMT - Katedra elektroniky a multimediálnych telekomunikácií' },
    { value: 'krf', label: 'KRF - Katedra rádioelektroniky' }
];

const academicYearOptions = [
    { value: 'Enter academic year', label: 'Enter academic year' },
    { value: '2023-2024', label: '2023/2024' },
    { value: '2024-2025', label: '2024/2025' },
    { value: '2025-2026', label: '2025/2026' }
];

export default function CreateNewPlanPage({ onNavigate, isLoggedIn, user, onLogout }: CreateNewPlanPageProps) {
    const [department, setDepartment] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [academicYear, setAcademicYear] = useState('');

    const handleBack = () => {
        onNavigate('hospitacija');
    };

    const handleCreatePlan = () => {
        console.log('Creating plan:', { department, workplace, academicYear });
        // Navigate to enter new plan page
        onNavigate('enterNewPlan');
    };

    return (
        <>

            <div className="create-new-plan-page">
                <Header
                    onLogoClick={() => onNavigate('home')}
                    onLoginClick={() => onNavigate('login')}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />

                <Subheader
                    variant="Small"
                    title="Hospitacija"
                    subtitle="Plan of visits"
                />

                <div className="arrow-back-wrapper">
                    <ArrowButton direction="left" onClick={handleBack} />
                </div>

                <div className="create-new-plan-content">
                    <div className="create-new-plan-form">
                        <SelectField
                            label="Department name"
                            value={department}
                            onChange={(value) => setDepartment(value)}
                            options={departmentOptions}
                        />

                        <InputField
                            label="Workplace"
                            placeholder="Enter workplace"
                            value={workplace}
                            onChange={(value) => setWorkplace(value)}
                        />

                        <SelectField
                            label="Academic year"
                            value={academicYear}
                            onChange={(value) => setAcademicYear(value)}
                            options={academicYearOptions}
                        />

                        <div className="create-plan-button-wrapper">
                            <BigButton onClick={handleCreatePlan}>
                                Create a new plan
                            </BigButton>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
