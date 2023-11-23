import { Card as MuiCard } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import AttachmentIcon from "@mui/icons-material/Attachment";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";

import PropTypes from "prop-types";

function Card({ hiddenMedia }) {
  if (hiddenMedia) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Card 01</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/450px-Male_Green_Iguana_Belize.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>Card 01</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  );
}

Card.propTypes = {
  hiddenMedia: PropTypes.bool,
};
export default Card;
