const { db } = require("../Repositories/database");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { response } = require("../base");

class Users {

    constructor(username, password, salt){
        this.username = username;
        this.password = password;
        this.salt = salt;
    }

    // Register Account
    async store(){
        const checkData = await db.users.findOne({ username: this.username });
        if(checkData){
            return await response(false, "Đã có tài khoản này");
        }
        const data = await db.users.insertOne({
            "username": this.username,
            "password": this.password,
            "salt": this.salt,
        });
        if(data){
            return await response(true);
        }
        return await response(false);
    }

    // Login
    async login(){
        const data = await db.users.findOne({ username: this.username });
        if(!data){
            return response(false, "Không tìm thấy tài khoản");
        }
        return response(true, data);
    }

    // Get Password If Forget
    async getPassword(){

    }

    // Create Token
    createToken(){

        const token = jwt.sign(
            {
                username: this.username,
            },
            "PRIVATE_KEY",
            {
                expiresIn: '24h',
            }
        );

        return token;
    }

    // Return Password Hash
    hashPassword(){
        const salt = crypto.randomBytes(128).toString("base64");
        const hashedPassword = crypto.pbkdf2Sync(this.password, salt, 10000, 256, "sha512");
        this.salt = salt;
        this.password = hashedPassword.toString("hex");
    }

    // Verify Password With Input Password
    verifyPassword(password, data){
        const hashedPassword = crypto.pbkdf2Sync(password, data['salt'], 10000, 256, "sha512");
        return hashedPassword.toString("hex") == data['password'];
    }

}

module.exports = Users;