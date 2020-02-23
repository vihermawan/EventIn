import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './style.css'

class LoadingContainer extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
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
            loading, children, className, style,
        } = this.props;
        return (
            <Spin
                spinning={loading}
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

export default LoadingContainer;