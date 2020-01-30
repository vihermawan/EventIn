import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../common/store/action'
import { API } from '../../common/api'
import PilihanComponent from '../../modules/pilihan/component/pilihan-component';

class PilihanPage extends Component {
    state = {  }

    componentDidMount(){
        API.get(`/annual`)
        .then((response) => {
            console.log(response)
        },(error) => {
                console.log(error)
            },
        );
    }

    render() { 
        return ( 
            <PilihanComponent
                navigate={this.props.navigate}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(PilihanPage);
export default page