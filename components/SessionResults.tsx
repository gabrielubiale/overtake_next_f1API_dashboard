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
  const sessionKey = lastRaceResults[0].session_key
  console.log("sessionKey: ", sessionKey)

  const { data, isLoading, error } = useSessionInformation(sessionKey)
  console.log("data: ", data)

  const sessionInfo = data?.[0];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="session results table">
        <TableHead>

          {sessionInfo && (
            <div className="w-full flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">

              <div className="flex flex-row gap-2 font-semibold text-gray-900 dark:text-gray-100">
                <span>{sessionInfo.circuit_short_name}</span>
                <span>{sessionInfo.country_name}</span>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 items-center">
                <span className="font-medium">Date:</span>
                <span>{sessionInfo.date_end}</span>
              </div>
            </div>
          )}

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
              <TableCell>{row.position + 1}</TableCell>
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
