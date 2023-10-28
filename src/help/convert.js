export const convertData = (transactions) => {
    const dailyTotals = {};

    transactions.forEach((transaction) => {
        const date = transaction.created_at.split('T')[0];
        const amount = transaction.amount;

        if (!dailyTotals[date]) {
            dailyTotals[date] = {
                amountTotal: amount,
                transactionTotal: transaction.total_transaction,
            };
        } else {
            dailyTotals[date].amountTotal += amount;
            dailyTotals[date].transactionTotal += transaction.total_transaction;
        }
    });

    const processedTransactions = transactions.map((transaction) => {
        const date = transaction.created_at.split('T')[0];
        const dailyTotal = dailyTotals[date];

        return {
            ...transaction,
            created_at: date,
            ...dailyTotal,
        };
    });

    return processedTransactions;
};

