import React, { Component } from 'react';
import { API } from '../../common/api'
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import DetailComponent from '../../modules/detail/component/detail-component';

class DetailPage extends Component {
    state = { 
        detail:[],
     }

     componentDidMount(){
        this.getDetail();
    }

    getDetail=()=>{
        API.get(`/peserta/event`)
        .then(res => {
            console.log('res',res)
            // this.setState({detail:res.data.data.event})
        });
    }

    render() { 

        const detailData =  this.state.detail.map( data => ({
            //image: require(`../../../assets/images/card-event.png`),
            date: data.detail_event.start_event,
            price: data.detail_event.audien,
            title: data.nama_event,
            place: data.detail_event.lokasi,
            

        }))

        return (
            <DetailComponent
                navigate={this.props.navigate}
                detailData = {detailData}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(DetailPage);
export default page