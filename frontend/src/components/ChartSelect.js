import {
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
} from "@material-ui/core";

export default function ChartSelect({ chart, onChange, selections }) {

    return (
        <div className="select group" style={{ width: "fit-content", maxWidth: "100%", margin: "5px auto" }}>
            <FormControl component="fieldset">
                <span style={{ color: "#4697E1"}}>
                    Visualizations
                </span>
                <RadioGroup row aria-label="position" name="position" defaultValue="Table" value={chart} onChange={onChange}>
                    {selections.map((selection) => {
                        return (
                            <FormControlLabel
                                value={selection}
                                control={<Radio color="textPrimary" />}
                                label={
                                    <Typography color="textPrimary">
                                        {selection}
                                    </Typography>
                                }
                                color="primary"
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    )
}