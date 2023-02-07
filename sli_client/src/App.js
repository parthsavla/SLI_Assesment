/** @format */

import React from "react"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route
						exact
						path="/"
						element={<LandingPage />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
