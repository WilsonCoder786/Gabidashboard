import { useState } from 'react';
import {
  Card,
  Stack,
  Switch,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Divider,
} from '@mui/material';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [appSettings, setAppSettings] = useState({
    maintenance: false,
    darkMode: false,
    autoUpdate: true,
  });

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAppSettingChange = (event) => {
    setAppSettings({
      ...appSettings,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Container>
      <Stack spacing={3}>
        <Typography variant="h4">Settings</Typography>

        {/* Notification Settings */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Notification Settings
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  name="email"
                />
              }
              label="Email Notifications"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                  name="push"
                />
              }
              label="Push Notifications"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  name="sms"
                />
              }
              label="SMS Notifications"
            />
          </Stack>
        </Card>

        {/* App Settings */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            App Settings
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.maintenance}
                  onChange={handleAppSettingChange}
                  name="maintenance"
                />
              }
              label="Maintenance Mode"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.darkMode}
                  onChange={handleAppSettingChange}
                  name="darkMode"
                />
              }
              label="Dark Mode"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={appSettings.autoUpdate}
                  onChange={handleAppSettingChange}
                  name="autoUpdate"
                />
              }
              label="Auto Update"
            />
          </Stack>
        </Card>

        {/* API Settings */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            API Settings
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="API Key"
              type="password"
              defaultValue="••••••••••••••••"
            />

            <TextField
              fullWidth
              label="API Secret"
              type="password"
              defaultValue="••••••••••••••••"
            />

            <Button variant="contained" startIcon={<Iconify icon="eva:save-fill" />}>
              Save Changes
            </Button>
          </Stack>
        </Card>

        {/* Backup Settings */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Backup Settings
          </Typography>

          <Stack spacing={3}>
            <Button variant="outlined" startIcon={<Iconify icon="eva:download-fill" />}>
              Download Backup
            </Button>

            <Button variant="outlined" startIcon={<Iconify icon="eva:upload-fill" />}>
              Restore Backup
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 