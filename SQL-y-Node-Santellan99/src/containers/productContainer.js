import { promises as fs } from 'fs'

class productContainer {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async toList(id) {
        const objs = await this.toListAll()
        const buscado = objs.find(e => e.id == id)
        return buscado
    }

    async toListAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async save(obj) {
        const objs = await this.toListAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newElem = { ...obj, id: newId }
        objs.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al save: ${error}`)
        }
    }

    async update(obj, id) {
        const objs = await this.toListAll()
        const index = objs.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al update: no se encontró el id ${id}`)
        } else {
            objs[index] = obj
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al delete: ${error}`)
            }
        }
    }

    async delete(id) {
        const objs = await this.toListAll()
        const index = objs.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al delete: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al delete todo: ${error}`)
        }
    }
}

export default productContainer