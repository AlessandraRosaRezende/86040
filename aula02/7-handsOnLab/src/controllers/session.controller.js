const { registerUser, loginUser } = require('../services/session.service');

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
    const user = await loginUser(req.body.email, req.body.password);
    req.session.user = user;

    req.session.save(err => {
      if (err) {
        console.error("Erro ao salvar sessão:", err);
        return res.redirect('/login?error=Erro ao salvar sessão');
      }
      res.redirect('/profile');
    });
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

module.exports = {
  register,
  login,
  logout
};
