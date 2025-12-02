import { Job } from '../types';
import { auth } from '../firebase';

const API_URL = import.meta.env.VITE_API_URL || 'https://jobtrack-backend-955085072936.europe-west4.run.app/api';

const getAuthHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getJobs = async (): Promise<Job[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/jobs`, { headers });
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return await response.json();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

export const addJob = async (job: Omit<Job, 'id'>): Promise<Job | null> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers,
            body: JSON.stringify(job)
        });
        if (!response.ok) throw new Error('Failed to add job');
        return await response.json();
    } catch (error) {
        console.error("Error adding job:", error);
        throw error;
    }
};

export const updateJob = async (id: string, updates: Partial<Job>): Promise<Job | null> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update job');
        return await response.json();
    } catch (error) {
        console.error("Error updating job:", error);
        return null;
    }
};

export const deleteJob = async (id: string): Promise<boolean> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'DELETE',
            headers
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting job:", error);
        return false;
    }
};
