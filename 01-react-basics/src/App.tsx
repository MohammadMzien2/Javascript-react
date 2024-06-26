import { useState } from "react";
import Counter from "./components/Counter";
import Salary from "./components/Salary";
import "./App.css";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	]);
	const [showSalary, setShowSalary] = useState(false);
	const [inputPostTitle, setinputPostTitle] = useState("");

	console.log("App is being rendered");

	const handleAddLike = (post: Post) => {
		post.likes++;
		setPosts([...posts]);
	}

	const handleDeletePost = (postToDelete: Post) => {
		setPosts(posts.filter(post => post !== postToDelete));
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault();

		// Create new post
		const newPost: Post = {
			id: Math.max(...posts.map(post => post.id)) + 1,
			title: inputPostTitle,
			likes: 0,
			}
			posts.push(newPost);

			//Clear input field
			setinputPostTitle("");
		}

		return (
			<div className="container">
				<h1>01-react-basics</h1>

				<p>{msg}</p>

				<button onClick={() => setMsg("Hi dad!")} className="btn btn-warning">Hi dad?</button>

				<hr />

				<Counter />
				<Counter />

				<hr />

				<button onClick={() => setShowSalary(!showSalary)} className={!showSalary ? "btn btn-warning" : "btn btn-danger"}>
					{!showSalary ? "Show salary" : "Hide salary"}
				</button>

				{showSalary && <Salary />}

				<hr />

				<h2>Posts</h2>

				<form onSubmit={handleFormSubmit} className="mb-3">
					<div className="input-group">

						<input type="text" className="form-control" placeholder="Fun with Forms" required aria-label="Post Title" onChange={(e) => setinputPostTitle(e.target.value)} value={inputPostTitle} />

						<button type="submit" className="btn btn-success">
							Create
						</button>

					</div>
				</form>

				{posts.length > 0 && (
					<ul>
						{posts.map(post =>
							<li key={post.id}>
								{post.title} ({post.likes} likes)
								<button
									className="btn btn-success btn-sm ms-1"
									onClick={() => handleAddLike(post)}
								>❤️</button>
								<button
									className="btn btn-danger btn-sm ms-1"
									onClick={() => handleDeletePost(post)}
								>🗑️</button>
							</li>
						)}
					</ul>
				)}
			</div>
		);
	}

	export default App;
