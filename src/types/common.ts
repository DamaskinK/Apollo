// Common types used across multiple pages

export interface User {
    name: string;
    role: string;
}

export type Page = 'home' | 'hospitacija' | 'createNewPlan' | 'enterNewPlan' | 'approvePlan' | 'viewDeclinedPlan' | 'correctPlan' | 'viewApprovedPlan' | 'viewReturnedPlan' | 'erasmus' | 'isp' | 'login';

export interface BasePageProps {
    onNavigate: (page: Page) => void;
    isLoggedIn?: boolean;
    user?: User | null;
    onLogout?: () => void;
}
