import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  TableCell,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dummy from "./Dummy.json";
import TablePagination from "@mui/material/TablePagination";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import similarity from "../images/phonetics.png";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrent } from "../reducers/ImageSearchSlice/ImageSearchSlice";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1B2531",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  // flex: 1,
  width: 100,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:first-child": {
    backgroundColor: "#273143",
  },

  // Styles for all other children
  "&:not(:first-child)": {
    backgroundColor: "#273143",
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RecentSearch() {
  const { search } = useSelector((state) => state.ImageSearchReducer);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [data, setData] = useState(search);
  const dispatch = useDispatch();
  const rowsPerPageOptions = [10, 20, 30]; // You can customize the options

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log("search =>", search);

  const renderRows = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return data.slice(startIndex, endIndex).map((row, index) => (
      <StyledTableRow
        key={row.id}
        onClick={() => {
          dispatch(SetCurrent({ row, navigate }));
        }}
      >
        <StyledTableCell sx={{ color: "#fff" }}>
          {startIndex + index + 1}
        </StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>{index + 1}</StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>{row.name}</StyledTableCell>
        <StyledTableCell>
          <img
            src={row.base64}
            alt={` for ID ${row.id}`}
            style={{ width: "70px", height: "70px" }}
          />
        </StyledTableCell>

        {/* <StyledTableCell sx={{ color: "#fff" }}>
          {row.imageFeatureScore}%
          <LinearProgress
            variant="determinate"
            value={row.imageFeatureScore}
            sx={{
              width: matches ? "180px" : "80px",
              p: 0.6,
              borderRadius: "10px",
              my: 1,
            }}
          />
        </StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>
          {row.colorSpectrumScore}%
          <LinearProgress
            variant="determinate"
            value={row.colorSpectrumScore}
            sx={{
              width: matches ? "180px" : "80px",
              p: 0.6,
              borderRadius: "10px",
              my: 1,
            }}
          />
        </StyledTableCell> */}

        {/* <StyledTableCell sx={{ color: "#fff" }}>
          {row.totalSimilarityScore}%
          <LinearProgress
            variant="determinate"
            value={row.totalSimilarityScore}
            sx={{
              width: matches ? "180px" : "80px",
              p: 0.6,
              borderRadius: "10px",
              my: 1,
            }}
          />
        </StyledTableCell> */}

        {/* <StyledTableCell>
          <Tooltip title="Like" arrow direction="top">
            <IconButton color="inherit">
              <ThumbUpIcon style={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Like" arrow direction="top">
            <IconButton color="inherit" disabled>
              <ThumbDownIcon />
            </IconButton>
          </Tooltip>
        </StyledTableCell> */}
      </StyledTableRow>
    ));
  };
  return (
    <Box>
      <Grid
        container
        sx={{
          my: 2,
          ml: 2,
          p: 2,
          background: "#273143",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ width: "100%", pl: 2, py: 2 }}>
          <Grid item>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#fff", pb: 2, fontWeight: "bolder" }}
              >
                Recent Search
              </Typography>
              <TableContainer>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>S.No </StyledTableCell>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Image</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* <StyledTableCell
                      sx={{
                        color: "#fff",
                        backgroundColor: "#1B2531",
                        fontSize: "18px !important",
                      }}
                    >
                      1
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        color: "#fff",
                        backgroundColor: "#1B2531",
                        fontSize: "18px !important",
                      }}
                    >
                      og_img
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                    >
                      <img src={similarity} alt="similarity" width={50} />
                    </StyledTableCell> */}

                    {renderRows()}
                  </TableBody>
                </Table>
                <TablePagination
                  sx={{ color: "#fff" }}
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
