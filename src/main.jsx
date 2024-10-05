import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/Messages/AuthContext";
import { ChatContextProvider } from "./components/Messages/ChatContext";
import ErrorBoundary from "./utils/ErrorBoundary";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("whiteAlpha.900", "#292935")(props),
      color: mode("#292935", "whiteAlpha.900")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <ChatContextProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ChatContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
