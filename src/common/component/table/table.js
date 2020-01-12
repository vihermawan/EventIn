import React from 'react';
import { Table } from 'antd';


function TableProfile({
    columns, dataSource, className, style,
}) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            className={className}
            style={style}
        >
        </Table>
    );
}

export default TableProfile;