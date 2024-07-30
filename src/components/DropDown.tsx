import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const DropDown = (props: any): JSX.Element => {
    const handleChange = (event: SelectChangeEvent) => {
        props.setSelection(event.target.value);
    };

    return (
        <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
            <InputLabel>{props?.label}</InputLabel>
            <Select value={props.selection} onChange={handleChange} autoWidth>
                {props?.data?.map((data: string) => <MenuItem value={data}>{data}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
