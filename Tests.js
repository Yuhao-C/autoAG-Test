export class Tests {
    tests = [];
    name = "";

    runTests() {
        let total = this.tests.length;
        let passed = 0;
        console.log(`Running ${total} tests for ${this.name}`)
        Promise.all(this.tests.map((f) => {
            return new Promise((resolve) => {
                f().then(() => {
                    passed += 1;
                    resolve();
                }).catch((e) => {
                    console.log(`${f.name} failed:`)
                    console.log(e);
                    resolve();
                });
            });
        })).then(() => {
            console.log(`All tests finished. ${passed}/${total} passed.`);
        });
    }
}
