import './AddButton.css';
import { Plus } from 'lucide-react';

interface AddButtonProps {
    onClick?: () => void;
    label?: string;
    className?: string;
}

export default function AddButton({ 
    onClick, 
    label = 'Add a new row',
    className = '' 
}: AddButtonProps) {
    return (
        <button className={`add-button ${className}`} onClick={onClick}>
            <div className="add-button-icon-wrapper">
                <Plus className="add-button-icon" size={16} strokeWidth={1.5} />
            </div>
            <span className="add-button-label">{label}</span>
        </button>
    );
}
