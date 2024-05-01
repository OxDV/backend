import express from 'express'
import { ethers } from 'ethers'
import config from './config.js'

const app = express()
const port = 3000

const provider = new ethers.JsonRpcProvider(config.jsonRpcUrl)
const wallet = ethers.Wallet.fromPhrase(config.mnemonic).connect(provider)
const contract = new ethers.Contract(
	config.contractAddress,
	config.contractAbi,
	wallet
)

const tokenAddress = '0x0000000000000000000000000000000000000000'
const amount = ethers.parseEther('0.001')
console.log(amount);
app.get('/', (req, res) => res.send(`It works`))

app.get('/withdraw-funds', async (req, res) => {
	try {
		const tx = await contract.withdrawFunds(
			tokenAddress,
			amount
		)
		await tx.wait()
		res.send(`Средства успешно выведены. Транзакция: ${tx.hash}`)
	} catch (error) {
		res.status(500).send(`Ошибка при выводе средств: ${error.message}`)
	}
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
