import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";

// ABIs
import TokenMaster from "./abis/TokenMaster.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const account = "0x03A36a3f2002190aC03bB64dD881ff2e208DF7ee";

  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);

    const totalOccasions = await tokenMaster.totalOccasions();
    const occasions = [];

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      console.log("occassions ", occasion);
      occasions.push(occasion);
    }

    setOccasions(occasions);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <AnonAadhaarProvider _useTestAadhaar={true}>
      <div>
        <header>
          <Navigation account={account} />

          <h2 className="header__title">
            <strong>Event</strong> Tickets
          </h2>
        </header>

        <Sort />

        <div className="cards">
          {occasions.map((occasion, index) => (
            <Card
              occasion={occasion}
              id={index + 1}
              tokenMaster={tokenMaster}
              provider={provider}
              account={account}
              toggle={toggle}
              setToggle={setToggle}
              setOccasion={setOccasion}
              key={index}
            />
          ))}
        </div>

        {toggle && (
          <SeatChart
            account={account}
            occasion={occasion}
            tokenMaster={tokenMaster}
            provider={provider}
            setToggle={setToggle}
          />
        )}
      </div>
    </AnonAadhaarProvider>
  );
}

export default App;
