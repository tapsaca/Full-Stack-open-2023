interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  if (!props.message) return null;

  return (
    <div style={{ color: 'red' }}>
      {props.message}
    </div>
  );
};

export default ErrorMessage;