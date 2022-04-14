pragma solidity ^0.8.2;

contract EIP712 {
    string public name = "EIP712";
    string public version = "2.2";
    uint256 public constant chainId = 1337;
    address constant verifyingContract = 0x7bBD77cd941426D77ddaA623Bc9b1F6f0a07db42;
    bytes32 constant salt = 0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558; 

    string constant message = "Message(string message)";
    string constant EIP712_DOMAIN = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)";

    bytes32 private constant DOMAIN_SEPARATOR = keccak256(abi.encode(
       keccak256(abi.encodePacked(EIP712_DOMAIN)),
       keccak256("EIP712"),
       keccak256("2.2"),
       chainId,
       verifyingContract,
       salt
    ));

    bytes32 public messageHash = keccak256(abi.encodePacked(
        // "\\x19\\x01",
        "\x19Ethereum Signed Message:\n",
        DOMAIN_SEPARATOR,
        keccak256(abi.encode(   
            keccak256(abi.encodePacked(message)),
            keccak256("I acknowledge blah blah blah")
        ))
    ));

    function verify(address signer,bytes32 r,bytes32 s,uint8 v) external view returns(bool){
        return signer == ecrecover(messageHash, v, r, s);
    }
}