// solium-disable linebreak-style
pragma solidity ^0.4.17;

contract Board {

    struct BoardMember {
        uint weight;
        bool voted;
        uint8 vote;
        string role;
    }
    struct Proposal {
        string id;
        string proposalRef;
        string name;
        string timestamp;
        address submittedBy;
    }

    address public chair_person;
    address public contract_owner;
    mapping (address => BoardMember) public boardmembers;
    mapping (address => Proposal) public memberProposals;
    address[] public members;

    constructor(string id, string link, string ts, string pname) public {
        contract_owner = msg.sender;
        boardmembers[contract_owner].role = "Contract Owner";
        members.push(contract_owner);
        memberProposals[contract_owner].id = id;
        memberProposals[contract_owner].proposalRef = link;
        memberProposals[contract_owner].name = pname;
        memberProposals[contract_owner].timestamp = ts;
        memberProposals[contract_owner].submittedBy = contract_owner;
    }
    
    // The contract_owner is the only one who can assign a Chairman
    function assignChairman(address person) public returns (string) {
        if (msg.sender != contract_owner) return "You are unauthorized to assign a chairman";
        chair_person = person;
        boardmembers[chair_person].weight = 1;
        boardmembers[chair_person].role = "chair";
    }
    
    function addProposal(string id,string link, string ts, string pname) public returns (string) {
        members.push(msg.sender);
        memberProposals[contract_owner].id = id;
        memberProposals[contract_owner].proposalRef = link;
        memberProposals[contract_owner].name = pname;
        memberProposals[contract_owner].timestamp = ts;
        memberProposals[contract_owner].submittedBy = msg.sender;
        
        return id;
    }


    /// Give $(futureMember) the right to vote on this proposal.
    /// May only be called by $(chairperson).
    function addBoardMember(address futureMember) public returns (string) {
        if (msg.sender != chair_person) return "{error : You are unauthorized to add a boardmember}";
        else {
            members.push(futureMember);
            boardmembers[futureMember].weight = 1;
            return "new board member has been added";
        }

    }



    /// Give a single vote 1 "yes", 0 "no"
    function vote(uint8 myVote) public returns (string) {
        BoardMember storage vsender = boardmembers[msg.sender];
        if (vsender.voted ) return "you already voted";
        else {
            vsender.voted = true;
            vsender.vote = myVote;
        }

    }


}