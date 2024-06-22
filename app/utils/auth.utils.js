import jwt from 'jsonwebtoken'

export const generateToken = id => {
	console.log(id)
	return jwt.sign(
		{
			id
		},
		process.env.JWT_SECRET,
		{ expiresIn: '10d' }
	)
}
