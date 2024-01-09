const Router = require("express")
const router = new Router()
const TicketController = require("../controller/ticket-controller")

router.post("/create", TicketController.createTicket)
router.get("/flight/:id", TicketController.getFlightTickets)
router.get("/:id", TicketController.getOneTicket)
router.get("/passenger/:id", TicketController.getPassengerTickets)
router.delete("/:id", TicketController.deleteTicket)

module.exports = router