

const handleSignin = (req,res,db,bcrypt) =>{
 db.select('email','hash')
 .from('login')
 .where('email','=',req.body.email)
 .then(data => {
 	const isvalid = bcrypt.compareSync(req.body.password,data[0].hash);
 	if(isvalid)
 	{
 		return db.select('*').from('users')
 		.where('email','=',req.body.email)
 		.then(data =>{
 			res.json(data[0])
 		})	
 		.catch(err=> res.status(400).json('unable to sign in'))
 	}
 	else
 	{
 		res.status(400).json('wrong credentials');
 	}
 })
 .catch(err =>res.status(400).json('wrong credentials') )
}

module.exports = {
	handleSignin: handleSignin
}