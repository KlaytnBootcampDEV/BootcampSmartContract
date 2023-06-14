// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther, fromWei } = ethers.utils;

describe("Voting Token contract", function () {
  let votingToken;
  let deployer;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    const Token = await ethers.getContractFactory("VotingToken");
    votingToken = await Token.deploy("Community Token", "COM", 10000);
    [deployer, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    await votingToken.deployed();
  });

  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await votingToken.balanceOf(deployer.address);
      expect(await votingToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await (await votingToken.transfer(addr1.address, 50)).wait();
      const addr1Balance = await votingToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await (
        await votingToken.connect(addr1).transfer(addr2.address, 50)
      ).wait();
      const addr2Balance = await votingToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await votingToken.balanceOf(deployer.address);

      await expect(votingToken.connect(addr3).transfer(deployer.address, 1)).to
        .be.reverted;

      expect(await votingToken.balanceOf(deployer.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await votingToken.balanceOf(deployer.address);

      await votingToken.transfer(addr1.address, 100);

      await votingToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await votingToken.balanceOf(deployer.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await votingToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await votingToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should deposit and receive token", async function () {
      await votingToken.connect(addr2).deposit({ value: parseEther("1") });

      const finalOwnerBalance = await votingToken.balanceOf(addr2.address);
      expect(finalOwnerBalance).to.equal(parseEther("10000"));
    });
  });
});
