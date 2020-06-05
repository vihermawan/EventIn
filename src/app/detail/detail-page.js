import React, { Component } from 'react';
import { API } from '../../common/api'
import { Modal, message,notification} from 'antd'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import DetailComponent from '../../modules/detail/component/detail-component';

class DetailPage extends Component {
    state = { 
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        loading: false,
        loadingHome : false,
        visible: false,
        confirmLoading: false,
        visible_close : false,
    }

    openNotification = (message, description) => {
        notification.error({
            message,
            description,
        });
    };

    componentDidMount(){
        window.scrollTo(0, 0);
        this.getDetail(this.props.idEvent);
    }

    getDetail=(id)=>{
        this.setState({loadingHome: true})
        API.get(`/peserta/event/${id}`)
        .then(res => {
            console.log(res)
            this.setState({
                Event:res.data.data.event,
                kategori : res.data.data.event.kategori,
                detailEvent : res.data.data.event.detail_event,
                status : res.data.data.event.status_biaya,
                loadingHome: false,
            })
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModalClose = () => {
        this.setState({
            visible_close: true,
        });
    };

    onStartLoadingHome = () =>  this.setState({ loadingHome: true })
    onFinishLoadingHome = () =>  this.setState({ loadingHome: false })
    
    handleOk = e => {
        e.preventDefault();
        const params = {
            id_event: this.props.idEvent,  
        }
        API.post(`/peserta/pesertaevent`,params)
        .then(res => {
            if(res.status === 201){
                this.setState({
                    visible:false,
                    loading : true,
                })
                message.success('Berhasil Melakukan Pendaftaran');
                this.componentDidMount(); 
            }else if(res.data.status === "Register"){
                this.setState({visible:false})
                this.openNotification('Anda Telah Terdaftar', res.data.messages)
            }   
        });
    };
    
    handleCancel = () => {
        this.setState({
            visible: false,
            visible_close: false,
        });
    };

    //daftar event
    handleOkClose = () => {
        this.setState({
            visible_close: false,
        });
    }

    render() { 
        return (
            <DetailComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                showModal = {this.showModal}
                showModalClose = {this.showModalClose}
                handleOkClose = {this.handleOkClose}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                onStartLoadingHome ={this.onStartLoadingHome}
                onFinishLoadingHome = {this.onFinishLoadingHome}
            />
        );
    }
}
 
const mapStateToProps = state => ({
     ...state.activeEvent,
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPage);
export default page