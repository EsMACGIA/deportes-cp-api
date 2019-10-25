CREATE SCHEMA "deportes-cp";

SET search_path TO myschema, "deportes-cp";

--domain for valid email format
CREATE DOMAIN "email_type" AS
  VARCHAR NOT NULL CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE TABLE users (

      id SERIAL,
      email email_type UNIQUE NOT NULL,
      name varchar(30) NOT NULL ,
      password varchar(64) NOT NULL,
    
      -- Constraints
      PRIMARY KEY (id),
      CHECK (length(name) > 1),
      CHECK (length(password) > 1)
);

CREATE TABLE comission (

     user_id integer NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE

);

CREATE TABLE discipline (

     id SERIAL,
     name varchar(128) NOT NULL UNIQUE,

     -- Constraints
     PRIMARY KEY (id),
     CHECK (length(name) > 1)
);

CREATE TABLE trainer (

     lastname varchar(30) NOT NULL ,
     user_id integer NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE,
     discipline_id integer NOT NULL REFERENCES discipline,
     CI integer NOT NULL UNIQUE,

     -- Constraints
     CHECK (length(lastname) > 1),
     CHECK (0 < CI AND CI < 999999999)
);
