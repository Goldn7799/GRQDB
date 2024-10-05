import MakeID from './modules/API/MakeID'

const fetching = await Promise.resolve(async () => {
  await fetch('http://localhost:8080/database/action/test1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      auth: 'pwPH67WhBsG7n8ZwBJ',
      dataId: 1,
      value: {
        id: `${MakeID(6)}`,
        username: `${MakeID(12)}`,
        lastlogin: Date.now()
      }
    })
  })
})

setInterval(() => {
  fetching().catch(() => {})
  console.log('a')
}, 10)
