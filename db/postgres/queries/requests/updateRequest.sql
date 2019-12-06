-- Updates a request's state
UPDATE "deportes-cp".request
SET status = :status
WHERE id = :id
