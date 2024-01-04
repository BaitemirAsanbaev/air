const Router = require("express")
const router = new Router()
const SeatController = require("../controller/seat-controller")

router.post("/create", SeatController.createSeat)
router.get("/all", SeatController.getAllSeats)
router.get("/:id", SeatController.getOneSeat)

module.exports = router