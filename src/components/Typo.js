import React from "react";
import { StyleSheet, Text } from "react-native";
export const Typo = (props) => {
	const sizes = { xs: 14, sm: 18, md: 20, lg: 24, xl: 36, xxl: 48 };
	return (
		<Text
			{...props}
			style={{
				color: props.color || "#fff",
				fontSize: sizes[props.size] || 18,
				fontWeight: props.weight || "normal",
			}}
		>
			{props.children}
		</Text>
	);
};
