import React, { Component } from 'react';
import { API } from '../../common/api'
import { Modal, message} from 'antd'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import DetailComponent from '../../modules/detail/component/detail-component';

const { confirm } = Modal;

class DetailPage extends Component {
    state = { 
        Event: [],
        kategori : [],
        detailEvent : [],
        status : [],
        loading: false,
        visible: false,
        confirmLoading: false,
    }

    componentDidMount(){
        this.getDetail(this.props.idEvent);
        console.log('id event',this.props.idEvent)
    }

    getDetail=(id)=>{
        this.setState({loading: true})
        API.get(`/peserta/event/${id}`)
        .then(res => {
            console.log('res',res.data.data.event.kategori)
            this.setState({
                Event:res.data.data.event,
                kategori : res.data.data.event.kategori,
                detailEvent : res.data.data.event.detail_event,
                status : res.data.data.event.status_biaya,
                loading: false,
            })
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleOk = e => {
        e.preventDefault();
        const params = {
            id_event: this.props.idEvent,  
        }
        console.log('params',params)
        API.post(`/peserta/pesertaevent`,params)
        .then(res => {
            console.log('res',res)
            if(res.status == 201){
                this.setState({
                    visible:false,
                })
                message.success('This is a success message');
                this.componentDidMount(); 
            }   
        });
    };
    
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    //daftar event
    registerEvent = (id) => {
        console.log(id)
       
    }

    render() { 

        return (
            <DetailComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                showModal = {this.showModal}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
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