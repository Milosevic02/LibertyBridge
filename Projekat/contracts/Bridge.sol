pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//Dodaj da jedino owner moze da poziva release

contract Bridge {
    address public token;
    event Deposit(address indexed by, uint256 amount, string gno_address);

    uint public index;
    mapping(address => uint256) public deposits;

    constructor(address _token) {
        token = _token;
    }

    function deposit(string memory gno_addr) payable public {

        require(msg.value > 0, "Deposit amount must be greater than zero");
        deposits[msg.sender] = deposits[msg.sender] + msg.value;
        emit Deposit(msg.sender, msg.value, gno_addr);
    }

    function getDeposit(address _addr) public view returns (uint256) {
        return deposits[_addr];
    }


    function release(address _to, uint256 _amount) public {
        require(deposits[_to] >= _amount, "Insufficient balance");
        deposits[msg.sender] = deposits[msg.sender] - _amount;

        IERC20(token).transfer(_to, _amount);

    }
}
