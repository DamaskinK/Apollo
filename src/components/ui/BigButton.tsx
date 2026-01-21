import './BigButton.css';

type BigButtonProps = {
    children: React.ReactNode;
    variant?: 'default' | 'hover' | 'active' | 'secondary' | 'destructive';
    onClick?: () => void;
    className?: string;
};

export default function BigButton({
    children,
    variant = 'default',
    onClick,
    className = ''
}: BigButtonProps) {
    return (
        <button
            className={`big-button big-button--${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
