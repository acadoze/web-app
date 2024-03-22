export async function validateToken(authToken) {
	return new Promise(async (re, rj) => {
		const check = await fetch(`${process.env["API_BASE"]}/auth/validate?tk=${authToken}`)
		resolve(check)
	})
}