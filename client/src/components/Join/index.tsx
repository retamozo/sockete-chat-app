import React, { useState, useEffect, FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  HeadTitle,
  InnerContainer,
  Input,
  OuterWrapper,
} from "./styles";

const Join: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const history = useHistory();

  const onSubmitJoin = () => {
    if (!name || !room) return;
    history.push(`/chat?name=${name}&room=${room}`);
  };

  return (
    <OuterWrapper>
      <InnerContainer>
        <HeadTitle>Join room</HeadTitle>
        <div>
          <Input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div>
          <Input
            placeholder="Room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          ></Input>
        </div>
        <Button mt onClick={onSubmitJoin}>
          Sing in
        </Button>
      </InnerContainer>
    </OuterWrapper>
  );
};

export default Join;
