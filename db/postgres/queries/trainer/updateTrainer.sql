-- Updates an trainer in the database
UPDATE "deportes-cp".trainer
SET name = :name,
    lastname = :lastname
WHERE user_id = :id
