package domains

type INFTService interface {
	GetNFTs() (nfts []NFTMetadata, err error)
	GetNFTByID(id int) (*NFTMetadata, error)
	MintNFT(userPublicKey string, nftID int) error
}

type NFTMetadata struct {
	id                   int
	name                 string
	symbol               string
	description          string
	image                string
	externalURL          string
	animationURL         string
	attributes           []Attribute
	creator              string
	sellerFeeBasisPoints int
}

// Attribute, NFT'nin özelliklerini temsil eder
type Attribute struct {
	traitType string
	value     string
}

func NewNFTData(
	id int,
	name, symbol, description, image, externalURL, animationURL, creator string,
	sellerFeeBasisPoints int,
	attributes []Attribute,
) NFTMetadata {
	return NFTMetadata{
		id:                   id,
		name:                 name,
		symbol:               symbol,
		description:          description,
		image:                image,
		externalURL:          externalURL,
		animationURL:         animationURL,
		attributes:           attributes,
		creator:              creator,
		sellerFeeBasisPoints: sellerFeeBasisPoints,
	}
}

func NewAttribute(traitType, value string) Attribute {
	return Attribute{
		traitType: traitType,
		value:     value,
	}
}

// Getter ve setter metodları
func (n *NFTMetadata) GetID() int {
	return n.id
}

func (n *NFTMetadata) SetID(id int) {
	n.id = id
}

func (n *NFTMetadata) GetSymbol() string {
	return n.symbol
}

func (n *NFTMetadata) SetSymbol(symbol string) {
	n.symbol = symbol
}

func (n *NFTMetadata) GetName() string {
	return n.name
}

func (n *NFTMetadata) SetName(name string) {
	n.name = name
}

func (n *NFTMetadata) GetDescription() string {
	return n.description
}

func (n *NFTMetadata) SetDescription(description string) {
	n.description = description
}

func (n *NFTMetadata) GetImage() string {
	return n.image
}

func (n *NFTMetadata) SetImage(image string) {
	n.image = image
}

func (n *NFTMetadata) GetExternalURL() string {
	return n.externalURL
}

func (n *NFTMetadata) SetExternalURL(externalURL string) {
	n.externalURL = externalURL
}

func (n *NFTMetadata) GetAnimationURL() string {
	return n.animationURL
}

func (n *NFTMetadata) SetAnimationURL(animationURL string) {
	n.animationURL = animationURL
}

func (n *NFTMetadata) GetAttributes() []Attribute {
	return n.attributes
}

func (n *NFTMetadata) SetAttributes(attributes []Attribute) {
	n.attributes = attributes
}

func (n *NFTMetadata) GetCreator() string {
	return n.creator
}

func (n *NFTMetadata) SetCreator(creator string) {
	n.creator = creator
}

func (n *NFTMetadata) GetSellerFeeBasisPoints() int {
	return n.sellerFeeBasisPoints
}

func (n *NFTMetadata) SetSellerFeeBasisPoints(fee int) {
	n.sellerFeeBasisPoints = fee
}

// Getter ve setter metodları için Attribute yapısı
func (a *Attribute) GetTraitType() string {
	return a.traitType
}

func (a *Attribute) SetTraitType(traitType string) {
	a.traitType = traitType
}

func (a *Attribute) GetValue() string {
	return a.value
}

func (a *Attribute) SetValue(value string) {
	a.value = value
}
