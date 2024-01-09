const db = require("../db");

class EmployeeController {
    async createEmployee(req, res) {
        const {firstName, lastName, salary, airlineID} = req.body;
        try {
            const newEmployee = await db.query(
                'INSERT INTO employee ("firstName", "lastName", "hireDate", salary, "airlineID") VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [firstName, lastName, new Date(Date.now()), salary, airlineID]
            );
            res.json(newEmployee.rows[0]); // Assuming you want to send the inserted row back in the response
        } catch (e) {
            console.error('Error creating employee:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }


    async getAllEmployees(req, res) {
        try {
            const employees = await db.query(
                'SELECT * FROM employee'
            )
            res.status(200).json(employees.rows)
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getOneEmployee(req, res) {
        const id = req.params.id;
        try {
            const employee = await db.query(
                'SELECT * FROM employee WHERE id=$1', [id]
            )
            res.status(200).json(employee.rows[0])
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getAirlineEmployee(req, res) {
        const id = req.params.id;
        try {
            const employee = await db.query(
                'SELECT * FROM employee WHERE "airlineID"=$1', [id]
            )
            res.status(200).json(employee.rows)
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async updateEmployee(req, res) {
        const id = req.params.id;
        const {firstName, lastName} = req.body;

        try {
            const employee = await db.query(
                'UPDATE employee SET "firstName"=$1, "lastName"=$2   WHERE id=$3 RETURNING *',
                [firstName, lastName, id]
            )
            res.status(200).json(employee.rows[0])
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
    async updateSalary(req, res) {
        const id = req.params.id;
        const {salary} = req.body;

        try {
            const employee = await db.query(
                'UPDATE employee SET salary=$1 WHERE id=$2 RETURNING *',
                [salary, id]
            )
            res.status(200).json(employee.rows[0])
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async deleteEmployee(req, res) {
        const id = req.params.id;
        try {
            await db.query(
                'DELETE FROM employee WHERE id=$1', [id]
            )
            res.status(200).json("employee deleted successfully")
        } catch (e) {
            console.error('Error getting employees:', e);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

}

module.exports = new EmployeeController();