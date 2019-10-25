CREATE SCHEMA "deportes-cp";

SET search_path TO myschema, "deportes-cp";

--domain for valid email format
CREATE DOMAIN "email_type" AS
  VARCHAR NOT NULL CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE TABLE users (
      id SERIAL,
      email email_type UNIQUE NOT NULL,
      name varchar(30) NOT NULL ,
      lastname varchar(30) NOT NULL ,
      password varchar(64) NOT NULL,
      CI integer NOT NULL UNIQUE,
      type integer NOT NULL,

      -- Constraints
      PRIMARY KEY (id),
      CHECK (0 < type AND type < 4),
      CHECK (0 < CI AND CI < 999999999),
      CHECK (length(name) > 1),
      CHECK (length(lastname) > 1),
      CHECK (length(password) > 1)
);

CREATE TABLE discipline (
     id SERIAL,
     name varchar(128) NOT NULL UNIQUE,

     -- Constraints
     CHECK (length(name) > 1)
);
