CREATE TABLE Device (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(150),
    mac VARCHAR(17) NOT NULL,
    ip VARCHAR(15) NOT NULL,
    type VARCHAR(50) NOT NULL
);