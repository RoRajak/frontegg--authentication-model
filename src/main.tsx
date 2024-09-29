
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  clientId: import.meta.env.VITE_CLIENT_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const authOptions = {
  keepSessionAlive: true 
};
console.log("url"+import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(
  <FronteggProvider
    contextOptions={contextOptions}
  
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>
);
