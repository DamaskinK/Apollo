#!/usr/bin/env node
// Script to bulk update page TypeScript interfaces

const pages = [
    'ApprovePlanPage',
    'ApprovedPlanPage',
    'CorrectPlanPage',
    'ViewDeclinedPlanPage',
    'ViewReturnedPlanPage'
];

const authPropsTemplate = `
interface User {
    name: string;
    role: string;
}

interface ${pageName}Props {
    onNavigate: (page: Page) => void;
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
}
`;

const headerTemplate = `
                <Header 
                    onLogoClick={() => onNavigate('home')} 
                    onLoginClick={() => onNavigate('login')}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />
`;

console.log('Templates for updating pages with auth props');
