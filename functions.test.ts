const {shuffleArray} = require('./utils')

//From Alec review:
let dummyArr = [1,2,3,4]

describe('shuffleArray should', () => {
    test("array length same in and out", () => {
        let returnedArray = shuffleArray(dummyArr)
        expect(returnedArray.length).toEqual(dummyArr.length)
    })
    test("shuffling should return same array contents", () => {
        let returnedArray = shuffleArray(dummyArr)
        expect(returnedArray.reduce((a,b)=>a+b, 0)).toEqual(dummyArr.reduce((a,b)=>a+b, 0))
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

