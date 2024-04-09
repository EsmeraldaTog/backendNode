import has8charUtil from "../utils/has8Char.js"


const has8char = (req, res, next) => {
try {
    const { password } =req.body
    has8charUtil(password)
    return next()


} catch (error) {
    return next(error)
    
}

}




export default has8char