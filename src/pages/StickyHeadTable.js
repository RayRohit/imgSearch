import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";

export default function BoxPaging(props) {
  const { data } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 3,
            background: "#273143",
            color: "#ffffff",
            mx: 2.8,
          }}
        >
          <Grid container>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, id) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    xl={2}
                    xxl={2}
                    tabIndex={-1}
                    key={row.id}
                  >
                    <ReviewCard
                      thumbnail={row.thumbnail}
                      id={row.id}
                      name={row.modified}
                    />
                  </Grid>
                );
              })}
          </Grid>
          <TablePagination
            sx={{ color: "#ffffff" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
