import React from 'react';
import './MobilePagination.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobilePaginationProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
    onAddNew?: () => void;
}

export default function MobilePagination({
    currentPage,
    totalPages,
    onNext,
    onPrev,
    onAddNew
}: MobilePaginationProps) {
    return (
        <div className="mobile-pagination-container">
            <div className="mobile-pagination-controls">
                <button
                    className="mobile-pagination-btn"
                    onClick={onPrev}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>

                <span className="mobile-pagination-info">
                    {currentPage} / {totalPages}
                </span>

                <button
                    className="mobile-pagination-btn"
                    onClick={onNext}
                    disabled={currentPage === totalPages && !onAddNew}
                >
                    <span>Next</span>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
