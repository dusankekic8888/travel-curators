import * as React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditTour from './EditTour';
import {deleteTour} from '../../../services/tour.service';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Tour = ({ tourBox }: {
  tourBox: any
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  console.log(tourBox);

  const deleteThisTour = () => {
    deleteTour(tourBox.id).then(
      async (response) => {
        console.log(response);
        setTimeout(
          () => setOpenAlert(false),
          3000
        );
        window.location.reload();
      }
    );
  }
  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          mb:2,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 250, height: 130 }}>
              <Img alt="complex" src={tourBox.thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {tourBox.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {tourBox.description}
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, '& button': { mr: 1 } }}>
                  <Button variant="contained" style={{backgroundColor:"#ff3322"}} size="medium" onClick={deleteThisTour}>
                    Delete
                  </Button>
                  <Button variant="outlined" size="medium" onClick={handleOpen}>
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new tour
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EditTour getTour={tourBox} />
          </Typography>
        </Box>
      </Modal>
    </>

  )
}

export default Tour