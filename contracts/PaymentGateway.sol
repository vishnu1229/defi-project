// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PaymentGateway {
 
    address public deliveryBoy;
    uint256 public price;
    bool public isDelivered;
    bool public isPaid;
    mapping(address => uint256) public tempPool;

    constructor() {
        price = 0;
        isDelivered = false;
        isPaid = false;
    }

    // modifier onlyBuyer() {
    //     require(msg.sender == buyer, "Only buyer can call this function.");
    //     _;
    // }

    modifier onlyDeliveryBoy() {
        require(msg.sender == deliveryBoy, "Only delivery boy can call this function.");
        _;
    }

//     function getBuyer() public view returns (address) {
//     return buyer;
//    }
    function buyProduct(address buyer) public payable {
        require(msg.sender == buyer, "Only buyer can call this function.");
        tempPool[msg.sender] += msg.value;
    }

    function getBalance(address addr) public view returns (uint256) {
    return tempPool[addr];
    }
    function setDeliveryBoy(address _deliveryBoy, address buyer) public  {
        require(msg.sender == buyer, "Only buyer can call this function.");
        deliveryBoy = _deliveryBoy;
    }

function releaseFunds(address payable seller, uint256 amount) public {
  require(amount <= address(this).balance, "Amount to release must be less than or equal to contract balance.");
  seller.transfer(amount);
}
    function deliverProduct() public onlyDeliveryBoy {
        require(!isDelivered, "Product has already been delivered.");
        isDelivered = true;
    }

    function releasePayment(address seller) public onlyDeliveryBoy {
        require(isDelivered, "Product has not been delivered yet.");
        require(!isPaid, "Payment has already been released.");
        isPaid = true;
        payable(seller).transfer(price);
    }

    function withdrawFromTempPool(address buyer) public {
        require(msg.sender == buyer, "Only buyer can call this function.");
        require(isPaid, "Payment has not been released yet.");
        uint256 amount = tempPool[msg.sender];
        require(amount > 0, "No balance available to withdraw.");
        tempPool[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
