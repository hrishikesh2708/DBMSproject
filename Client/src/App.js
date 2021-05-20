import {
  Box,
  Button,
  Container,
  Paper,
  AppBar,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import React from "react";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import * as moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0f0c29",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#c5cae9",
    },
  },
}))(TableRow);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const useStyles1 = makeStyles((theme) => ({
  container: {
    background: "#0f0c29",
    background: "-webkit-linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    marginTop: theme.spacing(0),
    textAlign : "center",
    color: "#eceff1"
  },
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    maxWidth: 700,
    margin: "auto",
  },
  formItem: {
    marginTop: theme.spacing(2),
  },
}));
function App() {
  const [studentId, setstudentId] = React.useState("");
  const [studentName, setstudentName] = React.useState("");
  const [year, setyear] = React.useState("");
  const [bookId, setbookId] = React.useState("");
  const [bookName, setbookName] = React.useState("");
  const [author, setauthor] = React.useState("");
  const [publisher, setpublisher] = React.useState("");
  const [cost, setcost] = React.useState("");
  const [bookingDate, setbookingDate] = React.useState("");
  const [renewalDate, setrenewalDate] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [data, setdata] = React.useState([]);
  const classes = useStyles1();
  const theme = useTheme();

  const onsubmit = (e) => {
    e.preventDefault();
    console.log(
      "onsubmit is called",
      studentId,
      studentName,
      bookId,
      bookName,
      author,
      year,
      publisher,
      cost,
      bookingDate,
      renewalDate
    );
    const postData = {
      studentId,
      studentName,
      year,
      bookId,
      bookName,
      author,
      publisher,
      cost,
      bookingDate,
      renewalDate,
    };
    axios.post("http://localhost:5001/submit", postData).then((response) => {
      console.log(response);
    });
    axios.get("http://localhost:5001/display").then((res) => {
      console.log(res);
      setdata(res.data);
    });
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    axios.get("http://localhost:5001/display").then((res) => {
      console.log(res);
      setdata(res.data);
    });
  }, []);
  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h3" className>
          LIBRARY MANAGEMENT SYSTEM
        </Typography>
        <Container>
          <Paper className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                centered
              >
                <Tab label="Enter Details" {...a11yProps(0)} />
                <Tab label="Display Contents" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box mx={2} my={1} p={1}>
                  <Paper elevation={4} className={classes.paper}>
                    <Box mx={2} my={2} py={4} px={1}>
                      <form noValidate className={classes.form}>
                        <TextField
                          fullWidth
                          id="studentId"
                          label="Student Id"
                          type="text"
                          variant="outlined"
                          value={studentId}
                          className={classes.formItem}
                          onChange={(e) => setstudentId(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="studentName"
                          label="Student Name"
                          type="text"
                          variant="outlined"
                          value={studentName}
                          className={classes.formItem}
                          onChange={(e) => setstudentName(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="year"
                          type="text"
                          label="Year"
                          variant="outlined"
                          value={year}
                          className={classes.formItem}
                          onChange={(e) => setyear(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="bookId"
                          label="Book Id"
                          type="number"
                          variant="outlined"
                          value={bookId}
                          className={classes.formItem}
                          onChange={(e) => setbookId(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="bookName"
                          type="text"
                          label="Book Name"
                          variant="outlined"
                          value={bookName}
                          className={classes.formItem}
                          onChange={(e) => setbookName(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="author"
                          type="text"
                          label="Author"
                          variant="outlined"
                          value={author}
                          className={classes.formItem}
                          onChange={(e) => setauthor(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="publisher"
                          type="text"
                          label="Publisher"
                          variant="outlined"
                          value={publisher}
                          className={classes.formItem}
                          onChange={(e) => setpublisher(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          id="cost"
                          label="cost"
                          type="number"
                          variant="outlined"
                          value={cost}
                          className={classes.formItem}
                          onChange={(e) => setcost(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          type="date"
                          id="bookingDate"
                          label="Booking Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          value={bookingDate}
                          className={classes.formItem}
                          onChange={(e) => setbookingDate(e.target.value)}
                        />

                        <TextField
                          fullWidth
                          type="date"
                          id="renewalDate"
                          label="Renewal Date"
                          className={classes.formItem}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          value={renewalDate}
                          onChange={(e) => setrenewalDate(e.target.value)}
                        />

                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          type="submit"
                          className={classes.formItem}
                          onClick={onsubmit}
                        >
                          Submit
                        </Button>
                      </form>
                    </Box>
                  </Paper>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Student Id</StyledTableCell>
                        <StyledTableCell>Student Name</StyledTableCell>
                        <StyledTableCell>Year</StyledTableCell>
                        <StyledTableCell>Book Id</StyledTableCell>
                        <StyledTableCell>Book Name</StyledTableCell>
                        <StyledTableCell>Author</StyledTableCell>
                        <StyledTableCell>Publisher</StyledTableCell>
                        <StyledTableCell>Cost</StyledTableCell>
                        <StyledTableCell>Booking Date</StyledTableCell>
                        <StyledTableCell>Renewal Date</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.student_id}
                          </StyledTableCell>
                          <StyledTableCell>{row.student_name}</StyledTableCell>
                          <StyledTableCell>{row.year}</StyledTableCell>
                          <StyledTableCell>{row.book_id}</StyledTableCell>
                          <StyledTableCell>{row.book_name}</StyledTableCell>
                          <StyledTableCell>{row.author}</StyledTableCell>
                          <StyledTableCell>{row.publisher}</StyledTableCell>
                          <StyledTableCell>{row.cost}</StyledTableCell>
                          <StyledTableCell>
                            {moment(row.booking_date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {moment(row.renewal_date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </Container>
      </Container>
    </>
  );
}

export default App;
