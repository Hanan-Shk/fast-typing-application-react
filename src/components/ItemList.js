import React from 'react'

const ItemList = ({ name, data, symble, ...rest }) => {
	return (
		<li className="list-item py-4 border text-white" {...rest}>
			{name}
			<span className="d-block display-6">
				{data}
				{symble && data > 0 ? <small>{symble}</small> : ''}
			</span>
		</li>
	)
}

export default ItemList
