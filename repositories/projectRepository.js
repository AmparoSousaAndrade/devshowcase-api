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

async function findAllProjects({ tecnologia, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM projects';
  let countQuery = 'SELECT COUNT(*) FROM projects';
  const params = [];
  const countParams = [];

  if (tecnologia) {
    query += ' WHERE tecnologia ILIKE $1';
    countQuery += ' WHERE tecnologia ILIKE $1';
    params.push(`%${tecnologia}%`);
    countParams.push(`%${tecnologia}%`);
  }

  query += ` ORDER BY id DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const { rows } = await pool.query(query, params);
  const { rows: countRows } = await pool.query(countQuery, countParams);
  const total = parseInt(countRows[0].count);

  return {
    data: rows,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
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