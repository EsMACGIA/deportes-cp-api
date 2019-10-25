INSERT INTO "deportes-cp".trainer (lastname , discipline_id, CI, user_id )
VALUES ( :lastname, :discipline_id, :ci, :user_id)
RETURNING *