const Reply = require("../models/reply-model");

module.exports = {
  getReplys: async function (req, res) {
    await Reply.find({}, (err, reply) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!reply.length) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({ success: true, data: reply });
    }).catch((err) => console.log(err));
  },
  createReply: async function (req, res) {
    const body = req.body;

    if (!body) {
      return res.send().json({
        success: false,
        error: "You must provide reply details",
      });
    }

    const reply = new Reply(body);

    reply.save().then(() => {
      return res
        .status(201)
        .json({
          success: true,
          id: reply.id,
          message: "Reply created",
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Reply not created",
          });
        });
    });
  },
};
