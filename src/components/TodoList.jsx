import {Fragment, useState, useRef} from 'react';
import TodoItem from './TodoItem';

//Importar id aleatorio y unico
import uuid4 from 'uuid4';


const TodoList = () => {
	const [todos, setTodos] = useState([
		{id: 1, tarea: 'Tarea 1: Comprar pan', estado: false},
		{id: 2, tarea: 'Tarea 2: Comprar leche', estado: true},
		{id: 3, tarea: 'Tarea 3: Comprar huevos', estado: true},
		{id: 4, tarea: 'Tarea 4: Comprar azúcar', estado: false},
		{id: 5, tarea: 'Tarea 5: Comprar sal', estado: false},
	]);

	const tareaRef = useRef();

	const agregarTarea = () => {
		const tarea = tareaRef.current.value.trim();
		tareaRef.current.value = null;
		if(tarea === '') return;
		
		setTodos((prevTodos) =>{
			const nuevaTarea = {
				id : uuid4(),
				tarea: tarea,
				estado: false
			}
			return[...prevTodos, nuevaTarea]
		})

	}

	return (
		<Fragment>
			<h1 className="display-5 my-3">Lista de tareas ✔️😎</h1>

			<div className="input-group my-5">
				<input type="text" className="form-control" ref={tareaRef} placeholder='Agregar tareas'/>
				<div className="btn btn-primary ms-2" onClick={agregarTarea}>
					<i className="bi bi-clipboard-plus"></i>
				</div>
				<div className="btn btn-danger ms-2">
					<i className="bi bi-trash3"></i>
				</div>
			</div>

			<ul className="list-group mt-5">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
		</Fragment>
	);
};

export default TodoList;
