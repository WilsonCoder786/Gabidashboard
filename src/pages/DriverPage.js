import { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'license', label: 'License No.', alignRight: false },
  { id: 'vehicle', label: 'Vehicle', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

// ----------------------------------------------------------------------

const DRIVERS = [
  {
    id: 1,
    name: 'Alex Thompson',
    license: 'DL123456',
    vehicle: 'Toyota Camry',
    status: 'Available',
    avatar: '/assets/images/avatars/avatar_4.jpg',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    license: 'DL789012',
    vehicle: 'Honda Civic',
    status: 'On Trip',
    avatar: '/assets/images/avatars/avatar_5.jpg',
  },
  {
    id: 3,
    name: 'David Brown',
    license: 'DL345678',
    vehicle: 'Ford Focus',
    status: 'Offline',
    avatar: '/assets/images/avatars/avatar_6.jpg',
  },
];

// ----------------------------------------------------------------------

export default function DriverPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = DRIVERS.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Drivers</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Driver
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < DRIVERS.length}
                        checked={DRIVERS.length > 0 && selected.length === DRIVERS.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DRIVERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, license, vehicle, status, avatar } = row;
                    const selectedDriver = isSelected(id);

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedDriver}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedDriver} onChange={() => handleClick(id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{license}</TableCell>

                        <TableCell align="left">{vehicle}</TableCell>

                        <TableCell align="left">
                          <Typography
                            variant="caption"
                            sx={{
                              p: 0.5,
                              borderRadius: 1,
                              color: 
                                status === 'Available' ? 'success.main' : 
                                status === 'On Trip' ? 'warning.main' : 'error.main',
                              bgcolor: 
                                status === 'Available' ? 'success.lighter' : 
                                status === 'On Trip' ? 'warning.lighter' : 'error.lighter',
                            }}
                          >
                            {status}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={DRIVERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
} 