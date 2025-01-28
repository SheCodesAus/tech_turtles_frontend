import ToggleSwitch from './ToggleSwitch';
import { Square, SquareCheckBig, Trash2 } from 'lucide-react';
import './ListItem.css';
import { Link } from 'react-router-dom';
import Button from './Button';

const ListItem = (props) => {
	return (
		<div className='list-item--container'>
			<h3 className='list-item--title'>{props.name}</h3>
			<ToggleSwitch />
			<div className='list-item--table-container'>
				<table className='list-item--table'>
					<thead>
						<tr>
							<th>Product name</th>
							<th>Store</th>
							<th>Price</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{props.products.map(product => (
							<tr key={product.id}>
								<td>
									<div
										className='list-item--table--head-column'
										style={{ cursor: 'pointer' }}
										onClick={() => props.onToggleComplete(product.id)}
									>
										{product.isCompleted ? <SquareCheckBig /> : <Square />}
										<span>{product.name}</span>
									</div>
								</td>
								<td>{product.store}</td>
								<td>{product.price}</td>
								<td>{product.notes}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='list-item-action--container'>
				<Link to={`lists/${props.id}`} style={{ marginRight: '1rem' }}>
					<Button size='small' variant='secondary'>Edit List</Button>
				</Link>
				<div className='list-item-bin'>
					<Trash2 color="#5B4B8A" size={24} />
				</div>
			</div>
		</div>
	);
};

export default ListItem;
