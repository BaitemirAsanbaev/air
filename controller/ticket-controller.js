const db = require("../db");

class TicketController {
    async createTicket(req, res) {
        const {passengerID, flightID, seatID} = req.body;
        try {
            const newTicket = await db.query(
                'INSERT INTO ticket ("passengerID", "flightID", "seatID") VALUES ($1,$2,$3) RETURNING *',
                [passengerID, flightID, seatID]
            );
            await db.query(
                'UPDATE seat SET "isOccupied"=$1 WHERE id=$2', [true, seatID]
            )
            res.json(newTicket.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating ticket:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getFlightTickets(req, res) {
        const id = req.params.id;
        try {
            const tickets = await db.query(
                'SELECT * FROM ticket WHERE "flightID"=$1', [id]
            )
            res.status(200).json(tickets.rows)
        } catch (e) {
            console.error('Error getting tickets:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
    async getPassengerTickets(req, res) {
        const id = req.params.id;
        try {
            const tickets = await db.query(
                'SELECT * FROM ticket WHERE "passengerID"=$1', [id]
            )
            res.status(200).json(tickets.rows)
        } catch (e) {
            console.error('Error getting tickets:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
    async getOneTicket(req, res) {
        const id = req.params.id;
        try {
            const ticket = await db.query(
                'SELECT * FROM ticket WHERE id=$1', [id]
            )
            res.status(200).json(ticket.rows[0])
        } catch (e) {
            console.error('Error getting tickets:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deleteTicket(req, res) {
        const id = req.params.id;
        try {
            await db.query(
                'DELETE FROM ticket WHERE id=$1', [id]
            )
            res.status(200).json("ticket deleted successfully")
        } catch (e) {
            console.error('Error getting tickets:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new TicketController();