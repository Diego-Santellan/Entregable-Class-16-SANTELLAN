import knex from 'knex'

class SQLContainer {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async toList(id) {
        try {
            return this.knex.select('*').from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al toList por id: ${error}`)
        }
    }

    async toListAll() {
        try {
            return this.knex.select('*').from(this.tabla)
        } catch (error) {
            throw new Error(`Error al toList todo: ${error}`)
        }
    }

    async save(obj) {
        try {
            return this.knex.insert(obj).into(this.tabla)
        } catch (error) {
            throw new Error(`Error al save: ${error}`)
        }
    }

    async update(obj, id) {
        try {
            return this.knex.from(this.tabla).where('id', id).update(obj)
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }



    async delete(id) {
        try {
            return this.knex.delete().from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }

    async deleteAll() {
        try {
            return this.knex.delete().from(this.tabla)
        } catch (error) {
            throw new Error(`Error al delete: ${error}`)
        }
    }

    async deconnection() {
        await this.knex.destroy();
    }
}

export default SQLContainer