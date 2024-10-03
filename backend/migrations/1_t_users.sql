-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS t_users (
    id TEXT PRIMARY KEY NOT NULL,
<<<<<<< HEAD
=======
    public_key TEXT,
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    role TEXT NOT NULL,
    github_profile TEXT,
    total_points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS t_users;
-- +goose StatementEnd
