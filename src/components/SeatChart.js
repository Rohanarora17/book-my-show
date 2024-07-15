import { useEffect, useState } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
// Import Components
import Seat from "./Seat";

// Import Assets
import close from "../assets/close.svg";

const SeatChart = ({ occasion, tokenMaster, provider, setToggle }) => {
  const [seatsTaken, setSeatsTaken] = useState(false);
  const [hasSold, setHasSold] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seatToPurchase, setSeatToPurchase] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    console.log("Anon Aadhaar : ", anonAadhaar);
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    if (anonAadhaar?.status === "logged-in") {
      setRedirectLogin(true);
      setIsModalOpen(false);
      // if (anonAadhaar?.anonAadhaarProofs) {
      //   console.log("Anon Aadhaar Proofs: ", anonAadhaar?.anonAadhaarProofs);
      //   handleModalUpload();
      // }
    }
  }, [anonAadhaar]);

  const getSeatsTaken = async () => {
    const seatsTaken = await tokenMaster.getSeatsTaken(occasion.id);
    setSeatsTaken(seatsTaken);
  };

  const buyHandler = async (_seat) => {
    setSeatToPurchase(_seat);
    setIsModalOpen(true);
  };

  const handleModalUpload = async () => {
    setIsModalOpen(false);
    setHasSold(false);

    const signer = await provider.getSigner();
    const transaction = await tokenMaster
      .connect(signer)
      .mint(occasion.id, seatToPurchase, { value: occasion.cost });
    await transaction.wait();

    setHasSold(true);
  };

  useEffect(() => {
    getSeatsTaken();
  }, [hasSold]);

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <img src={close} alt="Close" />
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {seatsTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={1}
                columnStart={0}
                maxColumns={5}
                rowStart={2}
                maxRows={5}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}

        <div className="occasion__spacer--1 ">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken &&
          Array(Number(occasion.maxTickets) - 50)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={26}
                columnStart={6}
                maxColumns={15}
                rowStart={2}
                maxRows={15}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}

        <div className="occasion__spacer--2">
          <strong>WALKWAY</strong>
        </div>

        {seatsTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={Number(occasion.maxTickets) - 24}
                columnStart={22}
                maxColumns={5}
                rowStart={2}
                maxRows={5}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <LogInWithAnonAadhaar
              nullifierSeed={1234}
              useTestAadhaar={true}
              fieldsToReveal={["revealAgeAbove18"]}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        .modal-content {
          background-color: #333333;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          align-self: flex-end;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SeatChart;
