export const getAuth = jest.fn().mockImplementationOnce(() => ({
  languageCode: 'ko',
}));

export const GoogleAuthProvider = jest.fn();

export const GithubAuthProvider = jest.fn();

export const signInWithRedirect = jest.fn();

export const getRedirectResult = jest.fn();

export const signOut = jest.fn();

export const updateProfile = jest.fn();

export const setPersistence = jest.fn();

export const onIdTokenChanged = jest.fn();

export const deleteUser = jest.fn();

export const reauthenticateWithRedirect = jest.fn();

export const AuthErrorCodes = {
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
  TIMEOUT: 'auth/timeout',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
  TOKEN_EXPIRED: 'auth/user-token-expired',
};
