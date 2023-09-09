import React, { useState } from 'react';
import {
  AppBar,
  Container,
  CssBaseline,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    complaint: '',
    subject: '', // Initialize subject as an empty string
    audioFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const audioFile = e.target.files[0];
    setFormData({ ...formData, audioFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to JSON
    const jsonData = JSON.stringify(formData, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for downloading the JSON file
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a click event
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_data.json';
    a.click();

    // Revoke the URL to release resources
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Audio Management System</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5">Upload Audio and Data</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="UID"
                  name="uid"
                  value={formData.uid}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Complaint"
                  name="complaint"
                  multiline
                  rows={4}
                  value={formData.complaint}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="subject">Subject</InputLabel>
                  <Select
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                    {/* Add more subjects as needed */}
                  </Select>
                </FormControl>
                <input
                  accept="audio/*"
                  style={{ display: 'none' }}
                  id="audio-file-input"
                  type="file"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="audio-file-input">
                  <Fab
                    component="span"
                    color="primary"
                    size="medium"
                    aria-label="upload audio"
                  >
                    <CloudUploadIcon />
                  </Fab>
                </label>
                {formData.audioFile && (
                  <Typography variant="body2">
                    Selected audio file: {formData.audioFile.name}
                  </Typography>
                )}
                <Fab
                  type="submit"
                  variant="extended"
                  color="primary"
                  size="medium"
                  aria-label="convert to JSON"
                >
                  <SaveIcon />
                  Convert to JSON
                </Fab>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
