import { useDeleteBlock } from "../../Hooks/useBlockQueries"
import { useModal } from "../../Context/Modal"

const ConfirmDelete = ({resource}) => {
    const { mutate, isError, error} = useDeleteBlock()
    const {hideModal} = useModal()

    return (
        <div>
           <h2>Caution</h2>
            <p>Deleting this {resource.type} is permanent and can not be reversed. </p>
            <div>Are you sure you want to delete the {resource.type} "{resource.title}"?  </div>
            <div className="deleteBtnBar">
                <button onClick={hideModal}>Keep it</button>
                <button onClick={()=>{mutate({id: +resource.id})}}>Delete it</button>
            </div>
            {isError && <div> {error.message} </div>}

        </div>
    )
}

export default ConfirmDelete
