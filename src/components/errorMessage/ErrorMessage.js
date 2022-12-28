import Err from './error.gif';

const ErrorMessage = () => {
  return (
    <img
      src={Err}
      style={{
        margin: '0 auto',
        background: 'none',
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
      }}
      alt="Error"
    />
  );
};

export default ErrorMessage;
