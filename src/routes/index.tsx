import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	return (
		<main className='w-full h-dvh flex flex-col items-center py-20'>
			<div className='w-md space-y-4'>
				<header className='space-y-1'>
					<h1 className='text-xl font-semibold'>lib</h1>
					<p>A library of components for building web applications.</p>
				</header>
			</div>
		</main>
	);
}
