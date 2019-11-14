CREATE SCHEMA "deportes-cp";

SET search_path TO myschema, "deportes-cp";

--domain for valid email format
CREATE DOMAIN "email_type" AS
  VARCHAR NOT NULL CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE DOMAIN "document" AS
  VARCHAR CHECK (value ~ '^[VEPGJ]\-[1-9]\d{0,8}$');

CREATE DOMAIN "gender" AS
  VARCHAR NOT NULL CHECK (value ~ '^[MF]$');

CREATE DOMAIN "status_domain" AS 
  VARCHAR NOT NULL CHECK (value ~ '^(IN PROCESS|REJECTED|APPROVED)$');


CREATE TABLE users (

      id SERIAL,
      email email_type UNIQUE NOT NULL,
      password varchar(64) NOT NULL,
    
      -- Constraints
      PRIMARY KEY (id),
      CHECK (length(password) > 1)
);

CREATE TABLE comission (

      name varchar(30) NOT NULL UNIQUE,
      user_id integer NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE,
      -- Constraints
      PRIMARY KEY (user_id),
      CHECK (length(name) > 3)

);


CREATE TABLE trainer (

     name varchar(30) NOT NULL ,
     lastname varchar(30) NOT NULL ,
     user_id integer NOT NULL UNIQUE REFERENCES users ON DELETE CASCADE,
     ci document NOT NULL UNIQUE,

     -- Constraints
     PRIMARY KEY (user_id),
     CHECK (length(name) > 1),
     CHECK (length(lastname) > 1)
);

CREATE TABLE trainer_comission (

     comission_id integer NOT NULL REFERENCES comission ON DELETE CASCADE,
     trainer_id integer NOT NULL REFERENCES trainer ON DELETE CASCADE,

     -- Constraints
     PRIMARY KEY (comission_id, trainer_id)
);

CREATE TABLE athlete (

     id SERIAL,
     ci document UNIQUE,
     name varchar(30) NOT NULL,
     lastname varchar(30) NOT NULL,
     sex gender NOT NULL,
     birthday date NOT NULL, 
     stock_number integer NOT NULL,
     
     --faltan tributos

     -- Constraints
     PRIMARY KEY (id),
     CHECK (length(name) > 1),
     CHECK (length(lastname) > 1),
     CHECK (stock_number > 0)
);

--preguntar sobre description
CREATE TABLE class (

     id SERIAL,
     description varchar(50) NOT NULL,
     comission_id integer NOT NULL REFERENCES comission ON DELETE CASCADE,
     trainer_id integer REFERENCES trainer ON DELETE CASCADE,

     -- Constraints
     PRIMARY KEY (id),
     CHECK (length(description) > 4)
);

--esta tabla asi como esta parece estupida
CREATE TABLE schedule (

     class_id integer NOT NULL REFERENCES class ON DELETE CASCADE,
     weekday integer NOT NULL,
     start_hour time NOT NULL,
     end_hour time NOT NULL,
     
     -- Constraints
     PRIMARY KEY (class_id, weekday, start_hour, end_hour),
     CHECK ( start_hour < end_hour),
     CHECK ( -1 < weekday AND weekday < 7)

);

CREATE TABLE request (

     id SERIAL,
     athlete_id integer NOT NULL REFERENCES athlete ON DELETE CASCADE,
     class_id integer NOT NULL REFERENCES class ON DELETE CASCADE,
     status status_domain NOT NULL,
     --faltan tributos

     -- Constraints
     PRIMARY KEY (id)
);


CREATE TABLE athlete_class (

     athlete_id integer NOT NULL REFERENCES athlete ON DELETE CASCADE,
     class_id integer NOT NULL REFERENCES class ON DELETE CASCADE,

     --faltan tributos

     -- Constraints
     PRIMARY KEY (athlete_id, class_id)
);

CREATE OR REPLACE FUNCTION request_insert() RETURNS TRIGGER AS $athlete_in_class$
   BEGIN
      INSERT INTO athlete_class(athlete_id, class_id) VALUES (new.athlete_id, new.class_id);
      RETURN NULL;
   END;
$athlete_in_class$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_request_insert AFTER INSERT 
    ON request FOR EACH ROW
    EXECUTE PROCEDURE request_insert();