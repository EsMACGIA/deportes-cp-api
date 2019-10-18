CREATE SCHEMA "deportes-cp";

SET search_path TO myschema, "deportes-cp";

CREATE DOMAIN "email_type" AS
  VARCHAR NOT NULL CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );
CREATE TABLE users (
      id SERIAL,
      email email_type UNIQUE,
      name varchar(30) NOT NULL ,
      password varchar(64) NOT NULL,
      CI integer NOT NULL UNIQUE,
      type integer NOT NULL,

      -- Constraints
      PRIMARY KEY (id),
      CHECK (0 < type AND type < 4),
      CHECK (0 < CI AND CI < 999999999)
);

CREATE TABLE discipline (
     id SERIAL,
     name varchar(128) NOT NULL UNIQUE
);
