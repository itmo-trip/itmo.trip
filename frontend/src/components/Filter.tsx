import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Filter = () => {
    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    function Search() {
        return (
            <FormControl sx={{width: {xs: '100%', md: '25ch'}}} variant="outlined">
                <OutlinedInput
                    size="small"
                    id="search"
                    placeholder="Найти…"
                    sx={{flexGrow: 1}}
                    startAdornment={
                        <InputAdornment position="start" sx={{color: 'text.primary'}}>
                            <SearchRoundedIcon fontSize="small"/>
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'search',
                    }}
                />
            </FormControl>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: {xs: 'flex', sm: 'none'},
                    flexDirection: 'row',
                    gap: 1,
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                <Search/>
                <IconButton size="small" aria-label="RSS feed">
                    <RssFeedRoundedIcon/>
                </IconButton>
            </Box><Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column-reverse', md: 'row'},
                width: '100%',
                justifyContent: 'space-between',
                alignItems: {xs: 'start', md: 'center'},
                gap: 4,
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    gap: 3,
                    overflow: 'auto',
                }}
            >
                <Chip onClick={handleClick} size="medium" label="Фильтр"/>
                <Chip
                    onClick={handleClick}
                    size="medium"
                    label="Фильтр"
                    sx={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}/>
                <Chip
                    onClick={handleClick}
                    size="medium"
                    label="Фильтр"
                    sx={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}/>
                <Chip
                    onClick={handleClick}
                    size="medium"
                    label="Фильтр"
                    sx={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}/>
                <Chip
                    onClick={handleClick}
                    size="medium"
                    label="Фильтр"
                    sx={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}/>
            </Box>
            <Box
                sx={{
                    display: {xs: 'none', sm: 'flex'},
                    flexDirection: 'row',
                    gap: 1,
                    width: {xs: '100%', md: 'fit-content'},
                    overflow: 'auto',
                }}
            >
                <Search/>
                <IconButton size="small" aria-label="RSS feed">
                    <RssFeedRoundedIcon/>
                </IconButton>
            </Box>
        </Box></>
    )
}

export default Filter