interface HomepageEntryProps {
  paymentName: string;
  collaborators: string;
  amountPaid: string;
  transactionId?: string;
  onDelete?: (transactionId: string) => void;
}

const HomepageEntry = ({paymentName, collaborators, amountPaid, transactionId, onDelete}: HomepageEntryProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    if (transactionId && onDelete) {
      e.preventDefault(); // Prevent navigation if it's inside a Link
      e.stopPropagation();
      onDelete(transactionId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{paymentName}</span>
          <span className="text-lg mt-2">{collaborators}</span>
        </div>
        <div className="px-3 py-1 rounded-2xl border border-black flex-shrink-0">
          <span className="text-2xl text-small">{amountPaid}</span>
        </div>
        {onDelete && transactionId && (
          <button onClick={handleDeleteClick} className="ml-4 px-3 py-1 bg-green-500 text-white rounded-lg">Send</button>
        )}
      </div>
    </div>
  )
}

export {HomepageEntry}
export type {HomepageEntryProps}