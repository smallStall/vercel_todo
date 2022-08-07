import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const NoResultsOverlay = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>

      <Typography>該当するデータがありません</Typography>
    </Box>
  );
};
