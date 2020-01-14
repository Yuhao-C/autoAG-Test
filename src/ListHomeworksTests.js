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
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/listHomeworks";

export class ListHomeworksTests extends Tests {
  constructor() {
    super();
    this.className = "ListHomeworks";
    this.tests = [{ name: "Wrong Param 1", method: this.wrongParam1 }];
  }

  // No perPage param
  wrongParam1 = async () => {
    const solutionResult = await post(
      URL,
      { currPage: 1 },
    );
    assertNotEqual(solutionResult.status, 200);
    assertAttributeExists(solutionResult.data, "error");
  };
}
