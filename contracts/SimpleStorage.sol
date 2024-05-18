// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract SimpleStorage { 

    bool hasFavoriteNumber = true;
    uint256 favoriteNumberr = 9;
    string favorriteNumberInText = "Nine";
    int256 favoriteInt = -5;
    address myAddress = 0x2D23B86E3d8Bb372bb9adB6828C4609D63657AdE;
    bytes32 favoriteBytes = "0x123";

    uint256 public favoriteNumber; 

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function add() public pure returns (uint256) {
        return (1 + 1);
    }

    struct People {
        uint256 favoriteNumber; // (lưu ý là dấu ";")
        string name;
    }

    People public person = People({favoriteNumber: 9, name: unicode"Thịnh"});
    
    People[] public people; // (đây là mảng động)

    function addPerson (string memory _name, uint256 _favoriteNumber) public {
       
        People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        people.push(newPerson);

        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    mapping(string => uint256) public nameToFavoriteNumber;    
}





