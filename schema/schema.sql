BEGIN;

DROP DATABASE sl_Register;
CREATE DATABASE IF NOT EXISTS sl_Register;

CREATE TABLE sl_Register.location (
       id INTEGER NOT NULL AUTO_INCREMENT,
       name CHAR(16) NOT NULL,
       PRIMARY KEY(id),
       INDEX name_idx(name)
) ENGINE=InnoDB;

CREATE TABLE sl_Register.attendence (
       location INTEGER NOT NULL,
       name VARCHAR(28) NOT NULL,
       entrance TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       departure TIMESTAMP NULL,
       PRIMARY KEY(name),
       INDEX loc_idx(location),
       INDEX current_attendees_idx(location, departure),
       FOREIGN KEY (location) REFERENCES sl_Register.location(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO   sl_Register.location SET name = 'test';

INSERT INTO sl_Register.attendence SET name = 'foo', location = (SELECT id FROM sl_Register.location WHERE location.name = "test");
INSERT INTO sl_Register.attendence SET name = 'bar', location = (SELECT id FROM sl_Register.location WHERE location.name = "test");
INSERT INTO sl_Register.attendence SET name = 'baz', location = (SELECT id FROM sl_Register.location WHERE location.name = "test");
INSERT INTO sl_Register.attendence SET name = 'boz', location = (SELECT id FROM sl_Register.location WHERE location.name = "test");
INSERT INTO sl_Register.attendence SET name = 'pow', location = (SELECT id FROM sl_Register.location WHERE location.name = "test");

INSERT INTO sl_Register.attendence (sl_Register.attendence.name, sl_Register.attendence.location)
     SELECT ('fap', (SELECT id FROM sl_Register.location WHERE location.name = "test")) FROM sl_Register.location
     WHERE NOT EXISTS (SELECT * FROM sl_Register.attendence WHERE name = 'fap' AND departure IS NULL);

COMMIT;

