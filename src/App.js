import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import { convertData } from './help/convert';

const data = require('./data/data.json');
const data2 = require('./data/data2.json');
const data3 = require('./data/dataConvert3.json');

const dataConvert = convertData(data2);
console.log({ dataConvert });

// const dataConvert = data3;


function App() {
    const [processedRecords, setProcessedRecords] = useState(new Map());

    useEffect(() => {
        setProcessedRecords(new Map());
    }, []);

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            onCell: (record, index) => {
                if (processedRecords.has("created_at_c1") &&
                    processedRecords.get("created_at_c1").createdAt === record.createdAt &&
                    processedRecords.get("created_at_c1").index !== index) {
                    return { rowSpan: 0 };
                } else {
                    const rowCount = dataConvert.filter((data) => data.createdAt === record.createdAt).length;
                    processedRecords.set("created_at_c1", { createdAt: record.createdAt, index: index });

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
                            processedRecords.get("created_at_c2").createdAt === record.createdAt &&
                            processedRecords.get("created_at_c2").index !== index) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => data.createdAt === record.createdAt).length;
                            processedRecords.set("created_at_c2", { createdAt: record.createdAt, index: index });
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
                            processedRecords.get("created_at_c3").createdAt === record.createdAt &&
                            processedRecords.get("created_at_c3").index !== index) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => data.createdAt === record.createdAt).length;
                            processedRecords.set("created_at_c3", { createdAt: record.createdAt, index: index });
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
                            processedRecords.get("created_at_c4").createdAt === record.createdAt &&
                            processedRecords.get("created_at_c4").index !== index &&
                            processedRecords.has("destinationAccountType_c4") &&
                            processedRecords.get("destinationAccountType_c4").destinationAccountType === record.destinationAccountType &&
                            processedRecords.get("destinationAccountType_c4").index !== index
                        ) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => {
                                return (data.createdAt === record.createdAt &&
                                    data.destinationAccountType === record.destinationAccountType)

                            }).length;
                            processedRecords.set("created_at_c4", { createdAt: record.createdAt, index: index });
                            processedRecords.set("destinationAccountType_c4", { destinationAccountType: record.destinationAccountType, index: index });
                            return { rowSpan: rowCount };
                        }
                    },
                },
                {
                    title: `Giá trị nạp`,
                    dataIndex: 'loadValueSameMethod',
                    key: 'loadValueSameMethod',
                    onCell: (record, index) => {
                        if (processedRecords.has("created_at_c5") &&
                            processedRecords.get("created_at_c5").createdAt === record.createdAt &&
                            processedRecords.get("created_at_c5").index !== index &&
                            processedRecords.has("destinationAccountType_c5") &&
                            processedRecords.get("destinationAccountType_c5").destinationAccountType === record.destinationAccountType &&
                            processedRecords.get("destinationAccountType_c5").index !== index
                        ) {
                            return { rowSpan: 0 };
                        } else {
                            const rowCount = dataConvert.filter((data) => {
                                return (data.createdAt === record.createdAt &&
                                    data.destinationAccountType === record.destinationAccountType)

                            }).length;
                            processedRecords.set("created_at_c5", { createdAt: record.createdAt, index: index });
                            processedRecords.set("destinationAccountType_c5", { destinationAccountType: record.destinationAccountType, index: index });
                            return { rowSpan: rowCount };
                        }
                    },
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
