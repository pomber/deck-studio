import React from "react";
import Downshift from "downshift";

const Picker = ({ dispatch, options }) => (
  <Downshift
    onChange={selection => dispatch(selection.action, selection)}
    itemToString={item => (item ? item.label : "")}
    defaultHighlightedIndex={0}
    onOuterClick={() => dispatch("CANCEL")}
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
      <div
        {...getRootProps({
          style: {
            color: "rgb(97, 97, 97)",
            backgroundColor: "rgb(255, 255, 254)",
            boxShadow: "rgb(168, 168, 168) 0px 5px 8px",
            position: "absolute",
            width: "300px",
            zIndex: 2000,
            paddingBottom: "6px",
            left: "50%",
            marginLeft: "-150px"
          }
        })}
      >
        <input
          {...getInputProps({
            style: {
              width: "calc(100% - 8px)",
              margin: "4px",
              padding: "4px",
              boxSizing: "border-box",
              color: "rgb(97, 97, 97)"
            }
          })}
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
                    backgroundColor: highlightedIndex === index && "#dff0ff",
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
      </div>
    )}
  </Downshift>
);

class Input extends React.Component {
  state = { text: "" };
  render() {
    const { options, dispatch } = this.props;
    return (
      <div
        style={{
          color: "rgb(97, 97, 97)",
          backgroundColor: "rgb(255, 255, 254)",
          boxShadow: "rgb(168, 168, 168) 0px 5px 8px",
          position: "absolute",
          width: "300px",
          zIndex: 2000,
          paddingBottom: "6px",
          left: "50%",
          marginLeft: "-150px"
        }}
      >
        <input
          style={{
            width: "calc(100% - 8px)",
            margin: "4px",
            padding: "4px",
            boxSizing: "border-box",
            color: "rgb(97, 97, 97)"
          }}
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
      </div>
    );
  }
}

const QuickInput = ({ options, ...props }) => (
  <div style={{ position: "absolute", top: "50px", right: "50%" }}>
    {options.type === "input" ? (
      <Input {...props} options={options} />
    ) : (
      <Picker {...props} options={options} />
    )}
  </div>
);

export default QuickInput;
