-- Create the schools table in PostgreSQL
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- Optional: Insert some sample data
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Sample School 1', '123 Main St, City', 12.9716, 77.5946),
('Sample School 2', '456 Elm St, City', 13.0827, 80.2707);