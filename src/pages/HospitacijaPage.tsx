import './HospitacijaPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subheader from '../components/Subheader';
import ArrowButton from '../components/ui/ArrowButton';
import BigButton from '../components/ui/BigButton';
import SmallButton from '../components/ui/SmallButton';
import MobileWarning from '../components/MobileWarning';
import { Download } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp';

interface User {
    name: string;
    role: string;
}

interface HospitacijaPageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
}

// Mock data for the table
const tableData = [
    {
        id: 1,
        date: '2023/2024',
        department: 'KPI',
        headOfDepartment: 'Katarína Nováková',
        approver: 'Katarína Nováková',
        status: 'Approved',
        hasFile: true,
        actionText: 'Show plan'
    },
    {
        id: 2,
        date: '2024/2025',
        department: 'KPI',
        headOfDepartment: 'Katarína Nováková',
        approver: 'Katarína Nováková',
        status: 'Declined',
        hasFile: false,
        actionText: 'Show plan'
    },
    {
        id: 3,
        date: '2025/2026',
        department: 'KPI',
        headOfDepartment: 'Katarína Nováková',
        approver: 'Katarína Nováková',
        status: 'Returned',
        hasFile: false,
        actionText: 'Show plan'
    },
    {
        id: 4,
        date: '2025/2026',
        department: 'KPI',
        headOfDepartment: 'Katarína Nováková',
        approver: 'Katarína Nováková',
        status: 'Processed',
        hasFile: false,
        actionText: 'Approve'
    }
];

const columns = [
    { key: 'date', title: 'Data', width: 175 },
    { key: 'department', title: 'Department', width: 160 },
    { key: 'headOfDepartment', title: 'Head of Department', width: 190 },
    { key: 'approver', title: 'Approver', width: 190 },
    { key: 'status', title: 'Status', width: 131 },
    { key: 'file', title: 'File', width: 175 },
    { key: 'shares', title: 'Shares', width: 126 }
];

// ... existing imports
import { useIsMobile } from '../hooks/useIsMobile';
import MobileReadOnlyCard from '../components/mobile/MobileReadOnlyCard';

// ... existing code

export default function HospitacijaPage({ onNavigate, isLoggedIn, user, onLogout }: HospitacijaPageProps) {
    const { showNotification } = useNotification();
    const isMobile = useIsMobile();

    const handleBack = () => {
        onNavigate('home');
    };

    const handleCreatePlan = () => {
        onNavigate('createNewPlan');
    };

    const handleDownload = (id: number) => {
        console.log('Download file for row:', id);
        showNotification('Download Success', 'File has been downloaded successfully!');
    };

    const handleShowPlan = (id: number, status: string) => {
        console.log('Show plan for row:', id);
        if (status === 'Approved') {
            onNavigate('viewApprovedPlan');
        } else if (status === 'Returned') {
            onNavigate('viewReturnedPlan');
        } else if (status === 'Declined') {
            onNavigate('viewDeclinedPlan');
        }
    };

    const handleApprove = () => {
        onNavigate('approvePlan');
    };

    // ... existing handlers

    return (
        <>

            <div className="hospitacija-page">
                <Header
                    onLogoClick={() => onNavigate('home')}
                    onLoginClick={() => onNavigate('home')}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />

                <div className="hospitacija-content">
                    <div className="hospitacija-back-button">
                        <ArrowButton direction="left" onClick={handleBack} />
                    </div>

                    <Subheader
                        variant="Small"
                        title="Hospitacija"
                        subtitle="Table for plan of visits"
                    />

                    <main className="hospitacija-main">
                        {isMobile ? (
                            // Mobile View - Card List
                            <div className="hospitacija-mobile-list" style={{ width: '100%', paddingBottom: '20px' }}>
                                {tableData.map((row) => (
                                    <MobileReadOnlyCard
                                        key={row.id}
                                        data={row}
                                        columns={[
                                            { key: 'date', title: 'Data' },
                                            { key: 'department', title: 'Department' },
                                            { key: 'headOfDepartment', title: 'Head of Dep.' },
                                            { key: 'approver', title: 'Approver' },
                                            { key: 'status', title: 'Status' }
                                        ]}
                                        actions={
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                {row.hasFile && (
                                                    <button
                                                        className="hospitacija-download-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDownload(row.id);
                                                        }}
                                                    >
                                                        <Download size={20} />
                                                    </button>
                                                )}
                                                <SmallButton onClick={row.actionText === 'Approve' ? handleApprove : () => handleShowPlan(row.id, row.status)}>
                                                    {row.actionText}
                                                </SmallButton>
                                            </div>
                                        }
                                        onClick={row.actionText === 'Approve' ? handleApprove : () => handleShowPlan(row.id, row.status)}
                                    />
                                ))}

                                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column' }}>
                                    <BigButton onClick={handleCreatePlan}>
                                        Create a new plan
                                    </BigButton>
                                </div>
                            </div>
                        ) : (
                            // Desktop View - Table
                            <>
                                <div className="hospitacija-table-container">
                                    {/* Table Header */}
                                    <div className="hospitacija-table-header">
                                        {columns.map((col) => (
                                            <div
                                                key={col.key}
                                                className="hospitacija-table-th"
                                                style={{ width: col.width }}
                                            >
                                                {col.title}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Table Body */}
                                    <div className="hospitacija-table-body">
                                        {tableData.map((row, index) => (
                                            <div
                                                key={row.id}
                                                className={`hospitacija-table-row ${index % 2 === 0 ? 'row-odd' : 'row-even'}`}
                                                onClick={() => row.actionText === 'Approve' ? handleApprove() : handleShowPlan(row.id, row.status)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="hospitacija-table-td" style={{ width: 175 }}>
                                                    {row.date}
                                                </div>
                                                <div className="hospitacija-table-td" style={{ width: 160 }}>
                                                    {row.department}
                                                </div>
                                                <div className="hospitacija-table-td" style={{ width: 190 }}>
                                                    {row.headOfDepartment}
                                                </div>
                                                <div className="hospitacija-table-td" style={{ width: 190 }}>
                                                    {row.approver}
                                                </div>
                                                <div className="hospitacija-table-td" style={{ width: 131 }}>
                                                    {row.status}
                                                </div>
                                                <div className="hospitacija-table-td" style={{ width: 175 }}>
                                                    {row.hasFile ? (
                                                        <button
                                                            className="hospitacija-download-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDownload(row.id);
                                                            }}
                                                        >
                                                            <span>Download File</span>
                                                            <Download size={24} />
                                                        </button>
                                                    ) : (
                                                        <span className="hospitacija-no-file">NO Download File</span>
                                                    )}
                                                </div>
                                                <div className="hospitacija-table-td hospitacija-action-cell" style={{ width: 126 }}>
                                                    <SmallButton onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        row.actionText === 'Approve' ? handleApprove() : handleShowPlan(row.id, row.status);
                                                    }}>
                                                        {row.actionText}
                                                    </SmallButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="hospitacija-create-button">
                                    <BigButton onClick={handleCreatePlan}>
                                        Create a new plan
                                    </BigButton>
                                </div>
                            </>
                        )}
                    </main>
                </div>

                <Footer />
            </div>
        </>
    );
}
