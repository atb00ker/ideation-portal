CREATE VIEW topics_count_by_status AS
  SELECT status, count(status)
    FROM topics
    GROUP BY status;
