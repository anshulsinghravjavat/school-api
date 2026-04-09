const School = require('../models/School');
const { validateSchool } = require('../utils/validation');
const calculateDistance = require('../utils/distance');

exports.addSchool = async (req, res) => {
    try {
        const validation = validateSchool(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const { name, address, latitude, longitude } = req.body;

        const school = new School({
            name,
            address,
            latitude,
            longitude
        });

        const savedSchool = await school.save();
        res.status(201).json({ message: 'School added successfully', school: savedSchool });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listSchools = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        // Validate latitude and longitude
        if (!lat || isNaN(lat) || lat < -90 || lat > 90) {
            return res.status(400).json({ error: 'Valid latitude is required (between -90 and 90)' });
        }
        if (!lng || isNaN(lng) || lng < -180 || lng > 180) {
            return res.status(400).json({ error: 'Valid longitude is required (between -180 and 180)' });
        }

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        const schools = await School.find({});

        // Calculate distance for each school and sort
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school.toObject(), distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({ schools: schoolsWithDistance });
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};