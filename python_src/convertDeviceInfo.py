import csv
import os
import json

currentDirectory = os.path.curdir
deviceDirectory = os.path.join(currentDirectory, "device")
outputDirectory = os.path.join(currentDirectory, "json")

# Define the paths for CNANO and XPRO subfolders
cnano_path = os.path.join(deviceDirectory, "CNANO")
xpro_path = os.path.join(deviceDirectory, "XPRO")


# Function to convert CSV data to JSON format
def csv_to_json(csv_file_path):
    json_data = {}
    with open(csv_file_path, mode="r", newline="") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            # Assuming the first column is 'Key'
            key = row[0]
            ext_keys = ["EXT1", "EXT2", "EXT3"]
            note_keys = ["Notes 1", "Notes 2", "Notes 3"]

            for i, ext_key in enumerate(ext_keys):
                ext_index = i * 2 + 1
                note_index = ext_index + 1
                if ext_index < len(row) and row[ext_index]:  # Check if EXT data exists
                    if ext_key not in json_data.keys():
                        json_data[ext_key] = {}
                    json_data[ext_key][key] = {
                        "data": row[ext_index],
                        "note": row[note_index] if note_index < len(row) else "",
                    }
    return json_data


# Function to process files in a given directory
def process_files_in_directory(directory, device_type):
    for filename in os.listdir(directory):
        if filename.endswith(".csv"):
            csv_file_path = os.path.join(directory, filename)
            json_data = csv_to_json(csv_file_path)
            if not os.path.exists(os.path.join(outputDirectory)):
                os.makedirs(os.path.join(outputDirectory))
            if not os.path.exists(os.path.join(outputDirectory, device_type)):
                os.makedirs(os.path.join(outputDirectory, device_type))
            json_file_path = os.path.join(
                outputDirectory,
                device_type,
                filename.replace(".csv", ".json"),
            )
            with open(json_file_path, "w", encoding="utf-8") as jsonfile:
                json.dump(
                    {filename.replace(".csv", ""): json_data},
                    jsonfile,
                    indent=2,
                    ensure_ascii=False,
                )


# Process CSV files for CNANO and XPRO
process_files_in_directory(cnano_path, "CNANO")
process_files_in_directory(xpro_path, "XPRO")

print("Device Info Conversion complete.")
