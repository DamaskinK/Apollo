import './TextareaField.css';

type TextareaFieldProps = {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;
    className?: string;
};

import { useRef, useEffect } from 'react';

export default function TextareaField({
    label = 'Label',
    value = '',
    placeholder = 'Value',
    onChange,
    disabled = false,
    readOnly = false,
    rows = 3,
    className = ''
}: TextareaFieldProps) {
    const isEmpty = !value;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <div className={`textarea-field ${className}`}>
            {label && <label className="textarea-field-label">{label}</label>}
            <textarea
                ref={textareaRef}
                className={`textarea-field-textarea ${isEmpty ? 'textarea-field-textarea--empty' : ''}`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    onChange?.(e.target.value);
                    adjustHeight();
                }}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows}
                style={{ overflow: 'hidden', minHeight: '60px' }}
            />
        </div>
    );
}
