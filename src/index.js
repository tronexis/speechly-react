import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import { Provider } from './context/context';
import App from './App';
import './index.css';
import { UserProvider } from "./context/userContext";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif", // Replace with the actual font name
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SpeechProvider
      appId="7c4aee08-1073-4a32-b862-ebe1850e0732"
      language="en-US"
    >
      <UserProvider>
        <Provider>
          <App />
        </Provider>
      </UserProvider>
    </SpeechProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
