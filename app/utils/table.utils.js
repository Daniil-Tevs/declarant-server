import { prisma } from '../prisma.js'
import { cache } from './cache.utils.js'

export const getStructureTable = table => {
	const tableList = cache.get('tables.json')

	if (tableList) {
		return tableList[table]
	} else {
		const models = {}

		const source = prisma._engine.datamodel.replace('}', '').split('model')
		source.shift()
		source.forEach(model => {
			const [name, info] = model
				.trim()
				.split('{')
				.map(e => e.trim())
			const fields = {}

			info.split('\r\n').forEach(row => {
				const options = []
				row
					.trim()
					.split(' ')
					.forEach(field => {
						if (field) options.push(field)
					})

				if (options.length >= 2 && !options[0].includes('@'))
					fields[options[0]] = {
						type: options[1].replace('?', ''),
						require: !(options[1] && options[1].includes('?'))
					}
			})

			models[name] = fields
		})

		const modelNameList = Object.keys(models)

		modelNameList.forEach(model => {
			const unusedFields = Object.keys(models[model]).filter(x =>
				modelNameList.includes(x)
			)
			unusedFields.forEach(field => {
				delete models[model][field]
			})
		})

		cache.set('tables.json', 24 * 216000, models)

		return models[table]
	}
}
