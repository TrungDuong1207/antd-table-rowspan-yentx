import { Pagination, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { convertData } from '../help/convert';


function TableTest({ dataTran }) {
    const [processedRecords, setProcessedRecords] = useState(new Map());
    const [groupedData, setGroupedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    let dataConvert = convertData(dataTran);
    console.log({ dataConvert });

    useEffect(() => {
        setProcessedRecords(new Map());
    }, []);

    useEffect(() => {
        const grouped = dataConvert.reduce((result, item) => {
            const date = item.createdAt;
            result[date] = result[date] || [];
            result[date].push(item);
            return result;
        }, {});
        const groupedArray = Object.keys(grouped).map(date => ({
            date,
            items: grouped[date],
        }));
        setGroupedData(groupedArray);
    }, [dataTran]);

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

    const itemsPerPage = 10;
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedData = groupedData.slice(startIdx, endIdx);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };
    return (
        <div className="App">
            <Table
                columns={columns}
                dataSource={paginatedData.flatMap(group => group.items)}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={groupedData.length}
                showSizeChanger={false}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default TableTest;
