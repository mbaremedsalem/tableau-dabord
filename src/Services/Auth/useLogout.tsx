
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import AuthService from "../../Auth-services/AuthService";

export async function logout() {
    AuthService.clearTokens()
}

export const useLogout = () => {
  //const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
};
