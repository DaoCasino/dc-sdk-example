pragma solidity ^0.4.23;

/**
@title Referrer Contract
*/
contract Referrer {

    address public owner;
    mapping(address => address) public referrerOf;
    mapping(address => address) public operatorOf;
    mapping(address => uint) public referrerCount;
    uint public users = 0;

    constructor () public {
        owner = msg.sender;
    }

    /**
    @notice Player registration
    @param _player Player address
    @param _referrer Referrer address
    */
    function setService(address _player, address _referrer) public {
        require(msg.sender == owner);
        require(referrerOf[_player] == address(0) && operatorOf[_player] == address(0)); 
        referrerCount[_referrer]++;
        users++;
        if (_referrer != address(0)) {
            referrerOf[_player] = _referrer;
        } else {
            referrerOf[_player] = msg.sender;   
        }
        operatorOf[_player] = msg.sender;
    }

    /** 
    @notice Get address of operator and referrer
    @param _player Address of player
    @return {
      "_operator": "The operator address to receive a reward",
      "_referrer": "The referrer address to receive a reward"
    }
    */
    function getService(address _player) external view returns(address _operator, address _referrer) {
        return (operatorOf[_player], referrerOf[_player]);
    }

    /** 
    @notice Get address of referrer
    @param _player Address of player
    @return The referrer address to receive a reward
    */
    function getReferrer(address _player) external view returns(address _referrer) {
        return referrerOf[_player];
    }

    /** 
    @notice Get address of operator (platform)
    @param _player Address of player
    @return The operator address to receive a reward
    */
    function getOperator(address _player) external view returns(address _operator) {
        return operatorOf[_player];
    }

}