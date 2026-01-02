// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {Toaster} from "react-hot-toast";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<App />
				<Toaster
					position="top-right"
					toastOptions={{
						duration: 4000,
						style: {
							background: "#ffffff",
							color: "#111827",
							border: "1px solid #e5e7eb",
							borderRadius: "0.5rem",
							padding: "0.875rem 1rem",
							boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
							fontSize: "0.875rem",
						},
						success: {
							iconTheme: {
								primary: "#10b981",
								secondary: "#ffffff",
							},
						},
						error: {
							iconTheme: {
								primary: "#ef4444",
								secondary: "#ffffff",
							},
						},
					}}
				/>
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>
);
