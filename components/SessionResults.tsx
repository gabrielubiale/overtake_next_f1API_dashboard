'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { useDriverInformation } from '@/hooks/useDriverInformation'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { SessionsInformation } from '../store/useRaceStore'

interface SessionResult {
  position: number;
  driver_number: number;
  number_of_laps: number;
  duration: number;
  gap_to_leader: number;
  points: number;
  session_key: number
}

interface SessionResultsProps {
  results?: SessionResult[];
}


export function SessionResults({ results }: SessionResultsProps) {

  const [open, setOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const { sessionKeySelected } = SessionsInformation()

  const { data: driverInfo, isLoading, error } = useDriverInformation(selectedDriver!, sessionKeySelected);

  const handleDriverNumberCLicked = (value: number) => {
    setSelectedDriver(value);
    setOpen(true);
  };

  const lastRaceResults = results || [];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="session results table">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Driver Number</TableCell>
              <TableCell>Number of Laps</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Gap to Leader</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastRaceResults.map((row) => (
              <TableRow key={row.driver_number}>
                <TableCell>{row.position}</TableCell>
                <TableCell className="cursor-pointer"
                  onClick={() => handleDriverNumberCLicked(row.driver_number)}>
                  {row.driver_number}
                  <LaunchIcon sx={{ marginLeft: '15px', width: '20px', height: '20px' }} />
                </TableCell>
                <TableCell>{row.number_of_laps}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.gap_to_leader}</TableCell>
                <TableCell>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            color: '#000',
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Driver Information
          </Typography>

          {isLoading && <Typography>Loading driver info...</Typography>}
          {error && <Typography color="error">Failed to load driver info</Typography>}
          {driverInfo && (
            <pre style={{ fontSize: "14px", background: "#f5f5f5", padding: "10px", borderRadius: "8px" }}>
              {JSON.stringify(driverInfo, null, 2)}
            </pre>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
