import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  styled,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Tooltip,
  Modal,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";

import React, { useState, useRef } from "react";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { useEffect } from "react";
import upload from "../images/upload.png";
import Tabular from "./Tabular";
import BoxPaging from "./StickyHeadTable";
import { useDispatch, useSelector } from "react-redux";
import {
  GetImage,
  PostImage,
} from "../reducers/ImageSearchSlice/ImageSearchSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbarr from "./Snackbar";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: 5,
};

export default function FaceList() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // var array = data;
    dispatch(GetImage({}, { dispatch }));
    // array.sort(function (a, b) {
    //   var c = new Date(a.modified);
    //   var d = new Date(b.modified);
    //   return c - d;
    // });
  }, []);

  const { dbData, load } = useSelector((state) => state.ImageSearchReducer);
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const sortedData = [...(dbData?.users || [])].sort((a, b) => {
      return new Date(b.modified) - new Date(a.modified);
    });

    setMyData(sortedData);
  }, [dbData]);

  const [viewType, setViewType] = useState("list");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [order, setOrder] = useState({
    latest: true,
  });
  const [rowsPerPage, setRowsPerPage] = useState(matches ? 12 : 6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => setOpen(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isImageNameEdit, SetisImageNameEdit] = useState(false);
  const ref = useRef();

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const imageNameEdit = (e) => {
    setImageName(e.target.value);
    SetisImageNameEdit(false);
  };

  const handleEditClick = () => {};
  const handleDelete = () => {};

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return (
    <Box
      sx={{
        border: "2px solid #e4e6e9",
        p: 2,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Grid container>
          <Grid item sx={{ fontWeight: "bold", pl: 2, pb: 2 }} xs={12}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bolder", color: "#fff" }}
            >
              Image Repository
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          my: 2,
          background: "#273143",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <Grid
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            width: "100%",
          }}
        >
          <Grid item xs={6}>
            <Tooltip title="Add Image" arrow>
              <AddPhotoAlternateIcon
                color="#fff"
                onClick={handleOpen}
                sx={{ cursor: "pointer", fontSize: "30px" }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Grid View" arrow>
              <WindowSharpIcon
                color="white"
                onClick={() => setViewType("grid")}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
            &ensp;
            <Tooltip title="List View" arrow>
              <FormatListBulletedSharpIcon
                color="white"
                onClick={() => setViewType("list")}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <Box>
        {viewType === "list" ? (
          <Paper
            sx={{
              borderRadius: "20px",
              marginTop: 2,
              background: "#273143",
            }}
          >
            {myData?.length > 0 ? (
              <Box sx={{ background: "#273143", p: 2, borderRadius: "20px " }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ background: "#1B2531", color: "#fff" }}
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          sx={{ background: "#1B2531", color: "#fff" }}
                        >
                          ID
                        </TableCell>
                        <TableCell
                          sx={{ background: "#1B2531", color: "#fff" }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{ background: "#1B2531", color: "#fff" }}
                        >
                          Thumbnail
                        </TableCell>
                        <TableCell
                          sx={{
                            background: "#1B2531 !important",
                            color: "#ffffff",
                            cursor: "pointer",
                          }}
                          onClick={() => setOrder(!order.latest)}
                        >
                          Modified{" "}
                          <span>
                            {order.latest ? (
                              <ArrowDownward sx={{ fontSize: "18px" }} />
                            ) : (
                              <ArrowUpward sx={{ fontSize: "18px" }} />
                            )}
                          </span>
                        </TableCell>

                        <TableCell
                          sx={{ background: "#1B2531", color: "#fff" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myData
                        ?.slice(startIndex, endIndex)
                        ?.map((row, index) => (
                          <TableRow key={row?.id}>
                            <TableCell
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              {row?.id}
                            </TableCell>
                            <TableCell
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              {row?.name}
                            </TableCell>
                            <TableCell
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              <img
                                src={`http://192.168.1.98:5002/${row?.image}`}
                                alt={row?.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              {row?.modified}
                            </TableCell>
                            <TableCell
                              key={row.id}
                              sx={{ background: "#273143", color: "#ffffff" }}
                            >
                              <Tooltip title="reupload" arrow>
                                <Button
                                  variant="contained"
                                  aria-label="Reupload"
                                  color="primary"
                                  onClick={() =>
                                    handleEditClick({ ...row, id: row.id + 1 })
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
                                  onClick={() => handleDelete(row.id)}
                                  sx={{ mx: 2 }}
                                >
                                  Delete
                                </Button>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow sx={{ fontWeight: "bolder" }}>
                      <TableCell sx={{ background: "#1B2531", color: "#fff" }}>
                        ID
                      </TableCell>
                      <TableCell sx={{ background: "#1B2531", color: "#fff" }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ background: "#1B2531", color: "#fff" }}>
                        Image
                      </TableCell>
                      <TableCell
                        sx={{
                          background: "#1B2531 !important",
                          color: "#fff !important",
                          cursor: "pointer",
                        }}
                        onClick={() => setOrder(!order.latest)}
                      >
                        <span>
                          {order.latest ? (
                            <ArrowDownward sx={{ fontSize: "18px" }} />
                          ) : (
                            <ArrowUpward sx={{ fontSize: "18px" }} />
                          )}
                        </span>
                      </TableCell>

                      <TableCell sx={{ background: "#1B2531", color: "#fff" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableCell
                    colSpan={5}
                    sx={{ background: "#1B2531", color: "#fff" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", fontWeight: "bolder" }}
                    >
                      No Data
                    </Typography>
                  </TableCell>
                </Table>
              </>
            )}
          </Paper>
        ) : viewType === "grid" ? (
          <Box sx={{ background: "#273143", borderRadius: "20px", px: 3 }}>
            <Grid container>
              {myData.length > 0 ? (
                <>
                  {myData?.slice(startIndex, endIndex)?.map((entry) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        xl={2}
                        xxl={2}
                        tabIndex={-1}
                        key={entry.id}
                      >
                        <Card
                          sx={{
                            maxWidth: 345,
                            background: "#1b2531",
                            color: "#fff",
                            borderRadius: "10px",
                            my: 4,
                            overflow: "hidden",
                            pb: 2,
                            ml: 3,
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "350px",
                              height: "300px",
                              objectFit: "fill",
                            }}
                            image={`http://192.168.1.98:5002/${entry?.image}`}
                            alt="Paella dish"
                          />
                          <Divider sx={{ background: "#fff" }} />
                          <CardContent>
                            <Typography
                              variant="h6"
                              sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                              ID:{" "}
                              <span style={{ fontWeight: "normal" }}>
                                {entry.id}
                              </span>
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                              Name:{" "}
                              <span style={{ fontWeight: "normal" }}>
                                {entry.name}
                              </span>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleOpen}
                            >
                              Reupload
                            </Button>
                            <Button variant="contained" color="error" disabled>
                              Delete
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bolder",
                        color: "#fff",
                        p: 3,
                        textAlign: "center",
                      }}
                    >
                      No Data!
                    </Typography>
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        ) : null}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ color: "#fff" }}
          component="div"
          count={myData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ fontWeight: "bolder", pb: 2 }}>
            Upload Image
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            <from>
              <input
                ref={ref}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageSelect}
                id="image-upload-input"
              />
              <label htmlFor="image-upload-input">
                <Box
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                >
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        margin: "auto",
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={upload}
                        alt="upload icon"
                        width={30}
                        style={{ verticalAlign: "middle", paddingRight: "5px" }}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        Drag & Drop or Click to Upload
                      </span>
                    </>
                  )}
                </Box>
              </label>

              {/* {selectedImage && (
                <Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
                  <Grid>
                    <input
                      style={{ border: "none", padding: 5 }}
                      type="text"
                      value={imageName}
                      autoFocus
                      onChange={(e) => {
                        setImageName(e.target.value);
                      }}
                    />
                  </Grid>
                  {isImageNameEdit && (
                    <Grid>
                      <>
                        <IconButton aria-label="edit" onClick={imageNameEdit}>
                          <DoneSharpIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => SetisImageNameEdit(false)}
                        >
                          <ClearSharpIcon />
                        </IconButton>
                      </>
                    </Grid>
                  )}
                  <Grid className="col-md-2 col-2 justify-content-end d-flex pe-2">
                    <IconButton
                      aria-label="edit"
                      onClick={() => SetisImageNameEdit(true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )} */}
              {/* <Button
                variant="contained"
                onClick={(e) => {
                  ref.current?.click();
                }}
                disabled={!selectedImage}
              >
                Edit
              </Button> */}
              <Button
                sx={{ m: 1 }}
                variant="contained"
                onClick={(e) => {
                  const data = {
                    image: selectedImage,
                    name: imageName,
                  };
                  setSelectedImage(null);
                  setImageName("");
                  dispatch(PostImage({ data }, { dispatch }));
                  setOpen(false);
                }}
                disabled={!selectedImage}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                // disabled={!selectedImage}
              >
                Cancel
              </Button>
            </from>
          </Box>
        </Box>
      </Modal>
      <Snackbarr />
    </Box>
  );
}
