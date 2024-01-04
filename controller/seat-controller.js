const db = require("../db");

class SeatController {
    async createSeat({seatNumber, classType}) {
        try {
            await db.query(
                'INSERT INTO seat ( seatnumber, class, isoccupied) VALUES ($1, $2, $3) RETURNING *',
                [seatNumber, classType, false]
            );

        } catch (e) {
            console.error('Error creating seat:', e);
        }
    }


    async getAllSeats(req, res) {
        try {
            const seats = await db.query(
                'SELECT * FROM seat'
            )
            res.status(200).json(seats.rows)
        } catch (e) {
            console.error('Error getting seats:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOneSeat(req, res) {
        const id = req.params.id;
        try {
            const seat = await db.query(
                'SELECT * FROM seat WHERE id=$1', [id]
            )
            res.status(200).json(seat.rows[0])
        } catch (e) {
            console.error('Error getting seats:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new SeatController();