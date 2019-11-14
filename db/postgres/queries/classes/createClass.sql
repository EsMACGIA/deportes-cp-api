INSERT INTO "deportes-cp".class (id, description, comission_id)
VALUES (DEFAULT, :description, :comission_id)
RETURNING *