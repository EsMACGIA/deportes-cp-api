INSERT INTO "deportes-cp".users (id , email, password, name)
VALUES ( DEFAULT,:email, :password, :name)
RETURNING *