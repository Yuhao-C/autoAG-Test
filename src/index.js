import { UploadAutograderTests } from "./UploadAutograderTests.js";
import { UploadSolutionTests } from "./UploadSolutionTests.js";
import { IntegratedTests } from "./IntegratedTests.js";
import { ListHomeworksTests } from "./ListHomeworksTests.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const logDiv = document.getElementById("log");
window.console = {
  log: function(str) {
    var node = document.createElement("div");
    node.appendChild(document.createTextNode(str));
    logDiv.appendChild(node);
  }
};
const testData = [
  {
    instance: new UploadAutograderTests(),
  },
  {
    instance: new UploadSolutionTests(),
  },
  {
    instance: new ListHomeworksTests(),
  },
  {
    instance: new IntegratedTests(),
  }
];

const testsContainer = document.getElementById("testsContainer");
// console.log("fucl", testsContainer);
const runAllButton = document.createElement("button");
runAllButton.innerHTML = "Run All";
testsContainer.appendChild(runAllButton);
testsContainer.appendChild(document.createElement("br"));
runAllButton.addEventListener("click", () => testData.map((test) => {
  test.instance.runTests();
}));
testsContainer.appendChild(document.createElement("br"));


testData.map((test) => {
  const instance = test.instance;
  const runTestsButton = document.createElement("button");
  runTestsButton.innerHTML = instance.className;
  testsContainer.appendChild(runTestsButton);
  runTestsButton.addEventListener("click", () => instance.runTests(), false);
  testsContainer.appendChild(document.createElement("br"));

  const subTestsContainer = document.createElement("div");
  testsContainer.appendChild(subTestsContainer);
  instance.tests.map(test => {
    const button = document.createElement("button");
    button.innerHTML = test.name;
    button.addEventListener(
      "click",
      () => {
        console.log(`Testing ${instance.className} - ${test.name}:`);
        instance.getTestPromise(test.method).then(result => {
          result === 1 ? console.log("Passed.") : console.log("Failed.");
        });
      },
      false
    );
    subTestsContainer.appendChild(button);
  });
  testsContainer.appendChild(document.createElement("br"));

});

document.getElementById("clear").addEventListener(
  "click",
  () => {
    logDiv.innerHTML = "";
  },
  false
);
