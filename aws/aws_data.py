import boto3

result_filename = "files/result_aws.txt"
delimiter = ";"

aws_regions = boto3.client("ec2").describe_regions()
result_list = []

for region in aws_regions["Regions"]:
    region_name = region["RegionName"]

    try:
        ssm_client = boto3.client("ssm", region_name=region_name)
        query = "/aws/service/global-infrastructure/regions/%s/longName" % region_name
        ssm_response = ssm_client.get_parameter(Name=query)
        region_long_name = ssm_response["Parameter"]["Value"]
    except:
        region_long_name = ""

    client = boto3.client("ec2", region_name=region_name)
    region_filter = [{"Name": "region-name", "Values": [region_name]}]
    availability_zones = client.describe_availability_zones(Filters=region_filter)

    zones = []
    for z in availability_zones["AvailabilityZones"]:
        zones.append(z["ZoneName"])

    result_list.append(delimiter.join([region_name, region_long_name, str(zones)]))
    print(region_name)

result_list.sort()

with open(result_filename, "w") as csvfile:
    csvfile.write(delimiter.join(["name", "displayName", "zones"]) + "\n")
    csvfile.write("\n".join(result_list))

print(f"\nResults in: {result_filename}")
