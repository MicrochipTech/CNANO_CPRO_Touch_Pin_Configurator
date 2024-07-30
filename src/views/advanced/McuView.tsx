import * as React from "react";

export const McuView = (props: any) => {
    const [rows, setRows] = React.useState<any>([])
    const info: any = props?.data;
    const adInfo: any = props?.defs?.advancedViewInfo;
    const functionDefs = adInfo?.functions;
    const totalCount = Object.keys(adInfo?.touchAdapter)?.length / 2;
    const isMCUIds = (id: number): boolean => id > 5 && id < 22;
    const processRowData = () => {
        const rowData = [];
        for (var i = 0; i < totalCount; i++) {
            const id1 = i + 1;
            const id2 = ((totalCount * 2) - (i));
            let data1 = "";
            let data2 = "";
            const fn1 = functionDefs[id1];
            const fn2 = functionDefs[id2];

            if (isMCUIds(i)) {
                if (info[props?.type][props?.mcu]["EXT1"][id1]) {
                    data1 = info[props?.type][props?.mcu]["EXT1"][id1]?.data
                } else if (info[props?.type][props?.mcu]["EXT2"] && info[props?.type][props?.mcu]["EXT2"][id1]) {
                    data1 = info[props?.type][props?.mcu]["EXT2"][id1]?.data
                }

                if (info[props?.type][props?.mcu]["EXT1"][id2]) {
                    data2 = info[props?.type][props?.mcu]["EXT1"][id2]?.data
                } else if (info[props?.type][props?.mcu]["EXT2"] && info[props?.type][props?.mcu]["EXT2"][id2]) {
                    data2 = info[props?.type][props?.mcu]["EXT2"][id2]?.data
                }
            }

            rowData.push({ id1, fn1, data1, data2, fn2, id2 })
        }
        return rowData;
    }

    const getColSpan = (idx: number) => {
        if (idx === 0) return <td rowSpan={6} className="vertical-text border-strong-top">DEBUGGER</td>;
        if (idx === 6) return <td rowSpan={totalCount - 6} className="vertical-text bg-dark border-strong-top   border-strong-bottom">{props?.mcu}</td>;
    }

    React.useEffect(() => {
        const data = processRowData();
        setRows(data);
    }, [props?.mcu, props?.ext])

    return <div>
        <table className={`mcu-touch-adapter-view`}>
            <thead className="adv-header">
                <tr>
                    <th>P#</th>
                    <th>Function</th>
                    <th colSpan={3}>Curiosity Nano</th>
                    <th>Function</th>
                    <th>P#</th>
                </tr>
            </thead>
            <tbody>
                {rows?.map((data: any, i: number) => (<tr key={data?.id1 + i} className={`${isMCUIds(i) ? "mcu-row" : "debugger-row"}`}>
                    <td>{data?.id1}</td>
                    <td>{data?.fn1}</td>
                    <td className={`mcu-data border-strong-left ${i === rows?.length - 1 ? "border-strong-bottom" : ""} ${i === 0 || i === 6 ? "border-strong-top" : ""}`}>{data?.data1}</td>
                    {getColSpan(i)}
                    <td className={`mcu-data border-strong-right ${i === rows?.length - 1 ? "border-strong-bottom" : ""} ${i === 0 || i === 6 ? "border-strong-top" : ""}`}>{data?.data2}</td>
                    <td>{data?.fn2}</td>
                    <td>{data?.id2}</td>
                </tr>))}
            </tbody>
        </table>
    </div>
}