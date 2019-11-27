-- query that looks for a comission's classes
SELECT description, name as trainer_name, lastname as trainer_lastname, ci as trainer_ci
FROM "deportes-cp".class as C JOIN "deportes-cp".trainer ON user_id = trainer_id
WHERE C.comission_id = :id