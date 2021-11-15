<template>
  <div
    style="background-color: #ffffff;color:white;font-family: 'Noto Sans SC';font-weight: 300;"
  >
    <!-- <el-row type="flex" justify="center" style="padding-top:120px;margin-bottom: 0px;width:100%;">
      <el-col :xs="24" :md="18" :xl="18" style="line-height:40px;border:2px dashed #E91E63;border-radius: 10px;">
        <div type="flex" justify="center"
             style="display:flex;align-items:center;justify-content:center;vertical-align: center;margin-top:10px;">

          <el-col :span="2">
            <img src="rocket.png" style="width:40px;">

          </el-col>
          <el-col :span="22"
                  style="text-align:left;color:#ffffff;font-size:24px;padding-left:20px;margin-top:-10px;">
            {{ $t('homeSentence3Part1') }}<span style="color:#E91E63;font-weight: bolder;">${{
              totalPoolMoney.toFormat(0)
            }}</span>{{ $t('homeSentence3Part2') }},
            {{ $t('homeSentence4Part1') }}<span style="color:#E91E63;font-weight: bolder;">${{ totalPoolAwardMoney.toFormat(0) }}</span>{{ $t('homeSentence4Part2') }}

          </el-col>
        </div>
      </el-col>
    </el-row> -->

    <el-row type="flex" style="width:100%;">
      <img src="sign2.jpg" width="100%" />
    </el-row>

    <el-main>
      <el-row type="flex" justify="center" style="margin-top:50px;">
        <el-col :xs="24" :sm="18" :xl="18" style="line-height:40px;">
          <!--          <img src="second-home-bg.png" style="width:100%;">-->
          <div class="shadow-border">
            <el-row
              type="flex"
              justify="center"
              style="color:#000000;font-size:26px;margin-top:20px;"
            >
              Initiate project contract signing
            </el-row>
            <el-row style="color:#000000;font-size:14px;">
              Help you resolve your contract disputes
            </el-row>

            <el-row
              type="flex"
              justify="center"
              style="margin-bottom: 20px;margin-top:30px;"
            >
              <el-col :xs="22" :sm="17" style="line-height:30px;">
                <vs-input
                  state="success"
                  success
                  v-model="personAddrArray[0]"
                  :placeholder="$t('applyInputAddr')"
                  block
                >
                  <template #icon>
                    <i class="bx bx-user"></i>
                  </template>
                </vs-input>
              </el-col>
              <el-col :xs="2" :sm="1" style="margin-top:-5px;text-align:right;">
                <el-row
                  type="flex"
                  justify="center"
                >
                  <vs-button circle icon @click="addAddr">
                    <i class="bx bx-plus"></i>
                  </vs-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              style="margin-bottom: 20px;"
              v-for="(personAddr, index) in personAddrArray"
              :key="index"
              v-if="index >= 1"
            >
              <el-col :xs="24" :sm="18" style="line-height:30px;">
                <vs-input
                  state="success"
                  success
                  v-model="personAddrArray[index]"
                  :placeholder="$t('applyInputAddr')"
                  block
                >
                  <template #icon>
                    <i class="bx bx-user"></i>
                  </template>
                </vs-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-bottom: 20px;">
              <el-col :xs="24" :sm="18" style="line-height:30px;">
                <vs-input
                  state="primary"
                  primary
                  v-model="title"
                  placeholder="Please input title"
                  block
                >
                  <template #icon>
                    <i class="bx bxs-file"></i>
                  </template>
                </vs-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-bottom: 20px;">
              <el-col :xs="24" :sm="18" style="line-height:30px;">
                <m-editor v-model="description" placeholder="Please input content of this contract"/>
              </el-col>
            </el-row>
            <el-row  type="flex" justify="center" style="margin-bottom: 20px;">
              <el-col :xs="24" :sm="18" style="line-height:30px;color:#000000;font-size:14px;">
                 <vs-checkbox v-model="isEncrypt" disabled>
        Whether to encrypt the content of the contract?

      </vs-checkbox>
              </el-col>
            </el-row>

            <el-row type="flex" justify="center" style="margin-bottom: 20px;">
              <el-col :xs="24" :sm="9" style="line-height:30px;">
                <vs-select
                  block
                  state="primary"
                  placeholder="Choose token kindle"
                  v-model="tokenIndex"
                >
                  <vs-option
                    v-for="(token, index) in tokens"
                    :key="index"
                    :label="token.name"
                    :value="index + 1"
                  >
                    {{ token.name }}
                  </vs-option>
                </vs-select>
              </el-col>
              <el-col :xs="24" :sm="9" style="line-height:30px;">
                <vs-input
                  icon-after
                  state="primary"
                  primary
                  v-model="amount"
                  placeholder="Please input amount"
                  block
                >
                  <template #icon>
                    <div
                      @click="maxSwapMoney"
                      style="cursor:pointer;font-size:12px;"
                    >
                      {{ $t("max") }}
                    </div>
                  </template>
                </vs-input>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="margin-bottom: 20px;">
              <el-col :xs="24" :sm="18" style="line-height:30px;">
                <vs-select
                  v-if="judgerOrgs.length > 0"
                  block
                  filter
                  state="primary"
                  placeholder="Please choose the judge team that you think is the most fair"
                  v-model="kindleIndex"
                >
                  <!-- <vs-option v-for="(token,index) in tokens" :key="index" :label="token.name" :value="token.address">
                  {{token.name}}
                </vs-option> -->
                  <vs-option
                    v-for="(judgerOrg, index) in judgerOrgs"
                    :key="index"
                    :label="judgerOrg.id"
                    :value="index + 1"
                  >
                    {{ showDatas[index].text }}
                  </vs-option>
                </vs-select>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              style="margin-bottom: 20px;flex-wrap:wrap;"
            >
              <el-col :xs="24" :sm="8" style="line-height:30px;">
                <vs-button block warn style="margin-left:0px;" :loading="approveButtonLoading" @click="approve">
                  Approve Token
                </vs-button>
              </el-col>
              <el-col :xs="0" :sm="2" style="line-height:30px;"> </el-col>
              <el-col :xs="24" :sm="8" style="line-height:30px;">
                <vs-button
                  block :loading="initiateButtonLoading"
                  style="margin-left:0px;"
                  @click="showInitiateDialog"
                >
                  Initiate
                </vs-button>
              </el-col>
            </el-row>
            <!-- <el-row type="flex" justify="center" style="margin-bottom: 60px;">
            <el-col :xs="12" :sm="8" style="margin-top:30px;line-height:30px;">
              <vs-button @click="swap"
                         block border style="font-size:20px;line-height:40px;"
                         color="#E91E63"
              >
                {{ $t('swap') }}
              </vs-button>
            </el-col>
          </el-row> -->
          </div>
        </el-col>
      </el-row>

      <el-row
        style="margin:0 auto;margin-top:40px;margin-bottom:100px;color:#999999"
      >
        {{ $t("noticeTeam") }}
      </el-row>
    </el-main>
    
    <vs-dialog
      :loading="initiateDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="initiateDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Initiate Project</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to initiate project?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createSummary" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="initiateDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import config from "@/config";
import utils from "@/utils/utils";
import { BigNumber } from "bignumber.js";
import { mapActions } from "vuex";
import mEditor from "simple-m-editor";
import "simple-m-editor/dist/simple-m-editor.css";

export default {
  name: "Apply",
  components: {
    mEditor,
  },
  data() {
    return {
      initiateDialogShow:false,
      initiateDialogLoading:false,
      approveButtonLoading:false,
      initiateButtonLoading:false,
      isNeedApprove: false,
      tokenIndex: 0,
      personAddrArray: [""],
      amount: "",
      title: "",
      description:"",
      judgerOrgs: [],
      showDatas:[],
      kindleIndex: 0,
      isEncrypt:false,
    };
  },
  computed: {
    entranceContract: function() {
      return this.$store.state.web3.entranceContract;
    },
    tokens: function() {
      return this.$store.state.web3.tokens;
    },
  },
  async created() {},

  async mounted() {
    var that = this;

    const loading = that.$vs.loading({
      type: "square",
      text: "Loading...",
    });
    let result = await that.entranceContract.getJudgerOrgs();
    this.judgerOrgs = result.data.judgerOrgs;
    that.showDatas = [];
    for (let i=0;i<that.judgerOrgs.length;i++){
      let showData = {};

      showData.text = that.judgerOrgs[i].name + " Team " + utils.shortAddr(that.judgerOrgs[i].id) 
      that.showDatas.push(showData);
    }
    loading.close();
  },
  beforeDestroy() {
    // var that = this;
    // clearTimeout(that.intervalTimer);
  },
  methods: {
    ...mapActions(["ethLogin"]),
    // tokenFaucetMap(){

    // },
    addAddr() {
      this.personAddrArray.push("");
    },

    async approve() {
      var that = this;
      if (that.$store.state.web3.account == null) {
        await that.ethLogin();
      }

      if (that.$store.state.web3.isPortalInstalled == false) {
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: that.$t("noticeWallet"),
        });
        return;
      }
      if (that.$store.state.web3.account == null) {
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: that.$t("noticeAddr"),
        });
        return;
      }

      if (that.amount == "" || that.amount <= 0) {
        this.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: "Please input correct token number",
        });
        return;
      }
      if (that.tokenIndex == 0){
        this.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: "Please select token kindle",
        });
        return;

      }
      let index = that.tokenIndex - 1;

      that.approveButtonLoading = true;
      let curAllowance = await that.tokens[index].contract.allowance(
        this.$store.state.web3.account,
        config.entranceAddress
      );
      if (curAllowance.isLessThan(that.amount)) {
        let status = await that.tokens[index].contract.approve(
          this.$store.state.web3.account,
          config.entranceAddress,
          that.amount
        );

        that.approveButtonLoading = false;
        console.log(status);

        if (status.succ == true) {
          that.isNeedApprove = false;
          
          this.$vs.notification({
            // width:'100%',
            duration: 6000,
            icon: "<i class='bx bx-select-multiple' ></i>",
            progress: "auto",
            color: "success",
            position: "top-center",
            title: "Success",
            text: "Approve token succeeded",
          });
        } else {
          this.$vs.notification({
            // width:'100%',
            duration: 10000,
            icon: "<i class='bx bx-error' ></i>",
            progress: "auto",
            color: "danger",
            position: "top-center",
            title: that.$t("error"),
            text: status.message,
          });
          that.isNeedApprove = true;
          return;
        }
      }else{
        this.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Success",
          text: "You have enough approved token",
        });
      }
      that.approveButtonLoading = false;
    },
    async showInitiateDialog(){
      var that = this;
      
      if (that.$store.state.web3.account == null) {
        await that.ethLogin();
      }

      if (that.$store.state.web3.isPortalInstalled == false) {
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: that.$t("noticeWallet"),
        });
        return;
      }
      if (that.$store.state.web3.account == null) {
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: that.$t("noticeAddr"),
        });
        return;
      }
      if (that.title==""|| that.description=="" || that.kindleIndex==0 || that.tokenIndex ==0){
        
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: "Please enter the correct information",
        });
        return;
      }
        that.initiateDialogShow = true;

    },
    async createSummary() {
      var that = this;

      let index = that.tokenIndex - 1;

      let content = "# " + that.title + "\n" + that.description;
      that.initiateDialogLoading = true;
      let status = await that.entranceContract.createMainContract(
        that.$store.state.web3.account,
        that.personAddrArray,
        that.judgerOrgs[that.kindleIndex - 1].id,
        content,
        that.amount,
        that.tokens[index].address,
        that.tokens[index].decimals
      );
      that.initiateDialogLoading = false;

      console.log(status);

      if (status.succ == true) {
        that.initiateDialogShow = false;
      } else {
        this.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: status.message,
        });
        return;
      }
    },

    maxSwapMoney() {
    },
  },
};
</script>

<style>
.shadow-border {
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(215, 215, 215, 0.35);
  /* box-shadow: 0px 0px 10px #D7D7D7, inset 0px -45px 45px -5px #423f40, inset 0px 0px 5px -5px #D7D7D7, inset 0px 0px 5px 0px #D7D7D7, inset 0px 0px 15px 0px #D7D7D7; */
}

.pool {
  transition: all 0.25s ease;
}

.pool:hover {
  -webkit-transform: scale(1.04);
  transform: scale(1.04);
}

@media screen and (min-width: 500px) {
  .money-text {
    font-size: 56px;
    margin-top: 58px;
  }

  .img-width {
    margin-top: 58px;
    width: 66px;
  }
}

@media screen and (max-width: 500px) {
  .money-text {
    font-size: 40px;
    margin-top: 18px;
  }

  .img-width {
    margin-top: 28px;
    width: 46px;
  }
}

@media screen and (min-width: 1200px) {
  .prize-shadow-border {
    border: 1px solid #e91e63;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #e91e63, inset 0px -45px 45px -5px #8a123b,
      inset 0px 0px 5px -5px #e91e63, inset 0px 0px 5px 0px #e91e63,
      inset 0px 0px 15px 0px #e91e63;
  }
}

@media screen and (max-width: 1200px) {
  .prize-shadow-border {
    /*border: 1px solid #E91E63;*/
    /*border-radius: 10px;*/
    /*box-shadow: 0px 0px 10px #E91E63, inset 0px -45px 45px -5px #8A123B, inset 0px 0px 5px -5px #E91E63, inset 0px 0px 5px 0px #E91E63, inset 0px 0px 15px 0px #E91E63;*/
  }
}

.heading {
  text-align: center;
  padding-bottom: 40px;
}

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.con-footer .vs-button {
  margin: 0px;
}

.con-footer .vs-button__content {
  padding: 10px 30px;
}

.con-footer .vs-button {
  margin-left: 10px;
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}

.con-content {
  width: 100%;
}

.con-content p {
  font-size: 0.8rem;
  padding: 0px 10px;
}

.con-content .vs-checkbox-label {
  font-size: 0.8rem;
}

.con-content .vs-input-parent {
  width: 100%;
}

.con-content .vs-input {
  width: 100%;
}

.con-content .vs-input-content {
  margin: 10px 0px;
  width: 100%;
}
</style>
