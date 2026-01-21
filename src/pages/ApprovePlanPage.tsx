import { useState } from 'react';
import './ApprovePlanPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
import Checkbox from '../components/ui/Checkbox';
import TextareaField from '../components/ui/TextareaField';
import StatusSelect from '../components/ui/StatusSelect';
import MobileWarning from '../components/MobileWarning';
import { InfoTrigger, InfoCardType } from '../components/ui/InfoCard';
import { useNotification } from '../context/NotificationContext';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileReadOnlyCard from '../components/mobile/MobileReadOnlyCard';
import MobilePagination from '../components/mobile/MobilePagination';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface ApprovePlanPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
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
    width: number;
    infoType?: InfoCardType;
}

const columns: ColumnDef[] = [
    { key: 'id', title: '№', width: 60 },
    { key: 'teacherName', title: 'Name and surname\nof the observed teacher', width: 215 },
    { key: 'weekOfSemester', title: 'Week of\nthe semester', width: 126 },
    { key: 'subject', title: 'Subject', width: 129, infoType: 'subject' },
    { key: 'observerName', title: 'Name and surname\nof the observer', width: 196, infoType: 'observer' },
    { key: 'purpose', title: 'Purpose of\nobservation', width: 146, infoType: 'purpose' },
    { key: 'method', title: 'Method', width: 134, infoType: 'method' },
    { key: 'approved', title: 'Approve', width: 134 }
];

const initialRows: TableRow[] = [
    { id: 1, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' },
    { id: 2, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' },
    { id: 3, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' },
    { id: 4, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' },
    { id: 5, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' },
    { id: 6, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'off' }
];

export default function ApprovePlanPage({ onNavigate, isLoggedIn, user, onLogout }: ApprovePlanPageProps) {
    const { showNotification } = useNotification();
    const [rows, setRows] = useState<TableRow[]>(initialRows);
    const [review, setReview] = useState('');
    const [status, setStatus] = useState<'approved' | 'returned' | 'declined' | ''>('');
    const isMobile = useIsMobile(1200);
    const [currentPage, setCurrentPage] = useState(1);

    const handleBack = () => {
        onNavigate('hospitacija');
    };

    const handleFinishApprove = () => {
        console.log('Finishing approval:', { rows, review, status });
        showNotification('Plan Approved', 'The plan has been successfully approved!');
        onNavigate('hospitacija');
    };

    const handleCheckboxChange = (rowIndex: number, newState: CheckboxState) => {
        const newRows = [...rows];
        newRows[rowIndex] = { ...newRows[rowIndex], approved: newState };
        setRows(newRows);
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

            <div className="approve-plan-page">
                <Header
                    onLogoClick={() => onNavigate('home')}
                    onLoginClick={() => onNavigate('login')}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />

                <div className="arrow-back-wrapper">
                    <ArrowButton direction="left" onClick={handleBack} />
                </div>

                <Subheader
                    variant="Small"
                    title="Hospitacija"
                    subtitle="Approve plan of visits"
                />

                <div className="approve-plan-content">

                    <div className="approve-plan-table-wrapper">
                        {isMobile ? (
                            <div style={{ paddingBottom: '24px', width: '100%' }}>
                                <MobileReadOnlyCard
                                    data={rows[currentPage - 1]}
                                    columns={[
                                        ...columns.filter(c => c.key !== 'approved'),
                                        {
                                            key: 'approved',
                                            title: 'Approve',
                                            render: (_val, row) => (
                                                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: '8px' }}>
                                                    <Checkbox
                                                        state={row.approved}
                                                        onChange={(newState) => handleCheckboxChange(currentPage - 1, newState)}
                                                    />
                                                </div>
                                            )
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
                            <div className="approve-plan-table">
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
                                                            onChange={(newState) => handleCheckboxChange(rowIndex, newState)}
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
                                                    <span className="cell-text">{row[key]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="approve-form">
                        <TextareaField
                            label="Review"
                            placeholder="Enter review"
                            value={review}
                            onChange={(value) => setReview(value)}
                        />

                        <StatusSelect
                            label="Assign status"
                            value={status}
                            onChange={(value) => setStatus(value as 'approved' | 'returned' | 'declined' | '')}
                        />

                        <div className="finish-button-wrapper">
                            <BigButton onClick={handleFinishApprove}>
                                Finish Approve
                            </BigButton>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
