let baseUrl = "/api/v1"

const authConfig = {
  account: baseUrl + '/private/user',
  login: baseUrl + '/public/login',
<<<<<<< HEAD
  logout: baseUrl + '/public/logout',
  register: baseUrl + '/public/register',
=======
  walletLogin: baseUrl + '/public/loginWeb3',
  logout: baseUrl + '/public/logout',
  register: baseUrl + '/public/register',
  walletRegister: baseUrl + '/public/registerWeb3',
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
  sessionCookieName: 'sessionID',

  userDataName: 'userData',
};

export default authConfig;
