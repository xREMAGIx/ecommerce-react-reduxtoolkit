import { createMuiTheme } from "@material-ui/core/styles";

//Color palette: https://colorhunt.co/palette/201882

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0f3460",
    },
    secondary: {
      main: "#e94560",
    },
    error: {
      main: "#dd4b39",
    },
    warning: {
      main: "#f39c12",
    },
    success: {
      main: "#1E8449",
    },
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});
