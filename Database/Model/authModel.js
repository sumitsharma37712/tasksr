const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);
const UserAuth = mongoose.model("auth", AuthSchema);

const CURDSchema = mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
    },
    body: { type: String },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,require:true},
    status: { type: String, default: "Inactive" },
    location: {
      type: String,
    },
  },
  { timeStamp: true }
);
const Curd = mongoose.model("curd", CURDSchema);

module.exports = { UserAuth, Curd };
