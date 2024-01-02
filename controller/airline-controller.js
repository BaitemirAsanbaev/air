const db = require("../db");

class AirlineController {
    async createAirline(req, res) {
        const {name} = req.body;
        try {
            const newAirline = await db.query(
                'INSERT INTO airline (name) VALUES ($1) RETURNING *',
                [name]
            );
            res.json(newAirline.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating airline:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getAllAirlines(req, res) {
        try {
            const airlines = await db.query(
                'SELECT * FROM airline'
            )
            res.status(200).json(airlines.rows)
        } catch (e) {
            console.error('Error getting airlines:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOneAirline(req, res) {
        const id = req.params.id;
        try {
            const airline = await db.query(
                'SELECT * FROM airline WHERE id=$1', [id]
            )
            res.status(200).json(airline.rows[0])
        } catch (e) {
            console.error('Error getting airlines:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async updateAirline(req, res) {
        const id = req.params.id;
        const {name} = req.body;

        try {
            const airline = await db.query(
                'UPDATE airline SET name=$1 WHERE id=$2 RETURNING *', [name, id]
            )
            res.status(200).json(airline.rows[0])
        } catch (e) {
            console.error('Error getting airlines:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deleteAirline(req, res) {
        const id = req.params.id;
        try {
            const airline = await db.query(
                'DELETE FROM airline WHERE id=$1', [id]
            )
            res.status(200).json("airline deleted successfully")
        } catch (e) {
            console.error('Error getting airlines:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new AirlineController();