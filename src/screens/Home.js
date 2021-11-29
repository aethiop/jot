import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Typo } from "../components/Typo";
import { FilledButton } from "../components/Button";
import { useAuth, useAuthDispatch, logoutUser } from "../contexts";
export default function Home() {
	const profile = useAuth();
	const dispatch = useAuthDispatch();
	return (
		<View>
			<Typo size="xl" weight="bold">
				Welcome, {profile.username}
			</Typo>
			<Typo size="sm" weight="100" color="#505050">
				{profile.key}
			</Typo>
			<FilledButton onPress={() => logoutUser(dispatch)}>
				Logout
			</FilledButton>
		</View>
	);
}
