<template>
  <div id="app">
    <div>
      <b-card style="max-width: 30rem;" header="My Address Here">
        <p>My Amount Here <span class="text-primary">VTHO</span></p>
​
        <b-form-group label="To Address:" label-for="toaddress">
          <b-form-input id="toaddress" v-model.trim="toaddress"></b-form-input>
        </b-form-group>
​
        <b-form-group label="Transfer Amount" label-for="toamount">
          <b-input-group append="VTHO">
            <b-form-input id="toamount" type="number" min="0" v-model.number="toamount">
            </b-form-input>
          </b-input-group>
        </b-form-group>
​
        <b-button variant="primary" v-on:click="transfer">
          Transfer
        </b-button>
      </b-card>
    </div>
  </div>
</template>
​
<script>
export default {
  
}
</script>
