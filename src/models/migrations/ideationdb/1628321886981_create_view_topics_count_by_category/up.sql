CREATE VIEW topics_count_by_category AS
  SELECT category, count(category)
    FROM topics
    GROUP BY category;
