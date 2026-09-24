module.exports = (req, res, next) => {
  const { nota } = req.body;
  if (nota === undefined || nota === null) {
    return res.status(400).json({ error: "Nota é obrigatória" });
  }
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    return res.status(400).json({ error: "Nota deve ser um inteiro de 1 a 5" });
  }
  next();
};