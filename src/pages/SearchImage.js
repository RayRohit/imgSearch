import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import upload from "../images/upload.png";
import confidence from "../images/confusion.png";
import conflict from "../images/conflictt.png";
import identical from "../images/identicall.png";
import similarity from "../images/phoneticsSim.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import dummy from "./Dummy.json";
import TablePagination from "@mui/material/TablePagination";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { SearchPost } from "../reducers/ImageSearchSlice/ImageSearchSlice";
import { withStyles } from "@mui/styles";
import MyDialog from "./Dialog";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1B2531",
    color: theme.palette.common.white,
    // fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  // flex: 1,
  // width: 100,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:first-child": {
    backgroundColor: "#1B2531",
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

const SearchImage = () => {
  const [backdrop, handleBackdrop] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const handleBackdropClose = () => {
  //   handleBackdrop(false);
  // };

  const { currentSearch, TableData, CardData, load } = useSelector(
    (state) => state.ImageSearchReducer
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));
  // const date = new Date();
  const [search, setCurrentSearch] = useState({
    image: null,
    id: `${new Date().getMilliseconds()}`,
    name: null,
  });
  const [imgShow, setImgShow] = useState({
    visible: false,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    console.log(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    // if (!load) {
    //   setCurrentSearch({
    //     image: null,
    //     id: `${new Date().getMilliseconds()}`,
    //     name: null,
    //   });
    // }
  }, [load]);

  // const [resultData, setData] = useState([]);
  const [sortby, setSortBy] = useState("SortByImageFeatureScore");
  const [sortType, setSortType] = useState({
    SortByImageFeatureScore: true,
    SortByTotalSimilarityScore: false,
    SortByColorSpectrumScore: false,
  });
  const [tdata, setTdata] = useState([]);
  useEffect(() => {
    console.log("TableData", TableData);

    setTdata(TableData);
  }, [TableData]);

  useEffect(() => {
    // let data = dummy?.data;
    if (tdata.length !== 0) {
      if (sortby === "SortByImageFeatureScore") {
        SortByImageFeatureScore(tdata);
      }
      if (sortby === "SortByTotalSimilarityScore")
        SortByTotalSimilarityScore(tdata);
      if (sortby === "SortByColorSpectrumScore")
        SortByColorSpectrumScore(tdata);
    }
  }, [sortby, sortType, tdata]);

  function SortByImageFeatureScore(data) {
    const sortedData = [...data].sort((a, b) =>
      sortType.SortByImageFeatureScore
        ? b.FeatureScore - a.FeatureScore
        : a.FeatureScore - b.FeatureScore
    );
    setTdata(sortedData);
  }

  function SortByTotalSimilarityScore(data) {
    const sortedData = [...data].sort((a, b) =>
      sortType.SortByTotalSimilarityScore
        ? b.ColourScore - a.ColourScore
        : a.ColourScore - b.ColourScore
    );
    setTdata(sortedData);
  }

  function SortByColorSpectrumScore(data) {
    console.log("data3 =>", data);
    const sortedData = [...data].sort((a, b) =>
      sortType.SortByColorSpectrumScore
        ? b.PhoneticScore - a.PhoneticScore
        : a.PhoneticScore - b.PhoneticScore
    );
    setTdata(sortedData);
  }

  const [likelyConfusion, setLikelyConfusion] = useState({
    Name: "Likely Confusion",
    LikelyConfusionScore: 63,
    LikelyConfusionImages: [
      {
        ImagePath: "static/db_images/00000e23-4448-46d3-944c-799316bf0e7c.jpg",
      },
      {
        ImagePath: "static/db_images/000022ef-59a1-4f00-b666-79f6d4c2a03e.jpg",
      },
      {
        ImagePath: "static/db_images/00002d7b-5818-4575-a19a-6789e0080460.jpg",
      },
      {
        ImagePath: "static/db_images/00003c6d-26d2-4a8d-87b7-7f39b66add8a.jpg",
      },
      {
        ImagePath: "static/db_images/00004d81-1886-49ea-8aeb-b2e5c5943352.jpg",
      },
      {
        ImagePath: "static/db_images/0000ce8a-7ba5-48f0-9d58-fde2930831fb.jpg",
      },
      {
        ImagePath: "static/db_images/0000f670-cb01-408a-9355-0c79bc469157.jpg",
      },
      {
        ImagePath: "static/db_images/000127d4-77fb-47af-b5fc-6a734c589e27.jpg",
      },
      {
        ImagePath: "static/db_images/00012e01-a493-4bf6-a0a4-1fe0d2a6c27f.jpg",
      },
      {
        ImagePath: "static/db_images/000145e0-1523-4b6d-8067-066fe438c84f.jpg",
      },
      {
        ImagePath: "static/db_images/00014a3f-2fe4-4954-8276-5ff811ca07cf.jpg",
      },
      {
        ImagePath: "static/db_images/0001ffb9-5d6e-469e-91cd-0b44cbaf042f.jpg",
      },
      {
        ImagePath: "static/db_images/00021dab-4d9f-4eda-aec1-6898e89c7861.jpg",
      },
      {
        ImagePath: "static/db_images/00022b89-d567-42e2-9b2c-0ba1778f20d4.jpg",
      },
      {
        ImagePath: "static/db_images/00024b13-e91a-47ac-a875-07c4b6bcbb18.jpg",
      },
      {
        ImagePath: "static/db_images/00025b17-413e-4e11-bc60-93c273616d1a.jpg",
      },
    ],
  });
  const [identicals, setIdentical] = useState({
    Name: "IdenticalMatch",
    IdenticalMatchImages: [
      {
        ImagePath: "static/db_images/000022ef-59a1-4f00-b666-79f6d4c2a03e.jpg",
      },
    ],
  });
  const [conflicts, setConflict] = useState({
    Name: "Likely Conflict",
    LikelyConflictScore: 87,
    LikelyConflictImages: [
      {
        ImagePath: "static/db_images/000022ef-59a1-4f00-b666-79f6d4c2a03e.jpg",
      },
      {
        ImagePath: "static/db_images/0000ce8a-7ba5-48f0-9d58-fde2930831fb.jpg",
      },
    ],
  });
  const [phonet, setPhonet] = useState({
    PhoneticScore: 33,
    PhoneticScoreImage: [
      {
        ImagePath: "static/db_images/000022ef-59a1-4f00-b666-79f6d4c2a03e.jpg",
      },
      "",
      {
        ImagePath: "static/db_images/0000ce8a-7ba5-48f0-9d58-fde2930831fb.jpg",
      },
      "",
      {
        ImagePath: "static/db_images/000127d4-77fb-47af-b5fc-6a734c589e27.jpg",
      },
      "",
      {
        ImagePath: "static/db_images/00018c89-7f6d-4e54-a608-396ad3988569.jpg",
      },
      "",
      {
        ImagePath: "static/db_images/0001ffb9-5d6e-469e-91cd-0b44cbaf042f.jpg",
      },
      "",
    ],
  });
  const [cardsData, setCardData] = useState([
    {
      title: "Identical Matches",
      value:
        identicals?.IdenticalMatchImages === undefined
          ? 0
          : identicals?.IdenticalMatchImages?.length,
      reference: "IdenticalMatch",
      imgArray: identicals?.IdenticalMatchImages,
      icon: <img src={identical} alt="card-icons" width={50} />,
    },
    {
      title: "Likelihood Confusion",
      value: likelyConfusion?.LikelyConfusionScore,
      reference: "LikelyConfusion",
      imgArray: likelyConfusion?.LikelyConfusionImages,
      icon: <img src={confidence} alt="card-icons" width={50} />,
    },
    {
      title: "Likelihood Conflict",
      value: conflicts?.LikelyConflictScore,
      reference: "LikelyConflict",
      imgArray: conflicts?.LikelyConflictImages,
      icon: <img src={conflict} alt="card-icons" width={50} />,
    },
    {
      title: "Phonetics Similarity",
      value: phonet?.PhoneticScore,
      imgArray: phonet?.PhoneticScoreImage,
      reference: "",

      icon: <img src={similarity} alt="card-icons" width={50} />,
    },
  ]);

  useEffect(() => {
    setCardData([
      {
        title: "Identical Matches",
        value:
          CardData[2]?.IdenticalMatch?.IdenticalMatchImages === undefined
            ? 0
            : `${CardData[2]?.IdenticalMatch?.IdenticalMatchImages?.length}`,
        reference: "IdenticalMatch",
        imgArray: CardData[2]?.IdenticalMatch?.IdenticalMatchImages,
        icon: <img src={identical} alt="card-icons" width={50} />,
      },
      {
        title: "Likelihood Confusion",
        value:
          CardData[0]?.LikelyConfusion?.LikelyConfusionScore === undefined
            ? 0
            : `${CardData[0]?.LikelyConfusion?.LikelyConfusionScore}%`,
        reference: "LikelyConfusion",
        imgArray: CardData[0]?.LikelyConfusion?.LikelyConfusionImages,
        icon: <img src={confidence} alt="card-icons" width={50} />,
      },
      {
        title: "Likelihood Conflict",
        value:
          CardData[1]?.LikelyConflict?.LikelyConflictScore === undefined
            ? 0
            : `${CardData[1]?.LikelyConflict?.LikelyConflictScore}%`,
        reference: "LikelyConflict",
        imgArray: CardData[1]?.LikelyConflict?.LikelyConflictImages,
        icon: <img src={conflict} alt="card-icons" width={50} />,
      },
      {
        title: "Phonetics Similarity",
        value:
          CardData[3]?.PhoneticScore === undefined
            ? 0
            : CardData[3]?.PhoneticScore === ""
            ? ""
            : `${CardData[3]?.PhoneticScore}%`,
        imgArray: CardData[3]?.PhoneticScoreImage,
        reference: "",

        icon: <img src={similarity} alt="card-icons" width={50} />,
      },
    ]);
  }, [CardData]);

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [refData, setRefData] = React.useState([]);

  const handleClickOpen = (card, index) => {
    console.log("card", card);
    setRefData(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileName(file);
    setError("");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCurrentSearch((prev) => {
          return {
            ...prev,
            image: reader.result,
            name: file?.name,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    try {
      if (fileName === null) {
        setError("Please Select an Image!");
        return;
      }
      const data = {
        image: fileName,
        base64: search.image,
        name: search.name,
        date: new Date(),
        error: "",
      };
      setFileName(null);
      dispatch(SearchPost({ data }, { dispatch }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileName(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCurrentSearch((prev) => {
          return {
            ...prev,
            image: reader.result,
            name: file?.name,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const [dialogOpen, setdialogOpen] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

  const handledialogOpen = (imagePath) => {
    setSelectImage(imagePath);
    setdialogOpen(true);
  };

  const handledialogClose = () => {
    setSelectImage(null);
    setdialogOpen(false);
  };

  const renderRows = (data) => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return data.slice(startIndex, endIndex).map((row, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell sx={{ color: "#fff" }}>
          {startIndex + index + 1}
        </StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>{index + 1}</StyledTableCell>
        <StyledTableCell>
          <img
            src={`http://192.168.1.98:5002/${row.ImagePath}`}
            alt={` for ID ${index + 1}`}
            style={{ width: "70px", height: "70px", cursor: "pointer" }}
            onClick={() => handledialogOpen(row.ImagePath)}
          />
        </StyledTableCell>
        <Dialog
          open={dialogOpen}
          onClose={handledialogClose}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent>
            <Grid container spacing={2} justifyContent={"space-around"}>
              <Tooltip title="close" arrow>
                <IconButton
                  aria-label="close"
                  onClick={handledialogClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <CloseIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
              <Grid item xs={5} sx={{ mx: 1, mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: "bolder", py: 2 }}>
                  Input Image
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {console.log(currentSearch?.base64)}
                  <img
                    src={currentSearch?.base64}
                    alt={` for ID ${index + 1}`}
                    style={{
                      width: "70%",
                      height: "70%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
              <Box sx={{ borderRight: "2px solid grey", my: 2 }}></Box>
              <Grid item xs={5} sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: "bolder", py: 2 }}>
                  Database Image
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {selectImage && (
                    <img
                      src={`http://192.168.1.98:5002/${selectImage}`}
                      alt={` for ID ${index + 1}`}
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <StyledTableCell sx={{ color: "#fff" }}>
          {row.FeatureScore}%
          <LinearProgress
            variant="determinate"
            value={row.FeatureScore}
            sx={{
              width: matches ? "180px" : "80px",
              p: 0.6,
              borderRadius: "10px",
              my: 1,
            }}
          />
        </StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>
          {row.ColourScore}%
          <LinearProgress
            variant="determinate"
            value={row.ColourScore}
            sx={{
              width: matches ? "180px" : "80px",
              p: 0.6,
              borderRadius: "10px",
              my: 1,
            }}
          />
        </StyledTableCell>
        <StyledTableCell sx={{ color: "#fff" }}>
          {row.PhoneticScore}
          {row.PhoneticScore !== "" ? "%" : "-"}
          {row.PhoneticScore === "" ? (
            ""
          ) : (
            <LinearProgress
              variant="determinate"
              value={row.PhoneticScore.toFixed(2)}
              sx={{
                width: matches ? "180px" : "80px",
                p: 0.6,
                borderRadius: "10px",
                my: 1,
              }}
            />
          )}
        </StyledTableCell>
        <StyledTableCell>
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
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  return (
    <>
      {/* <Button onClick={handleBackdrop}>Show backdrop</Button> */}
      {/* {load ? ( */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
        // onClick={handleBackdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* ) : ( */}
      <Grid container spacing={2} sx={{ border: "2px solid #8F9092", pr: 2 }}>
        <Grid item xs={4}>
          <Box
            sx={{
              height: matches ? "270px" : "280px",
              borderRadius: "20px",
              background: "#273143",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bolder", px: 2, pt: 2, color: "#fff" }}
            >
              Select Image
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: matches ? "" : "center",
                pt: selectedImage ? 2 : 6,
                mx: matches ? "" : 3,
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                id="image-upload-input"
              />
              <label htmlFor="image-upload-input">
                <Box
                  sx={{
                    background: "#1B2531",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {search.image === null ? (
                    <>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={upload}
                          alt="upload icon"
                          width={30}
                          style={{
                            verticalAlign: "middle",
                            paddingRight: "5px",
                          }}
                        />
                        <span
                          style={{ verticalAlign: "middle", color: "#fff" }}
                        >
                          Drag & Drop or Click to Upload
                        </span>
                      </div>
                    </>
                  ) : (
                    <img
                      src={search?.image}
                      alt="Selected"
                      style={{
                        width: "120px",
                        height: "120px",
                        aspectRatio: 3 / 2,
                        margin: "auto",
                      }}
                    />
                  )}
                </Box>
              </label>
              <Box
                sx={{
                  px: matches ? 6 : 3,
                  pt: selectedImage ? 3 : "",
                }}
              >
                <Typography variant="h6" sx={{ pb: 1, color: "#fff" }}>
                  {search?.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "#F69924",
                    "&:hover": {
                      background: "rgba(246, 153, 36, 0.8)",
                    },
                  }}
                  onClick={handleSearch}
                  endIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Box>
            </Box>
            <Box sx={{ color: "red", textAlign: "center", width: "100%" }}>
              <Typography variant="body">{error}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              height: matches ? "270px" : "280px",
              background: "#273143",
              borderRadius: "20px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bolder", px: 2, pt: 2, color: "#fff" }}
            >
              Image Profile
            </Typography>
            <Box
              sx={{
                display: matches ? "flex" : "",
                justifyContent: matches ? "space-around" : "",
                marginTop: matches ? "20px" : "",
                gap: matches ? "" : "10px",
              }}
            >
              {matches ? (
                cardsData.map((card, index) => (
                  <Card
                    key={index}
                    style={{
                      width: 220,
                      borderRadius: "20px",
                      background: "#1B2531",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClickOpen(card, index)}
                  >
                    <CardContent>
                      <IconButton size="small" disabled>
                        {card.icon}
                      </IconButton>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "21px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            color: "#fff",
                          }}
                        >
                          {card.title}
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{ fontSize: "30px", color: "#fff" }}
                        >
                          {card.value}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Grid container spacing={2} sx={{ px: 2, pt: 5 }}>
                  {cardsData.map((card, index) => (
                    <Grid item xs={3} key={index}>
                      <Card
                        style={{
                          maxWidth: 250,
                          borderRadius: "20px",
                          background: "#1B2531",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={() => handleClickOpen(card)}
                      >
                        <CardContent>
                          <IconButton size="small" disabled={true}>
                            {card.icon}
                          </IconButton>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                color: "#fff",
                              }}
                            >
                              {card.title}
                              &nbsp;&nbsp;
                            </Typography>
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              sx={{ fontSize: "26px", color: "#fff" }}
                            >
                              {card.value}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>

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
                  Search Results
                </Typography>
                <TableContainer>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          S.No{" "}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          ID
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          Image
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          Feature Match (%)
                          <span>
                            <Button
                              sx={{ color: "#fff" }}
                              onClick={() => {
                                setSortBy("SortByImageFeatureScore");
                                setSortType({
                                  SortByImageFeatureScore:
                                    !sortType.SortByImageFeatureScore,
                                  SortByTotalSimilarityScore: false,
                                  SortByColorSpectrumScore: false,
                                });
                              }}
                            >
                              {sortType.SortByImageFeatureScore ? (
                                <ArrowDownward />
                              ) : (
                                <ArrowUpward />
                              )}
                            </Button>
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          Similarity Score (%)
                          <span>
                            <Button
                              sx={{ color: "#fff" }}
                              onClick={() => {
                                setSortBy("SortByTotalSimilarityScore");
                                setSortType({
                                  SortByImageFeatureScore: false,
                                  SortByTotalSimilarityScore:
                                    !sortType.SortByTotalSimilarityScore,
                                  SortByColorSpectrumScore: false,
                                });
                              }}
                            >
                              {sortType.SortByTotalSimilarityScore ? (
                                <ArrowDownward />
                              ) : (
                                <ArrowUpward />
                              )}
                            </Button>
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          Phonetics Similarity (%)
                          <span>
                            <Button
                              sx={{ color: "#fff" }}
                              onClick={() => {
                                setSortBy("SortByColorSpectrumScore");
                                setSortType({
                                  SortByImageFeatureScore: false,
                                  SortByTotalSimilarityScore: false,
                                  SortByColorSpectrumScore:
                                    !sortType.SortByColorSpectrumScore,
                                });
                              }}
                            >
                              {sortType.SortByColorSpectrumScore ? (
                                <ArrowDownward />
                              ) : (
                                <ArrowUpward />
                              )}
                            </Button>
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            fontSize: matches ? 20 : 14,
                            wordBreak: "break-all",
                            width: matches ? 100 : 80,
                          }}
                        >
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {TableData?.length === 0 ? (
                      <TableBody
                        sx={{
                          border: "1px solid",
                        }}
                      >
                        <TableCell colSpan={7}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bolder",
                              color: "#fff",
                              textAlign: "center",
                              pt: 2,
                            }}
                          >
                            No Search Results !
                          </Typography>
                        </TableCell>
                      </TableBody>
                    ) : (
                      <TableBody>
                        <StyledTableCell
                          sx={{
                            color: "#fff",
                            backgroundColor: "#1B2531",
                            fontSize: "18px !important",
                          }}
                        >
                          {new Date(currentSearch?.date).getMilliseconds()}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color: "#fff",
                            backgroundColor: "#1B2531",
                            fontSize: "18px !important",
                          }}
                        >
                          {new Date(currentSearch?.date).getMilliseconds()}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                        >
                          <img
                            src={currentSearch?.base64}
                            alt="similarity"
                            width={80}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                        ></StyledTableCell>
                        <StyledTableCell
                          sx={{ color: "#fff", backgroundColor: "#1B2531" }}
                        ></StyledTableCell>
                        {renderRows(tdata)}
                      </TableBody>
                    )}
                  </Table>
                  <TablePagination
                    sx={{ color: "#fff" }}
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={TableData?.length}
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
      </Grid>
      {/* )} */}
      <MyDialog
        handleClose={handleClose}
        open={open}
        imgShow={imgShow}
        setImgShow={setImgShow}
        upload={upload}
        carddata={refData}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      />
    </>
  );
};

export default SearchImage;
