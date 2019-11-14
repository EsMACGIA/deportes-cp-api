INSERT INTO "deportes-cp".request (id, athlete_id, class_id, retire, status)
VALUES (DEFAULT, :athlete_id, :class_id, :retire, :status)
RETURNING *