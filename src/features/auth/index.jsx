import { useAuthContext } from '../../contexts/AuthContext';

export const Login = () => {
  const { isLoggedIn, login, logout } = useAuthContext();

  const handleLoginButtonClick = () => (isLoggedIn ? logout() : login());

  return (
    <div style={{ paddingTop: 10, paddingRight: 40, textAlign: 'right' }}>
      <button onClick={handleLoginButtonClick}>
        {isLoggedIn ? 'ログアウト' : 'ログイン'}
      </button>
    </div>
  );
};
