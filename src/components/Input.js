import React from "react";
import { StyleSheet, TextInput } from "react-native";
export const Input = (props) => {
	return (
		<TextInput
			{...props}
			style={styles.inputText}
			placeholderTextColor="#505050"
		/>
	);
};

const styles = StyleSheet.create({
	inputText: {
		margin: 20,
		width: "80%",
		height: 48,
		borderRadius: 12,
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		paddingHorizontal: 14,
		backgroundColor: "#1f1f1f",
	},
});
