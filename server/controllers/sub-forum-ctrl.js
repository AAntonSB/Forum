const SubForum = require("../models/sub-forum-model");

module.exports = {
  getSubForums: async function (req, res) {
    await SubForum.find({}, (err, subForum) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!subForum.length) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      return res.status(200).json({ success: true, data: subForum });
    }).catch((err) => console.log(err));
  },
  addSubForum: async function (req, res) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        sucess: false,
        error: "You must provide a subForum",
      });
    }

    SubForum.findOne({ title: body.title }, (err, doc) => {
      if (err) throw err;
      if (doc) return res.send("The sub forum already exists");

      const subForum = new SubForum(body);

      if (!subForum) {
        return res.status(400).json({ success: false, error: err });
      }

      subForum
        .save()
        .then(() => {
          return res.status(201).json({
            sucess: true,
            id: subForum.id,
            message: "Sub forum created",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Sub forum not created",
          });
        });
    });
  },
};
