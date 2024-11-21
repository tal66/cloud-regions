const map = L.map("map").setView([25, 10], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

class Region {
    constructor(name, city, az, lon, lat) {
        this.name = name;
        this.city = city;
        this.az = az;
        this.lon = parseFloat(lon);
        this.lat = parseFloat(lat);
    }
}

function parse(data, provider) {
    const lines = data.trim().split("\n");
    const regionList = [];

    for (let i = 0; i < lines.length; i++) {
        const fields = lines[i].split(";");
        const region = getRegion(fields, provider);
        regionList.push(region);
    }

    return regionList;
}

function getRegion(fields, provider) {
    if (provider == "azure") {
        az = "";
        if (fields.length > 6) {
            az = fields[6];
        }
        return new Region(fields[0], fields[2], fields[3], fields[4], fields[5]);
    } else if (provider == "gcp") {
        return new Region(fields[0], fields[2], fields[1], fields[5], fields[4]);
    } else if (provider == "aws") {
        return new Region(fields[0], fields[1], fields[2], fields[4], fields[3]);
    }
}

const azureRegions = parse(azureData, "azure");
const gcpRegions = parse(gcpData, "gcp");
const awsRegions = parse(awsData, "aws");

///

function genMarkers(regions, provider, icon) {
    const result = [];
    regions.forEach((region) => {
        const marker = L.marker([region.lat, region.lon], {icon: icon}).addTo(map);
        marker._icon.classList.add(provider);
        az = region.az;
        if (az.length < 3) {
            az = "";
        }
        marker.bindPopup(
            `<b>${provider.toUpperCase()}</b><br>${region.city}<br>region: <b>${
                region.name
            }</b><br>${az}`
        );
        result.push(marker);
    });
    return result;
}

const gcpList = genMarkers(gcpRegions, "gcp", greenIcon);
const azureList = genMarkers(azureRegions, "azure", blueIcon);
const awsList = genMarkers(awsRegions, "aws", blackIcon);

const GCP = L.layerGroup(gcpList);
const AZURE = L.layerGroup(azureList);
const AWS = L.layerGroup(awsList);
const ALL = L.layerGroup([GCP, AZURE, AWS]);
GCP.addTo(map);
AZURE.addTo(map);
AWS.addTo(map);
map.addLayer(ALL);

L.control
    .layers({
        GCP: GCP,
        Azure: AZURE,
        AWS: AWS,
        All: ALL,
    })
    .addTo(map);
