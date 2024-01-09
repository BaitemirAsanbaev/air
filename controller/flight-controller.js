const db = require("../db");

class FlightController {
    async createFlight(req, res) {
        const {
            flightNumber,
            planeID,
            airlineID,
            departureAirportID,
            arrivalAirportID,
            departureDate,
            arrivalDate
        } = req.body;
        try {
            const newFlight = await db.query(
                'INSERT INTO flight ("flightNumber", "planeID",  "airlineID", "departureAirportID", "arrivalAirportID", "departureDate", "arrivalDate", "isArrived") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [flightNumber, planeID, airlineID, departureAirportID, arrivalAirportID, departureDate, arrivalDate, false]
            );
            const planeType = await db.query('SELECT * FROM plane WHERE id=$1', [planeID])
            const seatsQuantity = () => {
                switch (planeType.rows[0].type) {
                    case 'jambo':
                        return {
                            business: 200,
                            econom: 400
                        };
                    case 'mid-size':
                        return {
                            business: 100,
                            econom: 250
                        };
                    case 'light':
                        return {
                            business: 25,
                            econom: 75
                        };
                    default:
                        return {
                            business: 0,
                            econom: 0
                        };
                }
            }
            for (let i = 1; i <= seatsQuantity().econom; i++) {

                await db.query('INSERT INTO seat ( "flightID", "seatNumber", class, "isOccupied") VALUES ($1, $2, $3,$4) RETURNING *',
                    [newFlight.rows[0].id, i, 'econom', false])
            }
            for (let i = 1; i <= seatsQuantity().business; i++) {
                await db.query('INSERT INTO seat ( "flightID", "seatNumber", class, "isOccupied"    ) VALUES ($1, $2, $3, $4) RETURNING *',
                    [newFlight.rows[0].id, i, 'business', false])
            }

            res.json(newFlight.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating flight:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getAllFlights(req, res) {
        try {
            const flights = await db.query(
                'SELECT * FROM flight'
            );
            res.status(200).json(flights.rows);
        } catch (e) {
            console.error('Error getting flights:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
    async getAirlineFlights(req, res) {
        const id = req.params.id;

        try {
            const flights = await db.query(
                'SELECT * FROM flight WHERE "airlineID"=$1',[id]
            );
            res.status(200).json(flights.rows);
        } catch (e) {
            console.error('Error getting flights:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOneFlight(req, res) {
        const id = req.params.id;
        try {
            const flight = await db.query(
                'SELECT * FROM flight WHERE id=$1', [id]
            );
            res.status(200).json(flight.rows[0]);
        } catch (e) {
            console.error('Error getting flight:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async arrive(req, res) {
        const id = req.params.id;

        try {
            const flight = await db.query(
                'UPDATE flight SET "isArrived"=$1 WHERE id=$2 RETURNING *', [true, id]
            );
            res.status(200).json({message: "you've arrived", flight: flight.rows[0]});
        } catch (e) {
            console.error('Error updating flight:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deleteFlight(req, res) {
        const id = req.params.id;
        try {
            await db.query(
                'DELETE FROM flight WHERE id=$1', [id]
            );
            res.status(200).json("Flight deleted successfully");
        } catch (e) {
            console.error('Error deleting flight:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

module.exports = new FlightController();
