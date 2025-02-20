import { useEffect, useRef } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";

import { useSpeechContext } from "@speechly/react-client";

import { Details, Main } from "./components";
import useStyles from "./styles";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "./config/firebase";
import { useUser } from "./context/userContext";
import { onValue, ref, set } from "firebase/database";
import { Mic, Stop } from "@material-ui/icons";

const App = () => {
  const classes = useStyles();
  const { listening, attachMicrophone, start, stop } = useSpeechContext();
  const { user, setUser } = useUser();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

  useEffect(() => {
    if (listening) {
      executeScroll();
    }
  }, [listening]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userRef = ref(db, user.uid);
        return onValue(userRef, (snapshot) => {
          if (!snapshot.exists())
            set(userRef, {
              displayName: user.displayName,
              email: user.email,
            });
        });
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          className={classes.topBar}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {user && (
              <Typography className={classes.name}>
                Hi, {user.displayName}
              </Typography>
            )}
            <Button
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={!user ? handleGoogleLogin : () => signOut(auth)}
            >
              {!user ? "Sign in to Google" : "Logout"}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} md={6} lg={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
        {/* <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer> */}
        {/* < */}
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "16px",
              textAlign: "center",
            }}
          >
            <Typography className={classes.footerText}>
              Copyright © {new Date().getFullYear()}. Made with ❤️ by Uzair
              Sheikh
            </Typography>
          </Box>
        </Grid>
        <IconButton
          onClick={handleClick}
          color="primary"
          size="large"
          shape="round"
          className={classes.micButton}
        >
          {listening ? <Stop fontSize="large" /> : <Mic fontSize="large" />}
        </IconButton>
      </Grid>
    </div>
  );
};

export default App;
