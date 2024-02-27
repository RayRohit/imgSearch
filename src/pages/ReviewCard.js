import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Divider } from "@mui/material";

export default function ReviewCard(props) {
  const { thumbnail, id, name } = props;
  console.log("Current Entry:", thumbnail, id, name);
  return (
    <>
      <Card
        key={id}
        sx={{
          maxWidth: 345,
          background: "#1b2531",
          color: "#fff",
          borderRadius: "10px",
          my: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "450px",
            height: "300px",
            objectFit: "fill",
          }}
          image={thumbnail}
          alt="Paella dish"
        />
        <Divider sx={{ background: "#fff" }} />
        <CardContent>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
            ID: <span style={{ fontWeight: "normal" }}>{id}</span>
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
            Date: <span style={{ fontWeight: "normal" }}>{name}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Reupload
          </Button>
          <Button variant="contained" color="error" disabled>
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
