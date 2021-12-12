export const arePosArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false

    let areEqual = true

    

    arr1.forEach(item => {
        if (!arr2.includes(item)) areEqual = false
    })

    console.log('Result', areEqual)

    return areEqual
}