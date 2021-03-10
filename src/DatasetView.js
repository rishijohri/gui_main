import React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Slider,
    Grid,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    Paper,
    Typography
} from "@material-ui/core";
import {fileOpen} from "browser-fs-access";
import PreviewImagesComponent from "./PreviewImagesComponent";
import {AddPhotoAlternateSharp, VisibilitySharp, CloudUploadSharp} from "@material-ui/icons";

async function handleSelectFiles() {
    // get files from user
    const blobs = await fileOpen({
        mimeTypes: ["image/*"],
        extensions: [".png", ".jpg", ".jpeg", ".bmp"],
        multiple: true,
        description: "Select images"
    });

    let tileData = [];
    // read the selected files' data
    for (let index = 0; index < blobs.length; ++index) {
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            tileData.push({src: event.target.result, alt: blobs[index].name});
        });
        /* for progress management
        reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Progress: ${Math.round(percent)}`);
            }
        });
        */
        reader.readAsDataURL(blobs[index]);
    }
    return tileData;
}

function ManipulationInputOptions() {
    const [classValue, setClassValue] = React.useState(1);

    return (
        <React.Fragment>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h6">Select Class</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl style={{minWidth: 250}}>
                        {/*<InputLabel id="select-class-label">Select Class</InputLabel>*/}
                        <Select
                            labelId="select-class-label"
                            id="select-class"
                            value={classValue}
                            onChange={event => setClassValue(event.target.value)}
                        >
                            <MenuItem value={1}>Class One</MenuItem>
                            <MenuItem value={2}>Class Two</MenuItem>
                            <MenuItem value={3}>Class Three</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h6">Blur</Typography>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="blur-pixels-value">Pixels</InputLabel>
                    <Input id="blur-pixels-value"
                           endAdornment={<InputAdornment position="end">px</InputAdornment>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography id="blur-probability" component={InputLabel}
                                gutterBottom>Probability</Typography>
                    <Slider defaultValue={0} min={0} max={1} step={0.1} marks
                            aria-labelledby="blur-probability"
                            valueLabelDisplay="auto"
                            getAriaValueText={value => `${value * 100}%`}
                    />
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h6">Noise</Typography>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="noise-value">Standard Deviation</InputLabel>
                    <Input id="noise-value"
                           endAdornment={<InputAdornment position="end">unit</InputAdornment>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography id="noise-probability" component={InputLabel}
                                gutterBottom>Probability</Typography>
                    <Slider defaultValue={0} min={0} max={1} step={0.1} marks
                            aria-labelledby="noise-probability"
                            valueLabelDisplay="auto"
                            getAriaValueText={value => `${value * 100}%`}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function AugmentationOptionsComponent({setTileData}) {
    return (
        <React.Fragment>
            <Paper variant="outlined">
                <Box padding={2}>
                    <Typography variant="h6" color="secondary" style={{padding: "0.5rem"}}>
                        Augmentation options
                    </Typography>
                    <Grid container spacing={3}>
                        <ManipulationInputOptions/>
                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs={8}>
                                <ButtonGroup variant="contained">
                                    <Button
                                        title="select-files"
                                        color="default"
                                        startIcon={<AddPhotoAlternateSharp/>}
                                        onClick={() => handleSelectFiles().then(data =>
                                            setTimeout(() => setTileData(data), 1000)
                                        )}
                                    >
                                        Select Files
                                    </Button>
                                    <Button
                                        title="preview-images"
                                        color="primary"
                                        startIcon={<VisibilitySharp/>}
                                    >
                                        Preview Images
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    title="submit-dataset"
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CloudUploadSharp/>}
                                >
                                    Submit Dataset
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

function DatasetView() {
    // view states
    const [tileData, setTileData] = React.useState([]);

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <AugmentationOptionsComponent setTileData={setTileData}/>
                </Grid>
                <Grid item xs={6}>
                    <PreviewImagesComponent tileData={tileData}/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DatasetView;
