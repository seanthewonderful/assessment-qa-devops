const {shuffleArray} = require('./utils')

//From Alec review:
let dummyArr = [1,2,3,4]

describe('shuffleArray should', () => {
    test("array length same in and out", () => {
        let returnedArray = shuffleArray(dummyArr)
        expect(returnedArray.length).toEqual(dummyArr.length)
    })
})



// describe('shuffleArray should', () => {
//     test("array length same in and out", () => {
//         expect(shuffleArray(array)).toHaveLength(array.length)
//     })
//     test("should return an array", () => {
//         expect(shuffleArray().isArray).toBe("true")
//     })
// })