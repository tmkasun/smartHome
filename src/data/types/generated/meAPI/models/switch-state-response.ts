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


import { SwitchStateResponseData } from './switch-state-response-data';

/**
 * Payload schema for toggling switch state On or Off
 * @export
 * @interface SwitchStateResponse
 */
export interface SwitchStateResponse {
    /**
     * 
     * @type {string}
     * @memberof SwitchStateResponse
     */
    deviceid: string;
    /**
     * 
     * @type {SwitchStateResponseData}
     * @memberof SwitchStateResponse
     */
    data: SwitchStateResponseData;
}


