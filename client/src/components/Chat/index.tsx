import React, { FunctionComponent, useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import config from "../../config";

const Chat: FunctionComponent = () => {
  const socket = io(config.PORT);
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name as string);
    setRoom(room as string);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      // socket.off();
    };
  }, [location.search]);

  return (
    <div>
      chat con {name} en la sala {room}
    </div>
  );
};

export default Chat;
