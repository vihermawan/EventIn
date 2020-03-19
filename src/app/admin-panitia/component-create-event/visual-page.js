import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import { navigate } from '../../../common/store/action'
import VisualComponent from '../../../modules/admin-panitia/create-event/visual/visual-component'


class VisualPage extends Component {
    state = {
        picture_event : '',
        picture : '',
    }

    componentDidMount(){
       
    }

    componentWillMount(){
        const data = JSON.parse(localStorage.getItem('step-5', this.state));
        console.log(data)
        if(data !== null){
          this.setState({
              picture_event: data.picture_event,
              picture : data.picture,
          })
      }
    }
    onNext = () => {
      this.props.next();
      localStorage.setItem('step-5', JSON.stringify(this.state));
    }
    onPrev = () => {
      this.props.prev();
      localStorage.setItem('step-5', JSON.stringify(this.state));
    }

    getBase64 = (img, callback)  =>{
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    uploadGambar = (event) => {
      this.getBase64(event.target.files[0], imageUrl => {
          this.setState({ picture: imageUrl })
      })
      this.setState({ picture_event:event.target.files[0] })
  }

  

    render() {

        return ( 
            <VisualComponent
                initialData={this.state}
                navigate={this.props.navigate}
                onChangePhoto={this.onChangePhoto}
                beforeUpload = {this.beforeUpload}
                handleChangeFoto = {this.handleChangeFoto}
                uploadGambar={this.uploadGambar}
                onNext={this.onNext}
                onPrev={this.onPrev}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(VisualPage);
export default page