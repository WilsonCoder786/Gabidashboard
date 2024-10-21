import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
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

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const TABLE_HEAD = [
    { id: 'profile.image.file', label: 'Image', alignRight: false },
    { id: 'profile.fullName', label: 'Name', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
    { id: 'profile.fullName', label: 'Name', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
    { id: 'isCompleteProfile', label: 'Role', alignRight: false },
  ];

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          product: 'Product 1',
          customerName: 'John Doe',
          email: 'john@example.com',
          contact: '123-456-7890',
          status: 'Pending',
          date: '2024-10-01',
        },
        {
          id: 2,
          product: 'Product 2',
          customerName: 'Jane Smith',
          email: 'jane@example.com',
          contact: '987-654-3210',
          status: 'Completed',
          date: '2024-10-02',
        },
        {
          id: 3,
          product: 'Product 3',
          customerName: 'Alice Johnson',
          email: 'alice@example.com',
          contact: '456-789-0123',
          status: 'Accepted',
          date: '2024-10-03',
        },
        {
          id: 4,
          product: 'Product 4',
          customerName: 'Bob Brown',
          email: 'bob@example.com',
          contact: '321-654-9870',
          status: 'Canceled',
          date: '2024-10-04',
        },
        {
          id: 5,
          product: 'Product 5',
          customerName: 'Charlie Davis',
          email: 'charlie@example.com',
          contact: '654-321-0987',
          status: 'Rejected',
          date: '2024-10-05',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setEditModalOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setCurrentOrder(order);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== currentOrder.id));
    setDeleteModalOpen(false);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    setEditModalOpen(false);
  };

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateCondition = (!startDate || orderDate >= start) && (!endDate || orderDate <= end);
    const statusCondition = filterStatus === 'All' || order.status === filterStatus;
    return dateCondition && statusCondition;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning'; // Yellow
      case 'Accepted':
        return 'primary'; // Blue
      case 'Completed':
        return 'success'; // Green
      case 'Rejected':
        return 'error'; // Red
      case 'Canceled':
        return 'secondary'; // Orange
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header with Background Color */}
      <Box sx={{ padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
        <Typography variant="h4" sx={{ color: 'black' }}>
          Order Management
        </Typography>
      </Box>

      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        displayEmpty
        sx={{ mb: 2, minWidth: 120 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Accepted">Accepted</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Canceled">Canceled</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

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
                <TableCell sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>Product</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.contact}</TableCell>
                  <TableCell>
                    <Button variant="contained" color={getStatusColor(order.status)}>
                      {order.status}
                    </Button>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditOrder(order)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDeleteOrder(order)}>
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

      {/* Edit Order Modal */}
      {isEditModalOpen && currentOrder && (
        <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>Edit Order Status</DialogTitle>
          <DialogContent>
            <Select
              value={currentOrder.status}
              onChange={(e) => handleUpdateStatus(currentOrder.id, e.target.value)}
              fullWidth
              margin="dense"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={() => handleUpdateStatus(currentOrder.id, currentOrder.status)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Order Modal */}
      {currentOrder && (
        <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the order for <strong>{currentOrder.product}</strong>?
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

export default OrderManagement;
