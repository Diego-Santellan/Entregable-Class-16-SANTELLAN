class CartContainer {

    constructor() {
        this.elementos = []
    }

    toList(id) {
        const obj = this.elementos.find(obj => obj.id == id)
        return obj || { error: `elemento no encontrado` }
    }

    toListAll() {
        return [...this.elementos]
    }

    save(obj) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...obj, id: newId }
        this.elementos.push(newElem)
        return newElem
    }

    update(obj, id) {
        const newElem = { id: Number(id), ...obj }
        const index = this.elementos.findIndex(p => p.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            this.elementos[index] = newElem
            return newElem
        }
    }

    delete(id) {
        const index = this.elementos.findIndex(obj => obj.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    deleteAll() {
        this.elementos = []
    }
}

export default CartContainer
