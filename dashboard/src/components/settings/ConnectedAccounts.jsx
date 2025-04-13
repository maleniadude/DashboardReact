import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ConnectedAccounts = () => {
	const [connectedAccounts, setConnectedAccounts] = useState([
		{ id: 1, name: "Google", connected: true, icon: "/google.png" },
		{ id: 2, name: "Facebook", connected: false, icon: "/facebook.svg" },
		{ id: 3, name: "Twitter", connected: true, icon: "/x.png" },
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newAccount, setNewAccount] = useState({ name: "", icon: "", connected: false });

	const handleAddAccount = () => {
		if (!newAccount.name.trim() || !newAccount.icon.trim()) return;

		const newEntry = {
			...newAccount,
			id: crypto.randomUUID(),
		};

		setConnectedAccounts([...connectedAccounts, newEntry]);
		setNewAccount({ name: "", icon: "", connected: false });
		setIsModalOpen(false);
	};

	const toggleConnection = (id) => {
		setConnectedAccounts((prev) =>
			prev.map((acc) => (acc.id === id ? { ...acc, connected: !acc.connected } : acc))
		);
	};

	return (
		<SettingSection icon={HelpCircle} title={"Connected Accounts"}>
			<AnimatePresence>
				{connectedAccounts.map((account) => (
					<motion.div
						key={account.id}
						className='flex items-center justify-between py-3'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						<div className='flex gap-1 items-center'>
							<img src={account.icon} alt='icon' className='size-6 object-cover rounded-full mr-2' />
							<span className='text-gray-300'>{account.name}</span>
						</div>
						<button
							className={`px-3 py-1 rounded ${
								account.connected ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
							} transition duration-200`}
							onClick={() => toggleConnection(account.id)}
						>
							{account.connected ? "Connected" : "Connect"}
						</button>
					</motion.div>
				))}
			</AnimatePresence>

			<button
				className='mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition duration-200'
				onClick={() => setIsModalOpen(true)}
			>
				<Plus size={18} className='mr-2' /> Add Account
			</button>

			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className='bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow-lg'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
						>
							<h3 className='text-lg font-semibold'>Add New Account</h3>

							<input
								type='text'
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Name (e.g. LinkedIn)'
								value={newAccount.name}
								onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
							/>

							<input
								type='text'
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Icon URL (e.g. /linkedin.svg)'
								value={newAccount.icon}
								onChange={(e) => setNewAccount({ ...newAccount, icon: e.target.value })}
							/>

							<div className='flex justify-end gap-2'>
								<button
									onClick={() => {
										setIsModalOpen(false);
										setNewAccount({ name: "", icon: "", connected: false });
									}}
									className='text-gray-300 hover:text-white'
								>
									Cancel
								</button>
								<button
									onClick={handleAddAccount}
									className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500'
								>
									Add
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</SettingSection>
	);
};

export default ConnectedAccounts;
