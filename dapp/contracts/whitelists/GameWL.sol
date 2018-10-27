pragma solidity ^0.4.23;

/**
@title Whitelist of games
@notice contract for managing the list of games
*/
contract GameWL {
    
    /**
    @notice constructor of contract
    */
    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    @notice change of ownership
    @param _newOwner address of new contract owner
    */
    function ownerTransfership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    address public owner;

    mapping (address => bool) whitelist;

    /**
    @notice Set the launch permission
    @param _game address of the game
    @return success
    */
    function addGame(address _game) public onlyOwner returns(bool success) {
        whitelist[_game] = true;
        success = true;
    }

    /**
    @notice Delete the launch permission
    @param _game address of the game
    @return success
    */
    function delGame(address _game) public onlyOwner returns(bool success) {
        whitelist[_game] = false;
        success = true;
    }

    /**
    @notice Get the launch permission
    @param _game address of the game
    @return game status
    */
    function getStatus(address _game) external view returns(bool status) {
        status = whitelist[_game];
    }

}