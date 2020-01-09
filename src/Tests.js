import "core-js/stable";
import "regenerator-runtime/runtime";

export class Tests {
  tests = [];
  className = "";

  getTestPromise = f => {
    return new Promise(resolve => {
      f()
        .then(() => {
          resolve(1);
        })
        .catch(e => {
          console.log(`${f.name} failed:`);
          console.log(e);
          resolve(0);
        });
    });
  };

  runTests() {
    let total = this.tests.length;
    console.log(`Running ${total} tests for ${this.className}`);
    Promise.all(this.tests.map(f => this.getTestPromise(f.method))).then(
      values => {
        const passed = values.reduce((acc, value) => acc + value, 0);
        console.log(`All tests finished. ${passed}/${total} passed.`);
      }
    );
  }
}
