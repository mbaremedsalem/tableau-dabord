
import Swal, { SweetAlertResult } from 'sweetalert2'
import AuthService from '../../Auth-services/AuthService';



export const ALert_Retourne_Login = (): Promise<SweetAlertResult> => {
    return new Promise((resolve) => {
      const timeoutDuration = 500;
  
      const swalPromise = Swal.fire({
        title: "Vous avez été déconnecté pour cause d'inactivité",
        color: "#1C8244",
        customClass: {
          loader: "Is Loading",
          confirmButton: 'custom-button'
        },
        confirmButtonColor: "#1C8244",
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
        title: 'Vérifiez votre connexion Internet !',
        color: "#1C8244",
        customClass: {
          loader: "Is Loading",
          confirmButton: 'custom-button'
        },
        confirmButtonColor: "#1C8244",
      });
  
      swalPromise.then((result) => {
        resolve(result as SweetAlertResult);
  
        
      });
    });
  };