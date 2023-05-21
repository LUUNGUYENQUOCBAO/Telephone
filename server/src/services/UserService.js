const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const { ulid } = require('ulid');
const jwt = require('jsonwebtoken');
module.exports = {
    createUser: (newUser) => {
        return new Promise(async (resolve, reject) => {
            const { name, email, password, confirmpassword, phone } = newUser;
            try {
                const checkUser = await User.findOne({ email: email })
                if (checkUser !== null) {
                    resolve({
                        status: 'ERR',
                        message: 'Email already exists'
                    })
                }
                // var hash = bcrypt.hashSync(password, 10);
                // console.log('hash',hash);
                const id = newUser.id = ulid()
                const createUser = await User.create({
                    id,
                    name,
                    email,
                    password: bcrypt.hashSync(newUser.password, 10),
                    phone
                })
                if (createUser) {
                    resolve({
                        status: 'OKEEEE',
                        message: 'Created successfully',
                        data: createUser
                    })
                }

            } catch (e) {
                reject(e);
            }
        })
    },
    loginUser: (userLogin) => {
        return new Promise(async (resolve, reject) => {
            const { email, password } = userLogin;
            try {
                const checkUser = await User.findOne({ email: email })
                if (checkUser === null) {
                    resolve({
                        status: 'ERR',
                        message: 'User is nor defined',
                    })
                }
                const comparePassword = bcrypt.compareSync(password, checkUser.password)
                if (!comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Password is incorrect',
                    })
                }
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                resolve({
                    status: 'OKEEEE',
                    message: 'Login successfully',
                    access_token,
                    refresh_token
                    // tra ve token thay vi toan bo data cua nguowi login

                })
            } catch (e) {
                reject(e);
            }
        })
    },
    updateUser: (id,data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id
                })

                if (checkUser === null) {
                    resolve({
                        status: 'ERR',
                        message: 'User is nor defined',
                    })
                }
                const updateUser = await User.findOneAndUpdate(id,data)
                resolve({
                    status: 'OKEEEE',
                    message: 'update successfully',
                    data: updateUser
                })
            } catch (e) {
                reject(e);
            }
        })
    },
    deleteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id,
                })

                if (checkUser === null) {
                    resolve({
                        status: 'ERR',
                        message: 'User is nor defined',
                    })
                }
                await User.findOneAndDelete(id)
                resolve({
                    status: 'OKEEEE',
                    message: 'Delete successfully'
                })
            } catch (e) {
                reject(e);
            }
        })
    },
    getallUsers: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const allUser = await User.find()
                resolve({
                    status: 'OKEEEE',
                    message: 'Get All successfully',
                    data:allUser
                })
            } catch (e) {
                reject(e);
            }
        })
    },
    getdetailUsers: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = await User.findOne({
                    _id: id,
                })
                console.log("user",checkUser)
                if (checkUser === null) {
                    resolve({
                        status: 'ERR',
                        message: 'User is nor defined',
                    })
                }
                resolve({
                    status: 'OKEEEE',
                    message: 'get detail successfully',
                    data: checkUser
                })
            } catch (e) {
                reject(e);
            }
        })
    },
    
}