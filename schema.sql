CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    journey_date DATE NOT NULL,
    travel_class TEXT NOT NULL,
    seats INTEGER NOT NULL,
    pnr VARCHAR(10) UNIQUE NOT NULL
);
