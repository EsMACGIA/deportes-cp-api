INSERT INTO "deportes-cp".trainer (name, lastname, ci, user_id )
VALUES (:name, :lastname, :ci, :user_id)
RETURNING *