import json
import subprocess

import boto3

result_filename = "files/result_aws.txt"
delimiter = ";"

# script uses different commands because of permission problems for not opted-in regions

result_list = []

cmd = 'aws ec2 describe-regions --all-regions --output json --query "Regions[].RegionName"'
output = subprocess.check_output(cmd, shell=True)
aws_regions = json.loads(output.decode('utf-8'))
print(f"{len(aws_regions)} regions")

for region in aws_regions:
    region_name = region

    try:
        cmd = f"aws ssm get-parameters-by-path --path /aws/service/global-infrastructure/regions/{region}"        
        output = subprocess.check_output(cmd, shell=True)
        data = json.loads(output.decode('utf-8')).get("Parameters", [])
        region_long_name = next((param["Value"] for param in data if "longName" in param["Name"]), None)
    except:
        region_long_name = ""

    client = boto3.client("ec2", region_name=region_name)
    try:
        region_filter = [{"Name": "region-name", "Values": [region_name]}]
        availability_zones = client.describe_availability_zones(Filters=region_filter)["AvailabilityZones"]
    except:
        availability_zones = [] # not opted-in for this region

    zones = []
    for z in availability_zones:
        zones.append(z["ZoneName"])
    result_list.append(delimiter.join([region_name, region_long_name, str(zones)]))
    print(region_name, region_long_name)

result_list.sort()

with open(result_filename, "w") as csvfile:
    csvfile.write(delimiter.join(["name", "displayName", "zones"]) + "\n")
    csvfile.write("\n".join(result_list))

print(f"\nResults in: {result_filename}")
