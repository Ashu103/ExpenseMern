import React, { useState, useEffect } from "react";
import { Icon } from "react-icons-kit";
import { ic_trending_up, ic_trending_down } from "react-icons-kit/md";
import axios from "axios";

const StockTable = () => {
  const [stockData, setStockData] = useState(null);

  const [symbol, setSymbol] = useState("TCS");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=P24ERDMQ0993GTAV`
      );
      setStockData(response.data["Global Quote"]);
    }
    fetchData();
  }, [symbol]);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  return (
    <div>
      <label htmlFor="symbol">Select a stock symbol:</label>
      <select
        id="symbol"
        style={{
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px 10px",
          marginRight: "20px",
          backgroundColor: "#fff",
          color: "#FFD700",
          ":hover": {
            borderColor: "#999",
          },
          ":focus": {
            boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.3)",
          },
        }}
        name="symbol"
        onChange={handleSymbolChange}
      >
        <option value="TCS" selected>
          TCS
        </option>
        <option value="WIT">WIPRO</option>

        <option value="INFY">INFOSYS</option>
        <option value="TEML">Tech Mahindra</option>
        <option value="AAPL">APPLE</option>
        <option value="IBM">IBM</option>
        <option value="GOOG">GOOGLE</option>
      </select>
      {stockData && (
        <div>
          <h2>{stockData["01. symbol"]}</h2>
          <p>Open Price: {stockData["02. open"]}</p>
          <p>High Price: {stockData["03. high"]}</p>
          <p>Low Price: {stockData["04. low"]}</p>
          <p>Current Price: {stockData["05. price"]}</p>
          <p>
            Change Percent:
            {parseFloat(stockData["10. change percent"]) > 0 ? (
              <Icon icon={ic_trending_up} />
            ) : (
              <Icon icon={ic_trending_down} />
            )}{" "}
            {parseFloat(stockData["10. change percent"])}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockTable;
