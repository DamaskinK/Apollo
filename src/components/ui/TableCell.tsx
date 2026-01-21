import './TableCell.css';
import { Download, Info } from 'lucide-react';
import SmallButton from './SmallButton';
import Checkbox from './Checkbox';

type CheckboxState = 'off' | 'on' | 'cancel';
type TableCellType = 'title' | 'titleInfo' | 'text' | 'textEmpty' | 'download' | 'noDownload' | 'button' | 'checkbox';
type RowVariant = 'first' | 'second';

type TableCellProps = {
    type?: TableCellType;
    row?: RowVariant;
    children?: React.ReactNode;
    onDownload?: () => void;
    onButtonClick?: () => void;
    buttonText?: string;
    checkboxState?: CheckboxState;
    onCheckboxChange?: (state: CheckboxState) => void;
    className?: string;
};

export default function TableCell({
    type = 'title',
    row = 'first',
    children,
    onDownload,
    onButtonClick,
    buttonText = 'Show plan',
    checkboxState = 'off',
    onCheckboxChange,
    className = ''
}: TableCellProps) {
    const isTitle = type === 'title' || type === 'titleInfo';
    const bgClass = isTitle 
        ? 'table-cell--title-bg' 
        : row === 'first' 
            ? 'table-cell--row-first' 
            : 'table-cell--row-second';

    const renderContent = () => {
        switch (type) {
            case 'title':
                return <span className="table-cell-title">{children}</span>;
            
            case 'titleInfo':
                return (
                    <div className="table-cell-title-info">
                        <span className="table-cell-title">{children}</span>
                        <Info className="table-cell-info-icon" size={16} />
                    </div>
                );
            
            case 'text':
                return <span className="table-cell-text">{children}</span>;
            
            case 'textEmpty':
                return <span className="table-cell-text table-cell-text--empty">{children || 'Empty'}</span>;
            
            case 'download':
                return (
                    <div className="table-cell-download">
                        <span className="table-cell-download-text">{children || 'Download File'}</span>
                        <button className="table-cell-download-btn" onClick={onDownload}>
                            <Download size={24} />
                        </button>
                    </div>
                );
            
            case 'noDownload':
                return <span className="table-cell-no-download">{children || 'NO Download File'}</span>;
            
            case 'button':
                return (
                    <div className="table-cell-button-wrapper">
                        <SmallButton onClick={onButtonClick}>{buttonText}</SmallButton>
                    </div>
                );
            
            case 'checkbox':
                return (
                    <div className="table-cell-checkbox-wrapper">
                        <Checkbox state={checkboxState} onChange={onCheckboxChange} />
                    </div>
                );
            
            default:
                return children;
        }
    };

    return (
        <div className={`table-cell ${bgClass} ${className}`}>
            {renderContent()}
        </div>
    );
}
