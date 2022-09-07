import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Typography
} from "@material-ui/core";

export default function SubsetSelect({ subset, selections, onChange }) {
    let get_shown_name = (originName) => {
        let name = originName.toLowerCase();
        switch(name) {
            case "paper": return "Paper";
            case "public set": return "Challenge Public";
            case "hidden dev set": return "Challenge Hidden Dev";
            case "hidden test set": return "Challenge Hidden Test";
            default: return originName;
        }
    }

    return (
        <div className="select group" style={{ width: "fit-content", maxWidth: "100%", margin: "10px auto" }}>
            <FormControl component="fieldset">
                <span style={{ color: "#4697E1"}}>
                    Task Collections
                </span>
                <RadioGroup row aria-label="position" name="position" defaultValue="Public Set" value={subset} onChange={onChange}>
                    {selections.map((selection) => {
                        return (
                            <FormControlLabel
                                value={selection}
                                control={<Radio color="textPrimary" />}
                                label={
                                    <Typography color="textPrimary">
                                        {get_shown_name(selection)}
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