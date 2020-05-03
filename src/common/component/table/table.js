import React from 'react';
import { Table } from 'antd';
import '../table/style.css'

function TableProfile({
    columns, dataSource, className, style,onChange,rowSelection,scroll
}) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            className={className}
            style={style}
            scroll = {{scroll}}
        >
        </Table>
    );
}

export default TableProfile;