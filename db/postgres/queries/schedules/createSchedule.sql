INSERT INTO "deportes-cp".schedule (weekday, start_hour, end_hour, class_id)
VALUES (:weekday, :start_hour, :end_hour, :class_id)
RETURNING *