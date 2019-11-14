INSERT INTO "deportes-cp".users (id , email, password)
VALUES ( DEFAULT,:email, :password)
RETURNING *