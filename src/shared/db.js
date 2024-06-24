/**
 * @param {Object} options 
 * @param {string} dbName
 * @param {number} dbVersion
 * @param {string} storeName
 * @param {any[]} initialData 
 */
export const openDB = (options) => new Promise((resolve, reject) => {
  const {
    dbName,
    dbVersion,
    storeName,
    initialData
  } = options

  const request = window.indexedDB.open(dbName, dbVersion)

  request.onerror = () => {
    reject(new Error('Database error'))
  }

  request.onupgradeneeded = (event) => {
    const db = event.target.result
    const objectStoreNames = db.objectStoreNames

    if (!objectStoreNames.contains(storeName)) {
      const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })

      if (initialData.length) {
        initialData.forEach(data => {
          store.add(data)
        })
      }
    }
  }

  request.onsuccess = (event) => {
    const db = event.target.result

    resolve(db)
  }
})
