const express = require("express")
const cors = require("cors")
const passengerRouter = require('./routes/passenger-routes')
const airlineRouter = require('./routes/airline-routes')
const airportRouter = require('./routes/airport-routes')
const flightRouter = require('./routes/flight-routes')
const seatRoutes = require('./routes/seat-routes')
const planeRoutes = require('./routes/plane-routes')
const ticketRoutes = require('./routes/ticket-routes')
const employeeRoutes = require('./routes/employee-routes')

const app = express();
app.use(cors({
    credentials:true,
    origins: ['*', "http://localhost:3000"]
}))
app.use(express.json())
app.use("/api/passenger", passengerRouter);
app.use("/api/airline", airlineRouter);
app.use("/api/airport", airportRouter);
app.use("/api/flight", flightRouter);
app.use("/api/seat", seatRoutes);
app.use("/api/plane", planeRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/employee", employeeRoutes);


const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log("Running on port ",  PORT)
})