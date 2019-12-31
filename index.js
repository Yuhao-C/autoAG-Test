const logDiv = document.getElementById("log");
window.console = {
    log: function (str) {
        var node = document.createElement("div");
        node.appendChild(document.createTextNode(str));
        logDiv.appendChild(node);
    }
};

import { UploadAutograderTests } from './UploadAutograderTests.js';

const uploadAutograderTests = new UploadAutograderTests();
document.getElementById('runUploadAutograderTests').addEventListener(
    'click',
    () => {
        uploadAutograderTests.runTests();
    },
    false
)

const uploadAutograderContainer = document.getElementById('uploadAutograderTestsButtons');
uploadAutograderTests.tests.map(test => {
    const button = document.createElement('button');
    button.innerHTML = test.name;
    button.addEventListener(
        'click',
        () => {
            console.log(`Testing uploadAutograderTests.${test.name}:`);

            uploadAutograderTests.getTestPromise(test).then((result) => {
                if (result === 1) {
                    console.log("Passed.");
                } else {
                    console.log(`Failed.`);
                }
            });
        },
        false
    )
    uploadAutograderContainer.appendChild(button);
});



document.getElementById('clear').addEventListener(
    'click',
    () => {
        logDiv.innerHTML = "";
    },
    false
)