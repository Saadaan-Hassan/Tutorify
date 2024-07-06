import React from "react";
import CustomOption from "./custom/CustomOption";

const Options = ({ options, selectedOptions, multiSelect, onPress }) => {
	return (
		<>
			{options.map((option, index) => (
				<CustomOption
					key={index}
					option={option}
					selected={
						multiSelect
							? selectedOptions.includes(index)
							: selectedOptions === index
					}
					onPress={() => onPress(index)}
				/>
			))}
		</>
	);
};

export default Options;
