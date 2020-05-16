/**
 * @author spindyzel
 * @since 28 Desember 2019
 */

import * as _ from 'lodash';
import React from 'react';
import { __esModule } from 'react-joyride';

export const required = (value, allvalues) => {
    if (value) {
        return null;
    }
    return 'Harus diisi';
};

export const noSpecialCharacter = (value) => {
    const specialCharacter = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g;
    if (value) {
        if (!specialCharacter.test(value)) {
            return 'no special character';
        }
        return null;
    }
    return 'Harus diisi';
};

export const numberRequired = (value) => {
    const numberPattern = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;
    if (value) {
        if (!numberPattern.test(value)) {
            return 'Isi Dalam format Angka';
        }
        return null;
    }
    return 'Harus diisi';
};

export const emailRequired = (value) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value) {
        if (!emailPattern.test(value)) {
            return 'Format Harus Email';
        }
        return null;
    }
    return 'Harus diisi';
};

export const minPassword = (value) => {
    if (value) {
        if(value.length < 8){
            return "password kurang panjang"
        }
        return null;
    }
    return 'Harus diisi';
};




