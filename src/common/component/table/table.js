import React from 'react';
import { Table } from 'antd';
import '../table/style.css'

function TableProfile({
    columns, dataSource, className, style,onChange,rowSelection
}) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            rowSelection = {rowSelection}
            className={className}
            style={style}
            onChange={onChange}
        >
        </Table>
    );
}

export default TableProfile;