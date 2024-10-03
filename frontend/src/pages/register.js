import { useTheme } from "@emotion/react";
import { Circle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
<<<<<<< HEAD
=======
  Container,
  FormControl,
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
  Grid,
  InputAdornment,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Button,
<<<<<<< HEAD
<<<<<<< HEAD
  Divider,
  IconButton,
=======
  IconButton,
  useMediaQuery
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
  Divider,
  IconButton,
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { registerValidation } from "src/configs/validation/registerSchema";
import CardImage from "src/assets/3d/3d-casual-life-windows-with-developer-code-symbols.png";
import GirlImage from "src/assets/3d/3d-casual-life-girl-holding-laptop-and-having-an-idea.png";
import themeConfig from "src/configs/themeConfig";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/hooks/useAuth";
<<<<<<< HEAD
<<<<<<< HEAD
const { default: BlankLayout } = require("src/layout/BlankLayout");
=======
import BlankLayout from "src/layout/BlankLayout";
import LanguageSelector from "src/layout/components/navigation/item/LanguageSelector";
import WalletConnectionButton from "src/components/Wallet/WalletConnectionButton";
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
const { default: BlankLayout } = require("src/layout/BlankLayout");
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)

const Register = () => {
  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
  const [isChecked, setIsChecked] = useState(false);
=======
  const [isChecked, setIsChecked] = useState(true);
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
  const [isChecked, setIsChecked] = useState(false);
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { register } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "checkbox") {
      setIsChecked(!isChecked);
      return;
    }
    if (e.target.name === "checkbox") {
      setIsChecked(!isChecked);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log("Form submitted");

>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
    setFormSubmit(true);

    const validationErrors = await registerValidation(formData);
    setErrors(validationErrors);
<<<<<<< HEAD
<<<<<<< HEAD

    if (!isChecked) {
=======
    console.log("validationErrors");

    if (!isChecked) {
      console.log("ischecked", isChecked);
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======

    if (!isChecked) {
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
      setErrors({ ...errors, checkbox: "You must accept" });
      return;
    }
    if (Object.keys(validationErrors).length > 0) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
      console.log("validationErrors12323", validationErrors);
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
      console.log("Form has errors:", validationErrors);
      return;
    }
    // Call API
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      await register(formData);
    } catch (error) {}
=======
      console.log("register try");
      await register(formData);
    } catch (error) {
      console.log("Error:", error);

    }
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
      await register(formData);
    } catch (error) {}
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
  };

  useEffect(() => {
    const validate = async () => {
      if (formSubmit) {
        const errors = await registerValidation(formData);
        setErrors(errors);
      }
    };
    validate();
  }, [formData, formSubmit]);

  const theme = useTheme();
  const bgColor = theme.palette.primary.dark;
  const { t } = useTranslation();

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const md_down = useMediaQuery((theme) => theme.breakpoints.down("md"));

>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
  const iconSize = {
    width: 30,
    height: 30,
  };

  const iconBtnStyle = {
    bgcolor: "#0A3B7A",
    color: "#fff",
    borderRadius: 4,
  };

  const inputLabelStyle = {
    sx: {
      color: "#0A3B7A",
      font: "normal normal bold 18px/23px Outfit",
      ml: 1,
    },
  };

  const textFieldStyle = {
    "& .MuiFormLabel-root": {
      color: "#0A3B7A",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "#0A3B7A",
        fontWeight: "bold",
      },
      "&:hover fieldset": {
        color: "#0A3B7A",
        fontWeight: "bold",
      },
      "&.Mui-focused": {
        color: "#0A3B7A",
        fontWeight: "bold",
      },
    },
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
    <Box
      sx={{
        position: "relative",
      }}
    >
<<<<<<< HEAD
      <Box
        sx={{
          display: { xs: "none", mdlg: "block" },
          position: "absolute",
          top: "-6.5%",
          left: {
            mdlg: "%1",
            lg: "3%",
            lgPlus: "5%",
            lgXl: "9%",
            xl: "12%",
            xxl: "18%",
          },
          zIndex: 1,
        }}
      >
        <Image src={CardImage} width={368} height={226} alt="Cards" />
      </Box>
      <Box
        sx={{
          display: { xs: "none", mdlg: "block" },
          position: "absolute",
          top: "3%",
          right: {
            mdlg: "-17%",
            lg: "-10%",
            lgPlus: "-5%",
            lgXl: "2%",
            xl: "4%",
            xxl: "14%",
          },
          zIndex: 1,
        }}
      >
        <Image
          src={GirlImage}
          width={368}
          height={803}
          priority
          alt="Girl holding laptop"
        />
      </Box>
      <Container sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
        <Card
          sx={{
            m: 1,
          }}
        >
          <CardContent
            sx={{
              width: { md: "auto", lg: "50.75rem" },
            }}
          >
            <Grid
              container
              direction="column"
              sx={{
                px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  my: 5,
                }}
              >
                <Circle sx={{ width: 40, height: 40, mr: 1 }} />
                <Typography
                  textAlign="center"
                  variant="body1"
                  fontFamily="Outfit"
                  fontWeight="600"
                  fontSize="35px"
                >
                  {themeConfig.projectName}
                </Typography>
              </Box>
              <FormControl>
                <Grid container direction="column" gap={3}>
                  <TextField
                    name="name"
                    placeholder={t("register.name")}
                    variant="outlined"
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="surname"
                    placeholder={t("register.surname")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.surname ? true : false}
                    helperText={errors.surname}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="username"
                    placeholder={t("register.username")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.username ? true : false}
                    helperText={errors.username}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="githubProfile"
                    placeholder={t("register.githubProfile")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.githubProfile ? true : false}
                    helperText={errors.githubProfile}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="password"
                    placeholder={t("register.password")}
                    InputLabelProps={inputLabelStyle}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    sx={textFieldStyle}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            sx={{ zIndex: 999 }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: "#000" }} />
                            ) : (
                              <Visibility sx={{ color: "#000" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* CheckBox Start */}
                  {/* <FormControlLabel
=======
    <Box>
      {md_down ? (
        ""
      ) : (
        <Box sx={{ display: "flex", top: 0, right: 5, position: "absolute", gap: "1rem", alignItems: "center" }}>
          <WalletConnectionButton />

          <Button>
            <LanguageSelector />
          </Button>
        </Box>
      )}

=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
      <Box
        sx={{
          display: { xs: "none", mdlg: "block" },
          position: "absolute",
          top: "-6.5%",
          left: {
            mdlg: "%1",
            lg: "3%",
            lgPlus: "5%",
            lgXl: "9%",
            xl: "12%",
            xxl: "18%",
          },
          zIndex: 1,
        }}
      >
        <Image src={CardImage} width={368} height={226} alt="Cards" />
      </Box>
      <Box
        sx={{
          display: { xs: "none", mdlg: "block" },
          position: "absolute",
          top: "3%",
          right: {
            mdlg: "-17%",
            lg: "-10%",
            lgPlus: "-5%",
            lgXl: "2%",
            xl: "4%",
            xxl: "14%",
          },
          zIndex: 1,
        }}
      >
        <Image
          src={GirlImage}
          width={368}
          height={803}
          priority
          alt="Girl holding laptop"
        />
      </Box>
      <Container sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
        <Card
          sx={{
            m: 1,
          }}
        >
          <CardContent
            sx={{
              width: { md: "auto", lg: "50.75rem" },
            }}
          >
            <Grid
              container
              direction="column"
              sx={{
                px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  my: 5,
                }}
              >
                <Circle sx={{ width: 40, height: 40, mr: 1 }} />
                <Typography
                  textAlign="center"
                  variant="body1"
                  fontFamily="Outfit"
                  fontWeight="600"
                  fontSize="35px"
                >
<<<<<<< HEAD
                  <Circle sx={{ width: 40, height: 40, mr: 1 }} />
                  <Typography
                    textAlign="center"
                    variant="body1"
                    fontFamily="Outfit"
                    fontWeight="600"
                    fontSize="35px"
                  >
                    {themeConfig.projectName}
                  </Typography>
                </Box>
                <FormControl>
                  <Grid container direction="column" gap={3}>
                    <TextField
                      name="name"
                      placeholder={t("register.name")}
                      variant="outlined"
                      InputLabelProps={inputLabelStyle}
                      onChange={handleChange}
                      error={errors.name ? true : false}
                      helperText={errors.name}
                      sx={textFieldStyle}
                    />
                    <TextField
                      name="surname"
                      placeholder={t("register.surname")}
                      InputLabelProps={inputLabelStyle}
                      onChange={handleChange}
                      error={errors.surname ? true : false}
                      helperText={errors.surname}
                      sx={textFieldStyle}
                    />
                    <TextField
                      name="username"
                      placeholder={t("register.username")}
                      InputLabelProps={inputLabelStyle}
                      onChange={handleChange}
                      error={errors.username ? true : false}
                      helperText={errors.username}
                      sx={textFieldStyle}
                    />
                    <TextField
                      name="githubProfile"
                      placeholder={t("register.githubProfile")}
                      InputLabelProps={inputLabelStyle}
                      onChange={handleChange}
                      error={errors.githubProfile ? true : false}
                      helperText={errors.githubProfile}
                      sx={textFieldStyle}
                    />
                    <TextField
                      name="password"
                      placeholder={t("register.password")}
                      InputLabelProps={inputLabelStyle}
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      error={errors.password ? true : false}
                      helperText={errors.password}
                      sx={textFieldStyle}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton
                              sx={{ zIndex: 999 }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "#000" }} />
                              ) : (
                                <Visibility sx={{ color: "#000" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* CheckBox Start */}
                    {/* <FormControlLabel
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
                  {themeConfig.projectName}
                </Typography>
              </Box>
              <FormControl>
                <Grid container direction="column" gap={3}>
                  <TextField
                    name="name"
                    placeholder={t("register.name")}
                    variant="outlined"
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="surname"
                    placeholder={t("register.surname")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.surname ? true : false}
                    helperText={errors.surname}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="username"
                    placeholder={t("register.username")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.username ? true : false}
                    helperText={errors.username}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="githubProfile"
                    placeholder={t("register.githubProfile")}
                    InputLabelProps={inputLabelStyle}
                    onChange={handleChange}
                    error={errors.githubProfile ? true : false}
                    helperText={errors.githubProfile}
                    sx={textFieldStyle}
                  />
                  <TextField
                    name="password"
                    placeholder={t("register.password")}
                    InputLabelProps={inputLabelStyle}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    sx={textFieldStyle}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            sx={{ zIndex: 999 }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: "#000" }} />
                            ) : (
                              <Visibility sx={{ color: "#000" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* CheckBox Start */}
                  {/* <FormControlLabel
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
                    control={
                      <Checkbox
                        name="checkbox"
                        onChange={handleChange}
                        sx={{
                          color: "#FFF",
                          "&.Mui-checked": {
                            color: "#0A3B7A",
                          },
                          "& .MuiSvgIcon-root": {
                            color: errors.checkbox ? "red" : "#FFF",
                          },
                        }}
                        error={errors.checkbox ? true : false}
                      />
                    }
                    label={
                      <Typography
                        fontWeight={300}
                        fontSize={18}
                        fontFamily={"Outfit"}
                      >
                        {t("register.accept")}
                        <Link
                          sx={{ textDecoration: "none", fontWeight: "600" }}
                          color={"#0A3B7A"}
                          href="#"
                        >
                          {t("register.terms")}
                        </Link>
                      </Typography>
                    }
                  /> */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
                  {/* CheckBox End */}
                  <Button
                    variant="dark"
                    sx={{
                      font: "normal normal 18px/23px Outfit",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      py: 2,
                    }}
                    onClick={handleSubmit}
                    fullWidth
                  >
                    {t("register.signup")}
                  </Button>
                </Grid>
              </FormControl>
              {/* Divider and Google & GitHub Buttuns Start */}
              {/* <Divider sx={{ mt: 3 }}> {t("register.or")}</Divider> */}
              {/* <Stack direction="row" justifyContent="center" gap={3} mt={3}>
<<<<<<< HEAD
=======
                    {/* CheckBox End */}
                    <Button
                      variant="dark"
                      sx={{
                        font: "normal normal 18px/23px Outfit",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        py: 2,
                      }}
                      onClick={handleSubmit}
                      fullWidth
                    >
                      {t("register.signup")}
                    </Button>
                  </Grid>
                </FormControl>
                {/* Divider and Google & GitHub Buttuns Start */}
                {/* <Divider sx={{ mt: 3 }}> {t("register.or")}</Divider> */}
                {/* <Stack direction="row" justifyContent="center" gap={3} mt={3}>
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
                <IconButton variant="contained" sx={iconBtnStyle}>
                  <Google sx={iconSize} />
                </IconButton>
                <IconButton variant="contained" sx={iconBtnStyle}>
                  <GitHub sx={iconSize} />
                </IconButton>
              </Stack> */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
              {/* Divider and Google & GitHub Buttuns End */}
              <Typography
                variant="body1"
                textAlign={"center"}
                mt={4}
                fontFamily={"Outfit"}
              >
                {t("register.already")}
                <Link
                  href="/login"
                  color={bgColor}
                  sx={{ fontWeight: "600", textDecoration: "none", ml: 1 }}
<<<<<<< HEAD
                >
                  {t("register.login")}
                </Link>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Container>
=======
                {/* Divider and Google & GitHub Buttuns End */}
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  mt={4}
                  fontFamily={"Outfit"}
                >
                  {t("register.already")}
                  <Link
                    href="/login"
                    color={bgColor}
                    sx={{ fontWeight: "600", textDecoration: "none", ml: 1 }}
                  >
                    {t("register.login")}
                  </Link>
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
=======
                >
                  {t("register.login")}
                </Link>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Container>
>>>>>>> parent of f145eba4 (Wallet connection have been completed. Login and register have been integrated to frontend and connected with backend. Also responses on some api endpoints have been updated according to needs in frontend)
    </Box>
  );
};

Register.guestGuard = true;
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Register;
