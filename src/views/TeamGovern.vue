<template>
  <el-main
    style="
      background-color: #ffffff;
      color: white;
      font-weight: 300;
      color: #000000;
    "
  >
    <el-tabs v-model="tabName" @tab-click="tabClick" type="card">
      <el-tab-pane label="Create Proposal" name="createProposal"
        ><el-row style="text-align: center">
          <el-row type="flex" justify="center" style="margin-top: 50px">
            <el-col :xs="24" :md="18" :xl="18" style="line-height: 40px">
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <div class="shadow-border">
                <el-row
                  type="flex"
                  justify="center"
                  style="color: #000000; font-size: 26px; margin-top: 40px"
                >
                  Create DAO Proposal Of Team Governance
                </el-row>
                <el-row
                  style="
                    color: #000000;
                    font-size: 14px;
                    line-height: 20px;
                    margin-top: 20px;
                  "
                  type="flex"
                  justify="center"
                >
                  <el-col :xs="24" :sm="18">
                    Tip: Select an action and describe your proposal for the
                    community. The proposal cannot be modified after submission,
                    so please verify all information before submitting. The
                    voting period will begin immediately and last for 2 days.
                  </el-col>
                </el-row>

                <el-row
                  type="flex"
                  justify="center"
                  style="margin-bottom: 20px; margin-top: 30px"
                >
                  <el-col :xs="24" :sm="18" style="line-height: 30px">
                    <vs-input
                      state="success"
                      success
                      v-model="title"
                      placeholder="Title"
                      block
                    >
                      <template #icon>
                        <i class="bx bx-notepad"></i>
                      </template>
                    </vs-input>
                  </el-col>
                </el-row>

                <el-row
                  type="flex"
                  justify="center"
                  style="margin-bottom: 20px"
                >
                  <el-col :xs="24" :sm="18" style="line-height: 30px">
                    <div>
                      <m-editor v-model="description" placeholder="Please input description of this proposal"/>
                    </div>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col
                    :xs="24"
                    :sm="18"
                    style="margin-top: 5px; text-align: right"
                  >
                    <vs-button block success @click="addAction" style="margin-left:0px;">
                      Add Action
                    </vs-button>
                  </el-col>
                </el-row>
                <el-row
                  v-for="(action, index) in actionArray"
                  :key="'action' + index"
                >
                  <el-row type="flex" justify="center" style="margin-top: 20px">
                    <el-col :xs="24" :sm="18" style="line-height: 30px">
                      <vs-select
                        block
                        state="primary"
                        placeholder="Select Function"
                        v-model="action.index"
                      >
                        <vs-option
                          v-for="(contractFunction, index) in contractFunctions"
                          :key="'contractFunction' + index"
                          :label="contractFunction.name"
                          :value="index+1"
                        >
                          {{ contractFunction.name }}
                        </vs-option>
                      </vs-select>
                    </el-col>
                  </el-row>
                  <el-row v-if="action.index >= 1">
                    <el-row
                      v-for="(param, index) in contractFunctions[action.index-1]
                        .paramNames"
                      :key="'contractFunctionParams' + index"
                      type="flex"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <el-col :xs="24" :sm="18" style="line-height: 30px">
                        <vs-input
                          state="success"
                          success
                          v-model="action.params[index]"
                          :placeholder="param"
                          block
                        >
                          <template #icon>
                            <i class="bx bx-notepad"></i>
                          </template>
                        </vs-input>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row
                  type="flex"
                  justify="center"
                  style="margin-bottom: 20px;margin-top:20px;"
                >
                  <el-col :xs="24" :sm="18" style="line-height: 30px">
                    <vs-button  block @click="showApplyDialog" style="margin-left:0px;">
                      Apply
                    </vs-button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Active" name="active">
        <div v-if="tabName == 'active'">
          <el-row
            v-if="governorProposals.length == 0"
            style="text-align: center"
          >
            There are no active proposals！
          </el-row>
          <el-row v-else>
            <el-row
              type="flex"
              justify="center"
              align="center"
              style="margin-top: 50px"
              v-for="(data, index) in governorProposals"
              :key="'proposals' + index"
            >
              <el-col
                :xs="24"
                :md="18"
                style="line-height: 40px"
                class="shadow-border"
              >
                <!--          <img src="second-home-bg.png" style="width:100%;">-->
                <el-row type="flex" justify="center" align="middle">
                  <el-col :xs="24" :md="17">
                    <el-row
                      type="flex"
                      justify="center"
                      style="font-size: 26px; margin-top: 20px"
                    >
                      {{ showDatas[index].title }}
                    </el-row>
                    <div
                      style="
                      width: 100%;
                      height: 1px;
                      background-color: #000000;
                      margin-top: 20px;
                    "
                    ></div>
                    <div
                      style="
                      text-align: left;
                      text-indent: 30px;
                      margin-top: 20px;
                    "
                    >
                      <div>
                        This is a governance proposal with
                        <strong> Order {{ data.order }}</strong
                        >, and the current status is implemented. The proposal
                        start time is <strong> {{ showDatas[index].startBlockTime }}</strong
                        >, vote end time is <strong> {{ showDatas[index].endBlockTime }}</strong>
                        and the address of the proposer is
                        <vs-button
                          flat
                          style="display: inline"
                          blank
                          :href="
                            config.explorerUrl + 'address/' + data.proposer
                          "
                          success
                          >{{ data.proposer }}</vs-button
                        >.
                        <div>
                         <vs-button
                            success
                            style="display: inline"
                            @click="viewProposalContent(data)"
                            >Click To View</vs-button
                          >
                          the content of proposal.
                        </div>
                        <el-row
                          type="flex"
                          justify="center"
                          style="margin-bottom: 0px"
                        >
                          <el-col :xs="24" :sm="24">
                            <div>
                              <m-editor
                                style="display:none"
                                v-model="showDatas[index].description"
                                ref="markdownEditor"
                              />
                              <div
                                class="m-editor-preview"
                                v-html="showDatas[index].htmlMarkdown"
                              ></div>
                            </div>
                          </el-col>
                        </el-row>
                        <div>
                          <vs-button
                            success
                            style="display: inline"
                            @click="viewProposalAction(data)"
                            >Click To View</vs-button
                          >
                          the specific operation performed.
                        </div>
                        <div style="margin-bottom:20px;">
                          There are currently
                          <strong>{{ data.forVotes }} votes in favor</strong>
                          and
                          <strong>{{ data.againstVotes }} votes against</strong
                          >.
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col
                    :xs="24"
                    :md="{ span: 5, offset: 1 }"
                    style="height: 100%"
                  >
                    <div
                      style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      height: 100%;
                    "
                    >
                      <el-row style="width: 100%; margin-top: 20px">
                        <vs-button
                          :loading="rejectProposalLoading"
                          block
                          @click="rejectProposal(index)"
                          size="large"
                          danger
                          >Reject</vs-button
                        >
                      </el-row>
                      <el-row style="width: 100%; margin-top: 20px">
                        <vs-button
                          :loading="agreeProposalLoading"
                          block
                          @click="agreeProposal(index)"
                          size="large"
                          primary
                          >Agree</vs-button
                        >
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <vs-pagination
              v-model="page"
              :length="pageCount"
              style="margin-top: 20px"
            />
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Executable" name="executable">
        <div v-if="tabName == 'executable'">
          <el-row
            v-if="governorProposals.length == 0"
            style="text-align: center"
          >
            There are no active proposals！
          </el-row>
          <el-row v-else>
            <el-row
              type="flex"
              justify="center"
              align="center"
              style="margin-top: 50px"
              v-for="(data, index) in governorProposals"
              :key="'proposals' + index"
            >
              <el-col
                :xs="24"
                :md="18"
                style="line-height: 40px"
                class="shadow-border"
              >
                <!--          <img src="second-home-bg.png" style="width:100%;">-->
                <el-row type="flex" justify="center" align="middle">
                  <el-col :xs="24" :md="17">
                    <el-row
                      type="flex"
                      justify="center"
                      style="font-size: 26px; margin-top: 20px"
                    >
                      {{ showDatas[index].title }}
                    </el-row>
                    <div
                      style="
                      width: 100%;
                      height: 1px;
                      background-color: #000000;
                      margin-top: 20px;
                    "
                    ></div>
                    <div
                      style="
                      text-align: left;
                      text-indent: 30px;
                      margin-top: 20px;
                    "
                    >
                      <div>
                        This is a governance proposal with
                        <strong> Order {{ data.order }}</strong
                        >, and the current status is implemented. The proposal
                        time is <strong> {{ showDatas[index].startBlockTime }}</strong
                        >, vote end time is <strong> {{ showDatas[index].endBlockTime }}</strong>
                        , and the address of the proposer is
                        <vs-button
                          flat
                          style="display: inline"
                          blank
                          :href="
                            config.explorerUrl + 'address/' + data.proposer
                          "
                          success
                          >{{ data.proposer }}</vs-button
                        >.
                        <div>

                         <vs-button
                            success
                            style="display: inline"
                            @click="viewProposalContent(data)"
                            >Click To View</vs-button
                          >
                          the content of proposal.                        </div>
                        <!-- <el-row
                          type="flex"
                          justify="center"
                          style="margin-bottom: 0px"
                        >
                          <el-col :xs="24" :sm="24">
                            <div>
                              <m-editor
                                style="display:none"
                                v-model="showDatas[index].description"
                                ref="markdownEditor"
                              />
                              <div
                                class="m-editor-preview"
                                v-html="showDatas[index].htmlMarkdown"
                              ></div>
                            </div>
                          </el-col>
                        </el-row> -->
                        <div>
                          <vs-button
                            success
                            style="display: inline"
                            @click="viewProposalAction(data)"
                            >Click To View</vs-button
                          >
                          the specific operation performed.
                        </div>
                        <div style="margin-bottom:20px;">
                          There are currently
                          <strong>{{ data.forVotes }} votes in favor</strong>
                          and
                          <strong>{{ data.againstVotes }} votes against</strong
                          >.
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col
                    :xs="24"
                    :md="{ span: 5, offset: 1 }"
                    style="height: 100%"
                  >
                    <div
                      style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      height: 100%;
                    "
                    >
                      <el-row style="width: 100%; margin-top: 20px">
                        <vs-button
                          :loading="cancelProposalLoading"
                          block
                          @click="cancelProposal(index)"
                          size="large"
                          danger
                          >Cancel</vs-button
                        >
                      </el-row>
                      <el-row style="width: 100%; margin-top: 20px">
                        <vs-button
                          :loading="queueProposalLoading"
                          block
                          @click="queueProposal(index)"
                          size="large"
                          primary
                          >Queue</vs-button
                        >
                      </el-row>
                      <el-row style="width: 100%; margin-top: 20px">
                        <vs-button
                          :loading="executeProposalLoading"
                          block
                          @click="executeProposal(index)"
                          size="large"
                          primary
                          >Execute</vs-button
                        >
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <vs-pagination
              v-model="page"
              :length="pageCount"
              style="margin-top: 20px"
            />
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="All" name="all">
        
        <div v-if="tabName == 'all'">
        <el-row v-if="governorProposals.length == 0" style="text-align: center">
          There are no proposals！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in governorProposals"
            :key="'proposals' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle">
                <el-col :xs="24" :md="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px"
                  >
                    {{ showDatas[index].title }}
                  </el-row>
                  <div
                    style="
                      width: 100%;
                      height: 1px;
                      background-color: #000000;
                      margin-top: 20px;
                    "
                  ></div>
                  <div
                    style="
                      text-align: left;
                      text-indent: 30px;
                      margin-top: 20px;
                    "
                  >
                    <div>
                      This is a governance proposal with
                      <strong> Order {{ data.order }}</strong
                      >, and the current status is implemented. The proposal
                      time is <strong> {{ showDatas[index].startBlockTime }}</strong
                      >, vote end time is <strong> {{ showDatas[index].endBlockTime }}</strong>
                      , and the address of the proposer is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="config.explorerUrl + 'address/' + data.proposer"
                        success
                        >{{ data.proposer }}</vs-button
                      >.
                      <div>
                         <vs-button
                            success
                            style="display: inline"
                            @click="viewProposalContent(data)"
                            >Click To View</vs-button
                          >
                          the content of proposal.
                      </div>
                      
                      <div>
                        <vs-button
                          success
                          style="display: inline"
                          @click="viewProposalAction(data)"
                          >Click To View</vs-button
                        >
                        the specific operation performed.
                      </div>
                      <div style="margin-bottom:20px;">
                        There are currently
                        <strong>{{ data.forVotes }} votes in favor</strong> and
                        <strong>{{ data.againstVotes }} votes against</strong>.
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <vs-pagination
            v-model="page"
            :length="pageCount"
            style="margin-top: 20px"
          />
        </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <vs-dialog
      :loading="applyDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="applyDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Apply DAO Proposal</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to apply ?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="applyDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog
      :loading="actionDialogLoading"
      width="550px"
      not-center
      v-model="actionDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Action Detail</h4>
      </template>

      <div class="con-content">
        <div v-for="(action, index) in viewedActions" :key="'action' + index">
          <el-row style="text-align: left; margin-left: 10px;margin-top:10px;font-weight:700;">
            Action{{ index }}-{{ action.function }}
          </el-row>
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> paramName </vs-th>
                <vs-th> paramValue </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for="(param, paramIndex) in action.paramNames"
                :key="'param' + paramIndex"
                style="text-align: left"
              >
                <vs-td>
                  {{ action.paramNames[paramIndex] }}
                </vs-td>
                <vs-td>
                  {{ action.paramValues[paramIndex] }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="actionDialogShow = false" dark transparent>
            Close
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      width="850px"
      not-center
      v-model="proposalContentDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Proposal Content</h4>
      </template>

      <div class="con-content">
        
        <m-editor
         style="display:none"
          v-model="dialogProposalContent"
          ref="markdownEditor"
        />
        <div
          class="m-editor-preview"
          v-html="dialogProposalHtmlMarkdown"
        ></div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="proposalContentDialogShow = false" dark transparent>
            Close
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </el-main>
</template>

<script>
import config from "@/config";
import utils from "@/utils/utils.js";
import { mapActions } from "vuex";
import { BigNumber } from "bignumber.js";

import mEditor from "simple-m-editor";
import "simple-m-editor/dist/simple-m-editor.css";
import { GovernorAlpha } from "@/contracts";
import Web3 from "web3";

export default {
  name: "me",
  components: {
    mEditor,
  },
  data() {
    return {
      dialogProposalContent:"",
      dialogProposalHtmlMarkdown:"",
      proposalContentDialogShow:false,
      cancelProposalLoading: false,
      queueProposalLoading: false,
      executeProposalLoading: false,
      agreeProposalLoading: false,
      rejectProposalLoading: false,
      showDatas: [{ htmlMarkdown: "" }],
      viewedActions: [{ params: [], paramNames: [] }],
      governorProposals: [],
      markdownContent: "",
      governorAlphaAddr: this.$route.query.governorAlphaAddr,
      judgerOrgAddr: this.$route.query.judgerOrgAddr,
      governorAlphaContract: null,
      title: "",
      description: "",
      contractFunctionMap: [],
      contractFunctions: [
        {
          name: "Set remark information",
          function: "setRemark(string)",
          paramTypes: ["string"],
          paramNames: ["Reamrk"],
        },
        {
          name: "Set contact information",
          function: "setContact(string)",
          paramTypes: ["string"],
          paramNames: ["Contact"],
        },
        {
          name: "Set url information",
          function: "setUrl(string)",
          paramTypes: ["string"],
          paramNames: ["Url"],
        },
        {
          name: "Set name information",
          function: "setName(string)",
          paramTypes: ["string"],
          paramNames: ["Name"],
        },
        {
          name: "Set judgerNum of one case",
          function: "setAssignJudgerNum(uint8)",
          paramTypes: ["uint8"],
          paramNames: ["Judger num"],
        },
        {
          name: "Set maxCaseNum of one judger",
          function: "setMaxCaseNum(uint8)",
          paramTypes: ["uint8"],
          paramNames: ["MaxCaseNum"],
        },
        {
          name: "Set rate mantissa of one case",
          function: "setRateMantissa(uint256)",
          paramTypes: ["uint256"],
          paramNames: ["RateMantissa"],
        },
        {
          name: "Set Judge",
          function: "setWhiteJudger(address,uint96)",
          paramTypes: ["address", "uint96"],
          paramNames: ["Judge address", "Is whiteList"],
        },
        {
          name: "Set Times",
          function: "setTimes(uint256,uint256)",
          paramTypes: ["uint256", "uint256"],
          paramNames: ["limitJudgePeriodTime", "exitWaitPeriodTime"],
        },
        {
          name: "set AcceptTokenMap",
          function: "setAcceptTokenMap(address,bool,uint256)",
          paramTypes: ["address","bool", "uint256"],
          paramNames: ["token address", "isAcceptable","minAmount"],
        },
        {
          name: "Transfer ERC20",
          function: "transferERC20(address,address,uint256)",
          paramTypes: ["address", "address", "uint256"],
          paramNames: ["Token address", "Destination account", "Token number"],
        },
      ],
      page: 1,
      pageCount: 0,
      curOrder: 0,
      tabName: "createProposal",
      actionArray: [{ index: 0, params: [] }],
      web3: null,
      applyDialogLoading: false,
      applyDialogShow: false,
      actionDialogLoading: false,
      actionDialogShow: false,
    };
  },
  computed: {
    config: function() {
      return config;
    },
    entranceContract: function() {
      return this.$store.state.web3.entranceContract;
    },
    showAccount: function() {
      if (this.$store.state.web3.account != null) {
        return utils.shortAddr(this.$store.state.web3.account);
      } else return "";
    },
    account: function() {
      return this.$store.state.web3.account;
    },
  },
  watch: {
    account: async function(account) {},
    page: async function(page) {
      var that = this;
      that.loadData();
    },
  },
  async created() {
    const that = this;

    let governorAlphaContract = new GovernorAlpha(that.governorAlphaAddr);
    that.governorAlphaContract = governorAlphaContract;
    that.web3 = new Web3(Web3.givenProvider);
    for (let i = 0; i < that.contractFunctions.length; i++) {
      that.contractFunctionMap[that.contractFunctions[i].function] =
        that.contractFunctions[i];
    }

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

    // that.loadData();
  },

  async mounted() {
    var that = this;
  },
  beforeDestroy() {
    var that = this;
    clearTimeout(that.intervalTimer);
    clearTimeout(that.secondTimer);
  },
  methods: {
    ...mapActions(["ethLogin"]),
    viewProposalAction(governorProposal) {
      let that = this;
      that.actionDialogLoading = true;
      that.actionDialogShow = true;
      that.viewedActions = [];
      for (let i = 0; i < governorProposal.signatures.length; i++) {
        that.viewedActions[i] = {};
        that.viewedActions[i].signature = governorProposal.signatures[i];
        that.viewedActions[i].function = governorProposal.signatures[i];

        let contractFunction =
          that.contractFunctionMap[governorProposal.signatures[i]];
        // debugger;
        if (contractFunction != null) {
          that.viewedActions[i].paramNames = contractFunction.paramNames;
          that.viewedActions[
            i
          ].paramValues = that.web3.eth.abi.decodeParameters(
            contractFunction.paramTypes,
            governorProposal.calldatas[i]
          );
        }
      }
      that.actionDialogLoading = false;
    },
    addAction() {
      let action = { index: 0, params: [] };
      this.actionArray.push(action);
    },
    async viewProposalContent(data){
      let that = this;
      that.dialogProposalContent = data.description;
      that.proposalContentDialogShow = true;
      this.$nextTick(() => {
        that.dialogProposalHtmlMarkdown = that.$refs.markdownEditor.compiledMarkdown
      })
    },
    async showApplyDialog() {
      let that = this;
      if (
        that.title == null ||
        that.title == "" ||
        that.description == null ||
        that.description == "" ||
        that.actionArray.length == 0
      ) {
        that.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: "Please input complete data",
        });
        return;
      }
      that.applyDialogShow = true;
    },
    async createProposal() {
      let that = this;

      let description = "# " + that.title + "\n" + that.description;

      let targets = [];
      let values = [];
      let signatures = [];
      let calldatas = [];

      for (let i = 0; i < that.actionArray.length; i++) {
        targets.push(that.judgerOrgAddr);
        values.push(0);
        let contractFunction =
          that.contractFunctions[that.actionArray[i].index-1];
        // for (let j=0;j < contractFunction.paramTypes.length;j++){
        //   if ()
        // }
        // signatures.push(that.web3.eth.abi.encodeFunctionSignature(contractFunction.function));
        signatures.push(contractFunction.function);
        calldatas.push(
          that.web3.eth.abi.encodeParameters(
            contractFunction.paramTypes,
            that.actionArray[i].params
          )
        );
      }

      that.applyDialogLoading = true;
      let status = await that.governorAlphaContract.propose(
        that.$store.state.web3.account,
        targets,
        values,
        signatures,
        calldatas,
        description
      );
      that.applyDialogLoading = false;
      that.applyDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Create proposal successfully",
          text: "Please vote after it has began",
        });
      } else {
        that.$vs.notification({
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
    initShowData(governorProposals) {
      var that = this;
      for (let i = 0; i < governorProposals.length; i++) {
        that.showDatas.push({});
        let titleIndex = governorProposals[i].description.indexOf("\n");
        that.showDatas[i].title = governorProposals[i].description.substring(
          1,
          titleIndex
        );
        that.showDatas[i].description = governorProposals[
          i
        ].description.substring(titleIndex);
        that.showDatas[i].startBlockTime = utils.getTimeStringByBlockTime(governorProposals[i].startBlockTime);
        that.showDatas[i].endBlockTime = utils.getTimeStringByBlockTime(governorProposals[i].endBlockTime);

      }
      // this.$nextTick(() => {
      //   for (let k = 0; k < that.$refs.markdownEditor.length; k++) {
      //     that.$set(
      //       that.showDatas[k],
      //       "htmlMarkdown",
      //       that.$refs.markdownEditor[k].compiledMarkdown
      //     );
      //   }
      // })
    },

    async loadData() {
      var that = this;
      const loading = that.$vs.loading({
            type:'square',
            text: 'Loading...'
          });
      if (that.tabName == "active") {
        // let blockNum = await web3.eth.getBlockNumber();
        let result = await that.governorAlphaContract.getActiveProposals(
          that.judgerOrgAddr,
          5,
          (that.page - 1) * 5
        );
        if (result.data.judgerOrg != null) {
          that.governorProposals = result.data.judgerOrg.governorProposals;
          await that.initShowData(that.governorProposals);
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count / 5);
        }
      } else if (that.tabName == "executable") {
        let result = await that.governorAlphaContract.getExecutableProposals(
          that.judgerOrgAddr,
          5,
          (that.page - 1) * 5
        );
        if (result.data.judgerOrg != null) {
          that.governorProposals = result.data.judgerOrg.governorProposals;
          await that.initShowData(that.governorProposals);
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count / 5);
        }
      } else if (that.tabName == "all") {
        let result = await that.governorAlphaContract.getAllProposals(
          that.judgerOrgAddr,
          5,
          (that.page - 1) * 5
        );
        if (result.data.judgerOrg != null) {
          that.governorProposals = result.data.judgerOrg.governorProposals;
          await that.initShowData(that.governorProposals);
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count / 5);
        }
      }
      loading.close();
    },
    async tabClick(tab, event) {
      let that = this;
      that.loadData();
    },
    async queueProposal(index) {
      let that = this;
      that.queueProposalLoading = true;
      let status = await that.governorAlphaContract.queue(
        that.$store.state.web3.account,
        that.governorProposals[index].order
      );
      that.queueProposalLoading = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Queue successfully",
          text: "You can execute the proposal after a delay of 1 days",
        });
      } else {
        that.$vs.notification({
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
    async cancelProposal(index) {
      let that = this;
      that.cancelProposalLoading = true;
      let status = await that.governorAlphaContract.cancel(
        that.$store.state.web3.account,
        that.governorProposals[index].order
      );
      that.cancelProposalLoading = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Cancel successfully",
          text: "this proposal has been canceled",
        });
      } else {
        that.$vs.notification({
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
    async executeProposal(index) {
      let that = this;
      that.executeProposalLoading = true;
      let status = await that.governorAlphaContract.execute(
        that.$store.state.web3.account,
        that.governorProposals[index].order
      );
      that.executeProposalLoading = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Execute successfully",
          text: "Please check to view updates",
        });
      } else {
        that.$vs.notification({
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
    async rejectProposal(index) {
      let that = this;
      that.rejectProposalLoading = true;
      let status = await that.governorAlphaContract.castVote(
        that.$store.state.web3.account,
        that.governorProposals[index].order,
        false
      );
      that.rejectProposalLoading = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Reject successfully",
          text: "Please check to view votes",
        });
      } else {
        that.$vs.notification({
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
    async agreeProposal(index) {
      let that = this;
      that.agreeProposalLoading = true;
      let status = await that.governorAlphaContract.castVote(
        that.$store.state.web3.account,
        that.governorProposals[index].order,
        true
      );
      that.agreeProposalLoading = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Agree successfully",
          text: "Please check to view votes",
        });
      } else {
        that.$vs.notification({
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
    // async agreeProposal(index) {
    //   let that = this;
    //   that.agreeProposalLoading = true;
    //   let status = await that.governorAlphaContract.castVote(
    //     that.$store.state.web3.account,
    //     that.governorProposals[index].order,
    //     true
    //   );
    //   that.agreeProposalLoading = false;
    //   if (status.succ == true) {
    //     that.$vs.notification({
    //       // width:'100%',
    //       duration: 6000,
    //       icon: "<i class='bx bx-select-multiple' ></i>",
    //       progress: "auto",
    //       color: "success",
    //       position: "top-center",
    //       title: "Proposal initiated successfully",
    //       text: "Please wait for others to sign",
    //     });
    //   } else {
    //     that.$vs.notification({
    //       // width:'100%',
    //       duration: 10000,
    //       icon: "<i class='bx bx-error' ></i>",
    //       progress: "auto",
    //       color: "danger",
    //       position: "top-center",
    //       title: that.$t("error"),
    //       text: status.message,
    //     });
    //     return;
    //   }
    // },
  },
};
</script>

<style>
/* @import "~simplemde/dist/simplemde.min.css"; */

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
.m-editor-preview {
}
</style>
