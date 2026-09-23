import express from "express"
import Employee from "../models/Employee.js"
import jwt from "jsonwebtoken"



const createEmployee = async (req, res) => {
    try{
        const{username, email, password, confirmpassword } = req.body;
        let exist = await Employee.findOne({email})
        if(exist){
            return res.status(409).json({field:"email", message:"Email already exists"})
        }
        if(confirmpassword !== password){
            return res.status(400).json({field:"confirmpassword", message:"Passwords do not match"})
        }
        const employee = new Employee({
            username,
            email,
            password,
            confirmpassword
        })
        await employee.save()
        res.status(201).json({Message:"Registration successful"})
    }
    catch(error){
        console.log(`There is an error ${error}`)
        res.status(500).json({message:"Server Error"})
    }
}
const employeeLogin = async (req, res) => {
    try{
        const{email, password} = req.body
        let exist = await Employee.findOne({email})
        if(!exist){
            return res.status(404).json({field:"email", message:"Email not found"})
        }
        if(exist.password !== password){
            return res.status(401).json({field:"password", message:"Invalid password"})
        }
        const payload = {
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:3600000}, (err, token) => {
            if(err) throw err
            return res.json({token})
        })
    }
    catch(error){
        console.log(`There is an error ${error}`)
        res.status(500).json({message:"Server Error"})
    }
}
    const employeeProfile = async (req, res) => {
        try{
            let exist = await Employee.findById(req.user.id)
            if(!exist){
                return res.status(404).json({Message:"user not found"})
            }
            res.json(exist)
        }
        catch(error){
        console.log(`There is an error ${error}`)
        res.status(500).json({message:"Server Error"})
    }
}
const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find()
        res.status(201).json(employees)
    }
    catch(error){
        console.log(`There is an error ${error}`)
        res.status(500).json({message:"Server Error"})
    }
}

export default {createEmployee, employeeLogin, employeeProfile, getEmployees}