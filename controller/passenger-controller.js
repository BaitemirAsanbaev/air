const db = require("../db");

class PassengerController {
    async createPassenger(req, res) {
        const {firstName, lastName, passportNumber, contactInfo} = req.body;
        try {
            const newPassenger = await db.query(
                'INSERT INTO passenger (FirstName, LastName, PassportNumber, ContactInfo) VALUES ($1, $2, $3, $4) RETURNING *',
                [firstName, lastName, passportNumber, contactInfo]
            );
            res.json(newPassenger.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating passenger:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getAllPassengers(req, res) {
        try {
            const passengers = await db.query(
                'SELECT * FROM passenger'
            )
            res.status(200).json(passengers.rows)
        } catch (e) {
            console.error('Error getting passengers:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOnePassenger(req, res) {
        const id = req.params.id;
        try {
            const passenger = await db.query(
                'SELECT * FROM passenger WHERE id=$1', [id]
            )
            res.status(200).json(passenger.rows[0])
        } catch (e) {
            console.error('Error getting passengers:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async updatePassenger(req, res) {
        const id = req.params.id;
        const {firstName, lastName, passportNumber, contactInfo} = req.body;

        try {
            const passenger = await db.query(
                'UPDATE passenger SET FirstName=$1, LastName=$2, PassportNumber=$3, ContactInfo=$4 WHERE id=$5 RETURNING *',
                [firstName, lastName, passportNumber, contactInfo, id]
            )
            res.status(200).json(passenger.rows[0])
        } catch (e) {
            console.error('Error getting passengers:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deletePassenger(req, res) {
        const id = req.params.id;
        try {
            const passenger = await db.query(
                'DELETE FROM passenger WHERE id=$1', [id]
            )
            res.status(200).json("passenger deleted successfully")
        } catch (e) {
            console.error('Error getting passengers:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new PassengerController();