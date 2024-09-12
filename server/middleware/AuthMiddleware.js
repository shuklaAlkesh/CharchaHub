import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    // console.log(request.cookies);
    const token = request.cookies.jwt;
    if(!token) return response.status(403).send("You are not authenticated!");
    jwt.verify(token, process.env.JWT_KEY, async (err,payload) =>{
        if(err) {
            console.error("Token verification error:", err);
            return response.status(403).send("Token is not valid!");
        }
        request.userId = payload.userId;
        next();
    });
};