from pathlib import Path
import requests
from bs4 import BeautifulSoup

delimiter = ";"
az_out_file = "files/result_azure_zones.txt"

resp = requests.get("https://azure.microsoft.com/en-us/global-infrastructure/geographies/")
soup = BeautifulSoup(resp.content, "html.parser")
tables = soup.select(".geo-tabs")

header = delimiter.join(("Region", "Location", "Year opened", "Availability Zones"))
lines = [header]

for t in tables:
    for table in t.select(".data-table__table"):
        locations = table.select("tbody")
        table_regions_header = table.select("thead")[0].select(".data-table__region-desc")
        regions = [r.getText().strip() for r in table_regions_header]

        for i, loc in enumerate(locations):
            trs = loc.select("tr")
            assert trs[0].select("th")[0].getText() == "Location"
            assert trs[1].select("th")[0].getText() == "Year opened"
            assert trs[2].select("th")[0].getText() == "Availability Zones presence"

            location_row = trs[0].select("td")
            year_row = trs[1].select("td")
            zones_row = trs[2].select("td")

            for i in range(len(regions)):
                line = delimiter.join(
                    (
                        regions[i],
                        location_row[i].getText().strip(),
                        year_row[i].getText().strip(),
                        zones_row[i].getText().strip(),
                    )
                )
                lines.append(line)


txt = "\n".join(lines)
Path(az_out_file).write_text(txt)
