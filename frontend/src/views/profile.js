import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Divider,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileUser } from "src/store/user/userSlice";
import { useRouter } from "next/router";
import { fetchNFT } from "src/store/nft/nftSlice";
import nftImage1 from "src/assets/nfts/level-nft.png";
import nftImage2 from "src/assets/nfts/NFT-LevelUp.png";
import nftImage3 from "src/assets/nfts/NFT-Premium.png";
import Image from "next/image";
import { theme } from "src/configs/theme";

const Profile = () => {
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProfileUser());
    dispatch(fetchNFT());
  }, [dispatch]);

  const { user: stateUser, nft: stateNft } = useSelector((state) => state);

  useEffect(() => {
    if (stateUser.data) {
      setInfo(stateUser.data);
    }
  }, [stateUser.data]);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{
          }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={"/path-to-avatar.png"}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Divider sx={{ width: "100%", my: 2 }} />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  justifyContent="center"
                  width="100%"
                >
                  <Typography variant="h6">
                    <i>Name: </i> <b>{info.data?.name}</b>
                  </Typography>
                  <Typography variant="body1">
                    Surname: <b>{info.data?.surname}</b>
                  </Typography>
                  <Typography variant="body1">
                    Username: <b>{info.data?.username}</b>
                  </Typography>
                  <Typography variant="body1">
                    GitHub: <b>{info.data?.githubProfile}</b>
                  </Typography>
                  <Typography variant="body1">
                    Best Language: <b>{info.data?.bestLanguage}</b>
                  </Typography>
                  <Typography variant="body1">
                    Role: <b>{info.data?.role}</b>
                  </Typography>
                </Box>
              </Box>
              <Box mt={3} width="100%">
                <Button
                  variant="dark"
                  fullWidth
                  onClick={() => {
                    router.push("/settings");
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Outfit",
                  fontWeight: "bold",
                  fontSize: "25px",
                  letterSpacing: "0",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                NFTs List
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {stateNft.data.map((nft) => (
                      <Grid item xs={12} sm={6} md={4} key={nft.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            background: nft.id === 2 || nft.id === 3
                              ? 'linear-gradient(to bottom, rgba(211, 211, 211, 0.5), rgba(128, 128, 128, 0.2))' // Soft gradient for disabled state
                              : `${theme.palette.background.paper}`,
                            opacity: nft.id === 2 || nft.id === 3 ? 0.7 : 1,
                          }}
                        >
                          <CardContent>
                            <Box display="flex" justifyContent="center">
                              <Image
                                src={
                                  nft.id === 1
                                    ? nftImage1
                                    : nft.id === 2
                                      ? nftImage2
                                      : nftImage3
                                }
                                alt={nft.name}
                                width={220}
                                height={220}
                              />
                            </Box>
                            <Typography variant="h6" align="center">
                              {nft.name}
                            </Typography>
                            <Typography variant="body1" align="center">
                              {nft.description}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            {nft.attributes.map((attr, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                align="center"
                              >
                                <b>{attr.trait_type}:</b> {attr.value}
                              </Typography>
                            ))}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
