"use strict";

const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validUser = require("./auth");
const cors = require("cors");
router.use(cors());

const database = [
  { id: 1, title: "글1", name: "하나" },
  { id: 2, title: "글2", name: "둘" },
  { id: 3, title: "글3", name: "셋" },
];

const users = [];

router.get("/database", (req, res) => {
  res.json(database);
});

router.get("/login", (req, res) => {
  res.send("로그인 화면입니다");
});

// 회원가입 된 유저 정보 보기 위함 나중에 삭제필요
router.get("/signup", (req, res) => {
  res.send(users);
});

router.get("/secure_data", validUser, (req, res) => {
  res.send("인증된 사용자만 쓸 수 있는 API");
});

router.post("/database", (req, res) => {
  const { title, name } = req.body;

  database.push({
    id: database.length + 1,
    title,
    name,
  });
  return res.send("success");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.filter((user) => {
    return user.username === username;
  });
  if (user.length === 0) {
    res.status(403).send("해당하는 id가 없습니다.");
    return;
  }
  if (!(await argon2.verify(user[0].password, password))) {
    res.status(403).send("패스워드가 틀립니다.");
    return;
  }

  //로그인 성공시 엑세스 토큰 발급
  const access_token = jwt.sign({ username }, "secure");
  res.cookie("access_token", access_token, { httpOnly: true });
  res.send("로그인 성공!");
});

router.post("/signup", async (req, res) => {
  const { username, password, age, birthday } = req.body;
  const hash = await argon2.hash(password);
  users.push({ username, password: hash, age, birthday });
  res.send("success");
});

module.exports = router; //내보내기
