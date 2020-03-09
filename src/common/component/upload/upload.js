import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function TableProfile({
    onChange, name, description
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