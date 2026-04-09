exports.validateSchool = (body) => {
    const { name, address, latitude, longitude } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return { isValid: false, error: 'Name is required and must be a non-empty string' };
    }

    if (!address || typeof address !== 'string' || address.trim() === '') {
        return { isValid: false, error: 'Address is required and must be a non-empty string' };
    }

    if (latitude === undefined || latitude === null || isNaN(latitude) || latitude < -90 || latitude > 90) {
        return { isValid: false, error: 'Latitude is required and must be a number between -90 and 90' };
    }

    if (longitude === undefined || longitude === null || isNaN(longitude) || longitude < -180 || longitude > 180) {
        return { isValid: false, error: 'Longitude is required and must be a number between -180 and 180' };
    }

    return { isValid: true };
};
