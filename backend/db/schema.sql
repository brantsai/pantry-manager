CREATE SCHEMA pantry;

CREATE TABLE pantry.ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);