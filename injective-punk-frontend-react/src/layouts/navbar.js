import {
  NAVBAR_BACKGROUND_COLOR,
  NAVBAR_HEIGHT,
  NAVBAR_LINKS,
  NAVBAR_LINK_COLOR,
  NAVBAR_LINK_SELECTED_BADGE_SIZE,
  NAVBAR_LINK_SELECTED_COLOR,
  WALLETCONNECT_BUTTON_COLOR,
} from "../config-global";

import React from "react";
import { Box, Button, Container, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const currentPath = useLocation();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: `${NAVBAR_HEIGHT}px`,
        background: NAVBAR_BACKGROUND_COLOR,
        // borderBottom: "1px solid #303030",
        zIndex: "1",
      }}
    >
      <Container
        sx={{
          // border: "1px solid red",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "100%",
            padding: { sm: "10px 0", xs: "20px 0" },
            img: {
              height: "100%",
            },
          }}
        >
          <img alt="" src="./logo192.png" />
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              alignItems: { sm: "center", xs: "start" },
              justifyContent: "space-between",
              padding: "24px 0",
              ".link-item": {
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0 10px 0 20px",
                ".link-selected-badge": {
                  position: "absolute",
                  left: "5px",
                  top: `calc(50% - ${NAVBAR_LINK_SELECTED_BADGE_SIZE / 2}px)`,
                  width: `${NAVBAR_LINK_SELECTED_BADGE_SIZE}px`,
                  aspectRatio: 1,
                  borderRadius: `${NAVBAR_LINK_SELECTED_BADGE_SIZE}px`,
                  padding: "0",
                  background: NAVBAR_LINK_SELECTED_COLOR,
                },
                ".MuiLink-root": {
                  fontSize: { sm: "16px", xs: "14px" },
                  lineHeight: { sm: "16px", xs: "14px" },
                },
              },
            }}
          >
            <Box className="link-item">
              <Box
                className="link-selected-badge"
                sx={{
                  display:
                    currentPath.pathname === NAVBAR_LINKS.launchpad.link
                      ? "flex"
                      : "none",
                }}
              />
              <Link
                href={NAVBAR_LINKS.launchpad.link}
                underline="none"
                sx={{
                  color:
                    currentPath.pathname === NAVBAR_LINKS.launchpad.link
                      ? NAVBAR_LINK_SELECTED_COLOR
                      : NAVBAR_LINK_COLOR,
                  fontWeight:
                    currentPath.pathname === NAVBAR_LINKS.launchpad.link
                      ? "700"
                      : "400",
                }}
              >
                {NAVBAR_LINKS.launchpad.text}
              </Link>
            </Box>
            <Box className="link-item">
              <Box
                className="link-selected-badge"
                sx={{
                  display:
                    currentPath.pathname === NAVBAR_LINKS.preview.link
                      ? "flex"
                      : "none",
                }}
              />
              <Link
                href={NAVBAR_LINKS.preview.link}
                underline="none"
                sx={{
                  color:
                    currentPath.pathname === NAVBAR_LINKS.preview.link
                      ? NAVBAR_LINK_SELECTED_COLOR
                      : NAVBAR_LINK_COLOR,
                  fontWeight:
                    currentPath.pathname === NAVBAR_LINKS.preview.link
                      ? "700"
                      : "400",
                }}
              >
                {NAVBAR_LINKS.preview.text}
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: "10px",
              ".MuiButton-root": {
                width: { sm: "140px", xs: "110px" },
                height: { sm: "36px", xs: "32px" },
                border: `1px solid ${WALLETCONNECT_BUTTON_COLOR}`,
                borderRadius: "18px",
                color: WALLETCONNECT_BUTTON_COLOR,
                textTransform: "none",
                fontSize: { sm: "16px", xs: "12px" },
                lineHeight: { sm: "16px", xs: "12px" },
              },
            }}
          >
            <Button>Connect Wallet</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
