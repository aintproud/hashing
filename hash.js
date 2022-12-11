import { readFileSync } from 'node:fs'
import { createHmac, randomUUID, scrypt, scryptSync } from 'node:crypto'
import { hrtime } from 'node:process';
import { waitForDebugger } from 'node:inspector';
import { scheduler } from 'node:timers/promises';
const secret = 'abcdefg';
const sha256 = (data, code) => createHmac('sha256', secret).update(data).digest(code)


const fileContent = readFileSync('Дым и Комок.txt', 'utf8')

const hash = sha256(fileContent, 'hex')
console.log(hash)

const hash1 = sha256(fileContent.slice(0, -1), 'hex')
console.log(hash1)


const password = 'random password'

console.time('sha256')
const hash2 = sha256(password, 'hex')
console.log(hash2)
console.timeEnd('sha256');

console.time('scrypt')
const hash22 = scryptSync(password, 'salt', 32).toString('hex')
console.log(hash22)
console.timeEnd('scrypt')




const head = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'jwt' })).toString('base64')
const payload = Buffer.from(JSON.stringify({
    id: randomUUID(),
    data: ['some data']
})).toString('base64')
const signature = sha256(`${head}.${payload}`, 'base64')

console.log(`\n\n\nTOKEN IS: ${head}.${payload}.${signature}`);




