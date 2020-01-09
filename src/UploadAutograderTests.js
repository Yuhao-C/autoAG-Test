import {
  assertEqual,
  assertNotEqual,
  post,
  assertAttributeExists
} from "./utils.js";
import { Tests } from "./Tests.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const URL =
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadAutograder";

export class UploadAutograderTests extends Tests {
  constructor() {
    super();
    this.className = "UploadAutograder";
    this.tests = [
      { name: "No Parameter", method: this.noParamTest },
      { name: "Successful Upload", method: this.successfulUploadTest },
      { name: "Empty Body", method: this.emptyBodyTest },
      { name: "Name is Empty String", method: this.nameEmptyString },
      { name: "Name Contains Only Spaces", method: this.nameOnlySpaces }
    ];
  }

  noParamTest = async () => {
    const result = await post(URL, {}, "asdg");

    assertEqual(result.status, 400);
    assertAttributeExists(result.data, "error");
  };

  successfulUploadTest = async () => {
    const result = await post(URL, { name: "test" }, "asdg");
    assertEqual(result.status, 200);
    assertAttributeExists(result.data.data, "homeworkId");
  };

  emptyBodyTest = async () => {
    const result = await post(URL, { name: "test" }, "");
    assertNotEqual(result.status, 200);
    assertAttributeExists(result.data, "error");
  };

  nameEmptyString = async () => {
    const result = await post(URL, { name: "" }, "");
    assertNotEqual(result.status, 200);
    assertAttributeExists(result.data, "error");
  };

  nameOnlySpaces = async () => {
    const result = await post(URL, { name: "   " }, "");
    assertNotEqual(result.status, 200);
    assertAttributeExists(result.data, "error");
  };
}
