export class Tests {
  tests = [];
  name = "";

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
    console.log(`Running ${total} tests for ${this.name}`);
    Promise.all(this.tests.map(f => this.getTestPromise(f))).then(values => {
      const passed = values.reduce((acc, value) => acc + value, 0);
      console.log(`All tests finished. ${passed}/${total} passed.`);
    });
  }
}
