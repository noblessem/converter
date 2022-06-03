import "./App.css";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";

function App() {
  const [rates, setRates] = useState({});
  var myHeaders = new Headers();
  myHeaders.append("apikey", "UqseeEHiUybGMuK0DHakIlxN7eXVeMss");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  useEffect(() => {
    fetch(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=USD,EUR&base=UAH",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        setRates(result.rates);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Box className="App">
      <Header rates={rates} />
      <Main />
    </Box>
  );
}

export default App;
