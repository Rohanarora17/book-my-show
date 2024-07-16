
# zkbookmyshow

This is a decentralized event ticket buying platform where only valid users can buy tickets in the form of NFTs on Ethereum using their Aadhaar card with the help of ANON ADHAAR. There is also age verification for certain events that are age-restricted; users' zk Aadhaar proof will reveal age and check whether the user is allowed to attend that event or not.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **npm**: npm is included with Node.js, but make sure you have the latest version.
- **Metamask**: Install the Metamask browser extension [here](https://metamask.io/).
- **Anon Aadhaar**: Make sure you have access to Anon Aadhaar for verification.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Rohanarora17/book-my-show.git
   cd book-my-show
2. **Install the Dependencies**
    ```bash
    npm install
3. **Compile Smart Contracts**
    ```bash
    npx hardhat clean
    npx hardhat compile
4. **Start Hardhat Node**
    ```bash
    npx hardhat node
5. **Deploy Smart Contracts**
    Open another terminal and run:
    bash
    npx hardhat run ./scripts/deploy.js --network localhost
    Copy the deployed contract address from the terminal.
6.**Update Configuration**
   - Update the config.json file with the deployed contract address.
  
1. **Start the Frontend**
    ```bash
    `npm start`

2. **Update Metamask**
Open the Metamask wallet.
Go to Accounts -> Import Account -> From Private Key.
Paste the private key of any one of the addresses listed in the terminal where you ran npx hardhat node.
Connect the Metamask account to localhost.

#### Key Benefits

1. **Decentralized Platform**
   - Operates on the Ethereum blockchain, ensuring transparency, security, and trustlessness in ticket transactions.

2. **NFT Tickets**
   - Tickets are issued as Non-Fungible Tokens (NFTs), providing a unique and verifiable proof of purchase that can be easily transferred or resold.

3. **Enhanced Security**
   - Utilizes zk-SNARKs and zk-STARKs for privacy-preserving age verification and identity proof, ensuring that personal information remains confidential.

4. **Age Verification**
   - Integrates with Anon Aadhaar for age verification, allowing only eligible users to purchase tickets for age-restricted events.

5. **Immutable Records**
   - All transactions are recorded on the blockchain, creating a permanent and tamper-proof ledger of ticket purchases.

6. **Interoperability**
   - Compatible with Metamask and other Ethereum wallets, enabling seamless integration and ease of use for users already familiar with these tools.

7. **Scalability**
   - Built on the Ethereum network, leveraging its robustness and scalability to handle large volumes of transactions efficiently.

8. **User Privacy**
   - Ensures user privacy by only revealing necessary information (e.g., age verification) without exposing full personal details.

9. **Ownership and Control**
   - Users have full control over their tickets, allowing them to manage, transfer, or sell their tickets without intermediary interference.

10. **Reduced Fraud**
    - The use of blockchain technology and NFTs significantly reduces the risk of counterfeit tickets and fraud.

11. **Easy Verification**
    - Event organizers can easily verify the authenticity of tickets through the blockchain, simplifying the check-in process.

12. **Automated Processes**
    - Smart contracts automate the ticket issuance and verification process, reducing the need for manual intervention and administrative overhead.
