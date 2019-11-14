-- Updates an class in the database
UPDATE "deportes-cp".class
SET 
    description = :description
WHERE id = :id
