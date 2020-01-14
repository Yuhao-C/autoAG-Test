import {
  assertEqual,
  assertNotEqual,
  post,
  assertAttributeExists
} from "./utils.js";
import { Tests } from "./Tests.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const uploadAGURL =
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadAutograder";
const uploadSolutionURL =
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadSolution";

const getSkeletonURL =
  "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/getSkeleton";

const listHomeworksURL = "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/listHomeworks";

export class IntegratedTests extends Tests {
  constructor() {
    super();
    this.className = "IntegratedTests";
    this.tests = [{ name: "Simple Test", method: this.simpleTest }];
  }

  simpleTest = async () => {
    const agResult = await post(
      uploadAGURL,
      { name: "test" },
      {agCode: "import homework\n", hwCode: "print(\"Hello, world\")"}
    );
    assertEqual(agResult.status, 200);
    assertAttributeExists(agResult.data.data, "homeworkId");
    const id = agResult.data.data.homeworkId;
    const skeletonResult = await post(
      getSkeletonURL,
      { homeworkId: id }
    );
    assertEqual(skeletonResult.status, 200);
    assertAttributeExists(skeletonResult.data.data, "skeletonCode");
    const skeletonCode = skeletonResult.data.data.skeletonCode;
    const solutionResult = await post(
      uploadSolutionURL,
      { homeworkId: id },
      skeletonCode
    );
    assertEqual(solutionResult.status, 200);
    assertEqual(solutionResult.data.data.result, "Hello, world\n");
    const listResult = await post(
      listHomeworksURL,
      { homeworkId: id, perPage: 1, currPage: 1 },
    )
    assertEqual(listResult.status, 200);
    assertEqual(listResult.data.content.length, 1);
    assertEqual(listResult.data.content[0].homeworkId, id);
  };
}
