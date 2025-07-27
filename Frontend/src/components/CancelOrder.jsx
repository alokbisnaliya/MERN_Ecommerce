import React, { useState } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const baseURL = import.meta.env.VITE_API_URL;


const CancelOrder = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState(null)
    let { productID } = useParams();

    const handleCancel = async () => {
        try {
            const res = await fetch(`${baseURL}/api/cancel-order/${productID}`, {
                method: "PATCH", // switch from DELETE
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ reason: reason.value }) // send the reason
            });

            let data = await res.json();
            if (res.ok) {
                // console.log(data.message)
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,

                })
                setTimeout(()=>{
                   navigate('/orders')
                },2000)

            } else {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 3000,

                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const options = [
        { value: 'delay', label: '🚚 Delayed Delivery' },
        { value: 'change', label: '🔄 Changed my mind' },
        { value: 'price', label: '💸 Price issue' },
        { value: 'other', label: '❓ Other' }
    ]

    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-start pt-10">
            <div className="bg-white p-6 rounded shadow-lg w-[350px]">
                <h1 className="text-xl font-bold text-center">Cancel Order</h1>
                <p className="font-semibold mt-4">Please choose a reason to cancel:</p>
                <div className="mt-2">
                    <Select
                        options={options}
                        value={reason}
                        onChange={setReason}
                        placeholder="Select reason..."
                    />
                </div>
                {reason && (
                    <section>
                        <div className="mt-4 text-sm text-gray-600">
                            Selected reason: <strong>{reason.label}</strong>
                        </div>
                        <div className='w-[100%] flex justify-center items-center mt-4'>
                            <button
                                onClick={handleCancel}
                                className='text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600 font-semibold'>
                                Cancel Order
                            </button>
                        </div>
                    </section>


                )}
            </div>
        </div>
    )
}

export default CancelOrder
