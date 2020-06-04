import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Steps,message,Col,Button, Form, Menu, Icon,Dropdown } from 'antd';
import '../../../assets/css/dashboard-all/dashboard.css'
import '../../../assets/css/dashboard-all/table-style.css'
import '../../../assets/css/admin-panitia/create-event.css'

//import component
import BasicInfoPage from '../../../app/admin-panitia/component-create-event/basic-info-page'
import BiayaPage from '../../../app/admin-panitia/component-create-event/biaya-page'
import VenuePage from '../../../app/admin-panitia/component-create-event/venue-page'
import DateTimePage from '../../../app/admin-panitia/component-create-event/date-time-page'
import CertificatePage from '../../../app/admin-panitia/component-create-event/certificate-page'
// constant content
const { Content } = Layout;
const { Step } = Steps;

class CreateEventComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
      }
    
      next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
      }


    render() { 
        const { current } = this.state;
        const steps = [
            {
                title: 'Info Dasar',
                content: 
                    <BasicInfoPage
                        next={this.next}
                        prev={this.prev}
                    /> 
                ,
            },
            {
                title: 'Biaya',
                content: 
                    <BiayaPage
                        next={this.next}
                        prev={this.prev}
                    /> 
                ,
            },
            {
                title: 'Tempat',
                content: 
                    <VenuePage
                        next={this.next}
                        prev={this.prev}
                    /> 
                ,
            },
            {
                title: 'Waktu',
                content:
                    <DateTimePage
                        next={this.next}
                        prev={this.prev}
                    /> 
                ,
            },
            {
                title: 'Poster Event',
                content: 
                    <CertificatePage
                        next={this.next}
                        prev={this.prev}
                    />
                ,
            },
        ];
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
                    <Breadcrumb.Item>Dashboard Buat Event</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{minHeight: '100%',marginBottom: '2%',marginTop:'2%',}} className="background">
                    <Col lg={24} md={24} sm={24}> 
                        
                        <div className="container-active-event">
                            <Row>
                                <div className="container-title-event">
                                    <span>Buat Event</span>
                                </div>
                            </Row>
                            
                            <Row gutter={24} type="flex">
                                <div className="content-form">
                                    <Steps current={current}>
                                    {steps.map(item => (
                                        <Step key={item.title} title={item.title} />
                                    ))}
                                    </Steps>
                                    <div className="steps-content">
                                        {steps[current].content}
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Content>
        );
    }
}
 
export default CreateEventComponent;