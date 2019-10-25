-- Updates an trainer in the database
UPDATE "deportes-cp".trainer
SET lastname = :lastname,
    discipline_id = :discipline_id
WHERE user_id = :id
