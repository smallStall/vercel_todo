import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontSize: 16,
    h1: {
      fontSize: 40,
      paddingBottom: 30,
    },
    h2: {
      fontSize: 30,
      paddingBottom: 10,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        sx: { paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3 },
      },
    },
  },
});
