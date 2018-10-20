pragma solidity ^0.4.17;

contract Board {

    struct BoardMember {
        uint weight;
        bool voted;
        uint8 vote;
        string role;
    }
    struct Proposal {
        string proposalRef;
        string name;
        string timestamp;
    }

    address public chairperson;
    address public contract_owner;
    mapping (address => BoardMember) boardmembers;
    mapping (address => Proposal[]) memberProposals;
    Proposal[] p;

    constructor(string genesis, string ts, string pname) public {
        contract_owner = msg.sender;
        memberProposals[contract_owner].push(Proposal({proposalRef:genesis,name:pname, timestamp:ts}));
    }
    
    // The contract_owner is the only one who can assign a Chairman
    function assignChairman(address person) public {
        if (msg.sender != contract_owner) return;
        chairperson = person;
        boardmembers[chairperson].weight = 1;
    }
    
    function addProposal(string newProposal, string ts, string n) public {
        memberProposals[msg.sender].push(Proposal({proposalRef:newProposal, timestamp:ts, name : n}));
    }

    /// Give $(toVoter) the right to vote on this proposal.
    /// May only be called by $(chairperson).
    function addBoardMember(address futureMember) public {
        if (msg.sender != chairperson || boardmembers[futureMember].voted) return;
        boardmembers[futureMember].weight = 1;
    }



    /// Give a single vote 1 "yes", 0 "no"
    function vote(uint8 thought) public {
        BoardMember storage vsender = boardmembers[msg.sender];
        if (vsender.voted ) return;
        vsender.voted = true;
        vsender.vote = thought;
    }


}