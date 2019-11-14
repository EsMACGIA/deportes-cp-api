-- Get all comissions in the database
SELECT id, email, name
FROM "deportes-cp".users AS U
JOIN "deportes-cp".comission AS C
ON U.id=C.user_id
