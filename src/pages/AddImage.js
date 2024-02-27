import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isImageNameEdit, SetisImageNameEdit] = useState(false);
  const ref = useRef();

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  useEffect(() => {
    setImageName(selectedImage?.name);
  }, [selectedImage?.name]);
  const imageNameEdit = (e) => {
    setImageName(e.target.value);
    SetisImageNameEdit(false);
  };

  return (
    <Grid item xs={4}>
      <Paper elevation={3} sx={{ height: "430px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bolder", px: 2, pt: 2 }}>
          Upload Image
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                  "Drag & Drop or Click to Upload"
                )}
              </Box>
            </label>

            {selectedImage && (
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
            )}
            <Button
              variant="contained"
              onClick={(e) => {
                ref.current?.click();
              }}
              disabled={!selectedImage}
            >
              Edit
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              onClick={(e) => {
                ref.current?.click();
              }}
              disabled={!selectedImage}
            >
              Submit
            </Button>
          </from>
        </Box>
      </Paper>
    </Grid>
  );
};

export default AddImage;
