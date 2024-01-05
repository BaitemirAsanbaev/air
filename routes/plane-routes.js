const Router = require("express")
const router = new Router()
const PlaneController = require("../controller/plane-controller")

router.post("/create", PlaneController.createPlane)
router.get("/airline/:id", PlaneController.getAirlinePlanes)
router.get("/:id", PlaneController.getOnePlane)
router.delete("/:id", PlaneController.deletePlane)

module.exports = router