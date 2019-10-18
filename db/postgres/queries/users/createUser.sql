INSERT INTO "deportes-cp".users (id , email, password, name, type, CI )
VALUES ( DEFAULT,:email, :password, :name, :type, :CI)
RETURNING *