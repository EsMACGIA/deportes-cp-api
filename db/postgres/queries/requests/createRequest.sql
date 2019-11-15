INSERT INTO "deportes-cp".request (id, athlete_id, class_id, status, retire)
VALUES (DEFAULT, :athlete_id, :class_id, :status, :retire)
RETURNING *