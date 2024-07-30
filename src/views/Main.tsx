import * as React from "react";
import definitions from "../data/definitons.json";
import { Navbar } from "../components/NavBar";
import { deviceType } from "../components/Helper";
import info from "../data/info.json"
import link from "../data/links.json";
import warnings from "../data/warnings.json";
import { AdvancedView } from "./advanced/Main";

interface Key {
    [key: string]: any
}

export const Main = (): JSX.Element => {
    const meta: Key = definitions;
    // const adapter: Key = definitons?.touchAdapterDefinition;
    // const func: Key = definitons?.functionDefinition;
    const data: Key = info;
    const [type, setType] = React.useState<string>(Object.keys(deviceType)[0]);
    const [tableData, setTableData] = React.useState<Key[]>([]);
    const [rowIds, setRowIds] = React.useState<number[]>([]);
    const span = Object.keys(meta?.function[type]["EXT1"]).length;
    const colors = ["bg-blue", "bg-green", "bg-yellow"];
    const ext: Key = data?.["extensions"];
    const mcu: Key = data?.[type];
    const [mcuInfo, setMcuInfo] = React.useState(Object.keys(data?.[type])[0]);
    const [extInfo, setExtInfo] = React.useState(Object.keys(data?.["extensions"])[0]);
    const dType: any = deviceType
    const typeValue = dType[type];

    const processData = () => {
        const arr: Key[] = [];
        const gid: any = [];
        const id: any = [];
        let data = 0;
        const mcuData = mcu[mcuInfo];
        const extData = ext[extInfo];
        console.log({ mcuData })
        let color = colors[0];
        Object.keys(extData).forEach((ex) => {
            Object.keys(extData[ex]).forEach((b, idx) => {
                if (gid.indexOf(ex) === -1) {
                    gid.push(ex);
                    id.push(data);
                }
                if (gid.indexOf(ex) > - 1) { color = colors[gid.indexOf(ex)] }
                data++;

                let deviceKey = b;
                let temp: any = {};
                if (typeValue === deviceType.CNANO)
                    deviceKey = meta?.touchAdapter[ex][b]

                if (mcuData[ex] !== undefined) {
                    temp = { ...temp, pin: b, adapter: deviceKey, function: meta.function[type][ex][b], mcuInfo: mcuData[ex][deviceKey]?.data, extData: extData[ex][b]?.data, note: mcuData[ex][b]?.note ?? "", color }
                    if (typeValue === deviceType.XPRO && temp?.adapter)
                        delete temp.adapter
                    arr.push(temp)
                }
            })
        })
        if (!mcuData["EXT2"]) {
            console.log({ ext: extData["EXT2"] })
            let extKey = extData["EXT2"] ? "EXT2" : "EXT1";
            Object.keys(extData[extKey]).forEach((b, idx) => {
                const ex = "EXT2";
                if (gid.indexOf(ex) === -1) {
                    gid.push(ex);
                    id.push(data);
                }
                if (gid.indexOf(ex) > - 1) { color = colors[gid.indexOf(ex)] }
                data++;
                let mcuInfo = "";
                let deviceKey = b;
                let temp = {};
                if (typeValue === deviceType.CNANO)
                    deviceKey = meta?.touchAdapter[ex][b]

                if (mcuData["EXT1"] && mcuData["EXT1"][deviceKey]) {
                    mcuInfo = mcuData["EXT1"][deviceKey]?.data
                }

                temp = { pin: b, adapter: deviceKey, function: meta.function[type][ex][b], mcuInfo, extData: extData[extKey][b]?.data, note: "", color }
                arr.push(temp)
            })
        }
        setRowIds(id)
        return arr;
    };

    React.useEffect(() => {
        setTableData(processData())
    }, [mcuInfo, extInfo])

    const calculateHeader = (i: number) => {
        const idx = rowIds.indexOf(i);
        if (idx !== -1) {
            return <td rowSpan={span} className={`vertical-text ${colors[idx]}`}>{`Extension Header ${idx + 1} (EXT ${idx + 1})`}</td>
        }
    }

    const getDeviceLink = () => {
        const data: any = link;
        if (data[type][mcuInfo]) return data[type][mcuInfo];
        return "";
    }

    const getExtensionLink = () => {
        const data: any = link;
        if (data["extensions"][extInfo]) return data["extensions"][extInfo];
        return "";
    }

    const getWarnings = () => {
        const wInfo: any = warnings;
        return <div>
            {wInfo?.common[type]?.warnings ?? ""}
            <br />
            {wInfo?.device[type][mcuInfo]?.warnings ?
                wInfo?.device[type][mcuInfo]?.warnings?.map((warning: string) => <div>{warning}</div>)
                : ""}
            {wInfo?.extensions[extInfo]?.warnings ?
                wInfo?.extensions[extInfo]?.warnings?.map((warning: string) => <div>{warning}</div>)
                : ""}
        </div>
    }

    return (
        <div className="container-md-fluid">
            <Navbar mcuMeta={mcu} setMcu={setMcuInfo} extMeta={ext} setExt={setExtInfo} type={type} setType={setType} />
            <div className="content">
                <div className="row text-align-left">
                    <div className="col-6">
                        <table className="w-100 mt-1 legend">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td rowSpan={3} style={{ width: "150px" }}>Legend</td>
                                    <td className="bg-blue" style={{ width: "200px" }}></td>
                                    <td style={{ textAlign: "left" }} className="bg-white">Curiosity Nano Touch Adapter Extension Header 1 (EXT1)</td>
                                </tr>
                                <tr>
                                    <td className="bg-green" style={{ width: "200px" }}></td>
                                    <td style={{ textAlign: "left" }} className="bg-white">Curiosity Nano Touch Adapter Extension Header 2 (EXT2)</td>
                                </tr>
                                <tr>
                                    <td className="bg-grey" style={{ width: "200px" }}></td>
                                    <td style={{ textAlign: "left" }} className="bg-white">Table Headers</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <br />
                        <div>
                            Table Representation of Curiosity Nano Boards Pin Outs → CNano Touch Adapter → Touch Extension Boards.
                        </div>
                        <br />
                        <table className="table table-borderless table-sm main-table">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={typeValue === deviceType.CNANO ? 4 : 3} className="header"></th>
                                    <th scope="col" className="header">{typeValue} Board</th>
                                    <th scope="col" className="header">Touch Extenstion Board</th>
                                    <th scope="col" className="header"></th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th scope="col" className="header"></th>
                                    <th scope="col" className="header">EXT Pin #</th>
                                    {typeValue === deviceType.CNANO ? <th scope="col" className="header">Touch Adapter</th> : ""}
                                    <th scope="col" className="header">Function</th>
                                    <th scope="col" className="bg-yellow">{mcuInfo}</th>
                                    <th scope="col" className="bg-yellow">{extInfo.replaceAll("_", " ")}</th>
                                    <th scope="col" className="header">Notes**</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((row, i) => {
                                        return <tr>
                                            {calculateHeader(i)}
                                            <td className={row?.color}>{row?.pin}</td>
                                            {typeValue === deviceType.CNANO ? <td className={row?.color}>{row?.adapter}</td> : ""}
                                            <td className={row?.color}>{row?.function}</td>
                                            <td className={row?.color}>{row?.mcuInfo}</td>
                                            <td className={row?.color}>{row?.extData === "---" ? "NC" : row?.extData}</td>
                                            <td className={row?.color}>{row?.note}</td>
                                            {/* <td className={"bg-light-green"}>{"TRUE"}</td> */}
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5">
                        <div className="text-left">
                            <h4 className="mt-1">Description</h4>
                            <span>This data is converted from Curiosity Nano / Curiosity Pro Touch Adapter Pin Configuration excel sheet which simplifies the process of converting the Curiosity Nano / Curiosity Pro boards pin-outs to the touch adapter board and touch extension boards.</span>
                            <br />
                            <br />
                            <h4>Instructions</h4>
                            <ol className="inst-list">
                                <li>Select the preferred type of category i.e Curiosity Nano / Curiosity Pro MCU from the type list in the toolbar</li>
                                <li>Select the preferred Curiosity Nano / Curiosity Pro MCU from the list of MCU's in the toolbar</li>
                                <li>Select the preferred extension from the list of extenstions in the toolbar dropdow</li>
                                <li>Check on either the table or visual pin mapping converions.</li>
                            </ol>
                            <br />
                            <br />
                            <h4>Result Summary</h4>
                            <span>View MCU Info:{"  "}<a href={getDeviceLink()} target="_blank" rel="noreferrer">{mcuInfo}</a>{"  "} </span>
                            <br />
                            <span>View Extension Info:{"  "}<a href={getExtensionLink()} target="_blank" rel="noreferrer">{extInfo}</a></span>
                            <br />
                            <br />
                            <h5>Warnings:</h5>
                            <ol className="inst-list">
                                {getWarnings()}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}