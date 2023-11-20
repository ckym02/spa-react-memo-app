import { useState } from 'react';

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
