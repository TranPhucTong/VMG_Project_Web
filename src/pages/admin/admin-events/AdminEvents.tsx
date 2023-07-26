import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Player {
  id: number;
  name: string;
  ranking: number;
  winnings: number;
}

const AdminEvents = () => {
  const [nameEvent, setNameEvent] = useState("");

  const [venueEvent, setVenueEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [resultsPrize, setResultsPrize] = useState([]);
  const [entries, setEntries] = useState<string | number>("");
  const [buyIn, setBuyIn] = useState<string | number>("");
  const [showAddPlayers, setShowAddPlayers] = useState(true);

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [winnings, setWinnings] = useState<number>(0);
  const [ranking, setRanking] = useState<number>(0);

  const handleNameEventChange = (value: string | number) => {
    setNameEvent(String(value));
  };
  const handlEvenueEventtChange = (value: string | number) => {
    setVenueEvent(String(value));
  };
  const handlDateEventChange = (value: string | number) => {
    setDateEvent(String(value));
  };

  const handleBuyInChange = (value: string | number) => {
    setBuyIn(Number(value));
  };
  const handleEntriesChange = (value: string | number) => {
    setBuyIn(Number(value));
  };

  const playerList: Player[] = [
    { id: 1, name: "Player 1", ranking: 0, winnings: 0 },
    { id: 2, name: "Player 2", ranking: 0, winnings: 0 },
    // Add more players as needed
  ];

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayer(parseInt(event.target.value));
  };

  const handleWinningsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWinnings(parseInt(event.target.value));
  };

  const handleRankingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRanking(parseInt(event.target.value));
  };

  const handleAddPlayer = () => {
    const selectedPlayerInfo = playerList.find(
      (player) => player.id === selectedPlayer
    );

    if (selectedPlayerInfo) {
      const newPlayer: Player = {
        id: selectedPlayerInfo.id,
        name: selectedPlayerInfo.name,
        ranking,
        winnings,
      };

      setPlayers([...players, newPlayer]);
    }
  };

  useEffect(() => {
    console.log(players);
  }, [players]);
  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Events
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity: <span className="text-blue-400 font-bold">12</span>
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className="px-8 py-4 text-left">
          <h1 className="text-2xl font-bold text-left">Create New Event</h1>
        </div>
        <div className="px-8 pb-4 flex gap-6">
          <div className="flex flex-col justify-center items-center w-[50%]">
            <div className="w-full flex-col flex gap-3">
              <InputAdmin
                type="text"
                value={nameEvent}
                onChange={handleNameEventChange}
                label="Name Event"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập tên ở đây"
              />
              <InputAdmin
                type="text"
                value={venueEvent}
                onChange={handlEvenueEventtChange}
                label="Venue Event"
                placeholder="Vui lòng nhập ở đây"
              />
              <InputAdmin
                type="date"
                value={dateEvent}
                onChange={handlDateEventChange}
                label="Date Event"
                placeholder="Vui lòng nhập ở đây"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-[50%]">
            <div className="w-full flex-col flex gap-3">
              <InputAdmin
                type="number"
                value={buyIn}
                onChange={handleBuyInChange}
                label="Buy In"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập ở đây"
              />
              <InputAdmin
                type="number"
                value={entries}
                onChange={handleEntriesChange}
                label="Entries"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập ở đây"
              />
              <div
                onClick={() => setShowAddPlayers(true)}
                className="flex w-[30%] mt-7 gap-2 cursor-pointer justify-center items-center px-2 py-1 rounded-xl border-gray-400 border-[1px]"
              >
                <FontAwesomeIcon
                  className="text-green-400"
                  icon={faPlusCircle}
                />
                <button className="">Add Players</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddPlayers && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
          <div className="bg-white relative z-30 shadow-xl rounded-lg p-6">
            <div className="absolute right-6 top-6">
              <FontAwesomeIcon
                onClick={() => setShowAddPlayers(false)}
                className="font-bold text-4xl text-gray-400 hover:text-red-400 cursor-pointer"
                icon={faXmark}
              />
            </div>
            <div className="mr-20">
              <h1 className="text-3xl uppercase font-bold text-blue-500">
                Add Players To Event
              </h1>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Player Form</h2>
              <div className="flex space-x-4 mb-2">
                <label htmlFor="player-select">Select Player:</label>
                <select
                  id="player-select"
                  className="border p-1"
                  value={selectedPlayer}
                  onChange={handlePlayerChange}
                >
                  <option value={0}>Select a player</option>
                  {playerList.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4 mb-2">
                <label htmlFor="winnings">Winnings:</label>
                <input
                  type="number"
                  id="winnings"
                  className="border p-1"
                  value={winnings}
                  onChange={handleWinningsChange}
                />
              </div>
              <div className="flex space-x-4 mb-2">
                <label htmlFor="ranking">Ranking:</label>
                <input
                  type="number"
                  id="ranking"
                  className="border p-1"
                  value={ranking}
                  onChange={handleRankingChange}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddPlayer}
              >
                Add Player
              </button>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Added Players:</h3>
                <ul>
                  {players.map((player) => (
                    <li key={player.id}>
                      {player.name} - Ranking: {player.ranking}, Winnings:{" "}
                      {player.winnings}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
