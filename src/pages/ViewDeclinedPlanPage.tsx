import { useState } from 'react';
import './ViewDeclinedPlanPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
import Checkbox from '../components/ui/Checkbox';
import TextareaField from '../components/ui/TextareaField';
import MobileWarning from '../components/MobileWarning';
import { InfoTrigger, InfoCardType } from '../components/ui/InfoCard';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileReadOnlyCard from '../components/mobile/MobileReadOnlyCard';
import MobilePagination from '../components/mobile/MobilePagination';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface ViewDeclinedPlanPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    setCorrectionStatus: (status: 'returned' | 'declined') => void;
}

type CheckboxState = 'off' | 'on' | 'cancel';

interface TableRow {
    id: number;
    teacherName: string;
    weekOfSemester: string;
    subject: string;
    observerName: string;
    purpose: string;
    method: string;
    approved: CheckboxState;
}

interface ColumnDef {
    key: string;
    title: string;
    width: string | number;
    infoType?: InfoCardType;
}

const columns: ColumnDef[] = [
    { key: 'id', title: '№', width: '5%' },
    { key: 'teacherName', title: 'Name and surname\nof the observed teacher', width: '19%' },
    { key: 'weekOfSemester', title: 'Week of\nthe semester', width: '11%' },
    { key: 'subject', title: 'Subject', width: '11%', infoType: 'subject' },
    { key: 'observerName', title: 'Name and surname\nof the observer', width: '17%', infoType: 'observer' },
    { key: 'purpose', title: 'Purpose of\nobservation', width: '13%', infoType: 'purpose' },
    { key: 'method', title: 'Method', width: '12%', infoType: 'method' },
    { key: 'approved', title: 'Approve', width: '12%' }
];

const initialRows: TableRow[] = [
    { id: 1, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 2, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'cancel' },
    { id: 3, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 4, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 5, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 6, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'cancel' }
];

const initialReview = `The plan is generally correct, but there are a few minor comments: line 3 indicates the wrong week (please clarify: 2 or 3), and in some entries, the "Duration" field has not been filled in. Please make these corrections. I will check again after the corrections have been made.`;

export default function ViewDeclinedPlanPage({ onNavigate, isLoggedIn, user, onLogout, setCorrectionStatus }: ViewDeclinedPlanPageProps) {
    const [rows] = useState<TableRow[]>(initialRows);
    const [review] = useState(initialReview);
    const isMobile = useIsMobile(1200);
    const [currentPage, setCurrentPage] = useState(1);

    const handleBack = () => {
        onNavigate('hospitacija');
    };

    const handleCorrectPlan = () => {
        setCorrectionStatus('declined');
        onNavigate('correctPlan');
    };

    const handleCreateNewPlan = () => {
        onNavigate('createNewPlan');
    };

    const renderTitleLine = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => (
            <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
            </span>
        ));
    };

    return (
        <>

            <div className="view-declined-plan-page">
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
                    subtitle="View plan"
                />

                <div className="arrow-back-wrapper">
                    <ArrowButton direction="left" onClick={handleBack} />
                </div>

                <div className="view-declined-plan-content">

                    <div className="plan-layout-container">
                        <div className="status-row">
                            <span className="status-label">Status:</span>
                            <span className="status-value status-declined">Declined</span>
                        </div>

                        <div className="view-declined-plan-table-wrapper">
                            {isMobile ? (
                                <div style={{ paddingBottom: '24px' }}>
                                    <MobileReadOnlyCard
                                        data={rows[currentPage - 1]}
                                        columns={[
                                            ...columns.filter(c => c.key !== 'approved'),
                                            {
                                                key: 'approved',
                                                title: 'Status',
                                                render: (_val, row) => row.approved === 'on' ? 'Approved' : row.approved === 'cancel' ? 'Declined' : 'Pending'
                                            }
                                        ]}
                                    />
                                    <MobilePagination
                                        currentPage={currentPage}
                                        totalPages={rows.length}
                                        onNext={() => setCurrentPage(p => Math.min(p + 1, rows.length))}
                                        onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    />
                                </div>
                            ) : (
                                <div className="view-declined-plan-table">
                                    {/* Header row */}
                                    <div className="table-header-row">
                                        {columns.map((col) => (
                                            <div
                                                key={col.key}
                                                className="table-header-cell"
                                                style={{ width: col.width }}
                                            >
                                                <span className="table-header-text">
                                                    {renderTitleLine(col.title)}
                                                </span>
                                                {col.infoType && (
                                                    <InfoTrigger type={col.infoType} />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Data rows */}
                                    {rows.map((row, rowIndex) => (
                                        <div
                                            key={row.id}
                                            className={`table-data-row ${rowIndex % 2 === 0 ? 'row-first' : 'row-second'}`}
                                        >
                                            {columns.map((col) => {
                                                const key = col.key as keyof TableRow;

                                                if (key === 'approved') {
                                                    return (
                                                        <div
                                                            key={col.key}
                                                            className="table-data-cell table-data-cell--checkbox"
                                                            style={{ width: col.width }}
                                                        >
                                                            <Checkbox
                                                                state={row.approved}
                                                                onChange={() => { }}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={col.key}
                                                        className="table-data-cell"
                                                        style={{ width: col.width }}
                                                    >
                                                        <span className="table-data-text">{row[key]}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="review-section">
                        <TextareaField
                            label="Review"
                            value={review}
                            readOnly
                        />
                    </div>

                    <div className="buttons-section">
                        <BigButton onClick={handleCorrectPlan}>
                            Correct the plan
                        </BigButton>
                        <BigButton onClick={handleCreateNewPlan} variant="secondary">
                            Create a new plan
                        </BigButton>
                        <BigButton onClick={handleBack} variant="secondary">
                            Back
                        </BigButton>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
