package dto

type DTOManager struct {
	UserDTOManager  *UserDTOManager
	LogDTOManager   *LogDTOManager
	RoadDTOManager  *RoadDTOManager
	HomeDTOManager  *HomeDTOManager
	LabDTOManager   *LabDTOManager
	AdminDTOManager *AdminDTOManager
<<<<<<< HEAD
=======
	Web3DTOManager  *Web3DTOManager
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
}

func CreateNewDTOManager() *DTOManager {
	userDTOManager := NewUserDTOManager()
	logDTOManager := NewLogDTOManager()
	roadDTOManager := NewRoadDTOManager()
	homeDTOManager := NewHomeDTOManager()
	labDTOManager := NewLabDTOManager()
	adminDTOManager := NewAdminDTOManager()
<<<<<<< HEAD
=======
	web3DTOManager := NewWeb3DTOManager()
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75

	return &DTOManager{
		UserDTOManager:  &userDTOManager,
		LogDTOManager:   &logDTOManager,
		RoadDTOManager:  &roadDTOManager,
		HomeDTOManager:  &homeDTOManager,
		LabDTOManager:   &labDTOManager,
		AdminDTOManager: &adminDTOManager,
<<<<<<< HEAD
=======
		Web3DTOManager:  web3DTOManager,
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
	}
}
