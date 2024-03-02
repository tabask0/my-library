import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BookList from "./components/BookList";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { IconButton } from "@mui/material";

function App() {
  const [mode, setMode] = useState<any>("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode: any) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex min-h-screen flex-col items-center py-10 ">
        <IconButton
          onClick={toggleTheme}
          style={{
            position: "fixed",
            bottom: "15px",
            right: "15px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "50%",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          color="inherit"
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <h1 className="p-10 font-extrabold text-xl font-mono mb-44">
          My library
        </h1>
        <div className="w-full max-w-5xl">
          <BookList />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
