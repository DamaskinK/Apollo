import { useState } from 'react';
import './EnterNewPlanPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
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

interface EnterNewPlanPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
}

interface TableRow {
    id: number;
    teacherName: string;
    weekOfSemester: string;
    subject: string;
    observerName: string;
    purpose: string;
    method: string;
}

interface ColumnDef {
    key: string;
    title: string;
    width: number;
    infoType?: InfoCardType;
}

const columns: ColumnDef[] = [
    { key: 'id', title: '№', width: 60 },
    { key: 'teacherName', title: 'Name and surname\nof the observed teacher', width: 250 }, // Increased
    { key: 'weekOfSemester', title: 'Week of\nthe semester', width: 150 }, // Increased
    { key: 'subject', title: 'Subject', width: 140, infoType: 'subject' },
    { key: 'observerName', title: 'Name and surname\nof the observer', width: 220, infoType: 'observer' }, // Increased
    { key: 'purpose', title: 'Purpose of\nobservation', width: 180, infoType: 'purpose' }, // Increased
    { key: 'method', title: 'Method', width: 140, infoType: 'method' },
    { key: 'actions', title: 'Actions', width: 80 }
];

const placeholders: Record<string, string> = {
    teacherName: "Enter teacher's name",
    weekOfSemester: "Enter number",
    subject: "Enter subject",
    observerName: "Enter observer's name",
    purpose: "Enter purpose",
    method: "Enter method"
};

export default function EnterNewPlanPage({ onNavigate, isLoggedIn, user, onLogout }: EnterNewPlanPageProps) {
    const { showNotification } = useNotification();
    const isMobile = useIsMobile();
    const [currentPage, setCurrentPage] = useState(1);

    const [rows, setRows] = useState<TableRow[]>([
        {
            id: 1,
            teacherName: 'Marián Novák',
            weekOfSemester: '1. Week',
            subject: 'S',
            observerName: 'Ján Kováč',
            purpose: '1',
            method: 'PR'
        },
        {
            id: 2,
            teacherName: '',
            weekOfSemester: '',
            subject: '',
            observerName: '',
            purpose: '',
            method: ''
        }
    ]);

    const handleBack = () => {
        onNavigate('createNewPlan');
    };

    const handleSubmit = () => {
        console.log('Submitting plan:', rows);
        showNotification('Plan Submitted', 'Your plan has been submitted successfully!');
        onNavigate('hospitacija');
    };

    const handleAddRow = () => {
        const newRow: TableRow = {
            id: rows.length + 1,
            teacherName: '',
            weekOfSemester: '',
            subject: '',
            observerName: '',
            purpose: '',
            method: ''
        };
        const newRows = [...rows, newRow];
        setRows(newRows);

        // If mobile, switch to the new page
        if (isMobile) {
            setCurrentPage(newRows.length);
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

    const handleCellChange = (rowIndex: number, key: keyof TableRow, value: string) => {
        const newRows = [...rows];
        if (key !== 'id') {
            newRows[rowIndex] = { ...newRows[rowIndex], [key]: value };
            setRows(newRows);
        }
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

    // Mobile specific handlers
    const handleNextPage = () => {
        if (currentPage < rows.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const getCurrentRowData = () => {
        return rows[currentPage - 1];
    };

    const handleMobileChange = (key: string, value: string) => {
        handleCellChange(currentPage - 1, key as keyof TableRow, value);
    };

    return (
        <>

            <div className="enter-new-plan-page">
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

                <div className="enter-new-plan-content">
                    {isMobile ? (
                        // Mobile View
                        <div style={{ padding: '0 16px', paddingBottom: '24px' }}>
                            <MobilePlanEditor
                                data={getCurrentRowData()}
                                columns={columns.filter(c => c.key !== 'actions')}
                                onChange={handleMobileChange}
                                placeholders={placeholders}
                            />

                            <div className="mobile-action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                                {rows.length > 0 && (
                                    <BigButton
                                        onClick={() => handleDeleteRow(getCurrentRowData().id)}
                                        variant="destructive"
                                    >
                                        Delete this row
                                    </BigButton>
                                )}

                                <BigButton onClick={handleAddRow} variant="secondary">
                                    Add new row
                                </BigButton>

                                <BigButton onClick={handleSubmit}>
                                    Submit plan
                                </BigButton>
                            </div>

                            <MobilePagination
                                currentPage={currentPage}
                                totalPages={rows.length}
                                onNext={handleNextPage}
                                onPrev={handlePrevPage}
                            />
                        </div>
                    ) : (
                        // Desktop/Tablet Table View
                        <div className="enter-new-plan-table-wrapper">
                            <div className="enter-new-plan-table">
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
                                                        style={{ width: col.width, justifyContent: 'center', alignItems: 'center' }}
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

                                            const value = row[key as keyof TableRow];
                                            const isEmpty = key !== 'id' && !value;

                                            return (
                                                <div
                                                    key={col.key}
                                                    className="table-data-cell"
                                                    style={{
                                                        width: col.width,
                                                        justifyContent: col.key === 'actions' ? 'center' : 'flex-start'
                                                    }}
                                                >
                                                    {key === 'id' ? (
                                                        <span className="cell-text">{value}</span>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className={`cell-input ${isEmpty ? 'cell-input--empty' : ''}`}
                                                            value={value as string}
                                                            placeholder={placeholders[key]}
                                                            onChange={(e) => handleCellChange(rowIndex, key as keyof TableRow, e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            <AddButton onClick={handleAddRow} />

                            <div className="submit-button-wrapper">
                                <BigButton onClick={handleSubmit}>
                                    Submit a new plan
                                </BigButton>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
