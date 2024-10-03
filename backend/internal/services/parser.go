package services

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"

	"github.com/Yavuzlar/CodinLab/internal/domains"
<<<<<<< HEAD
=======
	service_errors "github.com/Yavuzlar/CodinLab/internal/errors"
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
)

type parserService struct {
	utils IUtilService
}

func newParserService(
	utils IUtilService,
) domains.IParserService {
	return &parserService{
		utils: utils,
	}
}

func (s *parserService) checkDir(dir string) (err error) {
	fileInfo, err := os.Stat(dir)
	if os.IsNotExist(err) {
		return err
	}

	if !fileInfo.IsDir() {
		return os.ErrNotExist
	}

	return nil
}

// Gets json files.
func (s *parserService) findJSONFiles(rootDir string) (jsonFiles []string, err error) {
	// Walk through the directory to find JSON files
	err = filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		// Check if the file is a JSON file
		if !info.IsDir() && strings.HasSuffix(strings.ToLower(info.Name()), ".json") {
			jsonFiles = append(jsonFiles, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}
	return
}

func (s *parserService) GetInventory() (inventory []domains.InventoryP, err error) {
	// Check if the directory exists
	err = s.checkDir("object")
	if err != nil {
		return
	}

	// Read the JSON file containing language information
	jsonData, err := os.ReadFile("object/inventory.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into languages slice
	err = json.Unmarshal(jsonData, &inventory)
	if err != nil {
		return nil, err
	}

	return
}

<<<<<<< HEAD
=======
func (s *parserService) GetNFTs() (nfts []domains.NFTMetadataP, err error) {
	// Check if the directory exists
	err = s.checkDir("object")
	if err != nil {
		return
	}

	// Find JSON files for the lab
	jsonFiles, err := s.findJSONFiles("object/nfts")
	if err != nil {
		return nil, err
	}

	// Loop through each JSON file
	for _, file := range jsonFiles {
		// Read the JSON file
		jsonData, err := os.ReadFile(file)
		if err != nil {
			return nil, err
		}

		var nft domains.NFTMetadataP
		err = json.Unmarshal(jsonData, &nft)
		if err != nil {
			return nil, err
		}

		nfts = append(nfts, nft)
	}

	return
}

func (s *parserService) GetNFTByID(id int) (nft *domains.NFTMetadataP, err error) {
	if id == 0 {
		return nil, service_errors.NewServiceErrorWithMessage(400, "invalid nft id")
	}

	nfts, err := s.GetNFTs()
	if err != nil {
		return nil, service_errors.NewServiceErrorWithMessage(400, "error while getting nfts")
	}

	for _, n := range nfts {
		if n.ID == id {
			nft = &n
			break
		}
	}

	return
}

>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
func (s *parserService) GetLabs() (labs []domains.LabP, err error) {
	// Check if the directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}

	// Find JSON files for the lab
	jsonFiles, err := s.findJSONFiles("object/labs")
	if err != nil {
		return nil, err
	}

	// Loop through each JSON file
	for _, file := range jsonFiles {
		// Read the JSON file
		jsonData, err := os.ReadFile(file)
		if err != nil {
			return nil, err
		}

		var lab domains.LabP
		err = json.Unmarshal(jsonData, &lab)
		if err != nil {
			return nil, err
		}

		labs = append(labs, lab)
	}

	return
}

func (s *parserService) GetRoads() (roads []domains.RoadP, err error) {
	// Ensure the "object" directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}

	// Retrieve the list of programming languages
	inventory, err := s.GetInventory()
	if err != nil {
		return nil, err
	}

	// Iterate over each language in the inventory
	for _, language := range inventory {
		road := domains.RoadP{
			ID:            language.ID,
			Name:          language.Name,
			DockerImage:   language.DockerImage,
			IconPath:      language.IconPath,
			Cmd:           language.Cmd,
			FileExtension: language.FileExtension,
		}

		// Locate JSON files within the language's lab directory
		jsonFiles, err := s.findJSONFiles(language.PathDir)
		if err != nil {
			return nil, err
		}

		// Iterate over each JSON file found
		for _, file := range jsonFiles {
			// Read the content of the JSON file
			jsonData, err := os.ReadFile(file)
			if err != nil {
				return nil, err
			}

			var path domains.PathP
			// Unmarshal the JSON data into the path object
			err = json.Unmarshal(jsonData, &path)
			if err != nil {
				return nil, err
			}
			// Append the path to the current road
			road.Paths = append(road.Paths, path)
		}

		// Append the current road to the list of roads
		roads = append(roads, road)
	}
	return
}

func (s *parserService) GetLevels() (levels []domains.LevelP, err error) {
	// Ensure the "object" directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}
	// Read the JSON file containing level information
	jsonData, err := os.ReadFile("object/level.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into level slice
	err = json.Unmarshal(jsonData, &levels)
	if err != nil {
		return nil, err
	}
	return
}

func (s *parserService) GetWelcomeBanner() (content []domains.WelcomeContent, err error) {
	// Ensure the "object" directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}
	// Read the JSON file containing welcome information
	jsonData, err := os.ReadFile("object/home/welcome.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into level slice
	err = json.Unmarshal(jsonData, &content)
	if err != nil {
		return nil, err
	}
	return
}

func (s *parserService) GetLabBanner() (content []domains.LabContent, err error) {
	// Ensure the "object" directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}
	// Read the JSON file containing welcome information
	jsonData, err := os.ReadFile("object/home/lab.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into level slice
	err = json.Unmarshal(jsonData, &content)
	if err != nil {
		return nil, err
	}
	return
}

func (s *parserService) GetRoadBanner() (content []domains.RoadContent, err error) {
	// Ensure the "object" directory exists
	err = s.checkDir("object")
	if err != nil {
		return nil, err
	}
	// Read the JSON file containing welcome information
	jsonData, err := os.ReadFile("object/home/road.json")
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into level slice
	err = json.Unmarshal(jsonData, &content)
	if err != nil {
		return nil, err
	}
	return
}
