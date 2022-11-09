import { Box, Container } from '@mui/material';
import FieldPickerApp from './components/FieldPickerApp';
import './App.css';

const App = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          flexDirection: 'column',
          padding: 4,
        }}
      >
        <FieldPickerApp />
      </Box>
    </Container>
  );
};

export default App;
