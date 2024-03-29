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


import { DeviceInfoSeqData } from './device-info-seq-data';

/**
 * 
 * @export
 * @interface DeviceInfoSeq
 */
export interface DeviceInfoSeq {
    /**
     * 
     * @type {number}
     * @memberof DeviceInfoSeq
     */
    seq: number;
    /**
     * 
     * @type {number}
     * @memberof DeviceInfoSeq
     */
    error: number;
    /**
     * 
     * @type {DeviceInfoSeqData}
     * @memberof DeviceInfoSeq
     */
    data: DeviceInfoSeqData;
}


