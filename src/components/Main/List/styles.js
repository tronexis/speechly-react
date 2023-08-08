import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  avatarIncome: {
    color: "#fff",
    backgroundColor: green[500],
  },
  avatarExpense: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  list: {
    maxHeight: "150px",
    overflow: "auto",
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    margin: "8px 0",
  },
  iconButton: {
    color: "#fd3c4a",
  },
}));
