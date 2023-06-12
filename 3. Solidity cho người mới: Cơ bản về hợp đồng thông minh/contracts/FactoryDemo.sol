pragma solidity >=0.8.9 <=0.8.18;

library EncodeString {
    function encodeString(string memory self) public pure returns (bytes32) {
        bytes32 result = keccak256(abi.encodePacked(self));
        return result;
    }
}

contract FactoryFastfood {
    Fastfood[] public listContract;

    function createNew(uint256 _totalCalo) public {
        Fastfood newContract = new Fastfood(msg.sender, _totalCalo);
        listContract.push(newContract);
    }
}

contract Fastfood {
    using EncodeString for string;
    uint256 public total_calo; // state variable
    uint8 private id;

    bool private available;

    enum TypeFastFood {
        Hamburger,
        Chips,
        Tacos
    }

    struct Ingredient {
        string name;
        uint256 value;
    }

    mapping(string => uint256) public ingredient;
    address public owner;
    event AddIngredient(string name, uint256 calo);

    constructor(address _owner, uint256 _totalCalo) {
        owner = _owner;
        total_calo = _totalCalo;
        // code ...
    }

    // receive() external payable {

    // }

    fallback() external {
        // code
    }

    modifier onlyOwner(address sender) {
        require(sender == owner, "Wrong onwer");
        _; //
    }

    function getIngredient(
        string memory nameIngredient
    ) public view returns (uint256) {
        uint256 calo = ingredient[nameIngredient];
        return calo;
    }

    function addIngredient(string memory name, uint256 calo) public virtual {
        ingredient[name] = calo;
        emit AddIngredient(name, calo);
    }

    function addIngredients(
        string[] memory _name,
        uint256[] memory _caloOfIngredient
    ) public onlyOwner(msg.sender) {
        // uint256 index = 0;
        // while(index < _name.length){
        //     ingredient[_name[index]] = _caloOfIngredient[index];
        //     ++index;
        // }
        //require (msg.sender == owner, "Wrong owner");
        // assert(msg.sender == owner);
        for (uint256 index = 0; index < _name.length; ++index) {
            ingredient[_name[index]] = _caloOfIngredient[index];
        }
    }

    function encodeString(string memory example) public pure returns (bytes32) {
        return example.encodeString();
    }
}

contract Fastfood_v2 {
    uint256 public total_calo; // state variable
    uint8 private id;

    bool private available;

    enum TypeFastFood {
        Hamburger,
        Chips,
        Tacos
    }

    struct Ingredient {
        string name;
        uint256 value;
    }

    mapping(string => uint256) public ingredient;
    address public owner;
    event AddIngredient(string name, uint256 calo);

    constructor(address _owner, uint256 _totalCalo) {
        owner = _owner;
        total_calo = _totalCalo;
        // code ...
    }

    // receive() external payable {

    // }

    fallback() external {
        // code
    }

    modifier onlyOwner(address sender) {
        require(sender == owner, "Wrong onwer");
        _; //
    }

    function getIngredient(
        string memory nameIngredient
    ) public view returns (uint256) {
        uint256 calo = ingredient[nameIngredient];
        return calo;
    }

    function addIngredient(string memory name, uint256 calo) public virtual {
        ingredient[name] = calo;
        emit AddIngredient(name, calo);
    }

    function addIngredients(
        string[] memory _name,
        uint256[] memory _caloOfIngredient
    ) public onlyOwner(msg.sender) {
        // uint256 index = 0;
        // while(index < _name.length){
        //     ingredient[_name[index]] = _caloOfIngredient[index];
        //     ++index;
        // }
        //require (msg.sender == owner, "Wrong owner");
        // assert(msg.sender == owner);
        for (uint256 index = 0; index < _name.length; ++index) {
            ingredient[_name[index]] = _caloOfIngredient[index];
        }
    }

    function consume() public {
        total_calo = total_calo - 50;
    }
}

interface IFastfood {
    function getIngredient(string memory) external view returns (uint256);

    function addIngredient(string memory, uint256) external;
}

contract Snack is IFastfood {
    function getIngredient(string memory name) external view returns (uint256) {
        // ...
    }

    function addIngredient(string memory name, uint256 calo) external {
        //...
    }
}

abstract contract Food {
    string public name = "Vegetable";

    function getName() public view returns (string memory) {
        // code ...
        return name;
    }

    function changeName(string memory _name) external virtual;
}

contract Carrot is Food {
    function changeName(string memory _name) public override {
        name = _name;
    }
}

// contract Hamburger is Fastfood {
//     constructor() {

//     }
//     function getTotalCalo() public view returns (uint256){
//         return total_calo;
//     }

//     function addIngredient(string memory name, uint256 calo) override public {
//         // ...

//     }
// }
