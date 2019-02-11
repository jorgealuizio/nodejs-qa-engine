module.exports = (req, res) => {
    return res.redirect(`/t/${req.user.username}`);
}