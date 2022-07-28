from itertools import islice
from pathlib import Path
import requests
from bs4 import BeautifulSoup

result_filename = 'files/result_gcp.txt'
delimiter = ';'

res = requests.get('https://cloud.google.com/compute/docs/regions-zones')
soup = BeautifulSoup(res.content, 'html.parser')

data = soup.select('devsite-filter')
trs = data[0].select('tr')

headers = "Region;Zones;Location;Continent"
lines = [headers, ]
curr_line = []
zones = []
region = None

for tr in islice(trs, 1, None):
    tds = tr.select('td')
    zone = tds[0].get_text()
    curr_region = "-".join(zone.split("-")[0:-1])

    if curr_region == region:
        zones.append(zone)
        continue

    if region:
        txt_line = delimiter.join([region, str(zones), location_split])
        lines.append(txt_line)

    zones.clear()
    zones.append(zone)
    region = curr_region

    location = tds[1].get_text()
    location_split = delimiter.join(location.rsplit(",", 1))

    curr_line.clear()


txt_line = delimiter.join([curr_region, str(zones), location_split])
lines.append(txt_line)

Path(result_filename).write_text("\n".join(lines))
print(f"Results in: {result_filename}")
