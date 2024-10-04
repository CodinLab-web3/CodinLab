import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
} from "@mui/material";
import nftImage1 from "src/assets/nfts/level-nft.png";
import nftImage2 from "src/assets/nfts/NFT-LevelUp.png";
import nftImage3 from "src/assets/nfts/NFT-Premium.png";
import Image from "next/image";
import { useSelector } from "react-redux";

const SuccessPopup = ({ open, handleClose, nftId, nextLabUrl }) => {
    const { nft: nftSlice } = useSelector((state) => state);
    useEffect(() => {
        dispatch(getNftById(nftId));
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <Typography variant="body1"></Typography>
                <Typography variant="body2">
                    Your NFT has been successfully created!
                </Typography>
                <Image
                    src={nftSlice.data.data.nftId === 1 ? nftImage1 : nftSlice.data.data.nftId === 2 ? nftImage2 : nftImage3}
                    width={220}
                    height={220}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => (window.location.href = nextLabUrl)}
                    color="dark"
                >
                    Go to Next Lab
                </Button>
                <Button onClick={handleClose} color="dark">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessPopup;