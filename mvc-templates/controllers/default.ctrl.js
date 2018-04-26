module.exports = {

    home: function (req, res) {
        res.render("home");
    },

    about: function (req, res) {
        res.render("about");
    },

    contact: function (req, res) {
        res.render("contact");
    }
};