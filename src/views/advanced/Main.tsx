import * as React from "react";
import definitions from "../../data/definitons.json";
import data from "../../data/info.json";
import { McuView } from "./McuView";
import { ExtView } from "./ExtView";
import { Data } from "../../data/types";

export const AdvancedView = (props: any) => {
    const info: Data = data;
    const [exts, setExt] = React.useState<string[]>([])
    const colors = ["bg-primary", "bg-secondary"]
    React.useEffect(() => {
        //collect and modify the total number of extenstions
        const keys = Object.keys(info["extensions"][props?.ext] ?? {});
        const temp = keys;
        if (keys?.length > 0) { if (keys?.length === 1) temp.push("EXT2") }
        setExt(temp)
    }, [props?.ext])

    return <div>
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-4">
                <McuView type={props?.type} data={data} defs={definitions} mcu={props?.mcu} ext={props?.ext} />
            </div>
            <div className="col-lg-4">
                {
                    exts?.map((ext, i) => {
                        return <ExtView type={props?.type} data={data} defs={definitions} mcu={props?.mcu} extension={props?.ext} ext={ext} color={colors[i]} />
                    })
                }
            </div>
            <div className="col-lg-2"></div>
        </div>
    </div>
}