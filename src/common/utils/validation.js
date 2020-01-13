/**
 * @author icin
 * @since 28 Desember 2019
 */

import * as _ from 'lodash';
import React from 'react';
import { __esModule } from 'react-joyride';

export const required = (value, allvalues) => {
    if (value) {
        return null;
    }
    return 'harus diisi';
};

export const noSpecialCharacter = (value) => {
    const specialCharacter = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g;
    if (value) {
        if (!specialCharacter.test(value)) {
            return 'no special character';
        }
        return null;
    }
    return 'harus diisi';
};

export const numberRequired = (value) => {
    const numberPattern = /^\d+$/;
    if (value) {
        if (!numberPattern.test(value)) {
            return console.log('format number');
        }
        return null;
    }
    return console.log('harus diisi');
};

export const emailRequired = (value) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value) {
        if (!emailPattern.test(value)) {
            return 'format email';
        }
        return null;
    }
    return 'harus diisi';
};