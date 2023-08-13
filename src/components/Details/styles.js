import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  income: {
    // borderBottom: "10px solid rgba(0, 255, 0, 0.5)",
    background: "#00a86b",
    color: "white",
    borderRadius: "20px",
    padding: "10px",
    margin: "0 20px",
  },
  expense: {
    // borderBottom: "10px solid rgba(255, 0, 0, 0.5)",
    background: "#fd3c4a",
    color: "white",
    borderRadius: "20px",
    padding: "10px",
    margin: "0 20px",
  },
  total: {
    fontWeight: "700",
    fontSize: "32px",
  },
}));
