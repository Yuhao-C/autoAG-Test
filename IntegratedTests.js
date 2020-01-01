import {assertEqual, assertNotEqual, post, assertAttributeExists} from './utils.js';
import { Tests } from './Tests.js';

const uploadAGURL = "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadAutograder";
const uploadSolutionURL = "https://bdi091mwm2.execute-api.us-west-1.amazonaws.com/prod/uploadSolution";

export class IntegratedTests extends Tests {

    constructor() {
        super();
        this.name = 'IntegratedTests';
        this.tests = [
            this.simpleTest,
        ];
    }

    simpleTest = async () => {
        const agResult = await post(uploadAGURL, {name: 'test'}, `import homework\n`);
        assertEqual(agResult.status, 200);
        assertAttributeExists(agResult.data.data, "homeworkId");
        const id = agResult.data.data.homeworkId;
        const solutionResult = await post(uploadSolutionURL, {homeworkId: id}, `print("Hello world!")`);
        assertEqual(solutionResult.status, 200);
        assertEqual(solutionResult.data.data.result, "Hello world!\n");
    }

}
