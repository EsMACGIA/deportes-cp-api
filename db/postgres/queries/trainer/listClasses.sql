-- query that looks for a comission's classes
SELECT id as class_id, description as class_description
FROM "deportes-cp".class 
WHERE trainer_id = :trainer_id