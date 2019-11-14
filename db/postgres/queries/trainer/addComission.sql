INSERT INTO "deportes-cp".trainer_comission(trainer_id, comission_id)
VALUES (:trainer_id, :comission_id)
RETURNING *