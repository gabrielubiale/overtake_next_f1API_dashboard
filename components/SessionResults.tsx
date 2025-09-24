'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { useDriverInformation } from '@/hooks/useDriverInformation'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { SessionsInformation, DriversInformation } from '../store/useRaceStore'

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

  const [openModalDriver, setOpenModalDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const { sessionKeySelected } = SessionsInformation()
  const { setDriversSearched } = DriversInformation()

  const { data: driverInformation, isLoading, error } = useDriverInformation(selectedDriver!, sessionKeySelected);

  useEffect(() => {
    if(driverInformation) {
      setDriversSearched(driverInformation[0])
    }
  }, [driverInformation])

  const handleDriverNumberCLicked = (value: number) => {
    setSelectedDriver(value);
    setOpenModalDriver(true);
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

      <Modal open={openModalDriver} onClose={() => setOpenModalDriver(false)}>
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
          {driverInformation && (
            <div className="flex items-center gap-6 bg-white dark:bg-gray-800 shadow rounded-xl p-6 transition hover:shadow-xl">
              {/* Avatar */}
              <img
                src={driverInformation[0].headshot_url}
                alt={`${driverInformation[0].first_name} ${driverInformation[0].last_name}`}
                className="w-28 h-28 rounded-full object-cover border-4 border-sky-500 shadow-md"
              />

              {/* Info */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {driverInformation[0].first_name} {driverInformation[0].last_name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Team: <span className="font-medium text-sky-500">{driverInformation[0].team_name}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Driver Nº <span className="font-semibold">{driverInformation[0].driver_number}</span>
                </p>
              </div>
            </div>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => setOpenModalDriver(false)}>
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
