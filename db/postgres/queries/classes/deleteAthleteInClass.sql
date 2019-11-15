-- Delete a class in the database
DELETE FROM "deportes-cp".athlete_class
WHERE athlete_id = :athlete_id AND class_id = :class_id
