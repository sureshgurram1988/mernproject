import express from "express"
import employeeController from "../controllers/employeeController.js"
import verifyToken from "../middleware.js"

const router = express.Router()

router.post('/add-emp', employeeController.createEmployee)
router.post("/login", employeeController.employeeLogin)
router.get("/myprofile", verifyToken, employeeController.employeeProfile)
router.get("/allemployees", employeeController.getEmployees)

export default router