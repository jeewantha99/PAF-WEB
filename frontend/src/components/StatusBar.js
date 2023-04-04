import React from "react";
import Avatar from "@mui/material/Avatar";
import "./StatusBar.css";
import { useEffect, useState } from "react";

export default function StatusBar() {
  const [statusList, setStatusList] = useState([]);


    let data = [
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
      {
        userName: "User_Name",
        imageUrl:
          "https://res.cloudinary.com/cake-lounge/image/upload/v1674555614/219983_fbpdqr.png",
      },
    ];

  useEffect(() => {
    setStatusList(data);
  }, []);

  return (
    <div>
      <div className="status_bar">
        {statusList.map((item) => (
        <div className="status">
          <Avatar className="statusbar_status" alt="S" src={item.imageUrl} />
          <div className="statusbar_text">{item.userName}</div>
        </div>
        ))}
      </div>
    </div>
  );
}
