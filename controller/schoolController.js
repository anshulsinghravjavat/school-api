const pool = require('../config/db');
const { validateSchool } = require('../utils/validation');

exports.addSchool = async (req, res) => {
    try {
        const validation = validateSchool(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const { name, address, latitude, longitude } = req.body;

        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, address, latitude, longitude];

        const result = await pool.query(query, values);
        res.status(201).json({ message: 'School added successfully', school: result.rows[0] });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listSchools = async (req, res) => {
    try {
        const query = 'SELECT * FROM schools';
        const result = await pool.query(query);
        res.status(200).json({ schools: result.rows });
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};