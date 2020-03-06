import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import { navigate } from '../../../common/store/action'
import VisualComponent from '../../../modules/admin-panitia/create-event/visual/visual-component'


class VisualPage extends Component {
    state = {
      
    }

    componentDidMount(){
       
    }
    onNext = () => {
      this.props.next();
      localStorage.setItem('step-4', JSON.stringify(this.state));
    }
    onPrev = () => {
      this.props.prev();
    }
  
    render() {
    
        const handleUpload = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };

        return ( 
            <VisualComponent
                initialData={this.state}
                navigate={this.props.navigate}
                handleUpload={handleUpload}

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