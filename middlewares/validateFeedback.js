module.exports = (req, res, next) => {
  const { score } = req.body;
  if (score === undefined || score === null) {
    return res.status(400).json({ error: "score é obrigatória" });
  }
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return res.status(400).json({ error: "score deve ser um inteiro de 1 a 5" });
  }
  next();
};