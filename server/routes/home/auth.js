const { users } = require("./index");

const validUser = (req, res, next) => {
  //엑세스 토큰이 없으면 401 에러
  const { access_token } = req.cookies;
  if (!access_token) {
    res.status(401).send("access token이 없습니다.");
  }
  try {
    const { username } = jwt.verify(access_token, "secure");
    const userInfo = users.find((data) => data.username === username);

    if (!userInfo) {
      throw "user indo가 없습니다";
    }
    next();
  } catch (err) {
    res.status(401).send("유효한 access token이 아닙니다.");
  }
};
