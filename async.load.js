let i = 0
module.exports = () => new Promise((resolve) => {
    setTimeout(() => {
        i += 1
        resolve(`my-async-value-${i}`)
    }, 200)
})