window.console = {
    log: function(str){
      var node = document.createElement("div");
      node.appendChild(document.createTextNode(str));
      document.getElementById("log").appendChild(node);
    }
  };

import {UploadAutograderTests} from './UploadAutograderTests.js';

const tests = new UploadAutograderTests();
tests.runTests();
