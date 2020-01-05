import {
  assertEqual,
  assertNotEqual,
  post,
  assertAttributeExists
} from "./utils.js";
import { Tests } from "./Tests.js";

const URL =
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadSolution";

export class UploadSolutionTests extends Tests {
  constructor() {
    super();
    this.name = "UploadSolution";
    this.tests = [this.wrongIDTest];
  }

  wrongIDTest = async () => {
    const id = "wasup";
    const solutionResult = await post(
      URL,
      { homeworkId: id },
      `print("Hello world!")`
    );
    assertEqual(solutionResult.status, 400);
    assertAttributeExists(solutionResult.data, "error");
  };
}
