import logo from './shopping_logo.jpeg'; // Import the image

import {
    WalletButton,
    useWallet,
    useWalletModal,
} from '@vechain/dapp-kit-react';
import { useEffect, useState } from 'react';

function App() {
    const { account } = useWallet();
    const { open, onConnectionStatusChange } = useWalletModal();
    const [buttonText, setButtonText] = useState('Connect Custom Button');

    useEffect(() => {
        const handleConnected = (address: string | null) => {
            if (address) {
                const formattedAddress = `${address.slice(
                    0,
                    6,
                )}...${address.slice(-4)}`;
                setButtonText(`Disconnect from ${formattedAddress}`);
            } else {
                setButtonText('Connect Custom Button');
            }
        };

        handleConnected(account);

        onConnectionStatusChange(handleConnected);
    }, [account, onConnectionStatusChange]);

    return (
        <div className="container" style={{ backgroundColor: 'white', padding: '20px', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto' }}>
            {/* Use the imported image */}
            <img src={logo} alt="Logo" style={{ maxWidth: '50px', maxHeight: '50px' }}/> 
            <h2 style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif", marginBottom: '20px'}}>EcoHaul</h2> {/* Change font family here */}
            <WalletButton />
        </div>
    );
}

export default App;
