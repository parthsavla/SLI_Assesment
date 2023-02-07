/** @format */
import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
	Divider,
	Paper,
	TextField,
	Button,
	Fade,
	Typography,
	responsiveFontSizes,
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import {GoogleLogin, useGoogleLogin, googleLogout} from "@react-oauth/google"
import {Stack} from "@mui/system"
import React, {useState, useEffect} from "react"
import Typed from "react-typed"
import axios from "axios"

const responseMessage = (response) => {
	console.log(response)
}
const errorMessage = (error) => {
	console.log(error)
}

export default function LandingPage() {
	const [displayButtonFlag, setDisplayButtonFlag] = useState("none")
	const [transCheck, setTransChecked] = React.useState(true)
	const [user, setUser] = React.useState([])
	const [profile, setProfile] = React.useState([])

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => setUser(codeResponse),
		onError: (error) => console.log("Login Failed:", error),
	})

	useEffect(() => {
		if (user) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					setProfile(res.data)
				})
				.catch((err) => console.log(err))
		}
	}, [user])

	const logOut = () => {
		googleLogout()
		setProfile(null)
	}
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up("sm"))
	//styles
	const landingPageStyle = {
		dividerHozSty: {
			width: "60vw",
			alignSelf: "center",
			background: "#0C8CE9",
			border: "2px solid #0C8CE9",
			borderRadius: "3px",
			boxShadow: " 0px 4px 18px rgba(54, 156, 230, 0.75)",
		},
		dividerVertSty: {
			height: "60vh",
			alignSelf: "center",
			background: "#0C8CE9",
			border: "2px solid #0C8CE9",
			borderRadius: "3px",
			boxShadow: " 0px 4px 18px rgba(54, 156, 230, 0.75)",
		},
		paperStyleOne: {
			background: "#aeaeae11",
			boxShadow: " 0px 4px 18px rgba(54, 157, 230, 0.338)",
			color: "white",
			width: matches ? "40vw" : "80vw",
			padding: matches ? "1vw" : "2vw",
			height: "6",
		},
		paperStyleTwo: {
			background: "#aeaeae11",
			boxShadow: " 0px 4px 18px rgba(54, 157, 230, 0.338)",
			color: "white",
			width: "25vw",
		},
	}
	return (
		<Stack
			direction={{xs: "column", sm: "row"}}
			spacing={{xs: 5, sm: 5, md: 10}}
			style={{height: "100vh"}}
			justifyContent="center"
			alignItems="center"
		>
			<Paper
				sx={landingPageStyle.paperStyleOne}
				elevation={10}
			>
				<Stack
					direction={"column"}
					sx={{padding: "1.3vw"}}
				>
					<div style={{textAlign: "left"}}>
						<Typography fontSize={matches ? "1.3em" : "1em"}>
							<p>
								<Typed
									strings={[
										"Hey there, <br/><br/> This project was made for a front-end assessment. Its made with React,NodeJS, and Sqlite3 <br/><br/> Click on the button below view the project documentation",
									]}
									typeSpeed={20}
									onComplete={() => {
										setDisplayButtonFlag("block")
									}}
								/>
							</p>
						</Typography>
						<Fade
							in={transCheck}
							timeout={1000}
							unmountOnExit
						>
							<Button sx={{display: displayButtonFlag, margin: "auto"}}>
								View documentation
							</Button>
						</Fade>
					</div>
				</Stack>
			</Paper>
			<Divider
				orientation={!matches ? "horizontal" : "vertical"}
				sx={
					!matches
						? landingPageStyle.dividerHozSty
						: landingPageStyle.dividerVertSty
				}
				flexItem
			/>
			<Paper
				sx={landingPageStyle.paperStyleTwo}
				elevation={10}
			>
				<Stack sx={{padding: "3em"}}>
					<div>
						<div>
							<h3>Google Login</h3>
							<br />
							<br />
							<Button onClick={() => login()}>Sign in with Google 🚀 </Button>
						</div>
					</div>
				</Stack>
			</Paper>
		</Stack>
	)
}
