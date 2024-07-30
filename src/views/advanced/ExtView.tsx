import * as React from "react";
import { deviceType } from "../../components/Helper";
import { Key } from "../../data/types";
import SyncAltIcon from '@mui/icons-material/SyncAlt';

interface rowData {
    ext: Key[],
    mcu: Key[],
}

export const ExtView = (props: any) => {
    const [rows, setRows] = React.useState<rowData>({
        ext: [],
        mcu: []
    })
    // const extension = props?.extension;
    const ext = props?.extension
    const extData = props?.data["extensions"][ext]
    const adapter = props?.defs["touchAdapter"];
    const mcuInfo = props?.data[props?.type][props?.mcu]
    const aKeys = props?.defs?.advancedViewInfo?.extensions
    const dtype: any = deviceType;
    const type = dtype[props?.type]
    const len = (aKeys[1].length);

    const getAdapterKey = (ext: string, id: number) => {
        let key = "";
        let aKey = "";
        if (adapter["EXT1"][id]) { aKey = "EXT1" }
        else if (adapter["EXT2"][id]) { aKey = "EXT2" }

        if (mcuInfo[ext][adapter[aKey][id]])
            key = adapter[aKey][id]

        return key
    }


    const processMCUData = (): any => {
        const data: rowData = {
            ext: [],
            mcu: []
        };

        for (let i = 0; i < len; i++) {
            const id1 = aKeys[1][i];
            const id2 = aKeys[2][i];
            let mcuData = { 1: "", 2: "" };
            let exData = { 1: "", 2: "" };
            let conversionkey1 = id1
            let conversionkey2 = id2
            let extKey = props?.ext;
            let mcuExtkey = props?.ext;
            //collect and process rows
            if (!mcuInfo[mcuExtkey]) mcuExtkey = "EXT1";

            //if CNANO change the key based on the touch adapter pins
            if (type === deviceType.CNANO) {
                if (adapter[extKey][id1])
                    conversionkey1 = adapter[extKey][id1]
                if (adapter[extKey][id2])
                    conversionkey2 = adapter[extKey][id2]
            }

            //collect mcu data
            if (mcuInfo[mcuExtkey]) {
                if (mcuInfo[mcuExtkey][conversionkey1])
                    mcuData["1"] = mcuInfo[mcuExtkey][conversionkey1]?.data

                if (mcuInfo[mcuExtkey][conversionkey2])
                    mcuData["2"] = mcuInfo[mcuExtkey][conversionkey2]?.data
            }

            //collect extenstion data
            if (extData[extKey]) {
                if (extData[extKey][id1]) exData["1"] = extData[extKey][id1]?.data
                if (extData[extKey][id2]) exData["2"] = extData[extKey][id2]?.data
            } else {
                if (extData["EXT1"][id1]) exData["1"] = extData["EXT1"][id1]?.data
                if (extData["EXT1"][id2]) exData["2"] = extData["EXT1"][id2]?.data
            }

            data.mcu.push({ id1, id2, data1: mcuData[1], data2: mcuData[2] })
            data.ext.push({ id1, id2, data1: exData[1], data2: exData[2] })
        }
        return data;
    }

    const getContent = (type: string): any => {
        const info: any = rows;
        return info[type]?.map((row: any, i: number) => <tr key={row?.id1 + row?.id2} className={`${props?.color ?? ""}`}>
            <td>{row?.id1}</td>
            <td className={`border-strong-left ${i === (info[type]?.length - 1) ? "border-strong-bottom" : ""} ${i === 0 ? "border-strong-top" : ""}`}>{row?.data1}</td>
            <td className={`border-strong-right ${i === (info[type]?.length - 1) ? "border-strong-bottom" : ""} ${i === 0 ? "border-strong-top" : ""}`}>{row?.data2}</td>
            <td>{row?.id2}</td>
        </tr>)
    }

    React.useEffect(() => {
        setRows(processMCUData());
    }, [props?.mcu, props?.extension])

    return <div className="ext-view">
        {/* <div className="row"> */}
        {/* <div className="col-lg-3"> */}
        <table>
            <thead>
                <tr>
                    <th className="header">P#</th>
                    <th className="header" colSpan={2}>{type}</th>
                    <th className="header">P#</th>
                </tr>
            </thead>
            <tbody>
                {getContent("mcu")}
            </tbody>
        </table>
        <div className="svg-container">
            <SyncAltIcon />
        </div>
        <table>
            <thead>
                <tr>
                    <th className="header">P#</th>
                    <th className="header" colSpan={2}>{props?.ext}</th>
                    <th className="header">P#</th>
                </tr>
            </thead>
            <tbody>
                {getContent("ext")}
            </tbody>
        </table>
    </div>
}