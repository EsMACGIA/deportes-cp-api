-- query that looks for a comission's classes
SELECT id , description
FROM "deportes-cp".class 
WHERE trainer_id = :trainer_id