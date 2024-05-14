// var json = require('./data.json');
const mainTable = document.getElementById("mainTable");
async function fetchJSON() {
    let data = {};
    await fetch('./data.json')
        .then((response) => response.json()).then((res) => data = res)
        .catch((err) => console.log(err));
    return data;
}

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

function clearData(colnum) {
    for (row = 0; row < 40; row++) {
        var ronum = row - 3
        if (row < 3 || row > 34) {

        } else {
            mainTable.rows[ronum].cells[colnum].innerHTML = ""
        }
    }
}

function mcuBoardSelect(e, json) {
    data = json.mcuJsonData[e.target.value]
    if (!(data)) {
        heading.rows[0].cells[3].innerHTML = ""
        clearData(3)
        return
    }

    var ext1 = data['EXT1']
    var ext2 = data['EXT2']

    for (row = 0; row < 40; row++) {
        var ronum = row - 3
        if (row < 3 || row > 34) {

        } else {
            if (row > 18) {
                var temp = ext2[mainTable.rows[ronum].cells[0].innerHTML]
                if (temp) {
                    mainTable.rows[ronum].cells[2].innerHTML = ext2[mainTable.rows[ronum].cells[0].innerHTML]
                } else {
                    mainTable.rows[ronum].cells[2].innerHTML = '---'
                }
            } else {
                var temp = ext1[mainTable.rows[ronum].cells[0].innerHTML]
                if (temp) {
                    mainTable.rows[ronum].cells[2].innerHTML = ext1[mainTable.rows[ronum].cells[0].innerHTML]
                } else {
                    mainTable.rows[ronum].cells[2].innerHTML = '---'
                }
            }
        }
    }

    heading.rows[1].cells[2].innerHTML = mcuBoardList.value
}

function extBoardSelect(e,json) {

    data = json.extJsonData[e.target.value]
    if (!(data)) {
        heading.rows[0].cells[4].innerHTML = ""
        clearData(4)
        return
    }

    var ext1 = data['EXT1']
    var ext2 = data['EXT2']

    if (!(data['EXT2'])) {
        ext2 = data['EXT1']
    }

    for (row = 0; row < 40; row++) {
        var ronum = row - 3
        if (row < 3 || row > 34) {

        } else {
            if (row > 18) {
                var temp = ext2[mainTable.rows[ronum].cells[0].innerHTML]
                if (temp) {
                    mainTable.rows[ronum].cells[3].innerHTML = ext2[mainTable.rows[ronum].cells[0].innerHTML]
                } else {
                    mainTable.rows[ronum].cells[3].innerHTML = '---'
                }
            } else {
                var temp = ext1[mainTable.rows[ronum].cells[0].innerHTML]
                if (temp) {
                    mainTable.rows[ronum].cells[3].innerHTML = ext1[mainTable.rows[ronum].cells[0].innerHTML]
                } else {
                    mainTable.rows[ronum].cells[3].innerHTML = '---'
                }
            }
        }
    }

    heading.rows[1].cells[3].innerHTML = extBoardList.value
}


function formTable(json) {
    for (row = 0; row < 40; row++) {

        if (row < 3 || row > 34) {

        } else {
            const tr = mainTable.insertRow();
            if (row > 18) {
                tr.style.backgroundColor = "rgb(0,128,128)"
            } else {
                tr.style.backgroundColor = "rgb(128,128,0)"
            }
            for (col = 0; col < 4; col++) {
                const td = tr.insertCell()
                td.innerHTML = ""
            }
        }
    }

    for (row = 0; row < 40; row++) {
        var ronum = row - 3
        if (row < 3 || row > 34) {
        } else {
            if (row > 18) {
                mainTable.rows[ronum].cells[0].innerHTML = row + 2 - 18
            } else {
                mainTable.rows[ronum].cells[0].innerHTML = row
            }
        }
    }

    for (row = 0; row < 40; row++) {
        var ronum = row - 3
        if (row < 3 || row > 34) {
        } else {
            if (row > 18) {
                mainTable.rows[ronum].cells[1].innerHTML = json.xproDefinition[mainTable.rows[ronum].cells[0].innerHTML]
            } else {
                mainTable.rows[ronum].cells[1].innerHTML = json.xproDefinition[mainTable.rows[ronum].cells[0].innerHTML]
            }
        }
    }
}

fetchJSON().then((res) => {
    formTable(res)
    getmcuBoardList(res)
    getextBoardList(res)
    document.getElementById("mcuBoardList").addEventListener("change", (event) => mcuBoardSelect(event, res));
    document.getElementById("extBoardList").addEventListener("change", (event) => extBoardSelect(event, res));
})

