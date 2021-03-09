import React from "react";
import {
    Container,
    Grid,
    Box,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
} from "@material-ui/core";
import {PermMediaOutlined, AssessmentOutlined} from "@material-ui/icons";

function UserOptions() {
    return (
        <React.Fragment>
            <Paper variant="outlined">
                <List component="nav" subheader={<ListSubheader>Available options</ListSubheader>}>
                    <ListItem button selected={true}>
                        <ListItemIcon><PermMediaOutlined/></ListItemIcon>
                        <ListItemText
                            primary="Dataset"
                            secondary="Manipulate and update dataset for the model."
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AssessmentOutlined/></ListItemIcon>
                        <ListItemText
                            primary="Results"
                            secondary="See results and insights of the deep learning model."
                        />
                    </ListItem>
                </List>
            </Paper>
        </React.Fragment>
    );
}

function App() {
    return (
        <div className="app">
            <Container maxWidth="xl" disableGutters>
                <AppBar position="static" color="primary">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            GUI to manipulate (add augmentation) and update images dataset
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box padding={1}>
                    <Grid container>
                        <Grid item xs={2}><UserOptions/></Grid>
                        <Grid item container xs={4}/>
                        <Grid item container xs={6}/>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
