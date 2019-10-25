-- Get a comission's information from the database
SELECT id, email, name
FROM "deportes-cp".users
JOIN "deportes-cp".comission
ON "deportes-cp".users.id="deportes-cp".comission.user_id
WHERE email = :email
