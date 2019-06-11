import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageurl,box}) => {
	return (
		<div className='mw5 mw7-ns center pa3 ph5-ns'>
		<div className='absolute mt2 '>
		<img id='inputimage' alt='' src={imageurl} width='500px' height='auto'/>
		<div className='boundingbox' style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow }}></div>
		</div>
		</div>



		);
}

export default FaceRecognition;