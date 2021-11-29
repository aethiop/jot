import "react-native-get-random-values";
import PolyfillCrypto from "react-native-webview-crypto";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Main from "./src/screens/Main";
import { AuthProvider } from "./src/contexts";
export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<PolyfillCrypto />
			<AuthProvider>
				<Main />
				<StatusBar style="light" />
			</AuthProvider>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
		alignItems: "center",
		justifyContent: "center",
	},
});
