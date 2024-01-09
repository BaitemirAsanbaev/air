const db = require("../db");
const types = ['jambo', 'mid-size', 'light'];
class PlaneController {
    async createPlane(req, res) {
        const {name, type, airlineID} = req.body;
        if(!types.includes(type)){
            res.status(400).json("wrong plane type")
            return
        }
        try {
            const newPlane = await db.query(
                'INSERT INTO plane (name, type, "airlineID") VALUES ($1, $2, $3) RETURNING *',
                [name, type, airlineID]
            );
            res.json(newPlane.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating plane:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getAirlinePlanes(req, res) {
        const airlineID = req.params.id;
        try {
            const planes = await db.query(
                'SELECT * FROM plane where "airlineID"=$1', [airlineID]
            )
            res.status(200).json(planes.rows)
        } catch (e) {
            console.error('Error getting planes:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOnePlane(req, res) {
        const id = req.params.id;
        try {
            const plane = await db.query(
                'SELECT * FROM plane WHERE id=$1', [id]
            )
            res.status(200).json(plane.rows[0])
        } catch (e) {
            console.error('Error getting planes:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async deletePlane(req, res) {
        const id = req.params.id;
        try {
            await db.query(
                'DELETE FROM plane WHERE id=$1', [id]
            )
            res.status(200).json("plane deleted successfully")
        } catch (e) {
            console.error('Error getting planes:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new PlaneController();