import React, { useEffect, useState } from "react";

// Use states
const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");

	// Function to add a Task.
	const AddTask = () => {
		const newTodos = todos.concat({
			label: task,
			done: false,
			id: todos.length
		});
		setTodos(newTodos);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/dianaware", {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
			})
			.catch(error => {
				console.log(error);
			});
		console.log(newTodos);
	};

	// Function to delete a task and update back end with fetch PUT
	const deleteTask = id => {
		const editedTodos = todos.filter(todo => todo.id !== id);
		setTodos(editedTodos);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/dianaware", {
			method: "PUT",
			body: JSON.stringify(editedTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
			})
			.catch(error => {
				console.log(error);
			});
		console.log(editedTodos);
	};

	// FETCH GET EVERYTIME I RE RENDER PAGE
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dianaware")
			.then(res => res.json())
			.then(data => {
				setTodos(data);
				console.log(data);
			})
			.catch(error => console.log(error));
	}, []);

	// FETCH DELETE
	const deleteAll = () => {
		setTodos([]);
		doPutFetch();
	};

	const doPutFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/dianaware", {
			method: "PUT",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(responseAsJson => {
				console.log(responseAsJson);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div>
			<input
				type="text"
				value={task}
				onChange={e => {
					setTask(e.target.value);
				}}
			/>
			<button onClick={AddTask}>Add</button>

			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={index}>
							{todo.label}
							<button onClick={() => deleteTask(todo.id)}>
								X
							</button>
						</li>
					);
				})}
			</ul>
			<button onClick={deleteAll}>Delete All </button>
		</div>
	);
};

export default ToDoList;
