import React from "react";

import Preview from "./preview";
import { Navigator } from "react-smooshpack";

export default class BrowserPreview extends React.PureComponent {
  render() {
    const { className } = this.props;

    return (
      <div
        className={`BrowserPreview container ${className}`}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Navigator />
        <Preview style={{ flex: 1 }} />
      </div>
    );
  }
}
