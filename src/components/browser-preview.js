import React from "react";

import Preview from "./preview";
import { Navigator } from "react-smooshpack";

export default class BrowserPreview extends React.PureComponent {
  render() {
    const { style, ...props } = this.props;

    return (
      <div className={`BrowserPreview container`} style={style} {...props}>
        <Navigator />
        <Preview />
      </div>
    );
  }
}
