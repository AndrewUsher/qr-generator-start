import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to QR Generator</h1>
      <p>This is a simple counter example to demonstrate server functions:</p>
      <button
        type="button"
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1.1rem',
          cursor: 'pointer',
        }}
      >
        Add 1 to {state}
      </button>
    </div>
  )
} 