import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './InfoCard.css';
import { Info, X } from 'lucide-react';

export type InfoCardType = 'subject' | 'method' | 'observer' | 'purpose';

interface InfoCardProps {
    type: InfoCardType;
    onClose: () => void;
    anchorRect?: DOMRect | null;
    className?: string;
}

const infoContent: Record<InfoCardType, { title: string; description: string }> = {
    subject: {
        title: 'Subject',
        description: 'Enter the name of the subject and the form of teaching (P – prednáška, S – seminár, C – cvičenie, Sk – skúška).'
    },
    method: {
        title: 'Method',
        description: 'Study method (PR – prezenčná, DI – dištančná).'
    },
    observer: {
        title: 'Name and surname\nof the observer',
        description: 'State the function of the observer. Observation is carried out by the head of the department, persons responsible for the subjects, and the person responsible for the study program. The vice-rector and vice-dean for educational activities may conduct classroom observation, particularly in light of the results of a survey in which students evaluate the quality of educational activities and other suggestions related to the quality of educational activities.'
    },
    purpose: {
        title: 'Purpose of\nobservation',
        description: 'Please specify the numerical expression of the observation objective. The objective of the observation is to check: (1) the level of education, (2) the assessment of teachers\' competence, (3) student participation and activity in class, (4) lesson preparation.'
    }
};

export default function InfoCard({ type, onClose, anchorRect, className = '' }: InfoCardProps) {
    const content = infoContent[type];
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        if (anchorRect && cardRef.current) {
            // Calculate position: try to put it below the trigger, if not enough space, put above
            // For simplicity, let's just anchor it to the trigger's bottom-left for now, 
            // but ensure it is fixed position.
            // Using standard fixed positioning relative to viewport.

            let top = anchorRect.bottom + 8;
            let left = anchorRect.left;

            // Simple boundary check (very basic)
            if (left + 300 > window.innerWidth) {
                left = window.innerWidth - 320;
            }

            setStyle({
                position: 'fixed',
                top: top,
                left: left,
                zIndex: 9999
            });
        }
    }, [anchorRect]);

    const renderTitle = (title: string) => {
        const lines = title.split('\n');
        if (lines.length === 1) {
            return <span>{title}</span>;
        }
        return lines.map((line, i) => (
            <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
            </span>
        ));
    };

    return createPortal(
        <div ref={cardRef} className={`info-card ${className}`} style={style}>
            <Info className="info-card-icon" size={28} />
            <div className="info-card-body">
                <h3 className="info-card-title">{renderTitle(content.title)}</h3>
                <p className="info-card-description">{content.description}</p>
            </div>
            <button className="info-card-close" onClick={onClose}>
                <X size={28} />
            </button>
        </div>,
        document.body
    );
}

// Helper component for triggering info cards
interface InfoTriggerProps {
    type: InfoCardType;
    className?: string;
}

export function InfoTrigger({ type, className = '' }: InfoTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div className={`info-trigger-wrapper ${className}`}>
            <button
                ref={buttonRef}
                className="info-trigger-button"
                onClick={handleOpen}
            >
                <Info size={16} />
            </button>
            {isOpen && (
                <InfoCard
                    type={type}
                    onClose={() => setIsOpen(false)}
                    anchorRect={buttonRef.current?.getBoundingClientRect()}
                />
            )}
        </div>
    );
}
