import logo from './shopping_logo.jpeg'; // Import the image
import './Navbar.css'; // Assuming you have a separate CSS file for styling
import { Connex } from '@vechain/connex'

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
    const [isGoogleConnected, setGoogleConnected] = useState(false);
    const [isBought, setBought] = useState(true);
    const [walletAddress, setwalletAddress] = useState("");

    useEffect(() => {
        const handleConnected = (address: string | null) => {
            if (address) {
                const formattedAddress = `${address.slice(
                    0,
                    6,
                )}...${address.slice(-4)}`;
                setButtonText(`Disconnect from ${formattedAddress}`);
                setWalletConnected(true)
                setwalletAddress(formattedAddress)
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
                    <div className="label" style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif"}}>Sign into your eBay account with Google:</div>
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

    function logout() {
        setGoogleConnected(false)
    }

    // function Navbar() {
    //     return (
    //       <nav className="navbar">
    //         <div className="navbar-brand">Your Items</div>
    //         <ul className="nav-links">
    //           <li><button onClick={setBought(true)}>Bought</button></li>
    //           <li><button onClick={setBought(false)}>Sold</button></li>
    //         </ul>
    //       </nav>
    //     );
    // };

    async function claim() {
        console.log("claim button clicked");
        const result = await fetch('https://api.vorj.app/main/v2/erc20/contracts/0x54cbc147350c5baa5e4f1fe578abe14edfb3cd3c/mint', {
            method: 'POST',
            headers: {
                'x-api-key': '900f012540f383a3901624dc340a99e723dd26913ed580173f40f427a65dde4f'
            },
            body: JSON.stringify({
                // address: '0xe88647b6CB18D95146F12dB851821D306822AB74', //Usr Wallet variable
                address: walletAddress, //Usr Wallet variable
                amount: '1',
                exponent: 0
            })
        });
        console.log(await result.json());
    };

    function ItemsListDiv() {
        if (isBought) {
          return (
            <ul>
                <li className="item" style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif"}}><img className="thumbnail" src='./SRC/ITEMS/1.WEBP'/>BMW E46 325i exhaust<button className="claimButton" onClick={async () => {await claim()}}>Claim</button></li>
                <li className="item" style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif"}}><img className="thumbnail" src='./SRC/ITEMS/2.WEBP'/>AUDI A4 B8.5 HEADLIGHT WASHER JET HOSE PIPE 2012 8T0955970P<button className="claimButton" onClick={async () => {await claim()}}>Claim</button></li>
                <li className="item" style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif"}}><img className="thumbnail" src='./SRC/ITEMS/3.WEBP'/>Audi A4 B8 Avant Estate 2008-2015 Rear Load Net Cover Dog Guard Cargo<button className="claimButton" onClick={async () => {await claim()}}>Claim</button></li>
                <li className="item" style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif"}}><img className="thumbnail" src='./SRC/ITEMS/4.WEBP'/>BMW 3 SERIES E46 316 318 320 323 325 Ci PROPSHAFT COUPLING U JOINT 1227410<button className="claimButton" onClick={async () => {await claim()}}>Claim</button></li>
            </ul>
          );
        }
        return null;
    }

    function ItemsTopDiv() {
        if (isWalletConnected && isGoogleConnected) {
          return (
            <div className="itemsContainer" style={{ backgroundColor: 'white', padding: '20px', boxSizing: 'border-box', maxWidth: '100%', margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif", marginBottom: '20px'}}>eBay Items You've Bought</h2>
                <button className="logoutButton" onClick={logout}>Log Out</button>
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

