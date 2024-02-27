import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function Tabular(props) {
  const { header, data } = props;
  const [myData, setMydata] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortOrder, setSortOrder] = React.useState("asc"); // Initial sorting order

  const handleSort = (column) => {
    const sortedData = [...data].sort((a, b) => {
      // Assuming your data objects have a property named 'modified' for sorting
      if (sortOrder === "asc") {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });

    setMydata(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (row) => {
    console.log("row =>", row.id + page * 10);
  };
  const handleDelete = () => {};

  return (
    <Box sx={{ background: "#273143", borderRadius: "20px", p: 2 }}>
      {/* <Typography
        variant="h6"
        sx={{ fontWeight: "bolder", color: "#fff", pb: 2 }}
      >
        Summary
      </Typography> */}
      <TableContainer
        sx={{
          //   background: "#273143 !important",
          height: window.innerHeight / 1.5,
          color: "white",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((column, idx) => (
                <TableCell
                  key={idx}
                  align={"center"}
                  sx={{
                    fontWeight: "bold",
                    background: "#1B2531 !important",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort(column)}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, id) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={id} align={"center"} sx={{ color: "#fff" }}>
                      {id}
                    </TableCell>
                    {Object.entries(row).map(([header, value], idx) => {
                      return (
                        <TableCell
                          key={idx}
                          align={"center"}
                          sx={{ color: "white" }}
                        >
                          {header.includes("thumbnail") ? (
                            <img src={value} alt="Thumbnail" width={70} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}

                    <TableCell key={id} align={"center"}>
                      <Tooltip title="reupload" arrow>
                        <Button
                          variant="contained"
                          aria-label="Reupload"
                          color="primary"
                          onClick={() =>
                            handleEditClick({ ...row, id: id + 1 })
                          }
                        >
                          Reupload
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <Button
                          variant="contained"
                          color="error"
                          aria-label="delete"
                          disabled
                          onClick={() => handleDelete(id)}
                          sx={{ mx: 2 }}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ color: "#fff" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
