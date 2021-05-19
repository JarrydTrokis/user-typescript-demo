import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles,
  Paper
} from "@material-ui/core";
import { User } from "./lib/users";
import { useAppDispatch, useAppSelector } from "./lib/store";
import { fetchUsers } from "./lib/users/reducer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    minHeight: 76,
    padding: "0 16px"
  },
  paper: {
    marginTop: 76,
    padding: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  // Open the dialog
  // Show the relevant data in the dialog for the active user
  const handleOpen = (id: string) => {
    const user = users.find((u) => u.id.value === id);

    if (!user) {
      alert("That user could not be found");
      return;
    }
    setOpen(true);
    setSelectedUser(user);
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Typography variant="h4">My First User Book</Typography>
      </AppBar>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5">
            User List
          </Typography>
          {!!users &&
            users.map((user: User) => {
              if (!user) return null;
              return (
                <ListItem
                  key={user.id.value + user.name.first}
                  button
                  onClick={() => handleOpen(user.id.value)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${user.name.first}`}
                      src={user.picture.thumbnail}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={user.id.value}
                    primary={`${user.name.title} ${user.name.first} ${user.name.last}`}
                    secondary={user.email}
                  />
                </ListItem>
              );
            })}
          <Button
            onClick={() => {
              dispatch(fetchUsers());
            }}
          >
            Load More Users
          </Button>
        </Paper>
      </Container>
      <Dialog
        open={open}
        // This is done to avoid seeing "undefined" in the dialog before it closes
        onExited={() => setSelectedUser(null)}
        onClose={() => setOpen(false)}
        aria-labelledby={selectedUser?.name.first}
        aria-describedby="current user in view"
      >
        <DialogTitle id="user-title">
          {`${selectedUser?.name.title} ${selectedUser?.name.first}`}
        </DialogTitle>
        <DialogContent>
          <img
            alt={`Avatar ${selectedUser?.name.first}`}
            src={selectedUser?.picture.large}
          />
          <DialogContentText>
            Name:{" "}
            {`${selectedUser?.name.title} ${selectedUser?.name.first} ${selectedUser?.name.last}`}
            <br />
            Email: {`${selectedUser?.email}`}
            <br />
            ID: {`${selectedUser?.id.value}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
