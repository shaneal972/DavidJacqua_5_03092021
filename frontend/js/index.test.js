const rewire = require("rewire")
const index = rewire("./index")
const getTeddies = index.__get__("getTeddies")
// @ponicode
describe("getTeddies", () => {
    test("0", async () => {
        await getTeddies()
    })
})
