interface HomepageEntryProps {
  paymentName: string;
  collaborators: string;
  amountPaid: string;
  transactionId?: string;
  onDelete?: (transactionId: string) => void;
  direction?: 'incoming' | 'outgoing';
}

const HomepageEntry = ({ paymentName, collaborators, amountPaid, transactionId, onDelete, direction }: HomepageEntryProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    if (transactionId && onDelete) {
      e.preventDefault(); // Prevent navigation if it's inside a Link
      e.stopPropagation();
      onDelete(transactionId);
    }
  };

  return (
    <div className="p-2 rounded-lg hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{paymentName}</span>
          <span className="text-lg mt-2">{collaborators}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-2xl border flex-shrink-0 ${direction === 'outgoing' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
            <span className="text-2xl text-small">{direction === 'outgoing' ? '-' : '+'}{amountPaid}</span>
          </div>
          {onDelete && transactionId && (
            <button onClick={handleDeleteClick} className={`ml-4 px-3 py-1 text-white rounded-lg ${direction === 'outgoing' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}`}>
              {direction === 'outgoing' ? 'Pay' : 'Remind'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { HomepageEntry }
export type { HomepageEntryProps }