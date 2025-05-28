import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/HeroSection'
import { MainCard } from '@/components/MainCard'

const filePath = 'count.txt'

async function readCount() {
	return Number.parseInt(
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
	return (
		<>
			<HeroSection />
			<MainCard />
		</>
	)
}
