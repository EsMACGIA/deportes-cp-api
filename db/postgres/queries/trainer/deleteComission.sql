-- Delete a a comissionb from a trainer
DELETE
FROM "deportes-cp".trainer_comission
WHERE trainer_id = :trainer_id AND comission_id = :comission_id
