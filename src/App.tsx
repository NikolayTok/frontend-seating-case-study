import './App.css';
import SeatingPlan from './components/SeatingPlan';
import Header from './components/Header';
import EventInfo from './components/EventInfo';
import Cart from './components/Cart';

function App() {

	return (
		<div className="flex flex-col grow">
			{/* header (wrapper) */}
			<Header />
			{/* main body (wrapper) */}
			<main className="grow flex flex-col justify-center">
				{/* inner content */}
				<div className="max-w-screen-lg m-auto p-4 flex flex-col-reverse lg:flex-row items-start grow gap-3 w-full">
					{/* seating card */}
					<SeatingPlan />
					{/* event info */}
					<EventInfo/>
				</div>
			</main>
			{/* bottom cart affix (wrapper) */}
			<Cart />
		</div>
	);
}

export default App;
