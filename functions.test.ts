const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    test("array length same in and out", () => {
        expect(shuffleArray(array)).toHaveLength(array.length)
    })
    test("should return an array", () => {
        expect(shuffleArray().isArray).toBe("true")
    })
})