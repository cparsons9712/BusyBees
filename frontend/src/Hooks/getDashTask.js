import { useState, useEffect } from 'react';
import { useActiveBlocks } from './useBlockQueries';
import { useGetUnassignedTask } from './useTaskQueries';

const useGetDashTask = () => {
    const [taskList, setTaskList] = useState([]);

    const { currBlock, isError: cbIsError, isLoading: cbIsLoading } = useActiveBlocks();
    const { unassignedTask, isError: uaIsError, isLoading: uaIsLoading } = useGetUnassignedTask();

    useEffect(() => {
        if (!cbIsLoading && !cbIsError) {
            if (currBlock) {
                setTaskList(currBlock.tasks);
            } else if (!uaIsLoading && !uaIsError) {
                setTaskList(unassignedTask);
            }
        }
        // This effect depends on the external states, so include them in the dependency array
    }, [currBlock, cbIsError, cbIsLoading, unassignedTask, uaIsError, uaIsLoading]);

    return taskList;
};

export default useGetDashTask;
