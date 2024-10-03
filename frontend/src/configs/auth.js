let baseUrl = "/api/v1"

const authConfig = {
  account: baseUrl + '/private/user',
  login: baseUrl + '/public/login',
  walletLogin: baseUrl + '/public/loginWeb3',
  logout: baseUrl + '/public/logout',
  register: baseUrl + '/public/register',
  walletRegister: baseUrl + '/public/registerWeb3',
  sessionCookieName: 'sessionID',

  userDataName: 'userData',
};

export default authConfig;
