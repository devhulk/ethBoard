// We need the 'fs' and 'path' module because we cannot just require or import a '.sol' file.
// NodeJS tries to execute as javascript anything that you 'import' or 'require'
const path = require('path')
const fs = require('fs')
const solc = require('solc')


// Getting the path to our Contract[s]
const ethBoardPath = path.resolve(__dirname,'contracts','Board.sol')
// Reading our file line by line
const sourceCode = fs.readFileSync(ethBoardPath, 'utf-8')

// solc requires the source code we are reading in, as well as the number of contracts we are trying to compile
// If you want to get a better idea of what the compiler is doing just wrap the below statement in a 'console.log()'
module.exports = solc.compile(sourceCode,1).contracts[":Board"]