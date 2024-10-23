import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  TextField,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TableLoading from '../components/table-loading/tableLoading';

const TransportationManagement = () => {
  const [transportationData, setTransportationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [regionName, setRegionName] = useState('');
  const [price, setPrice] = useState('');
  const [km, setKm] = useState('');

  const TABLE_HEAD = [
    { id: 'profile.image.file', label: 'Image', alignRight: false },
    { id: 'profile.fullName', label: 'Name', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
  ];

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setTransportationData([
        { id: 1, regionName: 'Region A', price: 100, km: 10 },
        { id: 2, regionName: 'Region B', price: 150, km: 15 },
        { id: 1, regionName: 'Region C', price: 160, km: 10 },
        { id: 2, regionName: 'Region D', price: 190, km: 15 },
        { id: 1, regionName: 'Region E', price: 200, km: 10 },
        { id: 2, regionName: 'Region F', price: 250, km: 15 },
        { id: 1, regionName: 'Region G', price: 300, km: 10 },
        { id: 2, regionName: 'Region H', price: 150, km: 15 },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditRegion = (region) => {
    setCurrentRegion(region);
    setRegionName(region.regionName);
    setPrice(region.price);
    setKm(region.km);
    setEditModalOpen(true);
  };

  const handleDeleteRegion = (region) => {
    setCurrentRegion(region);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setTransportationData((prevData) => prevData.filter((region) => region.id !== currentRegion.id));
    setDeleteModalOpen(false);
  };

  const handleSaveRegionChanges = () => {
    if (currentRegion) {
      setTransportationData((prevData) =>
        prevData.map((region) =>
          region.id === currentRegion.id
            ? { ...region, regionName, price: parseFloat(price), km: parseFloat(km) }
            : region
        )
      );
    } else {
      setTransportationData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, regionName, price: parseFloat(price), km: parseFloat(km) },
      ]);
    }
    setEditModalOpen(false);
    setRegionName('');
    setPrice('');
    setKm('');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Transportation Management
      </Typography>
      <Button
        style={{ backgroundColor: '#DF3870' }}
        onClick={() => {
          setCurrentRegion(null);
          setRegionName('');
          setPrice('');
          setKm('');
          setEditModalOpen(true);
        }}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add New Region
      </Button>

      {isLoading ? (
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableBody>
              <TableLoading tableHeading={TABLE_HEAD} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Region Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Km</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transportationData.map((region) => (
                <TableRow key={region.id}>
                  <TableCell>{region.regionName}</TableCell>
                  <TableCell>{region.price}</TableCell>
                  <TableCell>{region.km}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditRegion(region)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeleteRegion(region)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit/Add Region Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>{currentRegion ? 'Edit Region' : 'Add Region'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Region Name"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Km"
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRegionChanges} color="primary">
              {currentRegion ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Region Modal */}
      {currentRegion && (
        <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete <strong>{currentRegion.regionName}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TransportationManagement;
