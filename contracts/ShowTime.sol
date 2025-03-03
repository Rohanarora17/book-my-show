// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol';

contract ShowTime is ERC721 {
    address public owner;
    address public anonAadhaarVerifierAddr;
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion{
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
        bool iseighteenplus;
    }

    mapping(uint256 => Occasion) occasions;
    mapping(uint256 => mapping(address => bool))public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
    
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    constructor(
        string memory _name, 
        string memory _symbol,
        address _verifierAddr
    )   ERC721(_name, _symbol) {
        owner = msg.sender;
        anonAadhaarVerifierAddr = _verifierAddr;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location,
        bool _iseighteenplus
    ) public onlyOwner{
        
        totalOccasions++;

        occasions[totalOccasions] = Occasion(
        totalOccasions, 
        _name, 
        _cost, 
        _maxTickets,
        _maxTickets,
        _date,
        _time,
        _location,
        _iseighteenplus
        );
    }
    function mint(
        uint _id,
        uint256 _seat,
        uint nullifierSeed,
        uint nullifier,
        uint timestamp,
        uint signal,
        uint[4] memory revealArray, 
        uint[8] memory groth16Proof) public payable {
        require(_id != 0 );
        require((_id <= totalOccasions));
        require(msg.value >= occasions[_id].cost);
        require(seatTaken[_id][_seat] == address(0));
        require(_seat <= occasions[_id].maxTickets);
        require(IAnonAadhaar(anonAadhaarVerifierAddr).verifyAnonAadhaarProof(
                nullifierSeed, // nulifier seed
                nullifier,
                timestamp,
                signal,
                revealArray,
                groth16Proof
            ) == true , 
            '[AnonAadhaarVote]: proof sent is not valid.');
        if(occasions[_id].iseighteenplus == true){
            require(revealArray[0] == 1, "You are not 18+");
        }
        occasions[_id].tickets -= 1;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender; 
        seatsTaken[_id].push(_seat);
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }


    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }
    function withdraw() public onlyOwner{
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}