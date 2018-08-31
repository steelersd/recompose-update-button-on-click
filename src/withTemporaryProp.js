import React from "react";
import { wrapDisplayName, setDisplayName } from "recompose";

const withTemporaryProp = (
  timeout,
  propName,
  defaultValue = null
) => BaseComponent => {
  class withTemporaryProp extends React.Component {
    state = {
      [propName]: defaultValue
    };

    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }

    setTemporarily = tempValue => {
      this.setState({ [propName]: tempValue }, () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(
          () => this.setState({ [propName]: defaultValue }),
          timeout
        );
      });
    };

    render() {
      return (
        <BaseComponent
          {...this.props}
          {...this.state}
          setTemporarily={this.setTemporarily}
        />
      );
    }
  }

  return setDisplayName(wrapDisplayName(BaseComponent, "withTemporaryProp"))(
    withTemporaryProp
  );
};

export default withTemporaryProp;
