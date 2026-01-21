import { useState, useRef, useEffect } from 'react';
import './StatusSelect.css';
import { ChevronDown } from 'lucide-react';

type StatusValue = 'approved' | 'returned' | 'declined' | '';

type StatusSelectProps = {
    label?: string;
    value?: StatusValue;
    placeholder?: string;
    onChange?: (value: StatusValue) => void;
    disabled?: boolean;
    className?: string;
};

const statusOptions: { value: StatusValue; label: string }[] = [
    { value: 'approved', label: 'Approved' },
    { value: 'returned', label: 'Returned' },
    { value: 'declined', label: 'Declined' }
];

export default function StatusSelect({
    label = 'Assign status',
    value = '',
    placeholder = 'Select status',
    onChange,
    disabled = false,
    className = ''
}: StatusSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (newValue: StatusValue) => {
        onChange?.(newValue);
        setIsOpen(false);
    };

    const selectedOption = statusOptions.find(opt => opt.value === value);

    const getStatusColorClass = (status: StatusValue) => {
        switch (status) {
            case 'approved': return 'status-select--approved';
            case 'returned': return 'status-select--returned';
            case 'declined': return 'status-select--declined';
            default: return '';
        }
    };

    return (
        <div className={`status-select ${className}`} ref={wrapperRef}>
            {label && <label className="status-select-label">{label}</label>}
            <div className="status-select-wrapper">
                <button
                    className={`status-select-trigger ${getStatusColorClass(value)}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    type="button"
                >
                    <span className={`status-select-value ${!value ? 'status-select-value--empty' : ''}`}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <ChevronDown className="status-select-icon" size={16} />
                </button>
                
                {isOpen && (
                    <div className="status-select-dropdown">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`status-select-option ${getStatusColorClass(option.value)}`}
                                onClick={() => handleSelect(option.value)}
                                type="button"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
