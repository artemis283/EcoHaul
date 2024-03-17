import logo from './shopping_logo.jpeg'; // Import the image
import './Navbar.css'; // Assuming you have a separate CSS file for styling

import {
    WalletButton,
    useWallet,
    useWalletModal,
} from '@vechain/dapp-kit-react';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function App() {
    const { account } = useWallet();
    const { open, onConnectionStatusChange } = useWalletModal();
    const [buttonText, setButtonText] = useState('Connect Custom Button');

    const [isWalletConnected, setWalletConnected] = useState(false);
    const [isGoogleConnected, setGoogleConnected] = useState(true);
    const [isBought, setBought] = useState(true);

    useEffect(() => {
        const handleConnected = (address: string | null) => {
            if (address) {
                const formattedAddress = `${address.slice(
                    0,
                    6,
                )}...${address.slice(-4)}`;
                setButtonText(`Disconnect from ${formattedAddress}`);
                setWalletConnected(true)
            } else {
                setButtonText('Connect Custom Button');
            }
        };

        handleConnected(account);

        onConnectionStatusChange(handleConnected);
    }, [account, onConnectionStatusChange]);

    function LoginDiv() {
        if (isWalletConnected && isGoogleConnected) {
          return null;
        }
        return (
            <GoogleOAuthProvider clientId="63230301863-slr123re4n3tlomcj22v2m8qudmrkkr4.apps.googleusercontent.com">
                <div className="container" style={{ backgroundColor: 'white', padding: '20px', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto' }}>
                    {/* Use the imported image */}
                    <img src={logo} alt="Logo" style={{ maxWidth: '50px', maxHeight: '50px' }}/> 
                    <h2 style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif", marginBottom: '20px'}}>EcoHaul</h2> {/* Change font family here */}
                    <WalletButton />
                    <div className="label">Sign into your eBay account with Google:</div>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            setGoogleConnected(true);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </GoogleOAuthProvider>
        );
    }

    function Navbar() {
        return (
          <nav className="navbar">
            <div className="navbar-brand">Your Items</div>
            <ul className="nav-links">
              <li><button onClick={setBought(true)}>Bought</button></li>
              <li><button onClick={setBought(false)}>Sold</button></li>
            </ul>
          </nav>
        );
    };

    async function claim() {
        console.log("claim button clicked");
        const result = await fetch('https://api.vorj.app/main/v2/erc20/contracts/0x54cbc147350c5baa5e4f1fe578abe14edfb3cd3c/mint', {
            method: 'POST',
            headers: {
                'x-api-key': 'YOUR_KEY'
            },
            body: JSON.stringify({
                address: '0xe88647b6CB18D95146F12dB851821D306822AB74', //Usr Wallet variable
                amount: '1',
                exponent: 0
            })
        }, {mode: 'no-cors'});
        console.log(await result.json());
    };

    function ItemsListDiv() {
        if (isBought) {
          return (
            <ul>
                <li className="item"><img className="thumbnail" src='./SRC/ITEMS/1.WEBP'/>bmw e 46 325i exhaust<button className="claimButton" onClick={async () => {await claim()}}>Claim</button></li>
            </ul>
          );
        }
        return (
            <ul>
                <li className="item"><img className="thumbnail" src='./SRC/ITEMS/1.WEBP'/>bmw e 46 325i exhaust<button className="claimButton">Claim</button></li>
            </ul>
          );
    }

    function ItemsTopDiv() {
        if (isWalletConnected && isGoogleConnected) {
          return (
            <div className="itemsContainer" style={{ backgroundColor: 'white', padding: '20px', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto' }}>
                {/* <Navbar/> */}
                {/* <button onClick={setBought(true)}>Bought</button>
                <button onClick={setBought(false)}>Sold</button> */}
                <ItemsListDiv/>
            </div>
          );
        }
        return null;
    }

    return (
        <>
            <LoginDiv/>
            <ItemsTopDiv/>
        </>
    );
}

