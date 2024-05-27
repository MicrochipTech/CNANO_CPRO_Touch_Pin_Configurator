// var json = require('./data.json');
// const mainTable = document.getElementById("mainTable");
async function fetchJSON() {
    let data = {};
    await fetch('./data.json')
        .then((response) => response.json()).then((res) => data = res)
        .catch((err) => console.log(err));
    return data;
}
// data = 
// {
//     "mcuJsonData": {
//         "SAMD21 Xplained Pro": {
//             "EXT1": {
//                 "3": "Y6",
//                 "4": "Y7",
//                 "5": "Y12",
//                 "6": "Y13",
//                 "7": "Y8",
//                 "8": "Y9",
//                 "9": "Y10",
//                 "10": "Y11",
//                 "11": "X0",
//                 "12": "X1",
//                 "13": "Y15",
//                 "14": "Y14",
//                 "15": "Y3",
//                 "16": "Y4",
//                 "17": "Y2",
//                 "18": "Y5"
//             },
//             "EXT2": {
//                 "3": "X2",
//                 "4": "X3",
//                 "5": "X8",
//                 "6": "X9",
//                 "7": "X12",
//                 "8": "X13",
//                 "9": "X14",
//                 "10": "X15",
//                 "11": "X0",
//                 "12": "X1",
//                 "13": "",
//                 "14": "",
//                 "15": "X5",
//                 "16": "X6",
//                 "17": "X4",
//                 "18": "X7"
//             },
//             "EXT3": {}
//         },
//         "SAMD20 Xplained Pro": {
//             "EXT1": {
//                 "3": "Y8",
//                 "4": "Y7",
//                 "5": "Y12",
//                 "6": "Y13",
//                 "7": "Y8",
//                 "8": "Y9",
//                 "9": "Y10",
//                 "10": "Y11",
//                 "11": "X0",
//                 "12": "X1",
//                 "13": "Y15",
//                 "14": "Y14",
//                 "15": "Y3",
//                 "16": "Y4",
//                 "17": "Y2",
//                 "18": "Y5"
//             },
//             "EXT2": {
//                 "3": "X2",
//                 "4": "X3",
//                 "5": "X8",
//                 "6": "X9",
//                 "7": "X12",
//                 "8": "X13",
//                 "9": "X14",
//                 "10": "X15",
//                 "11": "X0",
//                 "12": "X1",
//                 "13": "",
//                 "14": "",
//                 "15": "X5",
//                 "16": "X6",
//                 "17": "X4",
//                 "18": "X7"
//             },
//             "EXT3": {}
//         }
//     },
//     "extJsonData": {
//         "QT3 Xplained Pro": {
//             "EXT1": {
//                 "3": "Y1",
//                 "4": "Y2",
//                 "5": "Y3",
//                 "6": "Y4",
//                 "7": "X1",
//                 "8": "X2",
//                 "9": "X3",
//                 "10": "---",
//                 "11": "---",
//                 "12": "---",
//                 "13": "---",
//                 "14": "---",
//                 "15": "LED COL 1",
//                 "16": "LED COL 2",
//                 "17": "LED COL 3",
//                 "18": "LED COL 4"
//             },
//             "EXT2": {
//                 "3": "X1",
//                 "4": "X2",
//                 "5": "X3",
//                 "6": "---",
//                 "7": "LED ROW 1",
//                 "8": "LED ROW 2",
//                 "9": "LED ROW 3",
//                 "10": "LED ROW 4",
//                 "11": "---",
//                 "12": "---",
//                 "13": "---",
//                 "14": "---",
//                 "15": "---",
//                 "16": "---",
//                 "17": "---",
//                 "18": "---"
//             }
//         },
//         "QT5 Xplianed Pro": {
//             "EXT1": {
//                 "3": "Y0",
//                 "4": "Y1",
//                 "5": "---",
//                 "6": "---",
//                 "7": "X0",
//                 "8": "X1",
//                 "9": "X2",
//                 "10": "X3",
//                 "11": "SDA",
//                 "12": "SDA",
//                 "13": "---",
//                 "14": "---",
//                 "15": "---",
//                 "16": "---",
//                 "17": "---",
//                 "18": "---"
//             }
//         }
//     },
//     "xproDefinition": {
//         "3": "ADC(+)",
//         "4": "ADC(-)",
//         "5": "GPIO1",
//         "6": "GPIO2",
//         "7": "PWM(+)",
//         "8": "PWM(-)",
//         "9": "IRQ/GPIO",
//         "10": "SPI_SS_B/GPIO",
//         "11": "TWI_SDA",
//         "12": "TWI_SCL",
//         "13": "USART_RX",
//         "14": "USART_TX",
//         "15": "SPI_SS_A",
//         "16": "SPI_MOSI",
//         "17": "SPI_MISO",
//         "18": "SPI_SCK"
//     }
// }

// async function fetchJSON() {
//     return data;
// }


function getmcuBoardList(json) {
    Object.keys(json.mcuJsonData).forEach(element => {
        temp = document.createElement("option")
        temp.value = element
        temp.text = element
        mcuBoardList.append(temp)
    });
}

function getextBoardList(json) {
    Object.keys(json.extJsonData).forEach(element => {
        temp = document.createElement("option")
        temp.value = element
        temp.text = element
        extBoardList.append(temp)
    });
}

function clearData(whichData) {
    if(whichData == "TCH") {
        for(item = 1; item <= 2; item++) {
            for(row=3; row<=18; row++){
                element = document.getElementById("tch_ext1_"+item+"_"+row)
                if(element) {
                    element.innerHTML = ""
                }
    
                element = document.getElementById("tch_ext2_"+item+"_"+row)
                if(element) {
                    element.innerHTML = ""
                }
            }
            tch_board_id_1.innerHTML = ""
            title_ext1.innerHTML = "EXT1"
            title_ext2.innerHTML = "EXT2"
        }
    }else {
        for(item = 1; item <= 3; item++) {
            for(row=3; row<=18; row++){
                element = document.getElementById("mcu_ext1_"+item+"_"+row)
                if(element) {
                    element.innerHTML = ""
                }
    
                element = document.getElementById("mcu_ext2_"+item+"_"+row)
                if(element) {
                    element.innerHTML = ""
                }
            }
        }
        mcu_board_id_1.innerHTML = ""
        mcu_board_id_2.innerHTML = ""
    }
}

function mcuBoardSelect(e, json) {
    data = json.mcuJsonData[e.target.value]
    if (!(data)) {
        clearData("MCU")
        return
    }

    var ext1 = data['EXT1']
    var ext2 = data['EXT2']

    for(item = 1; item <= 3; item++) {
        for(row=3; row<=18; row++){
            temp = ext1[row]
            element = document.getElementById("mcu_ext1_"+item+"_"+row)
            if(element) {
                if(temp){
                    element.innerHTML = temp
                } else {
                    element.innerHTML = "---"
                }
            }

            temp = ext2[row]
            element = document.getElementById("mcu_ext2_"+item+"_"+row)
            if(element) {
                if(temp){
                    element.innerHTML = temp
                } else {
                    element.innerHTML = "---"
                }
            }
        }
    }

    mcu_board_id_1.innerHTML = e.target.value
    mcu_board_id_2.innerHTML = e.target.value
}

function extBoardSelect(e,json) {

    data = json.extJsonData[e.target.value]
    if (!(data)) {
        clearData("TCH")
        return
    }

    title_ext2.innerHTML = e.target.value + " EXT1"
    title_ext1.innerHTML = e.target.value + " EXT1"
    alternateOptionId.innerHTML = ""

    var ext1 = data['EXT1']
    var ext2 = data['EXT2']

    if (!(data['EXT2'])) {
        ext2 = data['EXT1']
        title_ext2.innerHTML = e.target.value + " EXT1"
        alternateOptionId.innerHTML = "Alternate Option"
    }

    for(item = 1; item <= 2; item++) {
        for(row=3; row<=18; row++){
            temp = ext1[row]
            element = document.getElementById("tch_ext1_"+item+"_"+row)
            if(element) {
                if(temp){
                    element.innerHTML = temp
                } else {
                    element.innerHTML = "---"
                }
            }

            temp = ext2[row]
            element = document.getElementById("tch_ext2_"+item+"_"+row)
            if(element) {
                if(temp){
                    element.innerHTML = temp
                } else {
                    element.innerHTML = "---"
                }
            }
        }
    }

    tch_board_id_1.innerHTML = e.target.value

    return
}

function formAddSelectOption() {
    element = document.getElementById("mcu_board_selection_id")
    if(element) {
        ele = document.createElement("select")
        ele.id = "mcuBoardList"
        ele.style.fontFamily = "Calibri"
        ele.style.fontSize = "large"
        ele.innerHTML = "<option size=\"7\">Select MCU board from the list... </option>"
    }
    element.append(ele)

    element = document.getElementById("tch_board_selection_id")
    if(element) {
        ele = document.createElement("select")
        ele.id = "extBoardList"
        ele.style.fontFamily = "Calibri"
        ele.style.fontSize = "large"
        ele.innerHTML = "<option size=\"7\">Select Touch board from the list... </option>"
    }
    element.append(ele)
}

fetchJSON().then((res) => {
    formAddSelectOption()
    getmcuBoardList(res)
    getextBoardList(res)
    document.getElementById("mcuBoardList").addEventListener("change", (event) => mcuBoardSelect(event, res));
    document.getElementById("extBoardList").addEventListener("change", (event) => extBoardSelect(event, res));
})

