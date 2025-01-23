import { useState, useEffect, ReactNode } from "react";

type Props = {
  error?: string; 
  children: ReactNode; 
}

const ErrorBoundary = ({ children, error: propError }: Props): React.JSX.Element => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (propError) {
      setHasError(true);
    }
  }, [propError]);

  const handleError = (error: Error, info: string) => {
    console.error("Возникла ошибка!", error, info);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error, event.message);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError || propError) {
    return (
      <section>
        <h1>Что-то пошло не так :(</h1>
        <p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
        {propError && <pre>{propError}</pre>}
      </section>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
