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

module.exports = {
  register,
  login,
  logout
};
