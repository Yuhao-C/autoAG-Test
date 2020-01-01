const logDiv = document.getElementById("log");
window.console = {
    log: function (str) {
        var node = document.createElement("div");
        node.appendChild(document.createTextNode(str));
        logDiv.appendChild(node);
    }
};

//////////////////////BEGIN UploadAutograderTests//////////////////////////
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
////////////////////////////////////////////////


/////////////////////BEGIN integratedTests///////////////////////////

import { IntegratedTests } from './IntegratedTests.js';

const integratedTests = new IntegratedTests();
document.getElementById('runIntegratedTests').addEventListener(
    'click',
    () => {
        integratedTests.runTests();
    },
    false
)

const integratedContainer = document.getElementById('integratedTestsButtons');
integratedTests.tests.map(test => {
    const button = document.createElement('button');
    button.innerHTML = test.name;
    button.addEventListener(
        'click',
        () => {
            console.log(`Testing IntegratedTests.${test.name}:`);

            integratedTests.getTestPromise(test).then((result) => {
                if (result === 1) {
                    console.log("Passed.");
                } else {
                    console.log(`Failed.`);
                }
            });
        },
        false
    )
    integratedContainer.appendChild(button);
});
////////////////////////////////////////////////


document.getElementById('clear').addEventListener(
    'click',
    () => {
        logDiv.innerHTML = "";
    },
    false
)