/** @format */

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import {GoogleOAuthProvider} from "@react-oauth/google"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<GoogleOAuthProvider clientId="671519952463-8acb4g4lqq9djo2sqrfcl4jsedjrp41t.apps.googleusercontent.com">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</GoogleOAuthProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
