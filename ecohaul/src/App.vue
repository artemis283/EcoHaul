
<script setup>
import { Connex } from '@vechain/connex'
import BigNumber from "bignumber.js";

const vendor = new Connex.Vendor("test");
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})

function signCertID() {
    vendor
    .sign("cert", {
        purpose: "identification",
        payload: {
        type: "text",
        content: "get signer address"
        }
    })
    .request()
    .then((r) => {
        document.getElementById("signer").innerText = "signer: " +r.annex.signer;
        checkBalance(r.annex.signer)
        .catch((e) => document.getElementById("signer").innerText = "signer: User Canceled");
    })
}

function checkBalance(queryAcc){
    const acc = connex.thor.account(queryAcc)
    acc.get().then(accInfo=>{
    document.getElementById("vet").innerText=BigNumber(accInfo.balance/1e18) +" VET"
    document.getElementById("vtho").innerText=BigNumber(accInfo.energy/1e18) +" VTHO"
    })
}

var isCameraOpen = false
var isPhotoTaken = false
var isShotPhoto = false
var isLoading = false

function toggleCamera() {
    if(isCameraOpen) {
        isCameraOpen = false;
        isPhotoTaken = false;
        isShotPhoto = false;
        stopCameraStream();
    } else {
        isCameraOpen = true;
        createCameraElement();
    }
}

function createCameraElement() {
    isLoading = true;
    const constraints = (window.constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    });
    navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
        isLoading = false;
        $refs.camera.srcObject = stream;
    })
    .catch(error => {
        isLoading = false;
        alert("May the browser didn't support or there is some errors.");
    });
}

import {
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth() // only exists on client side

// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithRedirect(auth, someAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
</script>

<template>
    <main>
      <ErrorBox v-if="error" :error="error" />
      <button @click="signinRedirect()">SignIn with Google</button>
    </main>
    <div id="app">
        <button @click="signCertID()">Login</button><br>
        <pre id="signer">signer: --</pre><br>
        <pre id="vet">0 VET balance</pre><br>
        <pre id="vtho">0 VTHO balance</pre>
    </div>
    <!-- <div class="camera-button">
        <button type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
            <span v-if="!isCameraOpen">Open Camera</span>
            <span v-else>Close Camera</span>
        </button>
    </div> -->
</template>
