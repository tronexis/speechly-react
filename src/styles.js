import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mobile: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  desktop: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  main: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "4%",
    },
  },
  last: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      paddingBottom: "100px",
    },
  },
  grid: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  topBar: {
    display: "flex",
    width: "100%",
  },
  button: {
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "600",
  },
  name: {
    marginRight: "10px",
  },
  footerText: {
    fontSize: "14px",
  },
  micButton: {
    position: "fixed",
    bottom: 40,
    right: "100",
    background: "white",
    fontSize: 20,
    border: "2px solid #303f9f",
    "&:hover": {
      background: "#303f9f",
      color: "white",
    },
  },
}));
