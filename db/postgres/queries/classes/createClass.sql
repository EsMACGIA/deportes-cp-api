INSERT INTO "deportes-cp".class (id, description, comission_id, trainer_id)
VALUES (DEFAULT, :description, :comission_id, :trainer_id)
RETURNING *