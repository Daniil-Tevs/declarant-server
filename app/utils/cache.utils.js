import fs from 'fs'

const cachePath = './cache/'

export const cache = {
	get: path => {
		if (fs.existsSync(cachePath + path)) {
			const { data, startTime, ttl } = JSON.parse(
				fs.readFileSync(cachePath + path)
			)
			if (Date.now() - startTime < ttl) return data
		}
		return false
	},
	set: (path, ttl, data) => {
		fs.writeFileSync(
			cachePath + path,
			JSON.stringify({ startTime: Date.now(), ttl, data })
		)
	}
}
