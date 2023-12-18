import * as React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const styleDetail = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Booking = ({ bookingBox }: {
    bookingBox: any
}) => {
    const [tour, setTour] = React.useState<any>({});
    const [openDetail, setOpenDetail] = React.useState(false);
    const handleOpenDetail = (e: React.MouseEvent<HTMLButtonElement>, value: any) => {
        setTour(value.tour);
        setOpenDetail(true);
    };
    const handleCloseDetail = () => {
        setOpenDetail(false)
    };
    const getBookingList: any = Array.from(bookingBox);
    console.log('getBookingList', getBookingList);
    // const id = bookingBox.id;
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', width: 70,
            renderCell: (params) => {
                return <>{params.row.id}</>;
            }
        },
        {
            field: 'name', headerName: 'Name', width: 130,
            renderCell: (params) => {
                return <>{params.row.customer.name}</>;
            }
        },
        {
            field: 'email', headerName: 'Email', width: 130,
            renderCell: (params) => {
                return <>{params.row.customer.email}</>;
            }
        },
        {
            field: 'phone', headerName: 'Phone', width: 130,
            renderCell: (params) => {
                return <>{params.row.customer.phone}</>;
            }
        },
        {
            field: 'address', headerName: 'Address', width: 250,
            renderCell: (params) => {
                return <>{params.row.customer.address}</>;
            }
        },
        {
            field: 'bookingDate', headerName: 'Booking Date', width: 130,
            renderCell: (params) => {
                return <>{params.row.bookingDate}</>;
            }
        },
        {
            field: 'tourName', headerName: 'Tour Name', width: 260,
            renderCell: (params) => {
                return <>{params.row.tour.title}</>;
            }
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                const onClick = () => {
                    alert(1);
                };

                return <Button onClick={(e) => handleOpenDetail(e, params.row)}>View tour</Button>;
            },
            width: 130
        },
    ];

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState("");
    const [openAlert, setOpenAlert] = React.useState(false);
    console.log(bookingBox);

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={getBookingList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            <Modal
                open={openDetail}
                onClose={handleCloseDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container>
                    <Box sx={styleDetail}>
                        <Paper
                            sx={{
                                margin: 'auto',
                                boxShadow: 'none'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ButtonBase sx={{ width: "100%", height: "100%" }}>
                                        <Img alt="complex" src={tour.thumbnail} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2} mt={5}>
                                        <Grid>
                                            <h2 style={{ marginLeft: 20 }}>
                                                {tour.title}
                                            </h2>
                                            <p style={{ marginLeft: 20 }}>
                                                {tour.description}
                                            </p>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid item>
                            <Typography variant="subtitle1" component="div">
                                $19.00
                            </Typography>
                        </Grid> */}
                                </Grid>
                                <br />
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default Booking
