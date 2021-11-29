import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Typo } from "./Typo";
export const FilledButton = (props) => {
	return (
		<TouchableOpacity {...props} style={styles.filledButton}>
			<Typo size="md">{props.children}</Typo>
		</TouchableOpacity>
	);
};
export const TextButton = (props) => {
	return (
		<TouchableOpacity {...props} style={styles.textButton}>
			<Typo size="md" weight="bold">
				{props.children}
			</Typo>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	filledButton: {
		height: 48,
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#77A8F1",
	},

	textButton: {
		height: 48,
		paddingHorizontal: 20,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
});
