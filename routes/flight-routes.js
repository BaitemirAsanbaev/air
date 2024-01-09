const Router = require("express")
const router = new Router()
const FlightController = require("../controller/flight-controller")

router.post("/create", FlightController.createFlight)
router.get("/all", FlightController.getAllFlights)
router.get("/airline/:id", FlightController.getAirlineFlights)
router.get("/:id", FlightController.getOneFlight)
router.patch("/:id", FlightController.arrive)
router.delete("/:id", FlightController.deleteFlight)

module.exports = router