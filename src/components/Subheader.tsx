import React from 'react';
import { ChevronsDown } from 'lucide-react';
import './Subheader.css';

interface SubheaderProps {
  variant?: 'Big' | 'Small';
  title: string;
  subtitle?: string;
}

export default function Subheader({ variant = 'Big', title, subtitle }: SubheaderProps) {
  return (
    <div className={`subheader ${variant.toLowerCase()}`}>
      <div className="subheader-content">
        <h1 className="subheader-title">{title}</h1>
        {subtitle && <p className="subheader-subtitle">{subtitle}</p>}
      </div>
      
      {variant === 'Big' && (
        <div className="subheader-icon">
          <ChevronsDown size={48} />
        </div>
      )}
    </div>
  );
}