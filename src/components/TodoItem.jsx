import {Fragment} from 'react';

const TodoItem = (props) => {
	return (
		<Fragment>
			<li className="list-group-item d-flex justify-content-between">
				{props.todo.tarea}
				<input type="checkbox" className='form-checked-input' checked={props.todo.estado}/>
			</li>
		</Fragment>
	);
};

export default TodoItem;
