import React from "react";
import Downshift from "downshift";

const QuickInput = ({ dispatch, options }) => (
  <div style={{ position: "absolute", top: "50px", right: "50%" }}>
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
            placeholder="New ..."
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
  </div>
);

export default QuickInput;
