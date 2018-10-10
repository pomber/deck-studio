import React from "react";
import Downshift from "downshift";
import styled from "styled-components";

const Root = styled.div({
  color: "rgb(97, 97, 97)",
  backgroundColor: "rgb(255, 255, 254)",
  boxShadow: "rgb(168, 168, 168) 0px 5px 8px",
  position: "absolute",
  width: "300px",
  zIndex: 2000,
  paddingBottom: "6px",
  left: "50%",
  marginLeft: "-150px"
});

const LightRoot = styled(Root)`
  color: rgb(97, 97, 97);
  background-color: rgb(255, 255, 254);
  box-shadow: rgb(168, 168, 168) 0px 5px 8px;
`;

const lightHighlightColor = "#dff0ff";

const DarkRoot = styled(Root)`
  color: rgb(204, 204, 204);
  background-color: rgb(30, 30, 30);
  box-shadow: rgb(0, 0, 0) 0px 5px 8px;

  input {
    background-color: rgb(60, 60, 60);
    color: rgb(204, 204, 204);
    border: none;
  }
`;
const darkHighlightColor = "#062f4a";

const InnerInput = styled.input({
  width: "calc(100% - 8px)",
  margin: "4px",
  padding: "4px",
  boxSizing: "border-box",
  color: "rgb(97, 97, 97)"
});

const Picker = ({ dispatch, options }) => (
  <Downshift
    onChange={selection => dispatch(selection.action, selection)}
    itemToString={item => (item ? item.label : "")}
    defaultHighlightedIndex={0}
    onOuterClick={() => dispatch(options.cancelAction)}
    defaultIsOpen
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      getRootProps,
      inputValue,
      highlightedIndex
    }) => (
      <DarkRoot {...getRootProps()}>
        <InnerInput
          {...getInputProps()}
          autoFocus
          placeholder={options.placeholder}
        />
        <div {...getMenuProps()}>
          {options.items
            .filter(
              item =>
                !inputValue ||
                item.label.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <div
                {...getItemProps({
                  key: item.label,
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index && darkHighlightColor,
                    height: "22px",
                    paddingLeft: "11px",
                    cursor: "pointer",
                    width: "100%"
                  }
                })}
              >
                {item.label}
              </div>
            ))}
        </div>
      </DarkRoot>
    )}
  </Downshift>
);

class Input extends React.Component {
  state = { text: "" };
  render() {
    const { options, dispatch } = this.props;
    return (
      <DarkRoot>
        <InnerInput
          autoFocus
          placeholder={options.placeholder}
          onChange={e => this.setState({ text: e.target.value })}
          onKeyPress={e => {
            if (e.key === "Enter") {
              dispatch(options.doneAction, this.state.text);
            }
          }}
        />
        <div style={{ padding: "2px 10px" }}>
          {options.label(this.state.text)}
        </div>
      </DarkRoot>
    );
  }
}

const QuickInput = ({ options, ...props }) =>
  !options ? null : (
    <div style={{ position: "absolute", top: "50px", right: "50%" }}>
      {options.type === "input" ? (
        <Input {...props} options={options} />
      ) : (
        <Picker {...props} options={options} />
      )}
    </div>
  );

export default QuickInput;
