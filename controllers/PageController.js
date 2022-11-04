module.exports = {
  getHome: (req, res) => {
    res.render(
      'home',
      // {
      //   welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      //   isAuthenticated: req.session.isAuthenticated
      // }
    );
  },

  getDashboard: (req, res) => {
    res.render(
      'dashboard',
      {
        welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated
      }
    );
  }
}