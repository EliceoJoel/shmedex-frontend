/* eslint-disable linebreak-style */
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SHMEDEX",
	description: "Share your recovery medical experiences",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
