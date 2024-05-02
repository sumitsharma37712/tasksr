const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const { UserAuth, Curd } = require("../Database/Model/authModel");
const jwt = require("jsonwebtoken");
const salt = 10;
const Jsonwebtokendata =
  process.env.Jsonwebtokendata || "Thisithetokenfoadminregiration";

const authReg = expressAsyncHandler(async (req, res) => {
  const { email, password: plaintextpass } = req.body;
  const hashpasword = await bcryptjs.hash(plaintextpass, salt);
  const check = await UserAuth.findOne({ email: email });
  try {
    if (check) {
      res.send({ error: "email already registered" });
    }
    const response = await UserAuth.create({
      email,
      password: hashpasword,
    });
    res.status(200).send(response);
    console.log(`${email} register success`);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});
const authenticationLog = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const emailverify = await UserAuth.findOne({ email });

  if (!emailverify) {
    res.send({ error: "email not registered" });
  } else if (bcryptjs.compare(await password, emailverify.password)) {
    const tdata = {
      id: emailverify._id,
      email: emailverify.email,
      type: "User",
    };
    const token = jwt.sign(tdata, Jsonwebtokendata, {
      expiresIn: "1d",
    });
    const data = res.json({
      token: token,
      email: emailverify.email,
    });
  } else {
    res.send("User not found");
  }
});
const getAuthData = expressAsyncHandler(async (req, res) => {
  try {
    const response = await UserAuth.find();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// curd Operation
const UserCreatedeata = expressAsyncHandler(async (req, res) => {
  const { title, body, location,CreatedBy } = req.body;
  const createdBy = req.user.id;
  try {
    const response = await Curd.create({
      title,
      body,
      CreatedBy:createdBy,
      location,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

const getUserData = expressAsyncHandler(async (req, res) => {
  try {
    const response = await Curd.find();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

const upUserData=expressAsyncHandler(async(req,res)=>{
    upid=req.params.id
    const{title, body, location,status}=req.body

    try{
        if(!mongoose.isValidObjectId(upid)){
            return res.status(400).json('invalid userc id')
        }
        const update=await Curd.findByIdAndUpdate({_id:upid},{
            $set:{title, body, location,status}
        })
        if (update) {
            res.status(200).send("update success");
            // console.log("update success");
        } else {
            res.status(200).send("update not success");
            // console.log("update not success");
        }
    }catch(err){
        res.json(err)
    }
})


const delUserData = expressAsyncHandler(async (req, res) => {
  const del = req.params.id;
  try {
    let data = await Curd.deleteOne({ _id: del });
    if (data) {
      res.status(200).send("delete success");
    } else {
      res.status(200).send("not delete data");
    }
  } catch (err) {
    res.json(err);
  }
});


// count record
const CountData=expressAsyncHandler(async(req,res)=>{
    // const CreatedBy = req.user.id;
    try {
        const activeCount=await Curd.find({status:"active"}).count()
        const inactiveCount = await Curd.find({status:"Inactive"}).count()
        res.json({ activeCount,inactiveCount });
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = {
  authReg,
  authenticationLog,
  getAuthData,
  UserCreatedeata,
  getUserData,
  upUserData,
  delUserData,
  CountData
};
