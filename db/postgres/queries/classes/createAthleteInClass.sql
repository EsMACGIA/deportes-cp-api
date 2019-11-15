INSERT INTO "deportes-cp".athlete_class (athlete_id, class_id)
VALUES (:athlete_id, :class_id)
RETURNING *