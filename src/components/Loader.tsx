import './Loader.css';

export default function Loader() {
    return (
        <div className="loader-overlay">
            <div className="loader-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
            </div>
        </div>
    );
}
