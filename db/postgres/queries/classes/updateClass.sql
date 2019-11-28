-- Updates an class in the database
UPDATE "deportes-cp".class
SET 
    description = :description,
    trainer_id = :trainer_id
WHERE id = :id
