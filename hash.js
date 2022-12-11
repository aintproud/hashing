import { readFileSync } from 'node:fs'
import { createHmac, randomUUID, scrypt, scryptSync } from 'node:crypto'
const secret = 'abcdefg';
const sha256 = (data, code) => createHmac('sha256', secret).update(data).digest(code)


const fileContent = readFileSync('Дым и Комок.txt', 'utf8')

const hash = sha256(fileContent, 'hex')
console.log(hash, '\n')

const hash1 = sha256(fileContent.slice(0, -1), 'hex')
console.log(hash1, '\n')


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


// class Block {
//     constructor(timestamp = "", data = []) {
//         this.timestamp = timestamp;
//         this.data = data;
//         this.hash = this.getHash();
//         this.prevHash = ""; // хеш предыдущего блока
//     }

//     // Наша хеш-функция.
//     getHash() {
//         return sha256(this.prevHash + this.timestamp + JSON.stringify(this.data), 'hex');
//     }
// }

// class Blockchain {
//     constructor() {
//         // Создаём первичный блок
//         this.chain = [new Block(Date.now().toString())]
//     }
//     getLastBlock() {
//         return this.chain[this.chain.length - 1];
//     }
//     addBlock(block) {
//         // Так как мы добавляем новый блок, prevHash будет хешем предыдущего последнего блока
//         block.prevHash = this.getLastBlock().hash;
//         // Так как теперь в prevHash имеется значение, нужно пересчитать хеш блока
//         block.hash = block.getHash();
//         this.chain.push(block);
//     }
//     isValid() {
//         // Перед перебором цепочки блоков нужно установить i в 1, так как до первичного блока никаких блоков нет. В результате мы начинаем со второго блока.
//         for (let i = 1; i < this.chain.length; i++) {
//             const currentBlock = this.chain[i];
//             const prevBlock = this.chain[i-1];

//             // Проверка
//             if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
//                 return false;
//             }
//         }

//         return true;
//     }
// }

// console.log(new Blockchain().isValid())





