pragma solidity ^0.4.23;

/**
@title Whitelist of players
@notice contract for managing the list of players
*/
contract PlayerWL {
    
    /**
    @notice constructor of contract
    @param _min the minimum allowed amount 
    */
    constructor (uint _min) public {
        owner = msg.sender;
        minimal = _min;
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

    uint public minimal;
    address public owner;

    mapping (address => uint) whitelist;

    /**
    @notice Set the allowed amount
    @param _player address of the player
    @param _amount allowable amount
    @return success
    */
    function setAmountForPlayer(address _player, uint _amount) public onlyOwner returns(bool) {
        whitelist[_player] = _amount;
        return true;
    }

    /**
    @notice Get the allowed amount
    @param _player address of the player
    @return allowable amount
    */
    function getMaxAmount(address _player) external view returns(uint _amount) {
        _amount = whitelist[_player];
        if (_amount == uint(0)) {
            _amount = minimal;
        }
    }

}