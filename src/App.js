import React, { useEffect, useRef } from 'react';
import { Box, Button, Grid } from "@material-ui/core";

import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";

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
import { child, onValue, ref, set } from "firebase/database";

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const { user, setUser } = useUser();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

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
          className={classes.main}
        >
          <Box
            sx={{
              maxWidth: "lg",
              marginX: "auto",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={!user ? handleGoogleLogin : () => signOut(auth)}
            >
              {!user ? "Sign in to Google" : "Logout"}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer>
      </Grid>
    </div>
  );
};

export default App;
