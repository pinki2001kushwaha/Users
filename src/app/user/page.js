"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserTable() {
  const [data, setData] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null); 
  const [open, setOpen] = React.useState(false);

  const getdata = async () => {
    try {
      let res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = async (id) => {
    try {
      let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setSelectedUser(res.data); 
      setOpen(true); 
    } catch (error) {
      console.log(error);
    }
  };


  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Users Data Table</caption>
          <TableHead>
            <TableRow>
              <TableCell>View</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Zipcode</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell>Lng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={() => handleOpen(row.id)} 
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.website}</TableCell>
                <TableCell>{row.company.name}</TableCell>
                <TableCell>{row.address.street}</TableCell>
                <TableCell>{row.address.city}</TableCell>
                <TableCell>{row.address.zipcode}</TableCell>
                <TableCell>{row.address.geo.lat}</TableCell>
                <TableCell>{row.address.geo.lng}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          {selectedUser && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Website:</strong> {selectedUser.website}</p>
              <p><strong>Company:</strong> {selectedUser.company.name}</p>
              <p><strong>Address:</strong> {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
              <p><strong>Geo Location:</strong> {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}</p>
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
