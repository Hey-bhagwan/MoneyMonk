export const TransactionCard = ({
    transactions
}: {
    transactions: {
        type: string,
        amount: string,
        date: string,
        description?: string,
        status: string

    }[]
}) => {
    if(!transactions.length) {
        return <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
    }

    return <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between mb-4">
                        <div>
                            <div className="text-sm">
                                {t.description || t.type}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {new Date(t.date).toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            {t.type === 'OnRamp' ? `+ ₹${parseFloat(t.amount).toFixed(2)}` : `- ₹${parseFloat(t.amount).toFixed(2)}`}
                        </div>
                    </div>
                ))}
            </div>
}