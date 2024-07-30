import csv
import json
import os

currentDirectory = os.path.curdir
extDirectory = os.path.join(os.path.curdir, "extension")
outputDirectory = os.path.join(currentDirectory, "json")

def csv_to_json(csv_file_path):
    json_data = {}
    with open(csv_file_path, mode="r", newline="") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            # Assuming the first column is 'Key'
            key = row[0]
            ext_keys = ["EXT1", "EXT2", "EXT3"]

            for i, ext_key in enumerate(ext_keys):
                ext_index = i + 1
                if ext_index < len(row) and row[ext_index]:  # Check if EXT data exists
                    if ext_key not in json_data.keys():
                        json_data[ext_key] = {}
                    json_data[ext_key][key] = {"data": row[ext_index]}
    return json_data

for filename in os.listdir(extDirectory):
    if filename.endswith(".csv"):
        csv_file_path = os.path.join(extDirectory, filename)
        json_data = csv_to_json(csv_file_path)
        if not os.path.exists(os.path.join(outputDirectory)):
            os.makedirs(os.path.join(outputDirectory))
        if not os.path.exists(os.path.join(outputDirectory, "extensions")):
            os.makedirs(os.path.join(outputDirectory, "extensions"))
        json_file_path = os.path.join(
            outputDirectory,
            "extensions",
            filename.replace(".csv", ".json"),
        )
        with open(json_file_path, "w") as jsonfile:
            json.dump(
                {filename.replace(".csv", ""): json_data},
                jsonfile,
                indent=2,
                ensure_ascii=False,
            )

print("Extension Info Conversion complete.")