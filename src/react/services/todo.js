import { openDB } from '@/shared/db'

const DB_OPTIONS = {
  dbName: 'reactTodoDb',
  dbVersion: 1,
  storeName: 'todoStore',
  initialData: [
    { title: 'make todo app', parent: null, is_done: true },
    { title: 'deploy to github pages', parent: null, is_done: true },
    { title: 'take a nap', parent: null, is_done: false }
  ]
}

/**
 * @param {('readonly'|'readwrite')} mode 
 */
const getTodoStore = async (mode) => {
  const db = await openDB(DB_OPTIONS)

  const transaction = db.transaction([DB_OPTIONS.storeName], mode)
  const todoStore = transaction.objectStore(DB_OPTIONS.storeName)

  return todoStore
}

export default {
  async getAll () {
    const store = await getTodoStore()

    return new Promise((resolve, reject) => {
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async create (todo) {
    const store = await getTodoStore('readwrite')

    return new Promise((resolve, reject) => {
      const request = store.add(todo)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async patch (id, updatedData) {
    const store = await getTodoStore('readwrite')

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id)

      getRequest.onsuccess = () => {
        const existingEntry = getRequest.result

        Object
          .entries(updatedData)
          .forEach(([key, value]) => {
            existingEntry[key] = value
          })

        const putRequest = store.put(existingEntry)

        putRequest.onsuccess = () => resolve(putRequest.result)
        putRequest.onerror = () => reject(putRequest.error)
      }

      getRequest.onerror = () => reject(getRequest.error)
    })
  },

  async setIsDone (id, isDone) {
    return this.patch(id, { is_done: isDone })
  },

  async delete (id) {
    const store = await getTodoStore('readwrite')

    return new Promise((resolve, reject) => {
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }
}
