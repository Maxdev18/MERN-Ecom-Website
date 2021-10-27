exports.contact = (req, res, err) => {
    const contactInput = req.body;

    //Establish email connection here
    res.status(200).send({ message: "Email Successfully Sent" });
}