import React from 'react';
import './MobileCard.css';

interface ColumnDef {
    key: string;
    title: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface MobileReadOnlyCardProps {
    data: any;
    columns: ColumnDef[];
    actions?: React.ReactNode;
    onClick?: () => void;
}

export default function MobileReadOnlyCard({
    data,
    columns,
    actions,
    onClick
}: MobileReadOnlyCardProps) {
    return (
        <div className="mobile-read-only-card" onClick={onClick}>
            {columns.map((col) => {
                const value = data[col.key];
                return (
                    <div key={col.key} className="mobile-card-row">
                        <span className="mobile-card-label">
                            {col.title.replace(/\n/g, ' ')}
                        </span>
                        <span className="mobile-card-value">
                            {col.render ? col.render(value, data) : value}
                        </span>
                    </div>
                );
            })}

            {actions && (
                <div className="mobile-card-actions">
                    {actions}
                </div>
            )}
        </div>
    );
}
