import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import Sitemark from './ItmoTripIcon.tsx';
import {Box, Button, InputBase } from "@mui/material";
import {logout} from "../api/CustomAuthService.ts";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar({ user, onLogout }: { user?: { studentId?: string }, onLogout?: () => void }) {
    // const [open, setOpen] = React.useState(false);
    //
    // const toggleDrawer = (newOpen: boolean) => () => {
    //     setOpen(newOpen);
    // };

    const handleLogout = () => {
        logout();
        if (onLogout) onLogout();
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 0 }}>
                        <Sitemark />
                        <Box>
                            <Button variant="text" color="info" size="small">
                                Мои объявления
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>

                        {user?.studentId && (
                            <InputBase
                                value={`${user.studentId}`}
                                readOnly
                                sx={{
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.5,
                                    fontSize: 14,
                                    width: "auto",
                                    textAlign: "center",
                                }}
                            />
                        )}

                        <Button color="primary" variant="text" size="small" onClick={handleLogout}>
                            Выйти
                        </Button>

                        <ColorModeIconDropdown />
                    </Box>

                    {/*Меню, если появится больше элементов*/}
{/*
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size="medium" />
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem>Свои объявления</MenuItem>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>
                                    <Button color="primary" variant="outlined" fullWidth>
                                        Выйти
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
*/}
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
