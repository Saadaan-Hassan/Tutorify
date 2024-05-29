import React from "react";
import { View, ScrollView } from "react-native";

const CustomFlatList = ({ data, child }) => {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={{ flexDirection: "row" }}>
				{data.map((item, index) => (
					<View key={index} style={{ marginRight: 10 }}>
						{child && React.cloneElement(child, { userData: item })}
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default CustomFlatList;
