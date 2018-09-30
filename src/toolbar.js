import React from "react";

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import styled from "styled-components";

import ThreePointsIcon from "./utils/three-points-icon";
import actions from "./actions";

const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  border-radius: 2px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  min-height: 43px;
  background: whitesmoke;
`;

const ThreePointsButton = styled(MenuButton).attrs({
  children: <ThreePointsIcon />
})`
  transition: 0.3s ease background-color;
  padding: 2px;
  margin: 0 0.25rem;
  background-color: transparent;
  border-radius: 100%;
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  color: #555;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ActionItem = styled(MenuItem)`
  display: flex;
  & > span:first-child {
    flex: 1;
  }
  & > span:nth-child(2) {
    padding-left: 20px;
    opacity: 0.6;
    font-size: 12px;
  }
`;

class Toolbar extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Container>
        <div style={{ flex: 1 }} />
        <Menu>
          <ThreePointsButton />
          <MenuList style={{ padding: 0, marginTop: 6 }}>
            {actions.filter(action => action.showInMenu).map(action => (
              <ActionItem key={action.id} onSelect={() => dispatch(action)}>
                <span>{action.label}</span>
                {action.shortcutLabel && <span>{action.shortcutLabel}</span>}
              </ActionItem>
            ))}
            <div style={{ borderTop: "1px solid hsla(0, 0%, 0%, 0.25)" }} />
            <MenuLink
              component="a"
              to=""
              href="https://github.com/pomber/deck-studio"
            >
              GitHub
            </MenuLink>
          </MenuList>
        </Menu>
      </Container>
    );
  }
}

export default Toolbar;
