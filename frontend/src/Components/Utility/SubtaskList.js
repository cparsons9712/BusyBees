const SubtaskList = (subtasks) => {

    const addSubtask = () => {
        <div>SOON IT WILL WORK</div>
    }

    return (
        <div className="stlContainer">
            {subtasks.map((st)=>{
                if(st.status) return (
                    <div style={{textDecoration: "line-through"}}>
                        {st.title}
                    </div>
                )
                return <div> {st.title}</div>
            })}
            <div>+</div>
        </div>
    )

}
