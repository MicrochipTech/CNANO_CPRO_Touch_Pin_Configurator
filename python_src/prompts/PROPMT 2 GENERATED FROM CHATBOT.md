
Task: Develop a Python script to convert CSV data into a structured JSON format for two different devices, CNANO and XPRO, which are located in separate subfolders. Each device has its own key association rules and data conversion strategy.


Input: CSV files within the CNANO and XPRO subfolders. Each CSV file contains columns with the potential structure: Key, EXT 1, Notes 1, EXT 2, Notes 2, EXT 3, Notes 3. Note that the columns EXT 2, Notes 2, EXT 3, and Notes 3 may be optional.


Key Association Rules:



CNANO: Use the provided reference structure to associate the 'Key' column values with the corresponding device JSON keys.

XPRO: Follow a similar structure where the 'Key' directly maps to the same number for each EXT.


Output: A JSON object for each CSV file with the following structure:


Copy json

{
    "device": {
        "EXT 1": {
            "data": "EXT 1 data",
            "note": "Notes 1 data"
        },
        "EXT 2": {
            "data": "EXT 2 data",
            "note": "Notes 2 data"
        },
        "EXT 3": {
            "data": "EXT 3 data",
            "note": "Notes 3 data"
        }
    }
}

The 'device' key should be named after the CSV file's name. The JSON should only include the EXT and Notes sections that are present in the CSV.


Requirements:



Read CSV files from the CNANO and XPRO subfolders.

For each CSV file, create a JSON object with the structure outlined above.

Use the key association rules for CNANO and XPRO to correctly map the 'Key' values to the JSON keys.

Save the JSON object to a file with the same name as the CSV file, but with a .json extension.

Ensure that the script can handle CSV files that do not have all the optional columns.


Example:
Given a CSV file named device123.csv in the CNANO folder with the following content:


Copy

11,RC4,--,50,RA7,--,8,RC3,--

The output JSON file device123.json should look like:


Copy json

{
    "device123": {
        "EXT 1": {
            "data": "RC4",
            "note": "--"
        },
        "EXT 2": {
            "data": "RA7",
            "note": "--"
        },
        "EXT 3": {
            "data": "RC3",
            "note": "--"
        }
    }
}

Note: The actual 'EXT' and 'Notes' data should be replaced with the corresponding values from the CSV file. The 'Key' values should be used to determine the correct 'EXT' and 'Notes' based on the reference structures provided for CNANO and XPRO.