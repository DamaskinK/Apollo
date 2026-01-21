import './Checkbox.css';
import { Check, X } from 'lucide-react';

type CheckboxState = 'off' | 'on' | 'cancel';

type CheckboxProps = {
    state?: CheckboxState;
    onChange?: (state: CheckboxState) => void;
    className?: string;
};

export default function Checkbox({ 
    state = 'off',
    onChange,
    className = ''
}: CheckboxProps) {
    const handleClick = () => {
        if (onChange) {
            // Цикл: off → on → cancel → off
            const nextState: CheckboxState = 
                state === 'off' ? 'on' : 
                state === 'on' ? 'cancel' : 
                'off';
            onChange(nextState);
        }
    };

    const getVariantClass = () => {
        if (state === 'cancel') return 'checkbox--cancel';
        if (state === 'on') return 'checkbox--on';
        return 'checkbox--off';
    };

    return (
        <button 
            className={`checkbox ${getVariantClass()} ${className}`}
            onClick={handleClick}
            type="button"
        >
            {state === 'cancel' ? (
                <X className="checkbox-icon" strokeWidth={2.5} />
            ) : state === 'on' ? (
                <Check className="checkbox-icon" strokeWidth={2.5} />
            ) : null}
        </button>
    );
}
