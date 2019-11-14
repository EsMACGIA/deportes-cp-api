SELECT weekday, start_hour, end_hour
FROM "deportes-cp".schedule
WHERE class_id = :id