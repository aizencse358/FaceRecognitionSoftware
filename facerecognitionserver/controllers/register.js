

const handleRegister = (req,res,db,bcrypt) =>{
	const {email,password,name} =req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginemail => {
	return trx('users')
			.returning('*')
			.insert({
				email: loginemail[0],
				name: name,
				time: new Date()
			})
			.then(user => {
			res.json(user[0]);
	})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err => res.status(400).json('unable to register'))
	
}

module.exports = {
	handleRegister : handleRegister
};