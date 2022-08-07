import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const NoRowsOverlay = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
      <Typography>データがありません</Typography>
    </Box>
  );
};
