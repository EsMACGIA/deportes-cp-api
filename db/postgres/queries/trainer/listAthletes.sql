-- query that looks for a trainer's classes' athletes
SELECT A.*
FROM "deportes-cp".class AS C JOIN "deportes-cp".athlete_class AS AC ON C.id = AC.class_id JOIN "deportes-cp".athlete AS A ON A.id = AC.athlete_id
WHERE C.trainer_id = :trainer_id