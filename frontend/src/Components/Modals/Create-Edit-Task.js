import { useState, useEffect } from "react"
import BlockDetails from "./BlockDetails";

const CreateEditTask = ({taskDetails}, {blockId}) => {
    /* set which type of form (will override if edit)*/
    const {typeForm, setTypeForm}= useState("Create")
    /* Payload data */
    const {title, setTitle} = useState();
    const {blockId, setBlockId} = useState();
    const {repeatFrequency, setRepeatFrequency} = useState();
    const {timeUnit, setTimeUnit} = useState();

    /* set data for editing */
    useEffect(()=> {
        if(taskDetails){
            setTypeForm("Edit")
            setTitle(taskDetails.title);
            setBlockId(taskDetails.blockId);
            setRepeatFrequency(taskDetails.repeatFrequency);
            setTimeUnit(taskDetails.timeUnit)
        }
    }, [BlockDetails])

    return (

    )
}
