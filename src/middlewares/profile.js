import { verify } from "jsonwebtoken";
import config from "../config/config";

export default function profileHandler(req, res) {
    const {myTokenName} = req.cookies

    const user = verify(myTokenName, config.SECRET)
    console.log(user)

    return res.json({
        user: 'kk'
    })
}