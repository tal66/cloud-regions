import json
import os
import subprocess

import requests
from bs4 import BeautifulSoup

root_dir = os.path.dirname(os.path.abspath(__file__))
if os.path.basename(root_dir) == "aws":
    root_dir = os.path.dirname(root_dir)

result_filename = f"{root_dir}/files/result_aws.txt"
delimiter = ";"


def scrape_aws_regions_table():
    url = "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching the AWS regions page: {response.status_code}")
        return

    soup = BeautifulSoup(response.content.decode('utf-8'), 'html.parser')
    table = soup.find("table")

    regions = []

    for row in table.find_all("tr")[1:]:
        cols = row.find_all("td")
        if len(cols) == 3:
            region_code = cols[0].text.strip()
            region_name = cols[1].text.strip()
            opt_in_status = cols[2].text.strip()

            regions.append(
                {
                    "Code": region_code,
                    "Name": region_name,
                    "OptInStatus": opt_in_status,
                }
            )

    return regions


result_list = []

aws_regions = scrape_aws_regions_table()
for region in aws_regions:
    region_name = region["Name"]
    region_code = region["Code"]
    opt_in_status = region["OptInStatus"]  # 'Not required' or 'Required'

    availability_zones = []
    if opt_in_status == "Not required":
        try:
            cmd = f"aws ec2 describe-availability-zones --region {region_code} --output json --query AvailabilityZones[*].ZoneName"
            output = subprocess.check_output(cmd, shell=True)
            availability_zones = json.loads(output.decode("utf-8"))
            print(f"{region_code}: {availability_zones}")
        except Exception as e:
            print(f"skip finding azs for {region_code} (error)")

    result_list.append(delimiter.join([region_code, region_name, str(availability_zones)]))

result_list.sort()

with open(result_filename, "w") as csvfile:
    csvfile.write(delimiter.join(["name", "displayName", "zones"]) + "\n")
    csvfile.write("\n".join(result_list))

print(f"\nResults in: {result_filename}")
