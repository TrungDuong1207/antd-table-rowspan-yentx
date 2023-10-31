export const convertData = (transactions) => {
    const dailyTotals = {};

    transactions.forEach((transaction) => {
        const date = transaction.createdAt.split('T')[0];
        const amount = transaction.amount;
        const destinationAccountType = transaction.destinationAccountType;
        const key = `${date}-${destinationAccountType}`

        if (!dailyTotals[date]) {
            dailyTotals[date] = {
                amountTotal: amount,
                transactionTotal: transaction.totalTransaction,
            };
        } else {
            dailyTotals[date].amountTotal += amount;
            dailyTotals[date].transactionTotal += transaction.totalTransaction;
        }

        if (!dailyTotals[key]) {
            dailyTotals[key] = {
                loadValueSameMethod: amount,
            };
        } else {
            dailyTotals[key].loadValueSameMethod += amount;
        }

    });

    const processedTransactions = transactions.map((transaction) => {
        const date = transaction.createdAt.split('T')[0];
        const destinationAccountType = transaction.destinationAccountType;
        const key = `${date}-${destinationAccountType}`
        const dailyTotal = dailyTotals[date];
        const dailyTotalWithDestinationType = dailyTotals[key]

        return {
            ...transaction,
            createdAt: convertUTCToLocalDate(transaction.createdAt),
            ...dailyTotal,
            ...dailyTotalWithDestinationType,
        };
    });

    return processedTransactions;
};

export const convertUTCToLocalDate = (utcDate) => {
    const date = new Date(utcDate);
    const VNOffset = 7 * 60 * 60 * 1000;
    const localTime = date.getTime() + VNOffset;
    const localDate = new Date(localTime);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    return localDate.toLocaleDateString('en-US', options);
}

