import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { NotificationProvider } from "./context/NotificationContext"
import { ThemeProvider } from "./context/ThemeContext"

// Add Font Awesome CDN
const fontAwesomeCDN = document.createElement("link")
fontAwesomeCDN.rel = "stylesheet"
fontAwesomeCDN.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
document.head.appendChild(fontAwesomeCDN)
document.documentElement.setAttribute("data-theme", "inkspire");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
