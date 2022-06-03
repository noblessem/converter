import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ rates }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Currency converter
          </Typography>
          <Box>
            <Typography>1 UAH = {rates.USD}$</Typography>
            <Typography>1 UAH = {rates.EUR}€</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
