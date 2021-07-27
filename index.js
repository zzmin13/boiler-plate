const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`⭕ MongoDB Connected`))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`✅ Listening on http://localhost:${port}`);
});
