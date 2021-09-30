import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography } from "@material-ui/core";

export default function SubsetSelect({ subset, selections, onChange }) {
    return (
        <div className="select group" style={{ width: "fit-content", maxWidth: "100%", margin: "auto", }}>
            <RadioGroup row aria-label="position" name="position" defaultValue="Public Set" value={subset} onChange={onChange}>
                {selections.map((selection) => {
                    return (
                        <FormControlLabel
                            value={selection}
                            control={<Radio color="textPrimary" />}
                            label={
                                <Typography color="textPrimary">
                                    {capitalizeFirstLetter(
                                        selection.toLowerCase()
                                    )}
                                </Typography>
                            }
                            color="primary"
                        />
                    );
                })}
            </RadioGroup>
        </div>
    )
}