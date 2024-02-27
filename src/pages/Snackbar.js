import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";

export default function Snackbarr() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { addResponse } = useSelector((state) => state.ImageSearchReducer);
  const { vertical, horizontal, open } = state;
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => {
    if (addResponse?.msg !== undefined) {
      setMsg(addResponse?.msg);
      setState({ ...state, open: true, horizontal: "right" });
    }
  }, [addResponse]);

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={msg}
        key={vertical + horizontal}
        sx={{
          background: "#273143",
          color: "#ffffff",
          p: 2,
          borderRadius: "20px",
        }}
      />
    </Box>
  );
}
