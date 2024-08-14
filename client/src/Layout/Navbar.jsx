import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import FlexBetween from "./FlexBeteen";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={"#335C3A"} boxShadow={"2px 2px 2px 2px #244229"}> 
      <FlexBetween gap="1.75rem">
        <Box display="flex" alignItems="center" gap="0.5rem">
          <img width="40px" height="40px" alt="icon" src={`${import.meta.env.VITE_BACKEND_URL}/assets/icon.png`} />
          <Typography
            
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="white"
            sx={{
              "&:hover": {},
            }}>
            Classroom
          </Typography>
        </Box>
      </FlexBetween>
      {isAuth && (
        <FlexBetween gap="2rem">
          <FormControl variant="standard" value={user.name}>
            <Select
              value={user.name}
              sx={{
                backgroundColor: "#F2E8CF",
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: "white",
                },
              }}
              input={<InputBase />}
                renderValue={(selected) => (
                <Typography>{user.name}</Typography> // Display the username on the button
              )}>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default Navbar;
