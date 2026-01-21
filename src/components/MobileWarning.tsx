import './MobileWarning.css';
import { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';


export default function MobileWarning() {
    const [isIgnored, setIsIgnored] = useState(() => {
        return sessionStorage.getItem('mobile-warning-ignored') === 'true';
    });

    const handleIgnore = () => {
        setIsIgnored(true);
        sessionStorage.setItem('mobile-warning-ignored', 'true');
    };

    if (isIgnored) {
        return null;
    }

    return (
        <div className="mobile-warning">
            <div className="mobile-warning-content">
                <div className="mobile-warning-icon">
                    <Monitor size={64} strokeWidth={1.5} />
                </div>
                <h1 className="mobile-warning-title">
                    Please use a larger screen
                </h1>
                <p className="mobile-warning-text">
                    This application requires a larger screen for optimal functionality.
                    Please access Apollo from a desktop computer or a tablet in landscape mode.
                </p>
                <div className="mobile-warning-info">
                    <p>Minimum recommended screen width: <strong>900px</strong></p>
                </div>

                <div className="mobile-warning-actions">
                    <button
                        className="mobile-warning-ignore-btn"
                        onClick={handleIgnore}
                    >
                        Ignore and continue
                    </button>
                </div>
            </div>
        </div>
    );
}
