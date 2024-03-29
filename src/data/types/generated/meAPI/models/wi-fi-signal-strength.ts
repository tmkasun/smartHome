/* tslint:disable */
/* eslint-disable */
/**
 * Knnect Home REST API
 * REST API to interact with SMART HOME services 
 *
 * The version of the OpenAPI document: 1.0
 * Contact: tmkasun@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { WiFiSignalStrengthData } from './wi-fi-signal-strength-data';

/**
 * 
 * @export
 * @interface WiFiSignalStrength
 */
export interface WiFiSignalStrength {
    /**
     * 
     * @type {number}
     * @memberof WiFiSignalStrength
     */
    seq: number;
    /**
     * 
     * @type {number}
     * @memberof WiFiSignalStrength
     */
    error: number;
    /**
     * 
     * @type {WiFiSignalStrengthData}
     * @memberof WiFiSignalStrength
     */
    data: WiFiSignalStrengthData;
}


