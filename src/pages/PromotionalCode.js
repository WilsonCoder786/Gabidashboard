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

const PromotionalCodeManagement = () => {
  const [promotionalCodes, setPromotionalCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPromoCode, setCurrentPromoCode] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const TABLE_HEAD = [
    { id: 'profile.image.file', label: 'Image', alignRight: false },
    { id: 'profile.fullName', label: 'Name', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
  ];

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setPromotionalCodes([
        { id: 1, code: 'PROMO2024', price: 10, duration: '30 days' },
        { id: 2, code: 'SUMMER2024', price: 15, duration: '60 days' },
        { id: 1, code: 'PROMO2025', price: 10, duration: '90 days' },
        { id: 1, code: 'PROMO2023', price: 10, duration: '20 days' },
        { id: 1, code: 'PROMO2021', price: 10, duration: '50 days' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditPromoCode = (promo) => {
    setCurrentPromoCode(promo);
    setPromoCode(promo.code);
    setPrice(promo.price);
    setDuration(promo.duration);
    setEditModalOpen(true);
  };

  const handleDeletePromoCode = (promo) => {
    setCurrentPromoCode(promo);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setPromotionalCodes((prevData) => prevData.filter((promo) => promo.id !== currentPromoCode.id));
    setDeleteModalOpen(false);
  };

  const handleSavePromoCodeChanges = () => {
    if (currentPromoCode) {
      setPromotionalCodes((prevData) =>
        prevData.map((promo) =>
          promo.id === currentPromoCode.id ? { ...promo, code: promoCode, price: parseFloat(price), duration } : promo
        )
      );
    } else {
      setPromotionalCodes((prevData) => [
        ...prevData,
        { id: prevData.length + 1, code: promoCode, price: parseFloat(price), duration },
      ]);
    }
    setEditModalOpen(false);
    setPromoCode('');
    setPrice('');
    setDuration('');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Promotional Code Management
      </Typography>
      <Button
        style={{ backgroundColor: '#DF3870' }}
        onClick={() => {
          setCurrentPromoCode(null);
          setPromoCode('');
          setPrice('');
          setDuration('');
          setEditModalOpen(true);
        }}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add New Promo Code
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
                <TableCell>Promo Code</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotionalCodes.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>{promo.code}</TableCell>
                  <TableCell>${promo.price}</TableCell>
                  <TableCell>{promo.duration}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditPromoCode(promo)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeletePromoCode(promo)}>
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

      {/* Edit/Add Promo Code Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>{currentPromoCode ? 'Edit Promo Code' : 'Add Promo Code'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
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
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePromoCodeChanges} color="primary">
              {currentPromoCode ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Promo Code Modal */}
      {currentPromoCode && (
        <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete promo code <strong>{currentPromoCode.code}</strong>?
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

export default PromotionalCodeManagement;
