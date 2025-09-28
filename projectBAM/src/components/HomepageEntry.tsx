interface HomepageEntryProps {
  paymentName: string
  collaborators: string
  amountPaid: string
}

const HomepageEntry = ({paymentName, collaborators, amountPaid}: HomepageEntryProps) => {
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
        </div>
    </div>
  )
}

export default HomepageEntry