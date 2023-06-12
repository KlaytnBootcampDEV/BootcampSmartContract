pragma solidity >=0.8.9 <=0.8.18;

contract Fastfood {
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
