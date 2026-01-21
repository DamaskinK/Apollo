import './InputField.css';

type InputFieldProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
};

export default function InputField({
    label = 'Label',
    value = '',
    placeholder = 'Value',
    onChange,
    disabled = false,
    className = ''
}: InputFieldProps) {
    const isEmpty = !value;

    return (
        <div className={`input-field ${className}`}>
            {label && <label className="input-field-label">{label}</label>}
            <input
                type="text"
                className={`input-field-input ${isEmpty ? 'input-field-input--empty' : ''}`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
}
