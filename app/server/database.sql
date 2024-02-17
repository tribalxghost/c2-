

\c budgetDB

DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS transactions cascade;
DROP TABLE IF EXISTS account_types cascade;
DROP TABLE IF EXISTS goals cascade;


CREATE TABLE users (
    username text Primary Key ,
    firstname text NOT NULL,
    lastname text NOT NULL,
    password text NOT NULL,
    email text NOT NULL
);

CREATE TABLE account_types (
    account_id SERIAL Primary KEY,
    username text NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    account_num BIGINT,
    account_type text,
    balance DECIMAL
    );

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    account_id BIGINT,
    transaction_date DATE,
    amount DECIMAL,
    description text
);



CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    goal DECIMAL 
);