const assert = require('assert');
const { interface, bytecode } = require('../compile')
// Ganache equips us with a provider for our Test Network and some seed accounts
const ganache = require('ganache-cli');
// Uppercase because Web3 has a constructor
const Web3 = require('web3');

/*
**IMPORTANT CONCEPT**
 Below we instantiate Web3 and configure it with a "provider"
 This "provider" will change depending on what network we are trying to connect to.
 Here we are testing so we are connecting to the ganache provider that will allow us to connect to ganache test network
*/
const provider = ganache.provider()
const web3 = new Web3(provider);

/*
 Before we run each of our tests we want to create a smart contract on the test network. This is done with "beforeEach".
 After this step we use "it" to describe each individual test case
 https://mochajs.org/#run-cycle-overview
 */
let accounts;
let owner;

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of the accounts to deploy a contract
    // Arguments: hash, timestamp, name
    board = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['0xaeebad4a796fcc2e15dc4c6061b45ed9b373f26adfc798ca7d2d8cc58182718e','example.com','Sat Oct 20 10:09:31 EDT 2018','genesis']
        })
        .send({from: accounts[0], gas: '2000000'})

    board.setProvider(provider)
    owner = await board.methods.contract_owner().call()
});

describe('Board', () => {
    // Lets assert that we successfully deployed a contract by getting the address
    it('deploys a contract', () => {
        assert.ok(board.options.address)
    });

    it('can assign a contract owner', async () => {
        // We use ".call" when we are just reading from the network (no fee incurred)
       //const message = await inbox.methods.message().call();
       //assert.equal(message, 'Hi there!');
       assert.equal(accounts[0],owner)
    });
    it('can assign a chairman', async () => {
        // We use ".call" when we are just reading from the network (no fee incurred)
       //const message = await inbox.methods.message().call();
       //assert.equal(message, 'Hi there!');
       await board.methods.assignChairman(accounts[1]).send({from: owner})
       const chair = await board.methods.chair_person().call()
       console.log(chair, accounts[1])
       //assert.equal(newChair, accounts[1] )
    });

    it('can add a board member', async () => {
        // We use ".send" when we are adding a transaction. Account to pay gas cost must be specified
        //await inbox.methods.setMessage('This is a new message!').send({from: accounts[0]});
        //const message = await inbox.methods.message().call();
        //assert.equal(message, 'This is a new message!')
    });
    it('can allow a board member to vote', async () => {
        // We use ".send" when we are adding a transaction. Account to pay gas cost must be specified
        //await inbox.methods.setMessage('This is a new message!').send({from: accounts[0]});
        //const message = await inbox.methods.message().call();
        //assert.equal(message, 'This is a new message!')
    });
    it('can allow the adding of new proposals', async () => {
        // We use ".send" when we are adding a transaction. Account to pay gas cost must be specified
        //await inbox.methods.setMessage('This is a new message!').send({from: accounts[0]});
        //const message = await inbox.methods.message().call();
        //assert.equal(message, 'This is a new message!')
    });
});

