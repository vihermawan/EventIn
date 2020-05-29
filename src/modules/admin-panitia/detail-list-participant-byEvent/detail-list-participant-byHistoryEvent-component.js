import React, { Component } from 'react';
import ReactExport from "react-export-excel";
import { Layout, Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
// component
import TableProfile from '../../../common/component/table/table'
import LoadingContainer from '../../../common/component/loading/loading-container'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ButtonEdit from '../../../common/component/button/button-edit';

// constant content
const { Content } = Layout;
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetailListParticipantbyHistoryEventComponent extends Component {
    render() { 
      const { initialData, columns, data } = this.props
        return ( 
            <Content
                style={{
                    margin : "5px 10px 0px 10px",
                    padding: 15,
                    minHeight: 280,
                    borderRadius: "8px",
                }}
            >
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to='/dashboard/history-event'>Dashboard History Event</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Dashboard List Participant by Event</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                                <Col lg={19} md={12} sm={12} xs={24}>
                                    <div className="container-title-event">
                                        <span>List Participant by Event</span>
                                    </div>
                                </Col>
                                <Col lg={5} md={12} sm={12} xs={24}>
                                    <div className="button-add">
                                        <ExcelFile filename="List Peserta History Event" element={
                                            <ButtonEdit
                                                    text="Download List Peserta"
                                                    height={20}
                                                    icon={faDownload}
                                                    borderRadius="5px"
                                                    background="#00C908"
                                            />}>
                                            <ExcelSheet data={data} name="Daftar Peserta">
                                                <ExcelColumn label="Nama Peserta" value="nama_peserta" />
                                                <ExcelColumn label="Email" value="email" />
                                                <ExcelColumn label="Organisasi" value="organisasi" />
                                                <ExcelColumn label="Jenis Kelamin" value="jenis_kelamin" />
                                                <ExcelColumn label="Pekerjaan" value="pekerjaan" />
                                                <ExcelColumn label="Umur" value="umur" />
                                                <ExcelColumn label="Nomor Handphone" value="telepon" />
                                            </ExcelSheet>
                                        </ExcelFile>
                                    </div>
                                </Col>
                            </Row>
                            <LoadingContainer loading={initialData.loading}>
                                <Row gutter={24} type="flex">
                                    <TableProfile 
                                        columns={columns} 
                                        dataSource={data} 
                                        className="table-active-event"
                                    />
                                </Row>
                            </LoadingContainer>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default DetailListParticipantbyHistoryEventComponent;