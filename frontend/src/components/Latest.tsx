import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Заглушка с прозрачным текстом
// TODO: избавиться
export default function Latest() {
    return (
        <div>
            <Grid container>
                    <Grid>
                        <Box>
                            <Typography style={{color: 'transparent'}}>
                                Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.
                            </Typography>
                        </Box>
                    </Grid>
                <Grid>
                    <Box>
                        <Typography style={{color: 'transparent'}}>
                            Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.
                        </Typography>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}
