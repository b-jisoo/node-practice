import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "../component/login";

type boardList = {
  id: Number;
  title: String;
  name: String;
};

const DATABASE_URL = "http://localhost:4000/database";

const CommentList = () => {
  const [boardList, setboardList] = useState<boardList[]>([]);

  const fetchDate = async () => {
    const response = await axios.get(DATABASE_URL);
    setboardList(response.data);
    // fetch("http://localhost:4000/database")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setboardList(data);
    //   });
  };

  useEffect(() => {
    fetchDate();
  }, []);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const title = e.target.title.value;
    await axios.post(DATABASE_URL, { name, title });
    fetchDate();
    // fetch("http://localhost:4000/database", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     title,
    //   }),
    // }).then(() => {
    //   fetchDate();
    // });
  };

  return (
    <div>
      <>
        <h1>게시판 연습입니다</h1>
        <form onSubmit={onSubmitHandler}>
          <label>
            이름
            <input name="name" required />
          </label>
          <label>
            글 내용
            <input name="title" required />
          </label>
          <button>추가</button>
        </form>
        {boardList.map((board) => (
          <div style={{ display: "flex" }}>
            <div>{board.id.toString()}</div>
            <div>{board.name}</div>
            <div>{board.title}</div>
          </div>
        ))}
      </>
      <Login />
    </div>
  );
};

export default CommentList;
