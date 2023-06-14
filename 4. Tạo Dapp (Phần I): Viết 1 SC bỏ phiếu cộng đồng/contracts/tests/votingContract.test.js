// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;

describe("Voting Contract", function () {
  let votingContract;
  let votingToken;
  let deployer;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    [deployer, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("VotingToken");
    votingToken = await Token.deploy(
      "Community Token",
      "COM",
      parseEther("200")
    );
    await votingToken.deployed();

    const VotingContract = await ethers.getContractFactory("VotingContract");
    votingContract = await VotingContract.deploy(votingToken.address);
    await votingContract.deployed();
  });

  it("should create a proposal", async () => {
    await votingToken.approve(votingContract.address, parseEther("20")); // Convert 20 to a string
    await votingContract.createProposal("Test Proposal");
    const proposalCount = await votingContract.proposalCount();

    const proposalInfo = await votingContract.proposals(0);
    expect(proposalCount.toNumber()).equals(1);
    expect(proposalInfo.description).equal("Test Proposal");
  });

  it("should fail to create a proposal if creator doesnt have enough token", async function () {
    await expect(
      votingContract.connect(addr1).createProposal("Testing contract")
    ).to.revertedWith("Insufficient allowance");
  });

  it("should fail to create a proposal if creator doesnt approve voting contract", async function () {
    await votingToken.connect(addr1).deposit({ value: parseEther("1") });

    await expect(
      votingContract.connect(addr1).createProposal("Testing contract")
    ).to.revertedWith("Insufficient allowance");
  });

  it("should cast vote if user have token", async function () {
    await votingToken.approve(votingContract.address, parseEther("20"));
    await votingContract.createProposal("Test Proposal");

    await votingToken.connect(addr1).deposit({ value: parseEther("1") });
    await votingContract.connect(addr1).castVote(0, true);

    const proposalInfo = await votingContract.proposals(0);
    await expect(proposalInfo.yesCount).to.equal(10000);
  });

  it("should fail if user cast vote again", async function () {
    await votingToken.approve(votingContract.address, parseEther("20"));
    await votingContract.createProposal("Test Proposal");

    await votingToken.connect(addr1).deposit({ value: parseEther("1") });
    await votingContract.connect(addr1).castVote(0, true);

    const proposalInfo = await votingContract.proposals(0);
    await expect(proposalInfo.yesCount).to.equal(10000);

    await expect(
      votingContract.connect(addr1).castVote(0, true)
    ).to.revertedWith("Already voted");
  });

  it("should finalize the proposal", async function () {
    await votingToken.approve(votingContract.address, parseEther("20"));
    await votingContract.createProposal("Test Proposal");

    await votingToken.connect(addr1).deposit({ value: parseEther("1") });
    await votingContract.connect(addr1).castVote(0, true);

    // Increase the time by 3 minutes (180 seconds) using a mock
    const currentBlock = await ethers.provider.getBlock("latest");
    const newTimestamp = currentBlock.timestamp + 180;
    // Update the block's timestamp using the `evm_mine` function
    await ethers.provider.send("evm_mine", [newTimestamp]);

    await votingContract.finalizeProposal(0);

    const proposalInfo = await votingContract.resultProposal(0);
    expect(proposalInfo).to.equal(1);
  });
});
