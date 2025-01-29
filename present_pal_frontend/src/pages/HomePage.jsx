import { Clock, ListTodo, DollarSign, Smile } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import present from '../assets/present.png';
import mobile from '../assets/mobileapp.png';

const Homepage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="flex-1 max-w-xl">
						<h1 className="text-4xl font-bold mb-4">PresentPal</h1>
						<h2 className="text-2xl mb-6">Plan. Shop. Joy.</h2>
						<p className="text-gray-700 mb-6">
							Take the stress out of purchasing gifts for events with PresentPal.
							PresentPal will help you organise your gift purchasing, ensuring that
							no last-minute dash to the shops is required and you will have more time
							to enjoy special events with your loved ones.
						</p>
						<p className="text-gray-700 mb-8">
							Simple and easy to use. Start planning your gift shopping with PresentPal today.
						</p>
						<div className="flex gap-4">
							<button className="bg-pink-400 text-white px-8 py-3 rounded-md hover:bg-pink-500 transition-colors">
								<Link to="/signup">JOIN NOW</Link>
							</button>
							<button className="border-2 border-gray-300 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors">
								<Link to="/login">LOG IN</Link>
							</button>
						</div>
					</div>

					<div className="flex-1 flex justify-center">
						<div className="relative">
							<div className="w-64 h-[500px] bg-gray-200 rounded-[40px] p-3">
								<div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
									<img
										src={mobile}
										alt="PresentPal mobile app preview"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="bg-gray-50 py-16">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
						<div className="flex flex-col items-center text-center">
							<div className="mb-6 p-6 rounded-full bg-pink-100">
								<Clock className="h-12 w-12 text-purple-800" />
							</div>
							<h3 className="text-xl font-medium">Save time</h3>
						</div>

						<div className="flex flex-col items-center text-center">
							<div className="mb-6 p-6 rounded-full bg-pink-100">
								<ListTodo className="h-12 w-12 text-purple-800" />
							</div>
							<h3 className="text-xl font-medium">Plan ahead</h3>
						</div>

						<div className="flex flex-col items-center text-center">
							<div className="mb-6 p-6 rounded-full bg-pink-100">
								<DollarSign className="h-12 w-12 text-purple-800" />
							</div>
							<h3 className="text-xl font-medium">Monitor your budget</h3>
						</div>

						<div className="flex flex-col items-center text-center">
							<div className="mb-6 p-6 rounded-full bg-pink-100">
								<Smile className="h-12 w-12 text-purple-800" />
							</div>
							<h3 className="text-xl font-medium">Eliminate stress</h3>
						</div>
					</div>
				</div>
			</div>

			{/* About Section */}
			<div className="max-w-7xl mx-auto px-4 py-16">
				<p className="text-purple-800 font-medium mb-2">LEARN MORE</p>
				<h2 className="text-3xl font-bold mb-8">About Us</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div>
						<p className="text-gray-700 mb-6">
							PresentPal is a web application designed to streamline gift planning
							and purchasing, starting with a focus on Christmas shopping and with
							the potential to expand into birthday and other event planning. The
							platform aims to eliminate the stress of last-minute shopping and
							provide a more organized and thoughtful approach to gift-giving.
						</p>
						<p className="text-gray-700">
							PresentPal's mission is to simplify holiday/event gift shopping by
							providing a seamless platform where users can create organized lists
							for special events and gifts. Whether for personal use or to help
							find the perfect gift for loved ones, PresentPal makes easy tracking
							of items and their sources, making gift-giving more thoughtful,
							efficient and enjoyable.
						</p>
					</div>
					<div className="flex justify-center">
						<img
							src={present}
							alt="Person using PresentPal"
							className="rounded-lg shadow-lg w-full max-w-2xl h-auto object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;