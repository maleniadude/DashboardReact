// ToggleSwitch.jsx
const ToggleSwitch = ({ label, isOn, onToggle }) => {
	return (
		<div className="flex items-center justify-between py-3 px-4 bg-gray-800 rounded-lg mb-2 flex-wrap sm:flex-nowrap">
			<span className="text-gray-200 text-sm sm:text-base mb-2 sm:mb-0 w-full sm:w-auto">
				{label}
			</span>
			<button
				onClick={onToggle}
				className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
					isOn ? "bg-green-500 justify-end" : "bg-gray-600 justify-start"
				}`}
			>
				<span className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300" />
			</button>
		</div>
	);
};

export default ToggleSwitch;
