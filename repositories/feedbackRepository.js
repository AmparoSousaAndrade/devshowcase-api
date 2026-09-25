const db = require('../config/database');

async function create(projectId, { score, comentario }) {
  const result = await db.query(
    "INSERT INTO feedbacks (project_id, score, comentario) VALUES ($1, $2, $3) RETURNING *",
    [projectId, score, comentario]
  );
  return result.rows[0];
}

async function updateProjectAverage(projectId) {
  const result = await db.query(
    "SELECT AVG(score)::float as media FROM feedbacks WHERE project_id = $1",
    [projectId]
  );
  const { media } = result.rows[0];
  await db.query("UPDATE projects SET media = $1 WHERE id = $2", [media, projectId]);
  return media;
}

module.exports = { create, updateProjectAverage };