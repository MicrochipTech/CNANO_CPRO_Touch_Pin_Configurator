import * as React from "react";
import { deviceType } from "./Helper";
import MemoryIcon from '@mui/icons-material/Memory';
import ToggleButton from "@mui/material/ToggleButton";
import { Key } from "../data/types";

export const Navbar = (props: any): JSX.Element => {
    const ext: Key = props?.extMeta;
    const mcu: Key = props?.mcuMeta;
    const type: any = deviceType;

    return <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand"><img src="./microchipLogo.png" alt="microchip" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex">
                    <div className="input-group">
                        <select className="form-select form-control me-2" aria-label="Default select example" onChange={(e) => props?.setType(e?.currentTarget?.value)}>
                            {Object.keys((type)).map((a: string) => <option value={a}>{type[a]}</option>)}
                        </select>
                        <select className="form-select form-control me-2" aria-label="Default select example" onChange={(e) => props?.setMcu(e?.currentTarget?.value)}>
                            {Object.keys((mcu)).map((a) => <option value={a}>{a}</option>)}
                        </select>
                        <select className="form-select form-control me-2" aria-label="Default select example" onChange={(e) => props?.setExt(e?.currentTarget?.value)}>
                            {Object.keys((ext)).map((a) => <option value={a}>{a}</option>)}
                        </select>
                        <ToggleButton value={""} className="advanced-view"><MemoryIcon /></ToggleButton>
                    </div>
                </form>
            </div>
        </div >
    </nav >
}