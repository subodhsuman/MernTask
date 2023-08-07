import User from "../model/UserModel.js";
import Reply from "../common/Reply.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto"

const UsrRegister = async (req, res) => {
    const request = req.body;

    const jwtSecret=crypto.randomBytes(35).toString("hex")
    if (request?.password?.length < 6) {
        return res.json(Reply.failed("Password less than 6 characters"))
    }

    try {
        let HashPwd = await bcrypt.hash(request?.password, 10)
        request["password"] = HashPwd;
        let UserData = await User.create(request)
        const maxAge = 3 * 60 * 60; // 3hrs in sec
        const token = jwt.sign({ id: UserData._id, username, role: UserData.role },jwtSecret,{ expiresIn: maxAge});
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        return res.json(Reply.success("User successfully created", UserData))

    } catch (err) {
        console.log(err);
        return res.json(Reply.failed("Unable to Create User!!"))

    }

}

const UsrLogin = async (req, res) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
        return res.json(Reply.failed("Username or Password not present"))
    }
    try {
        const jwtSecret=crypto.randomBytes(35).toString("hex")
        console.log(jwtSecret);
        const user = await User.findOne({ username})
        if (!user) {
            return res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            let compPwd =await bcrypt.compare(password,user?.password)
               const maxAge = 3 * 60 * 60; // 3hrs in sec

            const token = jwt.sign({ id: user._id, username, role: user.role },jwtSecret,{ expiresIn: maxAge});
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            console.log(compPwd);
            if (!compPwd) {
                return res.json(Reply.failed("Invalid password"))
            }
            if (compPwd) {
                res.status(200).json({
                    message: "Login successful",
                    user,
                    token:token
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

const UpdateRole = async (req, res) => {
    const { role, id } = req.body;
    if (!role && !id) {
        return res.json(Reply.failed("Role or ID not present"))
    }
    try {
        const UserData = await User.findById(id)
        if (UserData?.role !== "admin") {
            UserData.role = role;
            UserData.save();
            return res.json(Reply.success("Update successful", UserData));
        } else {
            res.status(400).json({ message: "User is already an Admin" });
        }


    } catch (err) {
        console.log(err);
        return res.json(Reply.failed("Unble to Update Role"))
    }

}

const Welcomepage=async (req,res)=>{
    const user=req.user;
    console.log(user,"Welcome");
   return res.status(200).send("Welcome 🙌 ");
}

export default { UsrRegister, UsrLogin, UpdateRole,Welcomepage};