import {Fragment, useState, useRef, useEffect} from 'react';
import TodoItem from './TodoItem';

//Importar id aleatorio y unico
import uuid4 from 'uuid4';

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	const tareaRef = useRef();

	const agregarTarea = () => {
		const tarea = tareaRef.current.value.trim();
		tareaRef.current.value = null;
		if (tarea === '') return;

		setTodos((prevTodos) => {
			const nuevaTarea = {
				id: uuid4(),
				tarea: tarea,
				estado: false,
			};
			return [...prevTodos, nuevaTarea];
		});
	};

	const cambiarEstadoTarea = (id) => {
		/* Obtener todas las tareas */
		const newTodos = [...todos];
		/* Buscar la tarea que quiero cambiar el estado */
		const todo = newTodos.find((todo) => todo.id === id);
		/* Cambiar el estado de la tarea */
		todo.estado = !todo.estado;
		setTodos(newTodos);
	};

	const eliminarTareas = () => {
		/* Filtras todas las tareas que no estan completadas */
		const tareas = todos.filter((todo) => !todo.estado);
		setTodos(tareas);
	};

	const contarTareas = () => {
		/* Contar todas las taras cuyo estado sea false "pendientes" */
		return todos.filter((todo) => !todo.estado).length;
	};

	const ResumenTareas = () => {
		const cantidad = contarTareas();
		if (cantidad === 0) {
			return (
				<div className="alert alert-success mt-3 text-center">
					Felicitaciones, No hay tareas pendientes 😎✔️
				</div>
			);
		}
		if (cantidad === 1) {
			return (
				<div className="alert alert-info mt-3 text-center">
					Te queda {cantidad} tarea pendiente 😊👍
				</div>
			);
		}
		if (cantidad > 9) {
			return (
				<div className="alert alert-danger mt-3 text-center">
					Te quedan {cantidad} tareas pendientes 😱😫
				</div>
			);
		}
		return (
			<div className="alert alert-warning mt-3 text-center">
				Te quedan {cantidad} tareas pendientes 😅🙄
			</div>
		);
	};

	/* LocalStorage */
	const KEY = 'todos';
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(KEY));
		if (setTodos) setTodos(storedTodos);
	}, []);

	useEffect(()=>{
		localStorage.setItem(KEY, JSON.stringify(todos));
	},[todos])


	return (
		<Fragment>
			<h1 className="display-5 my-3">Lista de tareas ✔️😎</h1>

			<div className="input-group my-5">
				<input
					type="text"
					className="form-control"
					ref={tareaRef}
					placeholder="Agregar tareas"
				/>
				<div className="btn btn-primary ms-2" onClick={agregarTarea}>
					<i className="bi bi-clipboard-plus"></i>
				</div>
				<div className="btn btn-danger ms-2" onClick={eliminarTareas}>
					<i className="bi bi-trash3"></i>
				</div>
			</div>

			<ul className="list-group mt-5">
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						cambiarEstado={cambiarEstadoTarea}
					/>
				))}
			</ul>

			<ResumenTareas />
		</Fragment>
	);
};

export default TodoList;
