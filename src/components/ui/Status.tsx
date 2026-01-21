import './Status.css';

type StatusType = 'approved' | 'returned' | 'declined';

type StatusProps = {
    status: StatusType;
    className?: string;
};

const statusLabels: Record<StatusType, string> = {
    approved: 'Approved',
    returned: 'Returned',
    declined: 'Declined'
};

export default function Status({
    status,
    className = ''
}: StatusProps) {
    return (
        <span className={`status status--${status} ${className}`}>
            {statusLabels[status]}
        </span>
    );
}
