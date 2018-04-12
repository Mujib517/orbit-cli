module.exports = {

    get: function (req, res) {
        res
            .status(200)
            .send("Api Works!");
    },

    health: function (req, res) {
        var response = {
            status: 'Up'
        };
        res
            .status(200)
            .json(response);
    }
};