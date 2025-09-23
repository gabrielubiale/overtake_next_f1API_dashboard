'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect } from "react";
import { useSessionInformation } from "@/hooks/useSessionInformation";

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

  const lastRaceResults = results || [];

  return (
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
              <TableCell>{row.driver_number}</TableCell>
              <TableCell>{row.number_of_laps}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>{row.gap_to_leader}</TableCell>
              <TableCell>{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
