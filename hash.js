import { readFileSync} from 'node:fs'

import { createHmac, randomUUID } from 'node:crypto'
import { encode } from 'node:punycode';

let fileContent = readFileSync('Дым и Комок.txt', 'utf8')
// console.log(fileContent)
const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update(fileContent)
               .digest('hex')
console.log(hash)
// console.log(fileContent.slice(0, -1))

const hash1 = createHmac('sha256', secret)
               .update(fileContent.slice(0, -1))
               .digest('hex')
console.log(hash1)

const hash2 = createHmac('sha256', secret)
               .update('password')
               .digest('hex')
console.log(hash2)

const head = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'jwt' })).toString('base64')
const payload = Buffer.from(JSON.stringify({
    id: randomUUID(),
    data: ['some data']
})).toString('base64')
const signature = createHmac('SHA256', secret)
        .update(`${head}.${payload}`)
        .digest('base64')

console.log(`\n\n\nTOKEN IS: ${head}.${payload}.${signature}`);





