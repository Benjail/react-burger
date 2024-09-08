import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ErrorBoundary = ({ children, error: propError }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (propError) {
      setHasError(true);
    }
  }, [propError]);

  const componentDidCatch = (error, info) => {
    console.error("Возникла ошибка!", error, info);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (error, info) => {
      componentDidCatch(error, info);
    };

    return () => {
       window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError || propError) {
    return (
      <section>
        <h1>Что-то пошло не так :(</h1>
        <p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
        <pre>{propError}</pre>
      </section>
    );
  }

  return children;
};

ErrorBoundary.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
