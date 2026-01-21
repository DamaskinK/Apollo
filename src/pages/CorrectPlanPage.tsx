import { useState } from 'react';
import './CorrectPlanPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
import Checkbox from '../components/ui/Checkbox';
import AddButton from '../components/ui/AddButton';
import MobileWarning from '../components/MobileWarning';
import { InfoTrigger, InfoCardType } from '../components/ui/InfoCard';
import { useNotification } from '../context/NotificationContext';

import { useIsMobile } from '../hooks/useIsMobile';
import MobilePlanEditor from '../components/mobile/MobilePlanEditor';
import MobilePagination from '../components/mobile/MobilePagination';
import { Trash2 } from 'lucide-react';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

interface User {
    name: string;
    role: string;
}

interface CorrectPlanPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    correctionStatus: 'returned' | 'declined';
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
    { key: 'subject', title: 'Subject', width: '10%', infoType: 'subject' },
    { key: 'observerName', title: 'Name and surname\nof the observer', width: '17%', infoType: 'observer' },
    { key: 'purpose', title: 'Purpose of\nobservation', width: '14%', infoType: 'purpose' },
    { key: 'method', title: 'Method', width: '10%', infoType: 'method' },
    { key: 'approved', title: 'Approve', width: '8%' },
    { key: 'actions', title: 'Actions', width: '6%' }
];

const initialRows: TableRow[] = [
    { id: 1, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 2, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'cancel' },
    { id: 3, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 4, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 5, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'on' },
    { id: 6, teacherName: 'Marián Novák', weekOfSemester: '1. Week', subject: 'S', observerName: 'Ján Kováč', purpose: '1', method: 'PR', approved: 'cancel' }
];

const initialReviewMessage = `The plan is generally correct, but there are a few minor comments: line 3 indicates the wrong week (please clarify: 2 or 3), and in some entries, the "Duration" field has not been filled in. Please make these corrections. I will check again after the corrections have been made.`;

export default function CorrectPlanPage({ onNavigate, isLoggedIn, user, onLogout, correctionStatus }: CorrectPlanPageProps) {
    const { showNotification } = useNotification();
    const [rows, setRows] = useState<TableRow[]>(initialRows);
    const [reviewMessage] = useState(initialReviewMessage);
    const isMobile = useIsMobile();
    const [currentPage, setCurrentPage] = useState(1);

    const handleBack = () => {
        if (correctionStatus === 'declined') {
            onNavigate('viewDeclinedPlan');
        } else {
            onNavigate('viewReturnedPlan');
        }
    };

    const handleSubmit = () => {
        console.log('Submitting corrected plan:', rows);
        showNotification('Plan Updated', 'Corrected plan has been submitted successfully!');
        onNavigate('hospitacija');
    };

    const handleAddRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows([...rows, {
            id: newId,
            teacherName: '',
            weekOfSemester: '',
            subject: '',
            observerName: '',
            purpose: '',
            method: '',
            approved: 'off'
        }]);
        if (isMobile) {
            setCurrentPage(rows.length + 1);
        }
    };

    const handleDeleteRow = (id: number) => {
        const newRows = rows.filter(row => row.id !== id);
        // Re-index IDs to be sequential
        const reindexedRows = newRows.map((row, index) => ({
            ...row,
            id: index + 1
        }));
        setRows(reindexedRows);

        // Adjust current page if needed for mobile
        if (isMobile && currentPage > reindexedRows.length) {
            setCurrentPage(Math.max(1, reindexedRows.length));
        }
    };

    const handleCellChange = (index: number, field: keyof TableRow, value: string) => {
        const newRows = [...rows];
        (newRows[index] as any)[field] = value;
        setRows(newRows);
    };

    const handleCheckboxChange = (index: number, newState: CheckboxState) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], approved: newState };
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

            <div className="correct-plan-page">
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
                    subtitle="Table for plan of visits"
                />

                <div className="arrow-back-wrapper">
                    <ArrowButton direction="left" onClick={handleBack} />
                </div>

                <div className="correct-plan-content">

                    <div className="plan-layout-container">
                        <div className="status-row">
                            <span className="status-label">Status:</span>
                            <span className={`status-value ${correctionStatus === 'declined' ? 'status-declined' : 'status-returned'}`}>
                                {correctionStatus === 'declined' ? 'Declined' : 'Returned'}
                            </span>
                        </div>

                        <div className="review-message-section">
                            <h3 className="review-message-title">Review message</h3>
                            <div className="review-message-box">
                                <p className="review-message-text">{reviewMessage}</p>
                            </div>
                        </div>

                        <div className="correct-plan-table-wrapper">
                            {isMobile ? (
                                <div style={{ padding: '0 16px', paddingBottom: '24px' }}>
                                    <MobilePlanEditor
                                        data={rows[currentPage - 1]}
                                        columns={columns.filter(c => c.key !== 'id' && c.key !== 'approved' && c.key !== 'actions')}
                                        onChange={(key, value) => handleCellChange(currentPage - 1, key as keyof TableRow, value)}
                                        placeholders={{
                                            teacherName: "Enter name",
                                            weekOfSemester: "Week",
                                            subject: "Subject",
                                            observerName: "Observer",
                                            purpose: "Purpose",
                                            method: "Method"
                                        }}
                                    />

                                    <div className="mobile-action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', width: '100%' }}>
                                        {rows.length > 0 && (
                                            <BigButton
                                                onClick={() => handleDeleteRow(rows[currentPage - 1].id)}
                                                variant="destructive"
                                            >
                                                Delete this row
                                            </BigButton>
                                        )}

                                        <BigButton onClick={handleAddRow} variant="secondary">
                                            Add new row
                                        </BigButton>

                                        <BigButton onClick={handleSubmit}>
                                            Submit updated plan
                                        </BigButton>
                                    </div>

                                    <MobilePagination
                                        currentPage={currentPage}
                                        totalPages={rows.length}
                                        onNext={() => {
                                            if (currentPage < rows.length) setCurrentPage(p => p + 1);
                                        }}
                                        onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    />
                                </div>
                            ) : (
                                <div className="correct-plan-table">
                                    {/* Header row */}
                                    <div className="table-header-row">
                                        {columns.map((col) => (
                                            <div
                                                key={col.key}
                                                className="table-header-cell"
                                                style={{
                                                    width: col.width,
                                                    justifyContent: col.key === 'actions' ? 'center' : 'flex-start'
                                                }}
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
                                                const key = col.key as keyof TableRow | 'actions';

                                                if (key === 'actions') {
                                                    return (
                                                        <div
                                                            key={col.key}
                                                            className="table-data-cell"
                                                            style={{
                                                                width: col.width,
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => handleDeleteRow(row.id)}
                                                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}
                                                                className="delete-row-btn"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    );
                                                }

                                                if (key === 'id') {
                                                    return (
                                                        <div
                                                            key={col.key}
                                                            className="table-data-cell"
                                                            style={{ width: col.width }}
                                                        >
                                                            <span className="table-data-text">{row.id}</span>
                                                        </div>
                                                    );
                                                }

                                                if (key === 'approved') {
                                                    return (
                                                        <div
                                                            key={col.key}
                                                            className="table-data-cell table-data-cell--checkbox"
                                                            style={{ width: col.width }}
                                                        >
                                                            <Checkbox
                                                                state={row.approved}
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
                                                        <input
                                                            type="text"
                                                            className="table-cell-input"
                                                            value={row[key as keyof TableRow] as string}
                                                            onChange={(e) => handleCellChange(rowIndex, key as keyof TableRow, e.target.value)}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {!isMobile && (
                        <>
                            <div className="add-button-wrapper">
                                <AddButton onClick={handleAddRow} />
                            </div>

                            <div className="submit-button-wrapper">
                                <BigButton onClick={handleSubmit}>
                                    Submit updated plan
                                </BigButton>
                            </div>
                        </>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
