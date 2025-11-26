import { useCallback } from 'react';
import { apiService } from './ApiService';

export function useApi() {

    // Check if backend is available
    const checkHealth = useCallback(async () => {
        try {
            const health = await apiService.healthCheck();
            return health.status === 'ok';
        } catch {
            return false;
        }
    }, []);


    return {
        checkHealth,

        apiService,
    };
}

export default useApi;