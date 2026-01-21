import './SelectField.css';
import { ChevronDown } from 'lucide-react';

type SelectOption = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    options?: SelectOption[];
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
};

export default function SelectField({
    label = 'Label',
    value = '',
    placeholder = 'Value',
    options = [],
    onChange,
    disabled = false,
    className = ''
}: SelectFieldProps) {
    const isEmpty = !value;

    return (
        <div className={`select-field ${className}`}>
            {label && <label className="select-field-label">{label}</label>}
            <div className="select-field-wrapper">
                <select
                    className={`select-field-select ${isEmpty ? 'select-field-select--empty' : ''}`}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="select-field-icon" size={16} />
            </div>
        </div>
    );
}
