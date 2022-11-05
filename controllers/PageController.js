module.exports = {
  getDashboard: (req, res) => {
    res.render(
      'dashboard',
      {
        welcomeMessage: `Welcome to your dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated
      }
    );
  }
}