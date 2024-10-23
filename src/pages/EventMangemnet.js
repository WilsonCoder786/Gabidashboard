import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  Tooltip,
} from '@mui/material';
import { Edit, Delete, People } from '@mui/icons-material';
import { DateTimePicker } from '@mui/lab';

const EventManagementAdmin = () => {
  // Static product list with images
  const staticProducts = [
    { id: 1, name: 'Product 1', points: 10, image: 'https://wallpaperaccess.com/full/1312776.jpg' },
    { id: 2, name: 'Product 2', points: 20, image: 'https://images5.alphacoders.com/433/433534.jpg' },
    {
      id: 3,
      name: 'Product 3',
      points: 15,
      image: 'https://tse4.mm.bing.net/th?id=OIP.xbQ7RL7Vsm6dAZJ-rIl-XgHaEK&pid=Api&P=0&h=220',
    },
  ];

  // Static event list
  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: 'Flash Sale Event 1',
      eventContent: 'Special sale on selected products!',
      countdownTime: new Date(),
      selectedProducts: [staticProducts[0], staticProducts[1]],
      score: 5,
      users: [
        { name: 'John Doe', email: 'john@example.com', score: 100 },
        { name: 'Jane Smith', email: 'jane@example.com', score: 120 },
      ],
    },
    {
      id: 1,
      eventName: 'Flash Sale Event 2',
      eventContent: 'Special sale on selected products new!',
      countdownTime: new Date(),
      selectedProducts: [staticProducts[1], staticProducts[2]],
      score: 10,
      users: [{ name: 'John Doe', email: 'john@example.com', score: 100 }],
    },
  ]);

  // State for managing dialogs
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentUsers, setCurrentUsers] = useState([]);

  // Form states
  const [eventName, setEventName] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [countdownTime, setCountdownTime] = useState(new Date());
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [score, setScore] = useState(0);

  // Open dialog to add or edit event
  const handleOpenEventDialog = (event = null) => {
    if (event) {
      setCurrentEvent(event);
      setEventName(event.eventName);
      setEventContent(event.eventContent);
      setCountdownTime(event.countdownTime);
      setSelectedProducts(event.selectedProducts);
      setScore(event.score);
    } else {
      setCurrentEvent(null);
      setEventName('');
      setEventContent('');
      setCountdownTime(new Date());
      setSelectedProducts([]);
      setScore(0);
    }
    setIsEventDialogOpen(true);
  };

  // Add or update event
  const handleSaveEvent = () => {
    if (currentEvent) {
      // Edit event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === currentEvent.id
            ? { ...event, eventName, eventContent, countdownTime, selectedProducts, score }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent = {
        id: events.length + 1,
        eventName,
        eventContent,
        countdownTime,
        selectedProducts,
        score,
        users: [], // Initially no users
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsEventDialogOpen(false);
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Open dialog to view users for a particular event
  const handleViewUsers = (event) => {
    setCurrentUsers(event.users);
    setIsUserDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Event Management
      </Typography>

      <Button
        style={{ backgroundColor: '#DF3870' }}
        onClick={() => handleOpenEventDialog()}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Add New Event
      </Button>

      {/* Event List */}
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Content</TableCell>
              <TableCell>Countdown Time</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventContent}</TableCell>
                <TableCell>{event.countdownTime.toLocaleString()}</TableCell>
                <TableCell>
                  {event.selectedProducts.map((product) => (
                    <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%', // Makes the image circular
                          objectFit: 'cover', // Ensures the image fits within the circular shape
                          margin: '2px',
                        }}
                      />
                      {product.name}
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{event.score}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEventDialog(event)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteEvent(event.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Users">
                    <IconButton color="primary" onClick={() => handleViewUsers(event)}>
                      <People />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isEventDialogOpen} onClose={() => setIsEventDialogOpen(false)}>
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Event Content"
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
            fullWidth
            margin="dense"
          />
          <DateTimePicker
            label="Countdown Time"
            value={countdownTime}
            onChange={(newValue) => setCountdownTime(newValue)}
            renderInput={(props) => <TextField {...props} fullWidth margin="dense" />}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Products</InputLabel>
            <Select
              multiple
              value={selectedProducts}
              onChange={(e) => setSelectedProducts(e.target.value)}
              renderValue={(selected) => selected.map((product) => product.name).join(', ')}
            >
              {staticProducts.map((product) => (
                <MenuItem key={product.id} value={product}>
                  <img src={product.image} alt={product.name} style={{ width: '40px', marginRight: '10px' }} />
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Score"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            type="number"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEventDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Users Dialog */}
      <Dialog open={isUserDialogOpen} onClose={() => setIsUserDialogOpen(false)}>
        <DialogTitle>Users Participating in Event</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUserDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventManagementAdmin;
