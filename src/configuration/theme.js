import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    }
  }
});

export default customTheme;
