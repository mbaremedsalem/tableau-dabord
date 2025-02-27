import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'

import Router from './Routes/router'
import '@ant-design/v5-patch-for-react-19';


const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n";

function App() {
  

  return (
    <I18nextProvider i18n={i18n}>

    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools
      initialIsOpen={false}
      buttonPosition="bottom-right"
    />
    <Router />
    <ToastContainer />
  </QueryClientProvider>
  </I18nextProvider>

  )
}

export default App
