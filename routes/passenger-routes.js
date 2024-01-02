const Router = require("express")
const router = new Router()
const PassengerController = require("../controller/passenger-controller")

router.post("/create", PassengerController.createPassenger)
router.get("/all", PassengerController.getAllPassengers)
router.get("/:id", PassengerController.getOnePassenger)
router.put("/:id", PassengerController.updatePassenger)
router.delete("/:id", PassengerController.deletePassenger)

module.exports = router