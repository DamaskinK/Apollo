import React from 'react';
import { Clipboard, Globe, FileText } from 'lucide-react';
import './Card.css';
import externalLinkSvg from "../assets/External link.svg";

export type CardType = 'HP' | 'ER' | 'ISP';

interface CardProps {
  type: CardType;
  onClick?: () => void;
}

export default function Card({ type, onClick }: CardProps) {
  const renderContent = () => {
    switch (type) {
      case 'HP':
        return {
          icon: <Clipboard className="card-lucide-icon" strokeWidth={1} />,
          title: <p>Hospitacija</p>
        };
      case 'ER':
        return {
          icon: <Globe className="card-lucide-icon" strokeWidth={1} />,
          title: <p>Erasmus</p>
        };
      case 'ISP':
        return {
          icon: <FileText className="card-lucide-icon" strokeWidth={1} />,
          title: (
            <>
              <p>Individuálny</p>
              <p>študijný plán</p>
            </>
          )
        };
      default:
        return {
          icon: null,
          title: null
        };
    }
  };

  const { icon, title } = renderContent();

  return (
    <div className="card" onClick={onClick}>
      <div className="card-external-link">
        <img src={externalLinkSvg} alt="External Link" />
      </div>
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-title">
        {title}
      </div>
    </div>
  );
}