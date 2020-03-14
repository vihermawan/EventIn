import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './style.css'

class LoadingNotifContainer extends Component {
    static propTypes = {
        loading_notif: PropTypes.bool.isRequired,
        className: PropTypes.string,
        style: PropTypes.shape(),
        children: PropTypes.node.isRequired,
    }

    static defaultProps = {
        className: '',
        style: {},
    }

    render(){
        const {
            loading_notif, children, className, style,
        } = this.props;
        return (
            <Spin
                spinning={loading_notif}
                size="large"
                tip="Loading..."
            >
                <div
                    className={className}
                    style={style}
                >
                    { children }
                </div>
            </Spin>
        )
    }
}

export default LoadingNotifContainer;