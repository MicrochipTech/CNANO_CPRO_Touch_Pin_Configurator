Generate a common code for converting the data from csv based on the following scenario:

The main folder contains two sub folders CNANO and XPRO each will have a different data conversion strategies:

Both the sub folders CNANO's and XPRO's data will have have columns Key, EXT 1, Notes 1, EXT 2, Notes 2, EXT 3, Notes 3 and the data may or may not have EXT2, Notes2 , EXT 3, Notes 3, columns.

The Key needs to be associated with the following key and split into different ext data within the particular device json for CNANO folder alone.
The reference structure for association of Key for CNANO is 
{
        "EXT1": {
            "11":"3",
            "50":"4",
            "12":"5",
            "49":"6",
            "45":"7",
            "46":"8",
            "13":"9",
            "47":"10",
            "9":"11",
            "10":"12",
            "8":"13",
            "7":"14",
            "14":"15",
            "43":"16",
            "48":"17",
            "44":"18"
        },
       "EXT2": {
            "16":"3",
            "41":"4",
            "17":"5",
            "40":"6",
            "18":"7",
            "39":"8",
            "19":"9",
            "38":"10",
            "9":"11",
            "10":"12",
            "22":"13",
            "35":"14",
            "20":"15",
            "37":"16",
            "21":"17",
            "36":"18"
        }
    },

The reference structure for association of Key for XPRO is 
{
        "EXT1": {
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "14": "14",
            "15": "15",
            "16": "16",
            "17": "17",
            "18": "18"
        },
        "EXT2": {
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "14": "14",
            "15": "15",
            "16": "16",
            "17": "17",
            "18": "18"
        }
    }

Example csv input for CNANO is:
7,RC2,--
8,RC3,--
9,RB2,--
10,RB1,--
11,RC4,--
12,RC5,--
13,RC6,--
14,RD4,--
15,GND,--
16,RB0,--
17,RB3,--
18,RB4,--
19,RC7,--
20,RD0,--
21,RD1,--
22,RD2,--
23,RD3,--
24,GND,--
33,GND,--
34,RE0,--
35,RE1,--
36,RC0,--
37,RC1,--
38,RB5,--
39,RD5,--
40,RD6,--
41,RD7,--
42,GND,--
43,RA0,--
44,RA1,--
45,RA2,--
46,RA3,--
47,RA4,--
48,RA5,--
49,RA6,--
50,RA7,--

Example csv input for XPRO is:
3,XY2,--,,--
4,XY3,--,,--
5,XY8,--,,--
6,XY9,--,,--
7,XY14,--,,--
8,XY15,--,,--
9,XY16,--,,--
10,XY17,--,,--
11,XY12,--,XY12,--
12,XY13,--,XY13,--
13,XY7,--,,--
14,XY6,--,,--
15,XY4,--,XY5,--
16,XY10,--,XY10,--
17,,--,,--
18,XY11,--,XY11,--


The output JSON Data after conversion should look like:
{
    device:{
        EXT 1:{
            data: EXT 1 data,
            note: Notes 1 data
        },
        EXT 2:{
            data: EXT 3 data,
            note: Notes 2 data
        },
        EXT 3:{
            data: EXT 2 data,
            note: Notes 2 data
        }
    }
}

Note: in the above output JSON Data the device name should be derived from the csv files name and the csv data may or may not have EXT2, Notes2 , EXT 3, Notes 3, columns.
