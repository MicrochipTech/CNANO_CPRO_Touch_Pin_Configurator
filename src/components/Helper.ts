class Helper {
    deviceInfo = {};

    public fetchDeviceData = (folder: string, device: string) => {
        fetch(`../data/${folder}/${device}.json`).then((res) => res?.json()).then((data) => { this.deviceInfo = data[device]; return this.deviceInfo }).catch((e) => { console.log("Fetch failed due to :" + e) })
    }

    public getDeviceData = () => this.deviceInfo;
}

export const helper = new Helper();

export enum deviceType {
    CNANO = "Curiosity Nano",
    XPRO = "Curiosity Pro"
}