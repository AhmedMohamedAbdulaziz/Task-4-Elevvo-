import { useMemo, useState } from 'react'
import './App.css'

const CATEGORIES = ['All', 'Tech', 'Travel', 'Food']

const POSTS = [
	{
		id: 1,
		title: 'Building a React App with Vite',
		image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
		description: 'Step-by-step guide to set up a blazing-fast React project using Vite and best practices.',
		date: '2025-06-01',
		category: 'Tech',
	},
	{
		id: 2,
		title: 'Exploring Kyoto in 3 Days',
		image: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=650,height=400,dpr=2/tour_img/a3e320826b60d981.jpeg',
		description: 'Temples, tea houses, and hidden streets: a compact itinerary for Kyoto.',
		date: '2025-05-21',
		category: 'Travel',
	},
	{
		id: 3,
		title: 'Perfect Homemade Ramen',
		image: 'https://tse3.mm.bing.net/th/id/OIP.qo7BTV567o4LfRAkqFP7nQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
		description: 'Comfort in a bowl: broth, noodles, and toppings you can make at home.',
		date: '2025-05-12',
		category: 'Food',
	},
	{
		id: 4,
		title: 'TypeScript Tips for React Developers',
		image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop',
		description: 'Type safety without the headache: patterns that scale well.',
		date: '2025-04-30',
		category: 'Tech',
	},
	{
		id: 5,
		title: 'Street Food Tour in Bangkok',
		image: 'https://th.bing.com/th/id/R.0ec90b77be9e7b577e272f73887e0a96?rik=BVvoqRBxhfkuaA&pid=ImgRaw&r=0',
		description: 'From pad thai to mango sticky rice: where to eat and what to try.',
		date: '2025-04-18',
		category: 'Food',
	},
	{
		id: 6,
		title: 'Hiking the Dolomites',
		image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
		description: 'Scenic routes, essential gear, and safety tips for your mountain adventure.',
		date: '2025-03-29',
		category: 'Travel',
	},
	{
		id: 7,
		title: 'State Management: Context vs Redux',
		image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
		description: 'Choosing the right tool for your app size and team workflow.',
		date: '2025-03-10',
		category: 'Tech',
	},
	{
		id: 8,
		title: 'Neapolitan Pizza at Home',
		image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop',
		description: 'High-heat baking, proper dough fermentation, and classic toppings.',
		date: '2025-02-25',
		category: 'Food',
	},
]

function Header() {
	return (
		<header className="blog-header">
			<h1 className="blog-title">My Personal Blog</h1>
			<p className="blog-subtitle">Thoughts on tech, travels, and tasty bites</p>
		</header>
	)
}

function CategoryFilter({ categories, selectedCategory, onChange }) {
	return (
		<select
			aria-label="Filter by category"
			className="category-select"
			value={selectedCategory}
			onChange={(e) => onChange(e.target.value)}
		>
			{categories.map((cat) => (
				<option key={cat} value={cat}>
					{cat}
				</option>
			))}
		</select>
	)
}

function SearchBar({ value, onChange }) {
	return (
		<input
			type="text"
			placeholder="Search posts by title..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="search-input"
		/>
	)
}

function PostCard({ post, onSelect }) {
	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onSelect?.(post)
		}
	}

	return (
		<article
			className="post-card"
			role="button"
			tabIndex={0}
			onClick={() => onSelect?.(post)}
			onKeyDown={handleKeyDown}
			aria-label={`Open post ${post.title}`}
		>
			<div className="post-image-wrapper">
				<img className="post-image" src={post.image} alt={post.title} />
			</div>
			<div className="post-content">
				<h3 className="post-title">{post.title}</h3>
				<p className="post-description">{post.description}</p>
				<div className="post-meta">
					<span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
					<span className="post-category">{post.category}</span>
				</div>
			</div>
		</article>
	)
}

function PostDetails({ post, onClose }) {
	if (!post) return null
	return (
		<article className="details-card" aria-label={`${post.title} full details`}>
			<header className="details-header">
				<h2 className="details-title">{post.title}</h2>
				<button className="details-close" onClick={onClose} aria-label="Close details">×</button>
			</header>
			<div className="details-body">
				<div className="details-image-wrapper">
					<img className="details-image" src={post.image} alt={post.title} />
				</div>
				<p className="details-description">{post.description}</p>
				<div className="details-meta">
					<span>{new Date(post.date).toLocaleDateString()}</span>
					<span className="post-category">{post.category}</span>
				</div>
			</div>
		</article>
	)
}

function Pagination({ currentPage, totalPages, onPageChange }) {
	if (totalPages <= 1) return null
	const canPrev = currentPage > 1
	const canNext = currentPage < totalPages
	return (
		<nav className="pagination" aria-label="Pagination">
			<button
				className="page-button"
				onClick={() => canPrev && onPageChange(currentPage - 1)}
				disabled={!canPrev}
			>
				Prev
			</button>
			<span className="page-status">
				Page {currentPage} of {totalPages}
			</span>
			<button
				className="page-button"
				onClick={() => canNext && onPageChange(currentPage + 1)}
				disabled={!canNext}
			>
				Next
			</button>
		</nav>
	)
}

function App() {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedPost, setSelectedPost] = useState(null)
	const pageSize = 6

	const filteredPosts = useMemo(() => {
		const term = searchTerm.trim().toLowerCase()
		return POSTS.filter((p) => {
			const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
			const matchTitle = !term || p.title.toLowerCase().includes(term)
			return matchCategory && matchTitle
		})
	}, [selectedCategory, searchTerm])

	const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
	const startIndex = (currentPage - 1) * pageSize
	const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize)

	function handleCategoryChange(category) {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	function handleSearchChange(value) {
		setSearchTerm(value)
		setCurrentPage(1)
	}

	return (
		<main className="blog-container">
			<Header />
			<section className="toolbar">
				<SearchBar value={searchTerm} onChange={handleSearchChange} />
				<CategoryFilter
					categories={CATEGORIES}
					selectedCategory={selectedCategory}
					onChange={handleCategoryChange}
				/>
			</section>

			{selectedPost && (
				<section className="details-section">
					<PostDetails post={selectedPost} onClose={() => setSelectedPost(null)} />
				</section>
			)}

			<section className="posts-section">
				{currentPosts.length === 0 ? (
					<div className="empty-state">No posts found.</div>
				) : (
					<div className="posts-grid">
						{currentPosts.map((post) => (
							<PostCard key={post.id} post={post} onSelect={setSelectedPost} />
						))}
					</div>
				)}
			</section>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</main>
	)
}

export default App
