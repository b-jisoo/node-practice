"use strict";

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

//라우팅 (가져오기)
const home = require("./routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드

module.exports = app;
