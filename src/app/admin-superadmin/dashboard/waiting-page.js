import React, { Component } from 'react';
import { Modal, message, Select } from 'antd';
import { connect } from 'react-redux';
import { API } from '../../../common/api'
import { navigate } from '../../../common/store/action'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import WaitingComponent from '../../../modules/admin-superadmin/e-certificate/waiting-list/waiting-list-component';
import ButtonDashboard from '../../../common/component/button/button-dashboard';
import ButtonEdit from '../../../common/component/button/button-edit';

const { confirm } = Modal;
const { Option } = Select;

class WaitingPage extends Component {
    state = { 
        waitingSertifikat : [],
        penandatangan : [],
        id_sertifikat:'',
        id_penandatangan : undefined,
        loading : false,
        visible : false,
    }

    componentDidMount(){
        this.getCertificateAdmin();
        this.getPenandatangan();
    }

    getCertificateAdmin=()=>{
        this.setState({loading: true})
        API.get(`/admin/sertifikat-waiting`)
        .then(res => {
            // console.log(res)
            this.setState({loading: false})
            console.log('res',res.data.data.sertifikat)
            this.setState({waitingSertifikat:res.data.data.sertifikat})
        });
    }

    getPenandatangan=()=>{
        this.setState({loading: true})
        API.get(`/admin/showpenandatangan`)
        .then(res => {
          console.log('res',res.data.data.penandatangan)
          this.setState({
            penandatangan:res.data.data.penandatangan,
            loading: false,
          })
        });
    }
    
    handlePenandatangan = (input, option) => {
        console.log('input', input, 'option', option);
        this.setState({ id_penandatangan: input })  
    }

    //function untuk modal
    showAcceptConfirm = (id_sertifikat) => {
        confirm({
            title: 'Apakah yakin untuk mengirim sertifikat ?',
            okText: 'Yes',
            okType: 'success',
            content: 
            <Select
            mode="multiple"
            optionFilterProp="children"
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={(input, option)=>this.handlePenandatangan(input,option)}
          >
            {
                this.state.penandatangan.map( data =>     
                    <Option
                    key={data.penandatangan.nama_penandatangan.toString()}
                    value={data.penandatangan.id_penandatangan}
                    >{data.penandatangan.nama_penandatangan}</Option>
                )
            }
          </Select>
            ,
            cancelText: 'No',
            onOk: () => {
               this.handleSubmit(id_sertifikat,this.state.id_penandatangan)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    //function pop up notifikasi
    showSendConfirm = (id_penandatangan_sertifikat,nama_penandatangan,instansi,jabatan) => {
        confirm({
            title: `Apakah Yakin untuk mengirim sertifikat ke ${nama_penandatangan} ${jabatan} ${instansi} ?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log(id_penandatangan_sertifikat,nama_penandatangan,instansi,jabatan)
                this.handleSubmit(id_penandatangan_sertifikat)
            },
            onCancel(){
                console.log('Cancel')
            }
        });
    }

    handleSubmit = (id_penandatangan_sertifikat) => {
        const params = {
            id_penandatangan_sertifikat : id_penandatangan_sertifikat, 
        }
        console.log('params',params)
        this.setState({loading: true})
        API.put(`/admin/send-sertifikat/${id_penandatangan_sertifikat}`)
        .then(res => {
            console.log('res',res)
            if(res.status === 200){
                message.success('Berhasil mengirim sertifikat');
                this.componentDidMount(); 
            }  
            this.setState({loading: false}) 
        });
    }

    render() { 
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                key: 'no',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Nama Event',
                dataIndex: 'nama_event',
                key: 'nama_event',
                render: text => <a>{text}</a>,
                onFilter: (value, record) => record.nama_event.indexOf(value) === 0,
                sorter: (a, b) => a.nama_event.length - b.nama_event.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nama Panitia',
                dataIndex: 'nama_panitia',
                key: 'nama_panitia',
            },
            {
                title: 'Nama Penandatangan',
                dataIndex: 'nama_penandatangan',
                key: 'nama_penandatangan',
            },
            {
                title: 'Instansi',
                dataIndex: 'instansi',
                key: 'instansi',
            },
            {
                title: 'Jabatan',
                dataIndex: 'jabatan',
                key: 'jabatan',
            },
            {
                title: 'File',
                dataIndex: 'sertifikat',
                key: 'sertifikat',
            },
            {
              title: 'Action',
              key: 'action',
              render: (data) => (
                [<ButtonEdit
                    text="Send"
                    height={20}
                    icon={faPaperPlane}
                    borderRadius="5px"
                    background="#36FF03"
                    marginRight= "20px"
                    onClick = {() => this.showSendConfirm(data.id_penandatangan_sertifikat, data.nama_penandatangan, data.instansi, data.jabatan)}
                />,
                <ButtonEdit
                    text="Detail"
                    height={20}
                    icon={faInfoCircle}
                    borderRadius="5px"
                    background="#FFA903"
                />]
              ),
            },
          ];

        const data =  this.state.waitingSertifikat.map( ({id_penandatangan_sertifikat, id_sertifikat, sertifikat,penandatangan}, index) => ({
            no : index+1,
            id_penandatangan_sertifikat : id_penandatangan_sertifikat,
            nama_event : sertifikat.event.nama_event,
            nama_penandatangan : penandatangan.nama_penandatangan,
            instansi : penandatangan.instansi,
            jabatan : penandatangan.jabatan,
            sertifikat : sertifikat.sertifikat,
            nama_panitia : sertifikat.event.panitia.nama_panitia
        }))
        return ( 
            <WaitingComponent
                navigate={this.props.navigate}
                initialData = {this.state}
                data = {data}
                columns = {columns}
            />
        );
    }
}
 
const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch => ({
    navigate,
}))();

const page = connect(mapStateToProps, mapDispatchToProps)(WaitingPage);
export default page