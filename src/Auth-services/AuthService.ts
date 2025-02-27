
const AuthService = {
    getAccessToken: () => {
    
      return localStorage.getItem('accessToken')
    },
    
    getRefreshToken: () => {
      return localStorage.getItem('refrech_token')
    },
    
    getRoleUserConnect: () => {
      return localStorage.getItem('role_user_connect')
    },
    getFullNameUserConnect: () => {
      return localStorage.getItem('Full_Name_user_Connect')
    },
    getIDUserConnect: () => {
      return localStorage.getItem('id_user_Connect')
    },

    setAccessToken: (token:string) => {
      localStorage.setItem('accessToken', token)
    },
  
    setRefreshToken: (token:string) => {
      localStorage.setItem('refrech_token', token)
    },
  
  
    clearTokens: () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refrech_token')
      localStorage.removeItem('otpTimer')
      localStorage.removeItem('Full_Name_user_Connect')
      localStorage.removeItem('id_user_Connect')
      localStorage.removeItem('role_user_connect')
      // localStorage.clear()
    },
  
    isAccessTokenExpired: () => {
      const accessToken = AuthService.getAccessToken()
      if (!accessToken) {
        return true 
      }
  
      const expirationTimestamp = parseInt(accessToken, 10)
      const currentTimestamp = Math.floor(Date.now() / 1000)
      const expirationTimeWith3Minutes = expirationTimestamp + (1 * 60)
      return expirationTimeWith3Minutes < currentTimestamp
    },
  
    isAuthenticated: () => {
      return !!AuthService.getAccessToken() && !AuthService.isAccessTokenExpired()
    }
  }
  
  export default AuthService
  