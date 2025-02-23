import { useNavigate } from 'react-router-dom'; // Import useHistory for routing

function useCheckout() {
    const navigate = useNavigate();

    const postCheckout = async (data: any) => {
        try {
            const response = await fetch('http://localhost:3000/dev/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // Navigate to external link on successful checkout
            window.location = result.url
            return result;
        } catch (error) {
            console.error('Error during checkout:', error);
            // Navigate to failure page on error
            navigate('/failure');
            throw error;
        }
    };

    return { postCheckout };
}

export default useCheckout;
