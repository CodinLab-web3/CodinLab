package dto

type DTOManager struct {
	UserDTOManager  *UserDTOManager
	LogDTOManager   *LogDTOManager
	RoadDTOManager  *RoadDTOManager
	HomeDTOManager  *HomeDTOManager
	LabDTOManager   *LabDTOManager
	AdminDTOManager *AdminDTOManager
	Web3DTOManager  *Web3DTOManager
}

func CreateNewDTOManager() *DTOManager {
	userDTOManager := NewUserDTOManager()
	logDTOManager := NewLogDTOManager()
	roadDTOManager := NewRoadDTOManager()
	homeDTOManager := NewHomeDTOManager()
	labDTOManager := NewLabDTOManager()
	adminDTOManager := NewAdminDTOManager()
	web3DTOManager := NewWeb3DTOManager()

	return &DTOManager{
		UserDTOManager:  &userDTOManager,
		LogDTOManager:   &logDTOManager,
		RoadDTOManager:  &roadDTOManager,
		HomeDTOManager:  &homeDTOManager,
		LabDTOManager:   &labDTOManager,
		AdminDTOManager: &adminDTOManager,
		Web3DTOManager:  web3DTOManager,
	}
}
