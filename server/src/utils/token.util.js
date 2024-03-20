import jwt from "jsonwebtoken";

function createToken(data){
    const token=jwt.sign(
        data,
        process.env.SECRET,{
            expiresIn: 60 * 60 * 7
        }
    )
    return token
}
function verifyToken(headers) {
    const token = headers.token;

    if (token) {
        try {
            // Verifying token and returning decoded data
            const data = JsonWebTokenError.verify(token, process.env.SECRET); // Assuming JWT_SECRET is your secret key
            return data;
        } catch (error) {
            // If verification fails, throw an error
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            throw err;
        }
    } else {
        // If token is not provided, throw an error
        const err = new Error("Token not provided");
        err.statusCode = 401;
        throw err;
    }
}


export {createToken,verifyToken}