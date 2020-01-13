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
        if(token != null)
            headers.token =  token;
        servicePoint = "/service";
            
        return  axios.post(BASE_URL+servicePoint, data, {headers: headers})
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                console.log( error );
            });
    },

    get : function (endPoint, input) {
        let headers = {};

        let token = localStorage.getItem("token");
        if(token != null)
            headers.token = token;
        
        let config = {
            headers : headers,
            params : input
        }

        return axios.get(BASE_URL+endPoint,config)
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                console.log( error );
            });      
    },

    post : function (endPoint, input) {        
        let headers = {};
        let token = localStorage.getItem("token");
        if(token != null)
            headers.token = token;

        return  axios.post(BASE_URL+endPoint, input, {headers : headers})
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                return error.response;
            });
    },

    put : function (endPoint, input) {        
        let headers = {};
        let token = localStorage.getItem("token");
        if(token != null)
            headers.token = token;

        return  axios.put(BASE_URL+endPoint, input, {headers : headers})
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                console.log( error );
            });
    },

    patch : function (endPoint, input) {        
        let headers = {};
        let token = localStorage.getItem("token");
        if(token != null)
            headers.token = token;
            
        return  axios.patch(BASE_URL+endPoint, input, {headers : headers})
            .then( ( response ) => {
                return response.data;
            })
            .catch( ( error ) => {
                console.log( error );
            });
    },

    delete : function (endPoint, input) {
        let headers = {};
        let token = localStorage.getItem("token");
        if(token != null)
            headers.token = token;
            
        let config = {
            headers : headers,
            params : input
        }
        return  axios.delete(BASE_URL+endPoint, config)
            .then( ( response ) => {
                return response.data
            })
            .catch( ( error ) => {
                return error.response.data
            });
    },
}