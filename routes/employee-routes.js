const Router = require("express")
const router = new Router()
const EmployeeController = require("../controller/employee-controller")

router.post("/create", EmployeeController.createEmployee)
router.get("/all", EmployeeController.getAllEmployees)
router.get("/:id", EmployeeController.getOneEmployee)
router.get("/airline/:id", EmployeeController.getAirlineEmployee)
router.patch("/update/:id", EmployeeController.updateEmployee)
router.patch("/salary/:id", EmployeeController.updateSalary)
router.delete("/:id", EmployeeController.deleteEmployee)

module.exports = router