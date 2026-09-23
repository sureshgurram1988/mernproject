import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"]
        if(!authHeader){
            return res.status(404).json({Message:"Auth header not found"})
        }
        const token = authHeader.split(" ")[1]
        if(!token){
            return res.status(404).json({Message:"Token not found"})
        }
        let decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode.user
            next()
    }
    catch(error){
        console.log(error)
        res.status(500).json({Message:"server Error"})
    }
}
export default verifyToken