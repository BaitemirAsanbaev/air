const Router = require("express")
const router = new Router()
const AirlineController = require("../controller/airline-controller")

router.post("/create", AirlineController.createAirline)
router.get("/all", AirlineController.getAllAirlines)
router.get("/:id", AirlineController.getOneAirline)
router.put("/:id", AirlineController.updateAirline)
router.delete("/:id", AirlineController.deleteAirline)

module.exports = router