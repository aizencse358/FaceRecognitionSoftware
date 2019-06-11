import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({oninputchange,buttonsubmit}) => {
	return (
		<div>
		<p className='f3'>
		{'It detects faces from pictures.Give it a shot.'}
		</p>
		<div className='center'>
		<div className=' form center pa4 br3 shadow-5'>
		<input className='f4 pa2  center' type='tex' onChange={oninputchange}/>
		<button className=' grow f4 link ph3 pv2 dib white bg-light-purple' onClick={buttonsubmit}>Detect</button>
		</div>
		</div>
		</div>



		);
}

export default ImageLinkForm;