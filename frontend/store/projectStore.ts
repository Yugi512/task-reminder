import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5500/api/v1/auth';

axios.defaults.withCredentials = true;

export const useProjectStore = create((set: any) => ({
    projectId: undefined,
}))