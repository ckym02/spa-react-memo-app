import { useAuthContext } from '../../contexts/authContext';

export const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const handleLoginButtonClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div style={{ paddingTop: 10, paddingRight: 40, textAlign: 'right' }}>
      <button onClick={handleLoginButtonClick}>
        {isLoggedIn ? 'ログアウト' : 'ログイン'}
      </button>
    </div>
  );
};
