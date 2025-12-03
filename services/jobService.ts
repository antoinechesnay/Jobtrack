import { Job, JobStatus } from '../types';

// ... (keep imports)

// ... (keep API_URL and getAuthHeaders)

export const getJobs = async (): Promise<Job[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/jobs`, { headers });
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return await response.json();
    } catch (error) {
        console.warn("API failed, returning MOCK DATA for demo:", error);
        // Fallback mock data for demo purposes
        return [
            {
                id: '1',
                position: 'Senior Frontend Engineer',
                companyName: 'TechCorp',
                location: 'Remote',
                status: JobStatus.NEXT_ROUND,
                dateApplied: new Date().toISOString(),
                url: 'https://example.com/job1'
            },
            {
                id: '2',
                position: 'Product Designer',
                companyName: 'DesignStudio',
                location: 'London, UK',
                status: JobStatus.APPLIED,
                dateApplied: new Date(Date.now() - 86400000).toISOString(),
                url: 'https://example.com/job2'
            },
            {
                id: '3',
                position: 'Full Stack Developer',
                companyName: 'StartupX',
                location: 'Berlin, DE',
                status: JobStatus.OFFER,
                dateApplied: new Date(Date.now() - 172800000).toISOString(),
                url: 'https://example.com/job3'
            }
        ] as Job[];
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
