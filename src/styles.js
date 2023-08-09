import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  desktop: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  main: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "5%",
    },
  },
  last: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      paddingBottom: "200px",
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
  micButton: {
    position: "fixed",
    bottom: 30,
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
