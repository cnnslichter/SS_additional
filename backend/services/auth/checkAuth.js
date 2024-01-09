const checkAuth = async(req, res) => {
    if (req.isAuthenticated()) {
        console.log('/api/auth called:');
        res.status(200).json({ authenticated: true, user: req.user });
    } else {
        res.status(401).json({ authenticated: false, user: null });
    }
}

const login = async(req, res) => {
    res.status(200).json(({ message: 'Login successful' }));
}

const logout = async(req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => console.log(err));
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(401).json({ message: 'You are not logged in' });
    }
}

module.exports = { checkAuth, login, logout };