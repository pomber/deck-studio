import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  background: whitesmoke;
  border-top: 1px solid #ddd;
  padding: 18px;
  text-align: center;
  font-size: 14px;
`;

class MessageBar extends React.Component {
  render() {
    return (
      <Bar>
        <a
          href={`https://github.com/login/oauth/authorize?scope=gist&client_id=${
            process.env.GH_CLIENT_ID
          }`}
        >
          Log in with GitHub
        </a>{" "}
        to save this deck
      </Bar>
    );
  }
}

export default MessageBar;
