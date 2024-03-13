import {useEffect} from "react"
import {useSpring, animated, useTransition} from '@react-spring/web'
import '../Styling/modal.css'

const Modal = ({children, isOpen, onClose}) => {
    const handleEscape = e => {
        if (e.keyCode === 27){
            onClose()
        }
    }

    useEffect(()=> {
        document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    }, [])
    const modalTransition = useTransition(isOpen, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 1},
        config: {
            duration: 300
        }
    })

    const springs = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300
        }
    })
    return modalTransition((styles, isOpen)=> isOpen && (
        <animated.div style={styles} className='modalBackground'>
            <animated.div style={springs} className='modalContainer'>
                <div className='modalContent'>
                <button onClick={onClose} type='button'>X</button>
                {children}

                </div>
            </animated.div>
        </animated.div>
))}



export default Modal
