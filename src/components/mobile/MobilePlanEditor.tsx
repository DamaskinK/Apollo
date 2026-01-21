
import './MobilePlanEditor.css';
import { InfoTrigger } from '../ui/InfoCard';

interface MobilePlanEditorProps {
    data: any;
    columns: any[];
    onChange: (key: string, value: string) => void;
    placeholders: Record<string, string>;
}

export default function MobilePlanEditor({
    data,
    columns,
    onChange,
    placeholders
}: MobilePlanEditorProps) {
    return (
        <div className="mobile-card-editor">
            {columns.map((col) => {
                const key = col.key;
                if (key === 'id') return null; // Skip ID field

                const value = data[key];

                if (col.renderEditor) {
                    return (
                        <div key={key} className="mobile-field-group">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <label className="mobile-field-label">
                                    {col.title.replace(/\n/g, ' ')}
                                </label>
                                {col.infoType && <InfoTrigger type={col.infoType} />}
                            </div>
                            {col.renderEditor(value, (val: any) => onChange(key, val))}
                        </div>
                    );
                }

                return (
                    <div key={key} className="mobile-field-group">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label className="mobile-field-label">
                                {col.title.replace(/\n/g, ' ')}
                            </label>
                            {col.infoType && <InfoTrigger type={col.infoType} />}
                        </div>

                        <input
                            type="text"
                            className="mobile-field-input"
                            value={value}
                            placeholder={placeholders ? placeholders[key] : ''}
                            onChange={(e) => onChange(key, e.target.value)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
