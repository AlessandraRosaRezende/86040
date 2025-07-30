const fs = require('fs').promises;
const path = require('path');
const usuariosPath = path.resolve(__dirname, '../data/usuarios.json');

// Funções utilitárias internas
const readUsuarios = async () => {
  try {
    const usuarios = await fs.readFile(usuariosPath, 'utf-8');
    return usuarios ? JSON.parse(usuarios) : [];
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const writeUsuarios = async (usuarios) => {
  try {
    await fs.writeFile(usuariosPath, JSON.stringify(usuarios, null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

// Controller com tudo junto - acesso a dados, regras de negócio e respostas HTTP, o que viola o princípio da responsabilidade única, tornando testes, manutenção e reuso muito mais difíceis.

const getUsuarios = async (req, res) => {
  const usuarios = await readUsuarios();
  return res.status(200).json(usuarios);
};

const postUsuario = async (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  if (!nome || !sobrenome || !email || !senha) return res.status(400).json({ message: 'Dados inválidos' });
 
  const usuarios = await readUsuarios();
  const newUsuario = { id: usuarios.length + 1, nome, sobrenome, email, senha };
  usuarios.push(newUsuario);
  await writeUsuarios(usuarios);

  return res.status(201).json(newUsuario);
};

const getUsuarioById = async (req, res) => {
  const id = Number(req.params.id);
  const usuarios = await readUsuarios();
  const usuario = usuarios.find((b) => b.id === id);
  if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
  return res.status(200).json(usuario);
};

const updateUsuario = async (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  const usuarios = await readUsuarios();
  const index = usuarios.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Usuário não encontrado' });

  usuarios[index] = { ...usuarios[index], ...updates };
  await writeUsuarios(usuarios);

  return res.status(200).json(usuarios[index]);
};

const deleteUsuario = async (req, res) => {
  const id = Number(req.params.id);

  const usuarios = await readUsuarios();
  const index = usuarios.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Usuário não encontrado' });

  const deleted = usuarios.splice(index, 1);
  await writeUsuarios(usuarios);

  return res.status(200).json(deleted)
  // return res.status(204).end();
};

module.exports = {
  getUsuarios,
  postUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
