render: (value, row, index) => {
    const obj = {
        children: value,
        props: {}
    };

    console.log({ processedRecords })

    if (processedRecords.has("created_at_c5") &&
        processedRecords.get("created_at_c5").createdAt === row.createdAt &&
        processedRecords.get("created_at_c5").index !== index &&
        processedRecords.has("destinationAccountType_c5") &&
        processedRecords.get("destinationAccountType_c5").destinationAccountType === row.destinationAccountType &&
        processedRecords.get("destinationAccountType_c5").index !== index
    ) {
        console.log("----0000------")
        console.log({ index, row })
        console.log("rowat-", row.createdAt, "-proAt-", processedRecords.get("created_at_c5").createdAt, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
        console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
        console.log("-----0000-----")
        obj.props.rowSpan = 0;
    } else if (processedRecords.has("created_at_c5") &&
        processedRecords.get("created_at_c5").createdAt !== row.createdAt
    ) {
        console.log("----1111------")
        console.log({ index, row })
        console.log("rowat-", row.createdAt, "-proAt-", processedRecords.get("created_at_c5").createdAt, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
        console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
        console.log("-----1111-----")
        // nothing
    } else {
        const rowCount = dataConvert.filter((data) => {
            return (data.createdAt === row.createdAt &&
                data.destinationAccountType === row.destinationAccountType)

        }).length;

        console.log("-----2222-----")
        console.log({ index, row })
        console.log({ rowCount })

        processedRecords.set("created_at_c5", { createdAt: row.createdAt, index: index });
        processedRecords.set("destinationAccountType_c5", { destinationAccountType: row.destinationAccountType, index: index });
        let valueAmount = {};

        console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
        console.log("rowat-", row.createdAt, "-proAt-", processedRecords.get("created_at_c5").createdAt, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
        console.log("----2222------")

        dataConvert.forEach(item => {
            const { createdAt, destinationAccountType, amount } = item;
            const key = `${createdAt}-${destinationAccountType}`;

            if (valueAmount[key]) {
                valueAmount[key] += amount;
            } else {
                valueAmount[key] = amount;
            }
        });

        obj.children = valueAmount[`${row.createdAt}-${row.destinationAccountType}`];
        obj.props.rowSpan = rowCount;
    }

    return obj;
}