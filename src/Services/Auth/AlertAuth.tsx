
import Swal, { SweetAlertResult } from 'sweetalert2'
import AuthService from '../../Auth-services/AuthService';



export const ALert_Retourne_Login = (): Promise<SweetAlertResult> => {
    return new Promise((resolve) => {
      const timeoutDuration = 500;
  
      const swalPromise = Swal.fire({
        title: 'You have been logged out for inactivity',
        color: "#1f4432",
        customClass: {
          loader: "Is Loading",
          confirmButton: 'custom-button'
        },
        confirmButtonColor: "#1f4432",
      });
  
      swalPromise.then((result) => {
        resolve(result as SweetAlertResult);
  
        if (!result.isConfirmed) {
          setTimeout(() => {
            AuthService.clearTokens();
            window.location.href = '/login';
          }, timeoutDuration);
        }
      });
    });
  };




  export const ALert_Retourne_check_cnx= (): Promise<SweetAlertResult> => {
    return new Promise((resolve) => {
      // const timeoutDuration = 500;
  
      const swalPromise = Swal.fire({
        title: 'Check your Internet connection !',
        color: "#1f4432",
        customClass: {
          loader: "Is Loading",
          confirmButton: 'custom-button'
        },
        confirmButtonColor: "#1f4432",
      });
  
      swalPromise.then((result) => {
        resolve(result as SweetAlertResult);
  
        
      });
    });
  };