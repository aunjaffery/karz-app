import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import "@fontsource/rubik";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Auth from "./components/Auth/Auth";
import App from "./App";
import {
  customColors,
  customComponents,
  customConfig,
  customFonts,
} from "./services/theme";

const theme = extendTheme({
  fonts: customFonts,
  colors: customColors,
  components: customComponents,
  config: customConfig,
});
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Auth>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
);
