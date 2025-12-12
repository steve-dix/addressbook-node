//
// VUE.JS App :: Addressbook, Steve Dix steve@stevedix.de 2025
//	Simple address book application as a client for node.js program addrbook.js
const app = Vue.createApp({
	data() {
		return {
			addresses: [],
			address: {addressID: 0, address:'', name: '', phone:'', email:''},
			errors: [],
			showform : false,
			showerr : false,
			page: 1,
			maxpage: -1,
			addressCount: 0,
			emailClass: 'invalidemail'
		}
	},
	/*
	watch: {
		'address.email': function(email) {
			const validMail = /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/;
			this.emailClass = validMail.text(email) ? 'validemail' : 'invalidemail';
		}
		
	},*/
	methods: {
		nextPage: function() {		// get the next page of addresses
			this.page++;
			this.getAddressCount();
			this.getAddresses();
		},
		previousPage: function() {	// get the previous page of addresses
			this.page--;
			this.getAddressCount();
			this.getAddresses();
		},
		firstPage: function() {		// jump back to the first page of addresses
			this.page=1;
			this.getAddressCount();
			this.getAddresses();
		},
		lastPage: function() {		// jump to the last page of addresses
			this.getAddressCount();
			this.page = this.maxpage;
			this.getAddresses();
		},
		getAddressCount: function() {	// get the total number of addresses in the addressbook and calculate pages
			axios.get("http://localhost:3000/address/count")
			.then(response => {
				this.addressCount = parseInt(response.data.cnt);
				this.maxpage = Math.floor(this.addressCount / 12) + ((this.addressCount % 12 > 0) ? 1 : 0);							
			})
		},
		getAddresses: function() {		// get the current page of addresses
			axios.get("http://localhost:3000/address/pg/"+this.page)
			.then(response => {
				this.addresses = response.data;
			})
		},
		editAddress: function(id) {		// edit an address entry
			axios.get("http://localhost:3000/address/" + parseInt(id))
			.then(response => {
				this.address = response.data[0];
				this.showform = true;
			})
		},
		submitAddress: function(address) {	// write an updated address
			axios.put("http://localhost:3000/address/" + parseInt(address.addressID),address)
			.then(response => {
				if( !(typeof response.data.errors === 'undefined')) {
					errors = response.data.errors;
					if(errors.length !=0) {
						this.showerr = true;
						this.errors = errors;
						return;
					}
				} else {
					// erase the address form once finished updating
					this.address = {addressID: 0, address:'', name: '', phone:'', email:''};
					this.errors = [];	// erase all errors from the submission area
					alert("success");	// alert user, pause
					this.showform = false;	//erase the form
					this.getAddresses();	// update the page
					this.getAddressCount();
				}
			})
		},
		postAddress: function(address) {		// write a new address into the addressbook
			axios.post("http://localhost:3000/address/",address)
			.then(response => {
				if( !(typeof response.data.errors === 'undefined')) {
					errors = response.data.errors;
					if(errors.length != 0) {
						this.showerr = true;
						this.errors = errors;
						return;
					}
				} else {
					this.address = {addressID: 0, address:'', name: '', phone:'', email:''};
					this.errors = [];
					alert("success");
					this.showform = false;
					this.getAddresses();
					this.getAddressCount();
				}
			})
		},
		deleteAddress: function(address) {		// delete an address
			if(confirm("are you sure??")){		
				axios.delete("http://localhost:3000/address/"+parseInt(address))
				.then(response => {
					this.getAddresses();
					this.getAddressCount();
				});
			} else {
				alert("Delete aborted");
			}
		}
	},
	created() {		// on startup, get the first page of addresses after getting the size of the db and calculating the pages
		this.getAddressCount();
		this.getAddresses();
	}
});
app.mount('#app')
