const errorHandler = (err, req, res, next) => {
    console.log("An error occured when a resource was requested:", err)
    res.status(500).send('Something went wrong! Please try again later :)');
};

module.exports = errorHandler;
