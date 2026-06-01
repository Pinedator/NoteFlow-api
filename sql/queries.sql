-- Obtener todas las notas con sus items y tags
-- LEFT JOIN devuelve todas las notas aunque no tengan items o tags
-- FILTER (WHERE ci.id IS NOT NULL) evita que json_agg devuelva [null] cuando no hay items
SELECT 
  n.*,
  json_agg(ci.*) FILTER (WHERE ci.id IS NOT NULL) as items,
  json_agg(nt.tag) FILTER (WHERE nt.id IS NOT NULL) as tags
FROM notes n
-- LEFT JOIN: incluye notas sin checklist items
LEFT JOIN checklist_items ci ON n.id = ci.note_id
-- LEFT JOIN: incluye notas sin tags
LEFT JOIN note_tags nt ON n.id = nt.note_id
GROUP BY n.id
ORDER BY n.created_at DESC;