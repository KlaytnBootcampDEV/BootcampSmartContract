// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fastfood", function () {
    let fastfood;
    beforeEach(async function () {
      const Fastfood = await ethers.getContractFactory("Fastfood");
        fastfood = await Fastfood.deploy("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 200);
        await fastfood.deployed();
        console.log('storage deployed at:' + fastfood.address)
    });

    it("test initial value", async function () {
        expect((await fastfood.total_calo()).toNumber()).to.equal(200);
    });

    it("should add ingredients", async () => {
    await fastfood.addIngredient("Ingredient1", 100);
    await fastfood.addIngredient("Ingredient2", 200);

    const ingredient1 = await fastfood.getIngredient("Ingredient1");
    const ingredient2 = await fastfood.getIngredient("Ingredient2");

    expect(ingredient1.toNumber()).to.equal(100);
    expect(ingredient2.toNumber()).to.equal(200);
  });

});