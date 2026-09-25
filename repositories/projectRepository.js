const pool = require('../config/database');

async function createProject(project) {
  const { title, description, project_url, repository_url, profile_id } = project;
  const result = await pool.query(
    `INSERT INTO projects (title, description, project_url, repository_url, profile_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, project_url, repository_url, profile_id]
  );
  return result.rows[0];
}

async function findAllProjects() {
  const result = await pool.query('SELECT * FROM projects ORDER BY id');
  return result.rows;
}

async function upvote(id) {
  const result = await pool.query(
    'UPDATE projects SET stars = stars + 1 WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    'SELECT * FROM projects WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createProject,
  findAllProjects,
  upvote,
  findById
};