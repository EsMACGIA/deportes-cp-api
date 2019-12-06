-- Delete the relation between a trainer and its comissions
DELETE FROM "deportes-cp".trainer_comission
WHERE trainer_id = :trainer_id