import React from 'react';
import '../Styling/modal.css'

interface SignUpProps {
  closeModal: (value: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ closeModal }) => {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='modalHeader'>
                    <div className='modalTitle'>Hello! I'm Title</div>
                    <div className='modalExit' onClick={() => closeModal(false)}>X</div>
                </div>

                <div className='modalBody'>
                    This will probably end up being a form ...
                </div>

                <div className='modalFooter'>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
