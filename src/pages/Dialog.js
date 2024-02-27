import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  Box,
  Button,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { setDate } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";

const MyDialog = (props) => {
  const { handleClose, setImgShow, upload, imgShow, carddata } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderImageList = () => {
    return carddata?.imgArray
      ?.slice(startIndex, endIndex)
      ?.map((image, idx) => (
        <>
          {console.log(image)}
          {image.length === 0 ? (
            <>
              <Typography variant="h6">No Images Found!</Typography>
            </>
          ) : (
            <>
              <ListItem key={image?.id}>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setImgShow((prev) => {
                      return {
                        ...prev,
                        visible: true,
                        image: image?.ImagePath,
                      };
                    })
                  }
                >
                  <img
                    src={`http://192.168.1.98:5002/${image?.ImagePath}`}
                    alt="db nam"
                    width={80}
                  />
                </Box>
                <Box sx={{ pl: 4 }}>
                  {/* <Typography variant="body">ID : {idx}</Typography>
            <br /> */}
                  <Typography variant="body">
                    Name : {image.ImagePath}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </>
          )}
        </>
      ));
  };

  return (
    <React.Fragment>
      <Dialog
        {...props}
        sx={{
          fontWeight: "bolder",
          borderRadius: "20px",
        }}
      >
        <Tooltip title="close" arrow>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" sx={{ fontWeight: "bolder", p: 2 }}>
          {carddata == null ? "No Data!" : <>{carddata.title}</>}
        </Typography>
        {/* ... (your existing code for dialog content) */}
        {imgShow.visible ? (
          <>
            <Box sx={{ cursor: "pointer", textAlign: "center" }}>
              {imgShow.image === "" ? (
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", py: 2, color: "red" }}
                >
                  No Images !
                </Typography>
              ) : (
                <img
                  src={`http://192.168.1.98:5002/${imgShow?.image}`}
                  alt="lofog"
                  width="50%"
                />
              )}
            </Box>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setImgShow((prev) => {
                    return {
                      ...prev,
                      visible: false,
                      // image: null,
                    };
                  })
                }
              >
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <List>{renderImageList()}</List>

            <DialogActions>
              <Box sx={{ textAlign: "left", width: "100%", pt: 2, px: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ArrowLeftIcon />
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handlePageChange(currentPage + 1)}
                  sx={{ mx: 2 }}
                >
                  <ArrowRightIcon />
                </Button>

                <Typography
                  variant="h6"
                  sx={{ py: 2, fontSize: "16px", fontWeight: "700" }}
                >
                  Total Images : {carddata?.imgArray?.length}
                </Typography>
              </Box>
            </DialogActions>
            <Divider />
            <Box sx={{ textAlign: "right", width: "100%", pr: 3, py: 2 }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default MyDialog;
