 <template>

   <div class="hidden" >


      <vs-navbar square  centerCollapsed text-white style="z-index:2000;position: relative;background-color:#024DB2;">
       <template #left>
            <img src="cybercourt.png" class="logo-size">
       </template>
       <template #right>
         <vs-button v-if="!!account" textWhite icon style="background-color: rgba(0,0,0,0);border:1px solid #ffffff;font-family: 'Tourney', cursive;">{{ shortAddr(account) }}<i class='bx bxs-user'></i> </vs-button>
         <vs-button v-else icon style="background-color: rgba(0,0,0,0);border:1px solid #ffffff;font-family: 'Tourney', cursive;" textWhite  @click="showConnectWalletDialog()">{{$t('unlock')}}<i class='bx bx-lock-open'></i></vs-button>

       </template>
     </vs-navbar>
     <vs-navbar shadow square left-collapsed right-collapsed v-model="active" style="text-align:center;background: #000000;position: relative;color:#ffffff;">
       <template #left>
       </template>
       
       <vs-navbar-item :active="$route.path == '/'" id="docs" to="/" style="width:70px;text-align:center;font-family: 'Tourney', cursive;">
           {{$t('home')}}
         </vs-navbar-item>
         <vs-navbar-item :active="$route.path == '/apply'" id="apply" to="/apply" style="width:70px;text-align:center;font-family: 'Tourney', cursive;">
           {{$t('apply')}}
         </vs-navbar-item>
         <vs-navbar-item :active="$route.path == '/govern'" id="govern" @click="showGovernPage" style="width:70px;text-align:center;font-family: 'Tourney', cursive;">
           {{$t('govern')}}
         </vs-navbar-item>
         <vs-navbar-item :active="$route.path == '/team'" id="team" to="/team" style="width:70px;text-align:center;font-family: 'Tourney', cursive;">
           Judge
         </vs-navbar-item>
         <vs-navbar-item :active="$route.path == '/me'" id="license" to="/me" style="width:70px;text-align:center;font-family: 'Tourney', cursive;">
           {{$t('me')}}
         </vs-navbar-item>
       <template #right>

         

       </template>
     </vs-navbar>

     
     
     <vs-dialog width="500px" not-center prevent-close v-model="connectWalltetDialogShow">
       <template #header>
         <h4 class="not-margin">
           Connenct to a Wallet
         </h4>
         <el-row type="flex" justify="center" style="margin-top:20px;">
           <el-col :span="23">
            <div style="background-color:#F5F5F5;line-height:25px;font-size:14px;border-radius:10px;padding-top:10px;padding-bottom:10px;">
              By connecting a wallet, you agree to acknowledge that you have read and understand the CyberCourt protocol disclaimer.
            </div>
           </el-col>
         </el-row>
       </template>

       <div class="con-content">
         <el-row type="flex" justify="center">
           <el-col :span="23">
             <el-row  type="flex" justify="space-between" @click.native="loginMetaMask" style="background-color:#F5F5F5;height:60px;border-radius:10px;border:1px solid #CED0D9;cursor:pointer;">
               <el-col :span="16" style="text-align:left;padding-left:10px;line-height:60px;">
                 MetaMask
               </el-col>
               <el-col :span="8" style="text-align:right;padding-top:13px;padding-right:10px;">
                 <img src="metamask.png" width="30px">
               </el-col>
             </el-row>
           </el-col>
         </el-row>
         <!-- <el-row type="flex" justify="center" style="margin-top:20px;">
           <el-col :span="23">
             <el-row  type="flex" justify="space-between"  style="background-color:#F5F5F5;height:60px;border-radius:10px;border:1px solid #CED0D9;cursor:pointer;">
               <el-col :span="16" style="text-align:left;padding-left:10px;line-height:60px;">
                 WalletConnect
               </el-col>
               <el-col :span="8" style="text-align:right;padding-top:18px;padding-right:10px;">
                 <img src="walletConnectIcon.svg" width="30px">
               </el-col>
             </el-row>
           </el-col>
         </el-row>
         <el-row type="flex" justify="center" style="margin-top:20px;">
           <el-col :span="23">
             <el-row  type="flex" justify="space-between"  style="background-color:#F5F5F5;height:60px;border-radius:10px;border:1px solid #CED0D9;cursor:pointer;">
               <el-col :span="16" style="text-align:left;padding-left:10px;line-height:60px;">
                 Coinbase Wallet
               </el-col>
               <el-col :span="8" style="text-align:right;padding-top:13px;padding-right:10px;">
                 <img src="coinbaseWalletIcon.svg" width="30px">
               </el-col>
             </el-row>
           </el-col>
         </el-row> -->
       </div>

       <template #footer>
       </template>
     </vs-dialog>
     <vs-dialog width="300px" not-center prevent-close v-model="switchNetworkDialogShow">
       <template #header>
         <h4 class="not-margin">
           Please Switch To <b>Network Mumbai</b>
         </h4>
       </template>

       <div class="con-content">
         <p>
           Please switch the network to the network Mumbai on MetaMask
         </p>
       </div>

       <template #footer>
         <div class="con-footer">
           <vs-button @click="switchNetworkDialogShow=false" dark shadow>
             {{$t('noticeConfirm')}}
           </vs-button>
           <vs-button @click="switchNetwork" transparent>
             {{$t('noticeSwtich')}}
           </vs-button>
         </div>
       </template>
     </vs-dialog>
   </div>



</template>

<script>
  import { mapActions } from 'vuex'
  import collapse from '@/utils/collapse.js'
  import utils from '@/utils/utils.js'
  import {getLocalStorage,setLocalStorage} from '@/utils/local-storage.js'
  import config from "@/config";
  export default {
    name: 'home-view',
    components: {
      collapse
    },
    data() {
      return {
        connectWalltetDialogShow:false,
        isActive: false,
        active: 'home',
        activeSidebar: false,
        token:'',
        switchNetworkDialogShow:false,
        curCommand:'Polygon',
      }
    },
    computed: {

      balance(){
          return this.$store.state.web3.balance.toFixed(1) + "MATIC"
      },
      account() {
        return this.$store.state.web3.account
      }
    },
    watch: {
      '$store.state.web3.chainId': function () {
        let that = this;
        if ( that.$store.state.web3.chainId != parseInt(config.networkId)){
          that.switchNetworkDialogShow = true;
        }else{
          that.switchNetworkDialogShow = false;
        }
      }
    },
    created(){
      let tokenData = getLocalStorage('token');
      if (tokenData!=null && tokenData.token!=null){
        this.token = tokenData.token
      }
      // this.init()
    },
    methods: {
      ...mapActions(['ethLogin','logout']),
      showConnectWalletDialog(){
        let that = this;
        that.connectWalltetDialogShow = true;
      },
      loginMetaMask() {
        let that = this;

        if (that.$store.state.web3.account == null) {
          that.ethLogin();
        }
        if (that.$store.state.web3.isPortalInstalled == false) {
          that.$vs.notification({
            // width:'100%',
            duration: 10000,
            icon: "<i class='bx bx-error' ></i>",
            progress: 'auto',
            color: 'danger',
            position: 'top-center',
            title: that.$t('error'),
            text: that.$t('noticeWallet'),
          })
          return;
        }
        
        that.connectWalltetDialogShow = false;
      },
      showGovernPage(){
          let that = this;
          that.$vs.notification({
            // width:'100%',
            duration: 10000,
            icon: "<i class='bx bx-error' ></i>",
            progress: 'auto',
            color: 'warning',
            position: 'top-center',
            title: "Info",
            text: "Coming soon",
          })
      },
      exit(){
        this.logout();
      },
      shortAddr(account) {
        return utils.shortAddr(account)
      },
      switchNetwork(){
        
        ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [{
              "chainId": "0x"+config.networkId.toString(16),
              "chainName": config.chainName,
              "rpcUrls": [config.web3Provider],
              "nativeCurrency": {
                "name": config.nativeToken,
                "symbol": config.nativeToken,
                "decimals": 18
              },
              "blockExplorerUrls": [config.explorerUrl]
            }], // you must have access to the specified account
          })
          .then((result) => {
          })
          .catch((error) => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              console.log("We can't encrypt anything without the key.");
            } else {
              console.error(error);
            }
          });
        
      },
      switchBalance(command){
        this.token = command;
        setLocalStorage({token:command})
        // this.$vuetify.lang.current  = command
      },
    }
  }
</script>

<style>
  .collapse-menu {
    position: absolute;
    top: 80px;
    width: 100%;
    text-align: left;
  }
  .collapse-menu div {
    padding: 5px 10px;
    color: #76807F;
  }
  .heading {
    text-align: center;
    margin-bottom: 0px;
    background: #14151A;
  }
  .header-bar {
  	display: flex;
  	justify-content: space-between;
  	font-size: 1rem;
  	height: 70px;
  	padding-top: 20px;
  	padding-left: 20px;
  	padding-right: 20px;
  }
  .header-bar .el-button {
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(33, 33, 33);
    border: 0px;
    border-radius: 12px;
    color: rgb(144, 144, 255);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    height: 36px;
    -webkit-box-pack: center;
    justify-content: center;
    outline: none;
    padding-left: 16px;
    padding-right: 16px;
    width: 120px;

  }
  .header-bar .logo {
  	height: 45px;
  }
  .header-bar .menu {
  	height: 45px;
    color: #eee;
    text-align: center;
    padding-top: 10px;
  }
  .header-bar .menu span {
    padding: 0 20px;
    font-weight: bold;
  }
  .header-bar .menu ul {
    padding: 0px;
  }
  .header-bar .menu ul li {
  	display: inline-block;
  	font-size: 1rem;
  	height: 45px;
  	padding: 15px;
  	font-weight: bold;
  }
  .logo-size{
    width:200px;
  }
  @media screen  and (max-width:600px) {
    .logo-size{
      width:78px;
    }
  }
</style>
