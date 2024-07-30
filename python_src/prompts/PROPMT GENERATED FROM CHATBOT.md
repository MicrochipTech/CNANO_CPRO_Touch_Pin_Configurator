Task: Develop a CSV to JSON Conversion Script


Objective: Write a script that converts CSV files from two subfolders, CNANO and XPRO, into JSON format. Each subfolder has its own data conversion strategy, but they share some common columns.


Requirements:



Input Data:



CSV files located in two subfolders: CNANO and XPRO.

Common columns: TouchAdapter Key, EXT 1, Notes 1, EXT 2, Notes 2, EXT 3, Notes 3.

Some CSV files may lack EXT 2, Notes 2, EXT 3, Notes 3 columns.



CNANO Folder Specifics:



The Touch Adapter Key must be associated with a predefined key structure and split into different EXT data within the JSON output.

Use the provided "touchAdapter" association structure to map the Touch Adapter Key to the corresponding EXT data.



XPRO Folder Specifics:



No specific association structure is provided for the XPRO folder. Convert the CSV data directly into JSON format.



Output JSON Structure:



The JSON output should have a "device" object containing EXT 1, EXT 2, and EXT 3 objects, each with "data" and "note" fields.

The "device" name should be derived from the CSV file's name.

If EXT 2 and EXT 3 data are not present in the CSV, they should be omitted from the JSON output.



Example Input:



CNANO CSV Example: (list of TouchAdapter Key, EXT 1, Notes 1, …)

XPRO CSV Example: (list of TouchAdapter Key, EXT 1, Notes 1, EXT 2, Notes 2, …)



Example Output:



JSON Data after conversion: (JSON structure with device, EXT 1, EXT 2, EXT 3, data, and note fields)


Deliverables:



A script that reads CSV files from the specified subfolders and converts them into the required JSON format.

The script should handle the absence of EXT 2 and EXT 3 columns gracefully.

Include error handling for cases such as missing files or incorrect CSV format.

Ensure the script is well-commented to explain the logic and association process, especially for the CNANO folder.


Testing:



Test the script with the provided example inputs to ensure the output matches the expected JSON structure.

Verify that the script works correctly for both CNANO and XPRO folders.
