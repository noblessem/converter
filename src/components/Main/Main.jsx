import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import "./Main.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { timer } from "@mui/icons-material";
function Main() {
  const [mainAmount, setMainAmount] = useState(1);
  const [secondaryAmount, setSecondaryAmount] = useState(1);
  const [mainCurrency, setMainCurrency] = useState("UAH");
  const [secondaryCurrency, setSecondaryCurrency] = useState("USD");
  const timer = useRef();
  let myHeaders = new Headers();
  myHeaders.append("apikey", "UqseeEHiUybGMuK0DHakIlxN7eXVeMss");
  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const mainCurrencyChange = (event) => {
    setMainCurrency(event.target.value);
  };

  const secondaryCurrencyChange = (event) => {
    setSecondaryCurrency(event.target.value);
  };

  const changeMainAmount = (event) => {
    setMainAmount(event.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      convert(mainCurrency, secondaryCurrency, event.target.value);
    }, 1000);
  };

  const changeSecondaryAmount = (event) => {
    setSecondaryAmount(event.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      convert(secondaryCurrency, mainCurrency, event.target.value, "SECONDARY");
    }, 1000);
  };

  const convert = (from, to, amount, type) => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result).result;
        if (type) {
          setMainAmount(result);
        } else {
          setSecondaryAmount(result);
        }
      });
  };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      convert(mainCurrency, secondaryCurrency, mainAmount);
    }, 1000);
  }, [mainCurrency, secondaryCurrency]);

  return (
    <Paper className="main__container" sx={{}} elevation={3}>
      <Box className="main__content">
        <Box>
          <TextField
            value={mainAmount}
            id="outlined-basic"
            label="Enter amount"
            variant="outlined"
            onChange={changeMainAmount}
          />
        </Box>
        <Box>
          <FormControl>
            <InputLabel id="select-main-currency">Currency</InputLabel>
            <Select
              labelId="select-main-currency"
              id="select-main-currency"
              value={mainCurrency}
              label="Currency"
              onChange={mainCurrencyChange}
            >
              <MenuItem value={"UAH"}>UAH</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <IconButton onClick={convert}>
            <CurrencyExchangeIcon />
          </IconButton>
        </Box>
        <Box>
          <FormControl>
            <InputLabel id="select-secondary-currency">Currency</InputLabel>
            <Select
              labelId="select-secondary-currency"
              id="select-secondary-currency"
              value={secondaryCurrency}
              label="Currency"
              onChange={secondaryCurrencyChange}
            >
              <MenuItem value={"UAH"}>UAH</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            value={secondaryAmount}
            id="outlined-basic"
            label="Enter amount"
            variant="outlined"
            onChange={changeSecondaryAmount}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default Main;
