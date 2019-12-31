import {assertEqual, assertNotEqual, post, assertAttributeExists} from './utils.js';
import { Tests } from './Tests.js';

const URL = "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadAutograder";

export class UploadAutograderTests extends Tests {

    constructor() {
        super();
        this.name = 'UploadAutograder';
        this.tests = [
            this.noParamTest,
            this.successfulUploadTest,
            this.emptyBody,
            this.nameEmptyString,
            this.nameOnlySpaces,
        ];
    }

    noParamTest = async () => {
        const result = await post(URL, {}, "asdg");

        assertEqual(result.status, 400);
        assertAttributeExists(result.data, "error");
    }

    successfulUploadTest = async () => {
        const result = await post(URL, {name: "test"}, "asdg");
        assertEqual(result.status, 200);
        assertAttributeExists(result.data.data, "homeworkId");
    }

    emptyBody = async () => {
        const result = await post(URL, {name: "test"}, "");
        assertNotEqual(result.status, 200);
        assertAttributeExists(result.data, "error");
    }

    nameEmptyString = async () => {
        const result = await post(URL, {name: ""}, "");
        assertNotEqual(result.status, 200);
        assertAttributeExists(result.data, "error");
    }

    nameOnlySpaces = async () => {
        const result = await post(URL, {name: "   "}, "");
        assertNotEqual(result.status, 200);
        assertAttributeExists(result.data, "error");
    }
}
