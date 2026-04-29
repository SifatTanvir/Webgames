import { useState, useMemo, DragEvent } from 'react';
import { produce } from 'immer';

// ### Asset: SVG Icons ###
const DownloadIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='h-5 w-5 mr-2'
		viewBox='0 0 20 20'
		fill='currentColor'>
		<path
			fillRule='evenodd'
			d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
			clipRule='evenodd'
		/>
	</svg>
);

// ### Type Definitions ###
interface Suspect {
	id: number;
	name: string;
	alibi: string;
	img: string;
}

interface Weapon {
	id: number;
	name: string;
	img: string;
}

type GameState = 'playing' | 'solved' | 'failed';

// ### Main Component ###
const DetectiveAlibiContradiction = () => {
    // UPDATED STATE: Manages the entire game flow
	const [gameState, setGameState] = useState<GameState>('playing');
	const [dropState, setDropState] = useState<{ [key: number]: string | null }>({});

	const gameData = useMemo(() => {
		const allSuspectsPool = [
			{ name: 'Victor Vance', alibiTemplate: 'at the King’s Court Bistro from 7 PM to 9 PM.' },
			{ name: 'Laura Chen', alibiTemplate: 'volunteering at the City Animal Shelter all evening.' },
			{ name: 'Marcus "The Bull" Thorne', alibiTemplate: 'working out at the Iron Temple Gym until 10 PM.' },
			{ name: 'Eleanor Vance', alibiTemplate: 'attending a late-night lecture at Veritas University.' },
		];

		const allWeaponsPool = [
			{ name: 'Antique Dagger' },
			{ name: 'Lead Pipe' },
			{ name: 'Poisoned Chalice' },
			{ name: 'Heavy Wrench' },
		];

        const suspects: Suspect[] = allSuspectsPool.map((s, i) => ({
			id: i + 1,
			name: s.name,
			alibi: `Claims to have been ${s.alibiTemplate}`,
			img: `https://i.pravatar.cc/150?u=${s.name}`,
		}));

		const weapons: Weapon[] = allWeaponsPool.map((w, i) => ({
			id: i + 1,
			name: w.name,
			img: `https://picsum.photos/seed/${w.name}/100/100`,
		}));

        const culpritId = Math.floor(Math.random() * suspects.length) + 1;
        const correctWeaponId = weapons.find(w => w.name === 'Heavy Wrench')!.id;
        const culprit = suspects.find(s => s.id === culpritId)!;

        const currentDate = new Date('2025-07-18T15:05:16Z');
        const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

		const witnessStatement = `WITNESS STATEMENT - CONFIDENTIAL\n\nCase File: #734\nWitness: A local resident\nDate: ${formattedDate}\n\nStatement: "I was walking my dog near the old Polaris Observatory around 8:30 PM. It's usually deserted. I saw someone hurry out of the building. I couldn't see their face clearly, but they were carrying a heavy-looking tool bag. It struck me as odd."`;
		const securityLog = `CARD ACCESS LOG - POLARIS OBSERVATORY\nDATE: ${formattedDate}, 8:00 PM - 9:00 PM\n------------------------------------------------\nTIME,CARDHOLDER,ACCESS_POINT,STATUS\n20:21:04,MAINTENANCE_STAFF,MAIN_ENTRANCE,GRANTED\n20:32:15,${culprit.name.replace(/ /g, '_').toUpperCase()},SERVICE_TUNNEL_A,GRANTED\n20:55:40,MAINTENANCE_STAFF,MAIN_ENTRANCE,GRANTED`;
		const cityMapSVG = `<?xml version="1.0" encoding="UTF-8"?><svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#f0f0f0"/><text x="10" y="25" font-family="monospace" font-size="14" fill="#333">City Map</text><g><rect x="20" y="50" width="120" height="40" fill="#a2d2ff" rx="5"/><text x="25" y="75" font-family="monospace" font-size="10">${culprit.alibi.includes("Bistro") ? "King's Court Bistro" : culprit.alibi.includes("Shelter") ? "Animal Shelter" : culprit.alibi.includes("Gym") ? "Iron Temple Gym" : "Veritas University" }</text></g><g><rect x="180" y="140" width="100" height="40" fill="#ffafcc" rx="5"/><text x="185" y="165" font-family="monospace" font-size="10">Polaris Observatory</text></g><text x="25" y="120" font-family="monospace" font-size="10" fill="red">! Locations are on opposite sides of the city</text></svg>`;

		return {
			suspects: [...suspects].sort(() => Math.random() - 0.5),
			weapons: [...weapons].sort(() => Math.random() - 0.5),
			culpritId,
			correctWeaponId,
			evidence: { witnessStatement, securityLog, cityMapSVG },
		};
	}, []);

	const handleFileDownload = (content: string, fileName: string, mimeType: string) => {
		const blob = new Blob([content], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	
	const handleDragStart = (e: DragEvent<HTMLDivElement>, weaponId: number) => {
		if (gameState !== 'playing') e.preventDefault();
		e.dataTransfer.setData('weaponId', weaponId.toString());
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		if (gameState !== 'playing') return;
		e.preventDefault();
	};

    // UPDATED LOGIC: handleDrop now sets the final game state.
	const handleDrop = (e: DragEvent<HTMLDivElement>, suspectId: number) => {
		e.preventDefault();
        if (gameState !== 'playing') return; // Only allow one drop action

		const weaponId = parseInt(e.dataTransfer.getData('weaponId'), 10);
		const droppedWeapon = gameData.weapons.find(w => w.id === weaponId);
		
		if (!droppedWeapon) return;
		
        // Visually show the drop
		setDropState(produce(draft => {
			draft[suspectId] = droppedWeapon.img;
		}));

        // Check for correctness and set the final game state
		if (suspectId === gameData.culpritId && weaponId === gameData.correctWeaponId) {
			setGameState('solved');
		} else {
			setGameState('failed');
		}
	};
	
	const suspectGridCols = useMemo(() => {
		const options = ['grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'];
		return options[Math.floor(Math.random() * options.length)];
	}, []);

	const randomBg = useMemo(() => {
		const bgColors = [
			'bg-gray-800', 'bg-blue-900', 'bg-green-900', 'bg-purple-900', 'bg-pink-900', 'bg-yellow-900', 'bg-cyan-900'
		];
		return bgColors[Math.floor(Math.random() * bgColors.length)];
	}, []);

	return (
		<div className={`${randomBg} text-white min-h-screen font-sans p-4 sm:p-8`}>
			<div className='max-w-7xl mx-auto'>
				<header className='border-b border-gray-600 pb-4 mb-8'>
					<h1 className='text-3xl sm:text-4xl font-bold text-cyan-400'>Case #734: The Observatory Paradox</h1>
					<p className='text-gray-300 mt-2'>
						Analyze the evidence, find the contradiction in the suspect's alibi, and identify the culprit. You only get one chance.
					</p>
				</header>

				<main className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-1 bg-gray-900/50 p-6 rounded-lg shadow-lg'>
						<h2 className='text-2xl font-semibold mb-4 text-cyan-300 border-b border-gray-700 pb-2'>Evidence Locker</h2>
						<div className='space-y-4'>
							<button onClick={() => handleFileDownload(gameData.evidence.witnessStatement, 'Witness_Statement.txt', 'text/plain')} className='w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50' disabled={gameState !== 'playing'}>
								<DownloadIcon /> Witness Statement
							</button>
							<button onClick={() => handleFileDownload(gameData.evidence.securityLog, 'Security_Log.csv', 'text/csv')} className='w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50' disabled={gameState !== 'playing'}>
								<DownloadIcon /> Security Log
							</button>
							<button onClick={() => handleFileDownload(gameData.evidence.cityMapSVG, 'City_Map.svg', 'image/svg+xml')} className='w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50' disabled={gameState !== 'playing'}>
								<DownloadIcon /> City Map
							</button>
						</div>
						<div className='mt-8'>
							<h3 className='text-xl font-semibold mb-3 text-cyan-300 border-b border-gray-700 pb-2'>Possible Weapons</h3>
							<div className='grid grid-cols-2 gap-4'>
								{gameData.weapons.map((weapon) => (
									<div key={weapon.id} 
										 draggable={gameState === 'playing'}
										 onDragStart={(e) => handleDragStart(e, weapon.id)}
										 className={`flex flex-col items-center p-3 bg-gray-800 rounded-lg ${gameState === 'playing' ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed opacity-50'}`}>
										<img src={weapon.img} alt={weapon.name} className='w-16 h-16 object-cover rounded-md' />
										<p className='text-center text-sm mt-2 text-gray-300'>{weapon.name}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='lg:col-span-2'>
						<h2 className='text-2xl font-semibold mb-4 text-cyan-300'>Suspect Board</h2>
						<div className={`grid ${suspectGridCols} gap-6`}>
							{gameData.suspects.map((suspect) => (
								<div key={suspect.id} 
									 onDragOver={handleDragOver}
									 onDrop={(e) => handleDrop(e, suspect.id)}
									 className={`bg-gray-900/50 p-5 rounded-lg shadow-lg flex flex-col space-y-4 transition-all duration-300 border-2 ${gameState === 'playing' ? 'border-transparent hover:border-cyan-500' : 'border-transparent'}`}>
									<div className='flex items-center space-x-4'>
										<img src={suspect.img} alt={suspect.name} className='w-16 h-16 rounded-full border-2 border-gray-600' />
										<div>
											<h3 className='text-xl font-bold text-white'>{suspect.name}</h3>
											<p className='text-sm text-gray-400'>Stated Alibi:</p>
										</div>
									</div>
									<p className='text-gray-300 italic bg-gray-800 p-3 rounded-md'>"{suspect.alibi}"</p>
									<div className={`flex-grow border-2 border-dashed border-gray-600 rounded-lg min-h-[80px] flex items-center justify-center bg-gray-800/50 ${gameState !== 'playing' ? 'opacity-50' : ''}`}>
										{dropState[suspect.id] ? (
											<div className='flex flex-col items-center'>
												<img src={dropState[suspect.id]!} alt="dropped weapon" className='w-14 h-14 object-cover rounded-md' />
												<p className='text-xs text-yellow-400 mt-1'>Weapon Linked</p>
											</div>
										) : (
											<p className='text-gray-500'>Drag Weapon Here</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</main>
				
				{/* UPDATED MODAL: Shows success or failure and does NOT close */}
				{gameState !== 'playing' && (
					<div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4'>
                        {gameState === 'solved' ? (
                            <div className='bg-gray-800 border-2 border-green-500 rounded-lg p-8 shadow-2xl text-center max-w-2xl w-full'>
                                <h2 className='text-3xl font-bold text-green-400 mb-4'>Case Solved!</h2>
                                <p className='text-gray-300 mb-6'>
                                    Excellent detective work! You found the contradiction and identified the true culprit.
                                </p>
                                <div className='bg-gray-900 p-4 rounded-lg'>
                                    <p className='text-gray-400 text-sm mb-1'>PASSWORD:</p>
                                    <p className='text-2xl font-mono tracking-widest text-white animate-pulse'>{PASSWORD_AlibiContradiction}</p>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-gray-800 border-2 border-red-500 rounded-lg p-8 shadow-2xl text-center max-w-md w-full'>
                                <h2 className='text-3xl font-bold text-red-400 mb-4'>Case Unsolved</h2>
                                <p className='text-gray-300'>
                                    That's not the right conclusion, detective. The evidence pointed elsewhere. The case remains open.
                                </p>
                            </div>
                        )}
					</div>
				)}
			</div>
		</div>
	);
};

export const TASK_ID_AlibiContradiction = 'webgame-detective-solvebycontradiction';
export const PASSWORD_AlibiContradiction = 'CONTRADICTION_78er34ew_SUCCESS';
export default DetectiveAlibiContradiction;