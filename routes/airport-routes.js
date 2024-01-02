const Router = require("express")
const router = new Router()
const AirportController = require("../controller/airport-controller")

router.post("/create", AirportController.createAirport)
router.get("/all", AirportController.getAllAirports)
router.get("/:id", AirportController.getOneAirport)
router.put("/:id", AirportController.updateAirport)
router.delete("/:id", AirportController.deleteAirport)

module.exports = router