/**
 * @author spindyzel
 * @since 28 Desember 2019
*/

import axios from 'axios';
import { BASE_URL } from './initOptions.properties';

export const API = {

    call : function(serviceName, input) {
        let data = {
            service_name : serviceName,
            payload : input
        };

        let servicePoint = "/service/guest";
        let headers = {};
        let token = localStorage.getItem("token");
        if(token !== null)
            headers.token =  token;
        servicePoint = "/service";
            
        return axios.post(BASE_URL+servicePoint, data, {headers: headers})
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                return error.data;
                console.log( error.data );
            });
    },

    get : function (endPoint, input) {
        let headers = {};

        let token = localStorage.getItem("token");
        // console.log('token', token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;
        
            // console.log(headers.Authorization)
        let config = {
            headers : headers,
            params : input
        }

        return axios.get(BASE_URL+endPoint,config)
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                return error.response
            });      
    },

    post : function (endPoint, input) {        
        let headers = {};
        let token = localStorage.getItem("token");
        // console.log(token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;

        return  axios.post(BASE_URL+endPoint, input, {headers : headers})
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                // console.log(error.message)
                return error.response;
            });
    },

    postEdit : function (endPoint, input) {        
        let headers = {
            'Content-Type': 'multipart/form-data',
        };
        let token = localStorage.getItem("token");
        // console.log(token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;

        return  axios.post(BASE_URL+endPoint, input, {headers : headers})
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                return error.response;
            });
    },

    put : function (endPoint, input) {
        let headers = {};

        let token = localStorage.getItem("token");
        // console.log('token', token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;
        
            // console.log(headers.Authorization)
        let config = {
            headers : headers,
            params : input
        }

        return axios.put(BASE_URL+endPoint,input,config)
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                return error.response
            });      
    }, 

    putWord : function (endPoint, input) {
        let headers = {
            'Content-Type': 'multipart/form-data'
        };

        let token = localStorage.getItem("token");
        // console.log('token', token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;
        
            // console.log(headers.Authorization)
        let config = {
            headers : headers,
            params : input
        }

        return axios.put(BASE_URL+endPoint,input,config)
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                return error
            });      
    }, 

    patch : function (endPoint, input) {
        return axios.patch(BASE_URL+endPoint)
        .then( (res) => {
            return res
        })
        .catch( (err) => {
            return err
        })
    }, 

    delete : function (endPoint, input) {
        let headers = {};

        let token = localStorage.getItem("token");
        // console.log('token', token)
        if(token !== null)
            headers.Authorization = `Bearer ${token}`;
        
            // console.log(headers.Authorization)
        let config = {
            headers : headers,
            params : input
        }

        return axios.delete(BASE_URL+endPoint,config)
            .then( ( response ) => {
                return response;
            })
            .catch( ( error ) => {
                return error.response
            });      
    },
}