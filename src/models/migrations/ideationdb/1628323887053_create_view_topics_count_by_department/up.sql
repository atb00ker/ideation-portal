CREATE VIEW topics_count_by_department AS
  SELECT department, count(department)
    FROM topics
    GROUP BY department;
