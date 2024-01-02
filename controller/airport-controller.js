const db = require("../db");

class AirportController {
    async createAirport(req, res) {
        const {name, city, country} = req.body;
        try {
            const newAirport = await db.query(
                'INSERT INTO airport (name, city, country) VALUES ($1, $2, $3) RETURNING *',
                [name, city, country]
            );
            res.json(newAirport.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating airport:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getAllAirports(req, res) {
        try {
            const airports = await db.query(
                'SELECT * FROM airport'
            )
            res.status(200).json(airports.rows)
        } catch (e) {
            console.error('Error getting airports:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOneAirport(req, res) {
        const id = req.params.id;
        try {
            const airport = await db.query(
                'SELECT * FROM airport WHERE id=$1', [id]
            )
            res.status(200).json(airport.rows[0])
        } catch (e) {
            console.error('Error getting airports:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async updateAirport(req, res) {
        const id = req.params.id;
        const {name, city, country} = req.body;

        try {
            const airport = await db.query(
                'UPDATE airport SET name=$1, city=$2, country=$3 WHERE id=$4 RETURNING *', [name, city, country, id]
            )
            res.status(200).json(airport.rows[0])
        } catch (e) {
            console.error('Error getting airports:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deleteAirport(req, res) {
        const id = req.params.id;
        try {
            const airport = await db.query(
                'DELETE FROM airport WHERE id=$1', [id]
            )
            res.status(200).json("airport deleted successfully")
        } catch (e) {
            console.error('Error getting airports:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new AirportController();