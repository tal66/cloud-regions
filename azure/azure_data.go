package main

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"sort"
	"strings"
)

var az_in_file string = "../files/result_azure_temp.txt"
var az_out_file string = "../files/result_azure.txt"

type AzureRegion struct {
	DisplayName              string `json:"displayName"`
	Metadata                 `json:"metadata"`
	Name                     string                     `json:"name"`
	RegionalDisplayName      string                     `json:"RegionalDisplayName"`
	RegionCategory           string                     `json:"regionCategory"`
	AvailabilityZoneMappings []AvailabilityZoneMappings `json:"availabilityZoneMappings"`
}

type AvailabilityZoneMappings struct {
	LogicalZone  string `json:"logicalZone"`
	PhysicalZone string `json:"physicalZone"`
}

type Metadata struct {
	GeographyGroup   string         `json:"geographyGroup"`
	Latitude         string         `json:"latitude"`
	Longitude        string         `json:"longitude"`
	PhysicalLocation string         `json:"physicalLocation"`
	RegionType       string         `json:"RegionType"`
	PairedRegion     []PairedRegion `json:"pairedRegion"`
	RegionCategory   string         `json:"regionCategory"`
}

type PairedRegion struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func GetData() {
	file, err := os.Create(az_in_file)
	if err != nil {
		log.Fatalf("os.Create failed (%v)", err)
	}
	defer file.Close()

	cmd := exec.Command("az", "account", "list-locations")
	cmd.Stdout = file
	err = cmd.Run()
	if err != nil {
		log.Fatalf("exec failed (%v)", err)
	}

	log.Printf("Results in: %v \n", file.Name())
}

func ProcessData() {
	in_file_data := readFile(az_in_file)

	out_file, out_err := os.Create(az_out_file)
	if out_err != nil {
		log.Fatalf("os.Create failed (%v)", out_err)
	}
	defer out_file.Close()

	writer := csv.NewWriter(out_file)
	writer.Comma = ';'
	defer writer.Flush()

	data := unmarshal(in_file_data)

	sortRegionData(data)

	writeData(writer, data)

	log.Println("Results in", az_out_file)
}

func unmarshal(in_file_data []byte) []AzureRegion {
	var data []AzureRegion
	json_err := json.Unmarshal(in_file_data, &data)
	if json_err != nil {
		log.Fatal("Unmarshal failed: ", json_err)
	}
	return data
}

func writeData(writer *csv.Writer, data []AzureRegion) {
	row := []string{"name", "displayName", "city/state", "zones", "lon", "lat"}
	err := writer.Write(row)
	if err != nil {
		log.Fatal("writer.Write failed: ", err)
	}

	for _, r := range data {
		if r.RegionType == "Logical" {
			continue
		}

		var zones []string
		if len(r.AvailabilityZoneMappings) > 0 {
			for _, az := range r.AvailabilityZoneMappings {
				zones = append(zones, "'"+az.PhysicalZone+"'")
			}
		}

		row[0] = r.Name
		row[1] = r.RegionalDisplayName
		row[2] = r.Metadata.PhysicalLocation
		row[3] = ""
		if len(zones) > 0 {
			row[3] = "[" + strings.Join(zones, ", ") + "]"
		}
		row[4] = r.Longitude
		row[5] = r.Latitude

		err := writer.Write(row)
		if err != nil {
			log.Fatal("writer.Write failed: ", err)
		}
	}
}

func sortRegionData(data []AzureRegion) {
	sort.Slice(data, func(i, j int) bool {
		if data[i].GeographyGroup == data[j].GeographyGroup {
			return data[i].DisplayName < data[j].DisplayName
		}
		return data[i].GeographyGroup < data[j].GeographyGroup
	})
}

func readFile(in_file string) []byte {
	in_file_data, in_err := os.ReadFile(in_file)
	if in_err != nil {
		log.Fatalf("ioutil.ReadFile failed (%v)", in_err)
	}
	return in_file_data
}
