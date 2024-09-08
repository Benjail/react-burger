import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Возникла ошибка!", error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError || this.props.error) {
      return (
        <section>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
          <pre>{this.props.error}</pre>
        </section>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  error: PropTypes.string,
};
