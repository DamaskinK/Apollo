import './SmallButton.css';

type SmallButtonProps = {
    children: React.ReactNode;
    variant?: 'default' | 'hover' | 'active';
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
};

export default function SmallButton({
    children,
    variant = 'default',
    onClick,
    className = ''
}: SmallButtonProps) {
    return (
        <button
            className={`small-button small-button--${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
