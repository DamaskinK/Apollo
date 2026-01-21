import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 900) {
    const [isMobile, setIsMobile] = useState(() => {
        // Check window exists for SSR safety (though this is likely CSR)
        if (typeof window !== 'undefined') {
            return window.innerWidth < breakpoint;
        }
        return false;
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [breakpoint]);

    return isMobile;
}
