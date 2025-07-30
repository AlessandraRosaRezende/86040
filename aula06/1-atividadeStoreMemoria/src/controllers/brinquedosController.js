const fs = require('fs').promises;
const path = require('path');
const brinquedosPath = path.resolve(__dirname, '../data/brinquedos.json');

// Funções utilitárias internas
const readBrinquedos = async () => {
  try {
    const brinquedos = await fs.readFile(brinquedosPath, 'utf-8');
    return brinquedos ? JSON.parse(brinquedos) : [];
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const writeBrinquedos = async (brinquedos) => {
  try {
    await fs.writeFile(brinquedosPath, JSON.stringify(brinquedos, null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

// Controller com tudo junto - acesso a dados, regras de negócio e respostas HTTP, o que viola o princípio da responsabilidade única, tornando testes, manutenção e reuso muito mais difíceis.

const getBrinquedos = async (req, res) => {
  const brinquedos = await readBrinquedos();
  return res.status(200).json(brinquedos);
};

const postBrinquedo = async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) return res.status(400).json({ message: 'Dados inválidos' });
  if (typeof nome !== 'string' || typeof preco !== 'number') return res.status(400).json({ message: 'Formato inválido' });
  if (preco <= 0) return res.status(400).json({ message: 'Preço deve ser maior que zero' });

  const brinquedos = await readBrinquedos();
  const newBrinquedo = { id: brinquedos.length + 1, nome, preco };
  brinquedos.push(newBrinquedo);
  await writeBrinquedos(brinquedos);

  return res.status(201).json(newBrinquedo);
};

const getBrinquedoById = async (req, res) => {
  const id = Number(req.params.id);
  const brinquedos = await readBrinquedos();
  const brinquedo = brinquedos.find((b) => b.id === id);
  if (!brinquedo) return res.status(404).json({ message: 'Brinquedo não encontrado' });
  return res.status(200).json(brinquedo);
};

const updateBrinquedo = async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  const brinquedos = await readBrinquedos();
  const index = brinquedos.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Brinquedo não encontrado' });

  brinquedos[index] = { ...brinquedos[index], ...updates };
  await writeBrinquedos(brinquedos);

  return res.status(200).json(brinquedos[index]);
};

const deleteBrinquedo = async (req, res) => {
  const id = Number(req.params.id);

  const brinquedos = await readBrinquedos();
  const index = brinquedos.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Brinquedo não encontrado' });

  const deleted = brinquedos.splice(index, 1);
  await writeBrinquedos(brinquedos);

  return res.status(204).end();
};

module.exports = {
  getBrinquedos,
  postBrinquedo,
  getBrinquedoById,
  updateBrinquedo,
  deleteBrinquedo
};
