import React from 'react';
import { Table } from 'antd';
import '../table/style.css'

function TableProfile({
    columns, dataSource, className, style,onChange
}) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            className={className}
            style={style}
            onChange={onChange}
        >
        </Table>
    );
}

export default TableProfile;