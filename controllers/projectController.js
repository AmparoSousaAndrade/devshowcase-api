const projectRepository = require("../repositories/projectRepository");
const feedbackRepository = require('../repositories/feedbackRepository');
const {
    validateProject,
    toProjectResponse
} = require("../dtos/projectDTO");

async function createProject(req, res) {
    try {
        const errors = validateProject(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        const project =
            await projectRepository.createProject(req.body);

        return res.status(201).json(
            toProjectResponse(project)
        );

    } catch (error) {
        console.error("Erro ao criar projeto:", error);

        return res.status(500).json({
            error: "Erro interno ao criar projeto."
        });
    }
}

async function getAllProjects(req, res) {
    try {
        const projects =
            await projectRepository.findAllProjects();

        return res.status(200).json(
            projects.map(toProjectResponse)
        );

    } catch (error) {
        console.error("Erro ao buscar projetos:", error);

        return res.status(500).json({
            error: "Erro interno ao buscar projetos."
        });
    }
}
async function createFeedback(req, res) {
  try {
    const { id } = req.params;
    const { score, comentario } = req.body;
    const project = await projectRepository.findById(id);
    if (!project) return res.status(404).json({ error: "Projeto não encontrado" });

    const feedback = await feedbackRepository.create(id, { nota, comentario });
    const media = await feedbackRepository.updateProjectAverage(id);

    res.status(201).json({ feedback, media });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function upvote(req, res) {
  try {
    const { id } = req.params;
    const project = await projectRepository.upvote(id);
    if (!project) return res.status(404).json({ error: "Projeto não encontrado" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
    createProject,
    getAllProjects,
    createFeedback, 
    upvote
};