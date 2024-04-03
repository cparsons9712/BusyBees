import { useDeleteBlock } from "../../Hooks/useBlockQueries"
import { useModal } from "../../Context/Modal"
import '../../Styling/confirmDelete.css'

const ConfirmDelete = ({resource}) => {
    const { mutate, isError, error} = useDeleteBlock()
    const {hideModal} = useModal()

    return (
        <div className="confirmDelete">
           <h2 className="cursive caution">Caution!!!</h2>
            <p className="handwriting deleteText">Deleting this {resource.type} is permanent and can not be reversed. </p>
            <div className="handwriting deleteText">Are you sure you want to delete the {resource.type} "{resource.title}"?  </div>
            <div className="deleteBtnBar">
                <button onClick={hideModal} className="handwriting deleteText deleteBtn">Keep it</button>
                <button onClick={()=>{mutate({id: +resource.id})}} className="handwriting deleteText deleteBtn">Delete it</button>
            </div>
            {isError && <div> {error.message} </div>}

        </div>
    )
}

export default ConfirmDelete
