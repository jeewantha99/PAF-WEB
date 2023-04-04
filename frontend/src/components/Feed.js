import React from "react";
import Post from "./Post";
import "./Feed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Feed() {
  const [postList, setPostList] = useState([]);
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const getAllPosts = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
      };
      const { data } = await axios.post("/api/post/getAllPosts", {}, config);
      console.log(data);
      setPostList(data.postList);
      localStorage.setItem("allPosts", JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="screllable_feed">
      {postList ? (
        <div>
          {postList.map((item) => (
            <Post data={item} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
