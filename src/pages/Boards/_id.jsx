import Container from "@mui/material/Container";

import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";

function Board() {
  return (
    <Container disableGutters maxWidth={true} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar />
      <BoardBarContent />
    </Container>
  );
}

export default Board;
