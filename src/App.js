import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import { convertData } from './help/convert';

const data = require('./data/data.json');

const dataConvert = convertData(data);
console.log({ dataConvert });

// const dataConvert = [
//     {
//         "destinationAccountName": "BIDV",
//         "destinationAccountType": "switchport",
//         "created_at": "2018-01-12",
//         "amount": 2000000,
//         "fee": 0,
//         "total_transaction": 100,
//         "amountTotal": 6000000,
//         "feeTotal": 0,
//         "transactionTotal": 203
//     },
//     {
//         "destinationAccountName": "SACOMBANK",
//         "destinationAccountType": "switchport",
//         "created_at": "2018-01-12",
//         "amount": 2000000,
//         "fee": 0,
//         "total_transaction": 3,
//         "amountTotal": 6000000,
//         "feeTotal": 0,
//         "transactionTotal": 203
//     },
//     {
//         "destinationAccountName": "BIDV",
//         "destinationAccountType": "LINKED_BANK",
//         "created_at": "2018-01-12",
//         "amount": 2000000,
//         "fee": 0,
//         "total_transaction": 100,
//         "amountTotal": 6000000,
//         "feeTotal": 0,
//         "amountAndFeeTotal": 2000000,
//         "transactionTotal": 203
//     },
//     {
//         "destinationAccountName": "BIDV",
//         "destinationAccountType": "LINKED_BANK",
//         "created_at": "2023-08-02",
//         "amount": 24200000,
//         "fee": 0,
//         "total_transaction": 3,
//         "amountTotal": 24200000,
//         "feeTotal": 0,
//         "amountAndFeeTotal": 24200000,
//         "transactionTotal": 3
//     },
//     {
//         "destinationAccountName": "BIDV",
//         "destinationAccountType": "switchport",
//         "created_at": "2023-08-03",
//         "amount": 4100000,
//         "fee": 0,
//         "total_transaction": 3,
//         "amountTotal": 4100000,
//         "feeTotal": 0,
//         "amountAndFeeTotal": 4100000,
//         "transactionTotal": 3
//     },
// ]


function App() {
    const [processedRecords, setProcessedRecords] = useState(new Map());

    useEffect(() => {
        setProcessedRecords(new Map());
    }, []);

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'created_at',
            onCell: (record, index) => {
                if (processedRecords.has("created_at_c1") &&
                    processedRecords.get("created_at_c1").created_at === record.created_at &&
                    processedRecords.get("created_at_c1").index !== index) {
                    return { rowSpan: 0 };
                } else {
                    const rowCount = dataConvert.filter((data) => data.created_at === record.created_at).length;
                    processedRecords.set("created_at_c1", { created_at: record.created_at, index: index });

                    return { rowSpan: rowCount };
                }
            },
        },
        {
            title: 'Giao dịch ngày',
            children: [
                {
                    title: `Giá trị nạp`,
                    dataIndex: 'amountTotal',
                    key: 'amountTotal',
                    onCell: (record, index) => {
                        if (processedRecords.has("created_at_c2") &&
                            processedRecords.get("created_at_c2").created_at === record.created_at &&
                            processedRecords.get("created_at_c2").index !== index) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => data.created_at === record.created_at).length;
                            processedRecords.set("created_at_c2", { created_at: record.created_at, index: index });
                            return { rowSpan: rowCount };
                        }
                    },
                },
                {
                    title: `Số lượng giao dich`,
                    dataIndex: 'transactionTotal',
                    key: 'transactionTotal',
                    onCell: (record, index) => {
                        if (processedRecords.has("created_at_c3") &&
                            processedRecords.get("created_at_c3").created_at === record.created_at &&
                            processedRecords.get("created_at_c3").index !== index) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => data.created_at === record.created_at).length;
                            processedRecords.set("created_at_c3", { created_at: record.created_at, index: index });
                            return { rowSpan: rowCount };
                        }
                    },
                }
            ]
        },
        {
            title: 'Phương thức nạp',
            children: [
                {
                    title: `Tên phương thức`,
                    dataIndex: 'destinationAccountType',
                    key: 'destinationAccountType',
                    onCell: (record, index) => {
                        if (processedRecords.has("created_at_c4") &&
                            processedRecords.get("created_at_c4").created_at === record.created_at &&
                            processedRecords.get("created_at_c4").index !== index &&
                            processedRecords.has("destinationAccountType_c4") &&
                            processedRecords.get("destinationAccountType_c4").destinationAccountType === record.destinationAccountType &&
                            processedRecords.get("destinationAccountType_c4").index !== index
                        ) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => {
                                return (data.created_at === record.created_at &&
                                    data.destinationAccountType === record.destinationAccountType)

                            }).length;
                            processedRecords.set("created_at_c4", { created_at: record.created_at, index: index });
                            processedRecords.set("destinationAccountType_c4", { destinationAccountType: record.destinationAccountType, index: index });
                            return { rowSpan: rowCount };
                        }
                    },
                },
                {
                    title: `Giá trị nạp`,
                    dataIndex: 'amount',
                    key: 'amount',
                    render: (value, row, index) => {
                        const obj = {
                            children: value,
                            props: {}
                        };

                        // console.log({ processedRecords })

                        if (processedRecords.has("created_at_c5") &&
                            processedRecords.get("created_at_c5").created_at === row.created_at &&
                            processedRecords.get("created_at_c5").index !== index &&
                            processedRecords.has("destinationAccountType_c5") &&
                            processedRecords.get("destinationAccountType_c5").destinationAccountType === row.destinationAccountType &&
                            processedRecords.get("destinationAccountType_c5").index !== index
                        ) {
                            // console.log("----0000------")
                            // console.log({ index, row })
                            // console.log("rowat-", row.created_at, "-proAt-", processedRecords.get("created_at_c5").created_at, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
                            // console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
                            // console.log("-----0000-----")
                            obj.props.rowSpan = 0;
                        } else if (processedRecords.has("created_at_c5") &&
                            processedRecords.get("created_at_c5").created_at !== row.created_at
                        ) {
                            // console.log("----1111------")
                            // console.log({ index, row })
                            // console.log("rowat-", row.created_at, "-proAt-", processedRecords.get("created_at_c5").created_at, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
                            // console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
                            // console.log("-----1111-----")
                            //nothing
                        } else {
                            const rowCount = dataConvert.filter((data) => {
                                return (data.created_at === row.created_at &&
                                    data.destinationAccountType === row.destinationAccountType)

                            }).length;

                            // console.log("-----2222-----")
                            // console.log({ index, row })
                            // console.log({ rowCount })

                            processedRecords.set("created_at_c5", { created_at: row.created_at, index: index });
                            processedRecords.set("destinationAccountType_c5", { destinationAccountType: row.destinationAccountType, index: index });
                            let valueAmount = {};

                            // console.log("destinationType", processedRecords.get("destinationAccountType_c5").destinationAccountType, "-rowtype-", row.destinationAccountType)
                            // console.log("rowat-", row.created_at, "-proAt-", processedRecords.get("created_at_c5").created_at, "-indexAt-", processedRecords.get("created_at_c5").index, "-indextype-", processedRecords.get("destinationAccountType_c5").index)
                            // console.log("----2222------")

                            dataConvert.forEach(item => {
                                const { created_at, destinationAccountType, amount } = item;
                                const key = `${created_at}-${destinationAccountType}`;

                                if (valueAmount[key]) {
                                    valueAmount[key] += amount;
                                } else {
                                    valueAmount[key] = amount;
                                }
                            });

                            obj.children = valueAmount[`${row.created_at}-${row.destinationAccountType}`];
                            obj.props.rowSpan = rowCount;
                        }

                        return obj;
                    }
                }
            ]
        },
        {
            title: 'Ngân hàng nạp',
            children: [
                {
                    title: `Tên ngân hàng`,
                    dataIndex: 'destinationAccountName',
                    key: 'destinationAccountName',
                },
                {
                    title: `Giá trị nạp`,
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: `Phí hệ thống`,
                    dataIndex: 'fee',
                    key: 'fee',
                },
                {
                    title: 'Tiền giao dịch',
                    render: (value) => <div>{value.amount + value.fee}</div>
                }
            ]
        }
    ]
    return (
        <div className="App">
            <Table columns={columns} dataSource={dataConvert} />
        </div>
    );
}

export default App;
