import './ArrowButton.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ArrowButtonProps = {
    direction?: 'left' | 'right';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export default function ArrowButton({
    direction = 'left',
    onClick,
    disabled = false,
    className = ''
}: ArrowButtonProps) {
    const Icon = direction === 'left' ? ArrowLeft : ArrowRight;

    return (
        <button 
            className={`arrow-button ${className}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            <Icon className="arrow-button-icon" />
        </button>
    );
}
