// apiService.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

export const createGame = async (data = {}) => {
  const response = await axios.post(`${API_BASE_URL}/game/create`, data);
  return response.data;
};

export const updateGame = async (gameId, updateData) => {
  const response = await axios.put(`${API_BASE_URL}/game/${gameId}/update`, updateData);
  return response.data;
};

export const addPlayer = async (roomId, playerData) => {
  const response = await axios.post(`${API_BASE_URL}/room/${roomId}/player/add`, playerData);
  return response.data;
};

export const getPlayers = async (roomId) => {
  const response = await axios.get(`${API_BASE_URL}/room/${roomId}/players`);
  return response.data;
};

// additional functions for traits, boys, etc.
export const createTrait = async (traitData) => {
  const response = await axios.post(`${API_BASE_URL}/trait/create`, traitData);
  return response.data;
};

export const getRandomTraits = async (playerId) => {
  const response = await axios.get(`${API_BASE_URL}/trait/${playerId}/random`);
  return response.data;
};

export const createBoy = async (boyData) => {
  const response = await axios.post(`${API_BASE_URL}/boy/create`, boyData);
  return response.data;
};

export const getUnusedBoys = async () => {
  const response = await axios.get(`${API_BASE_URL}/boy/unused`);
  return response.data;
};

export const getNewBoy = async () => {
  const response = await axios.get(`${API_BASE_URL}/boy/new`);
  return response.data;
};

export const endRound1 = async (voteData) => {
  const response = await axios.post(`${API_BASE_URL}/round1/end`, voteData);
  return response.data;
};

export const endRound2 = async (voteData) => {
  const response = await axios.post(`${API_BASE_URL}/round2/end`, voteData);
  return response.data;
};

export const getWinningTraitAuthor = async () => {
  const response = await axios.get(`${API_BASE_URL}/trait/winning-author`);
  return response.data;
};

export const getWinningBoy = async () => {
  const response = await axios.get(`${API_BASE_URL}/boy/winning`);
  return response.data;
};

export const getLosingBoy = async () => {
  const response = await axios.get(`${API_BASE_URL}/boy/losing`);
  return response.data;
};
