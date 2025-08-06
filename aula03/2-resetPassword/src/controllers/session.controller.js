const { registerUser, loginUser, resetPassword } = require('../services/session.service');

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.redirect('/login');
  } catch (error) {
    console.error("Erro no registro:", error);
    res.redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ statu: "error", error: "Incomplete values" })
    }
    const user = await loginUser(email, password);
    if (!user) {
      return res.status(404).send({ statu: "error", error: "User not found" })
    }
    req.session.user = user;

    req.session.save(err => {
      if (err) {
        console.error("Erro ao salvar sessão:", err);
        return res.redirect('/login?error=Erro ao salvar sessão');
      }
      res.redirect('/profile');
    });
    console.log(req.session.user);
  } catch (error) {
    console.error("Erro no login:", error);
    res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

const renderResetForm = (req, res) => {
  res.render('reset-password', {
    error: req.query.error,
    success: req.query.success
  });
};

const handleReset = async (req, res) => {
  console.log('Requisição POST recebida em /reset-password');
  const { email, newPassword } = req.body;
  const updated = await resetPassword(email, newPassword);
  if (!updated) {
    return res.redirect('/reset-password?error=' + encodeURIComponent('Usuário não encontrado'));
  }
  res.redirect('/reset-password?success=' + encodeURIComponent('Senha redefinida com sucesso'));
};

module.exports = {
  register,
  login,
  logout,
  renderResetForm,
  handleReset
};
