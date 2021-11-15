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
      <el-tab-pane label="Teams Info" name="teamsInfo">
        <div v-if="tabName =='teamsInfo'">
        <el-row v-if="judgerOrgs.length == 0" style="text-align: center">
          There is no team here！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in showDatas"
            :key="'judgerOrgs' + index"
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
                    Judge Team Information
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
                      margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is a judge DAO organization <span v-if="data.name">named
                      <strong>"{{data.name}}"</strong></span>, its Smart Contract address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl + 'address/' + judgerOrgs[index].id
                        "
                        success
                        >{{ judgerOrgs[index].id }}</vs-button
                      >
                      <span v-if="data.url"
                        >,the url address is {{ data.url }} </span
                      ><span v-if="data.contact"
                        >,the organization contact information is
                        {{ data.contact }}</span
                      >
                      <span v-if="data.remark">,the remarks are</span>.
                      <div>
                        If a dispute over your contract cannot be resolved and
                        the intervention of a judge organization is required,
                        the judge organization will charge a
                        {{ data.rateMantissa.toFixed(3) * 100 }}% trial fee.
                      </div>

                      <div>
                        The team set a maximum judge time of {{judgerOrgs[index].limitJudgePeriodTime}} seconds and
                         a waiting time of {{judgerOrgs[index].exitWaitPeriodTime}} seconds for withdrawal of funds
                      </div>
                      
                      <div>
                        Please choose a fair organization of judges carefully.
                        The organization of judges will determine whether your
                        contract funds can get a fair trial.
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
      
      
      <el-tab-pane label="Penging Judge Contract" name="pendingJudgeContract"
        >
        <el-row v-if="mainContracts.length == 0" style="text-align: center">
          There are no contract waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in mainContracts"
            :key="'mainContracts' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :md="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px;"
                  >
                    Contract Information
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
                      margin-top: 20px;margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is your electronic Smart Contract. The contract is
                      <strong>{{ showDatas[index].status }}</strong
                      >. The address of the <strong>Smart Contract</strong> is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                        'address/' +
                          data.mainContract.mainContractAddr
                        "
                        success
                        >{{ data.mainContract.mainContractAddr }}</vs-button
                      >, the <strong>judge organization</strong> address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.mainContract.judgerOrgAddr
                        "
                        success
                        >{{ data.mainContract.judgerOrgAddr }}</vs-button
                      >, the Smart Contract uses
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.mainContract.token
                        "
                        success
                      >
                        {{ showDatas[index].tokenName }}</vs-button
                      >
                      as the <strong>token</strong>, the
                      <strong>staked token number</strong> is
                      {{ showDatas[index].balance.toFixed(2) }}, and the address
                      of the <strong>relevant party</strong> in the contract is

                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        v-for="(personData, personIndex) in data.mainContract
                          .persons"
                        :key="personIndex"
                        :href="
                          config.explorerUrl + 'address/' + personData.person.id
                        "
                        success
                        >{{ personData.person.id }}</vs-button
                      >.
                    </div>
                    <div>
                      The Smart Contract has
                      {{ data.mainContract.contracts.length }} subsidiary
                      contracts. The <strong>titles</strong> of the
                      subsidiary contracts are
                      <vs-button
                        flat
                        style="display: inline"
                        v-for="(contractData, contractIndex) in showDatas[index].contracts"
                        @click="showContractContentDialog(contractData)"
                        :key="'contract' + contractIndex"
                        success
                        >{{ contractData.title }}</vs-button
                      >. <vs-button  success style="display: inline" @click="viewContractInfo(data.mainContract)">Click To View</vs-button> the signing of the subsidiary
                      contracts.<br />
                    </div>
                    
                    <div v-if="data.mainContract.applyExitBlockTime!=0">
                      Someone has applied exit in the time of <strong>{{showDatas[index].applyExitTime}}</strong>,anyone can exit balance after <strong>{{showDatas[index].exitWaitPeriodTime}}</strong>.
                    </div>
                    <div v-if="data.mainContract.proposals.length > 0">
                      There are {{ data.mainContract.proposals.length }} fund
                      allocation proposals put forward by the parties involved
                      in the contract. <vs-button  success style="display: inline" @click="viewProposalInfo(data.mainContract)">Click To View</vs-button> the details.<br />
                    </div>
                    <div v-if="data.mainContract.judgeProposals.length > 0">
                      There are
                      {{ data.mainContract.judgeProposals.length }} fund
                      allocation proposals put forward by referees, <vs-button  success style="display: inline"  @click="viewJudgeProposalInfo(data.mainContract)">Click To View</vs-button>
                      the details.<br />
                    </div>
                    <!-- <div >
                      You can perform many operations through the buttons under
                      this column, including
                      <strong>Add Contract</strong>,<strong
                        >Initiating Proposal</strong
                      >,<strong>Apply Judge</strong>, and
                      <strong>Exit StakeBalance</strong>.
                    </div> -->
                  </div>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="{ span: 5, offset: 1 }"
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
                        block :disabled="data.mainContract.status !=2"
                        @click="showInitiateProposalDialog(index)"
                        size="large"
                        >Initiate Proposal</vs-button
                      >
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          
          <vs-pagination v-model="page" :length="pageCount" style="margin-top:20px;"/>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Completed Judge Contract" name="completedJudgeContract"
        >
        <el-row v-if="mainContracts.length == 0" style="text-align: center">
          There are no contract waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in mainContracts"
            :key="'mainContracts' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :md="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px;"
                  >
                    Contract Information
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
                      margin-top: 20px;margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is your electronic Smart Contract. The contract is
                      <strong>{{ showDatas[index].status }}</strong
                      >. The address of the <strong>Smart Contract</strong> is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                        'address/' +
                          data.mainContract.mainContractAddr
                        "
                        success
                        >{{ data.mainContract.mainContractAddr }}</vs-button
                      >, the <strong>judge organization</strong> address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.mainContract.judgerOrgAddr
                        "
                        success
                        >{{ data.mainContract.judgerOrgAddr }}</vs-button
                      >, the Smart Contract uses
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.mainContract.token
                        "
                        success
                      >
                        {{ showDatas[index].tokenName }}</vs-button
                      >
                      as the <strong>token</strong>, the
                      <strong>staked token number</strong> is
                      {{ showDatas[index].balance.toFixed(2) }}, and the address
                      of the <strong>relevant party</strong> in the contract is

                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        v-for="(personData, personIndex) in data.mainContract
                          .persons"
                        :key="personIndex"
                        :href="
                          config.explorerUrl + 'address/' + personData.person.id
                        "
                        success
                        >{{ personData.person.id }}</vs-button
                      >.
                    </div>
                    <div>
                      The Smart Contract has
                      {{ data.mainContract.contracts.length }} subsidiary
                      contracts. The <strong>titles</strong> of the
                      subsidiary contracts are
                      <vs-button
                        flat
                        style="display: inline"
                        v-for="(contractData, contractIndex) in showDatas[index].contracts"
                        @click="showContractContentDialog(contractData)"
                        :key="'contract' + contractIndex"
                        success
                        >{{ contractData.title }}</vs-button
                      >. <vs-button  success style="display: inline" @click="viewContractInfo(data.mainContract)">Click To View</vs-button> the signing of the subsidiary
                      contracts.<br />
                    </div>
                    <div v-if="data.mainContract.applyExitBlockTime!=0">
                      Someone has applied exit in the time of <strong>{{showDatas[index].applyExitTime}}</strong>,anyone can exit balance after <strong>{{showDatas[index].exitWaitPeriodTime}}</strong>.
                    </div>
                    <div v-if="data.mainContract.proposals.length > 0">
                      There are {{ data.mainContract.proposals.length }} fund
                      allocation proposals put forward by the parties involved
                      in the contract. <vs-button  success style="display: inline" @click="viewProposalInfo(data.mainContract)">Click To View</vs-button> the details.<br />
                    </div>
                    <div v-if="data.mainContract.judgeProposals.length > 0">
                      There are
                      {{ data.mainContract.judgeProposals.length }} fund
                      allocation proposals put forward by referees, <vs-button  success style="display: inline"  @click="viewJudgeProposalInfo(data.mainContract)">Click To View</vs-button>
                      the details.<br />
                    </div>
                    <!-- <div >
                      You can perform many operations through the buttons under
                      this column, including
                      <strong>Add Contract</strong>,<strong
                        >Initiating Proposal</strong
                      >,<strong>Apply Judge</strong>, and
                      <strong>Exit StakeBalance</strong>.
                    </div> -->
                  </div>
                </el-col>
               
              </el-row>
            </el-col>
          </el-row>
          
          <vs-pagination v-model="page" :length="pageCount" style="margin-top:20px;"/>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Pending Judger Proposal" name="pendingJudgerProposal"
        >
        <div v-if="tabName =='pendingJudgerProposal'">
        <el-row v-if="judgeProposals.length == 0" style="text-align: center">
          There are no judger's proposal waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in judgeProposals"
            :key="'proposals' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :sm="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px"
                  >
                    Proposal Information
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
                      margin-top: 20px;margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is one of the proposals which are waited to sign and put forward by the parties involved in the contract. It is a proposal with <strong> Order {{data.proposal.proposalOrder}}</strong> in Smart Contract. 
                      <vs-button  success style="display: inline" @click="viewJudgeProposalInfo(data.proposal.mainContract)">Click To View</vs-button> the details of all proposals.<br />
                    </div>
                    <div>
                      The Smart Contract of this proposal is
                      <strong>{{ showDatas[index].status }}</strong
                      >. The address of the <strong>Smart Contract</strong> is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.mainContractAddr
                        "
                        success
                        >{{
                          data.proposal.mainContract.mainContractAddr
                        }}</vs-button
                      >, the <strong>judge organization</strong> address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.judgerOrgAddr
                        "
                        success
                        >{{
                          data.proposal.mainContract.judgerOrgAddr
                        }}</vs-button
                      >, the Smart Contract uses
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.token
                        "
                        success
                      >
                        {{ showDatas[index].tokenName }}</vs-button
                      >
                      as the <strong>token</strong>, the
                      <strong>staked token number</strong> is
                      {{ showDatas[index].balance.toFixed(2) }}, and the address
                      of the <strong>relevant party</strong> in the contract is

                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        v-for="(personData, personIndex) in data.proposal
                          .mainContract.persons"
                        :key="personIndex"
                        :href="
                          config.explorerUrl + 'address/' + personData.person.id
                        "
                        success
                        >{{ personData.person.id }}</vs-button
                      >.
                    </div>
                    <div>
                      The Smart Contract has
                      {{
                        data.proposal.mainContract.contracts.length
                      }}
                      subsidiary contracts. The <strong>titles</strong> of
                      the subsidiary contracts are
                      <vs-button
                        flat
                        style="display: inline"
                        v-for="(contractData, contractIndex) in showDatas[index].contracts"
                        @click="showContractContentDialog(contractData)"
                        :key="'contract' + contractIndex"
                        success
                        >{{ contractData.title }}</vs-button
                      >. <vs-button  success style="display: inline" @click="viewContractInfo(data.proposal.mainContract)">Click To View</vs-button> the signing of the subsidiary
                      contracts.<br />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="{ span: 5, offset: 1 }"
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
                      <vs-button block @click="showRejectJudgeProposalDialog(index)" size="large" danger
                        >Reject</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px;margin-bottom:20px;">
                      <vs-button block @click="showAgreeJudgeProposalDialog(index)" size="large" primary
                        >Agree</vs-button
                      >
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          
          <vs-pagination v-model="page" :length="pageCount" style="margin-top:20px;"/>
        </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="Completed Judger Proposal"
        name="completedJudgerProposal"
        >
        
        <div v-if="tabName =='completedJudgerProposal'">
        <el-row v-if="judgeProposals.length == 0" style="text-align: center">
          There are no judger's proposal waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in judgeProposals"
            :key="'proposals' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :sm="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px"
                  >
                    Proposal Information
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
                      margin-top: 20px;margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is one of the proposals which are waited to sign and put forward by the parties involved in the contract. It is a proposal with <strong> Order {{data.proposal.proposalOrder}}</strong> in Smart Contract. 
                      <vs-button  success style="display: inline" @click="viewJudgeProposalInfo(data.proposal.mainContract)">Click To View</vs-button> the details of all proposals.<br />
                    </div>
                    <div>
                      The Smart Contract of this proposal is
                      <strong>{{ showDatas[index].status }}</strong
                      >. The address of the <strong>Smart Contract</strong> is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.mainContractAddr
                        "
                        success
                        >{{
                          data.proposal.mainContract.mainContractAddr
                        }}</vs-button
                      >, the <strong>judge organization</strong> address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.judgerOrgAddr
                        "
                        success
                        >{{
                          data.proposal.mainContract.judgerOrgAddr
                        }}</vs-button
                      >, the Smart Contract uses
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.proposal.mainContract.token
                        "
                        success
                      >
                        {{ showDatas[index].tokenName }}</vs-button
                      >
                      as the <strong>token</strong>, the
                      <strong>staked token number</strong> is
                      {{ showDatas[index].balance.toFixed(2) }}, and the address
                      of the <strong>relevant party</strong> in the contract is

                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        v-for="(personData, personIndex) in data.proposal
                          .mainContract.persons"
                        :key="personIndex"
                        :href="
                          config.explorerUrl + 'address/' + personData.person.id
                        "
                        success
                        >{{ personData.person.id }}</vs-button
                      >.
                    </div>
                    <div>
                      The Smart Contract has
                      {{
                        data.proposal.mainContract.contracts.length
                      }}
                      subsidiary contracts. The <strong>titles</strong> of
                      the subsidiary contracts are
                      <vs-button
                        flat
                        style="display: inline"
                        v-for="(contractData, contractIndex) in showDatas[index].contracts"
                        @click="showContractContentDialog(contractData)"
                        :key="'contract' + contractIndex"
                        success
                        >{{ contractData.title }}</vs-button
                      >. <vs-button  success style="display: inline" @click="viewContractInfo(data.proposal.mainContract)">Click To View</vs-button> the signing of the subsidiary
                      contracts.<br />
                    </div>
                  </div>
                </el-col>
                
              </el-row>
            </el-col>
          </el-row>
          
          <vs-pagination v-model="page" :length="pageCount" style="margin-top:20px;"/>
        </el-row>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="My Team" name="myTeam"
        >
        
        <div v-if="tabName =='myTeam'">
        <el-row v-if="judgerOrgs.length == 0" style="text-align: center">
          There are no teams here！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in showDatas"
            :key="'MyTeam' + index"
          >
            <el-col
              :xs="24"
              :md="18"
              style="line-height: 40px"
              class="shadow-border"
            >
              <!--          <img src="second-home-bg.png" style="width:100%;">-->
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :sm="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px"
                  >
                    JudgeTeam Information
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
                      margin-bottom: 20px;
                    "
                  >
                    <div>
                      This is your judge DAO team<span v-if="data.name"> named
                      <strong>"{{data.name}}"</strong></span>, its Smart Contract address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl + 'address/' + judgerOrgs[index].id
                        "
                        success
                        >{{ judgerOrgs[index].id }}</vs-button
                      >
                      <span v-if="judgerOrgs[index].url"
                        >,the url address is <strong>{{ judgerOrgs[index].url }}</strong> </span
                      ><span v-if="judgerOrgs[index].contact"
                        >,the organization contact information is
                        <strong>{{ judgerOrgs[index].contact }}</strong></span
                      >
                      <span v-if="judgerOrgs[index].remark">,the remarks are {{ judgerOrgs[index].remark }}</span>
                      ,the trial fee is {{ data.rateMantissa * 100 }}%.
                    </div>
                    <div>
                      This team has <strong>{{data.totalSupply}} judgers</strong> and <strong>{{data.idleJudgerSupply}} idle judgers</strong>.
                    </div>
                    <div>
                      My current status is <strong>{{data.status}}</strong>, and there are <strong>{{data.myCaseNum}} cases</strong> to be processed<span v-if="data.myDelegate!='0x0000000000000000000000000000000000000000'">,the contact information is that my voting rights within the organization are authorized to<vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl + 'address/' + data.myDelegate
                        "
                        success
                        >{{ data.myDelegate }}</vs-button
                      ></span><span v-if="data.myContact">,My Contact Information is <strong>{{data.myContact}}</strong></span>.

                    </div>
                  </div>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="{ span: 5, offset: 1 }"
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
                      <vs-button v-if="data.status == 'idle'"
                        block
                        @click="showSetIdleStatusDialog(index,0)"
                        size="large"
                        danger
                        >Set Busy</vs-button
                      >
                      <vs-button v-else
                        block
                        @click="showSetIdleStatusDialog(index,1)"
                        size="large"
                        success
                        >Set Idle</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px">
                      <vs-button
                        block
                        @click="showContactDialog(index)"
                        size="large"
                        primary
                        >Set Contact</vs-button
                      >
                    </el-row>
                    
                    <el-row style="width: 100%; margin-top: 20px">
                      <vs-button
                        block
                        @click="showDelegateDialog(index)"
                        size="large"
                        primary
                        >Set Delegatee</vs-button
                      >
                    </el-row>
                    
                    <el-row style="width: 100%; margin-top: 20px;margin-bottom:20px;">
                      <vs-button
                        block style=""
                        :to="'/teamGovern?judgerOrgAddr='+judgerOrgs[index].id+'&governorAlphaAddr='+judgerOrgs[index].governorAlphaAddr"
                        size="large"
                        primary
                        >DAO Govern</vs-button
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
      
      <el-tab-pane label="Create Team" name="createTeam">
        <div v-if="tabName =='createTeam'">
        <el-row  style="text-align: center">
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
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
                    Create Judge Team
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
                      margin-bottom: 20px;
                    "
                  >
                    <div>
                      Please read carefully before deciding whether to create a judge team.
                      
                      <div>
                        1. Law is order, and good law is good order. Cyberworld is a new continent. 
                        I believe that this place will become the legal cornerstone of the cyberworld in the future. 
                        What our cyberworld will be depends on every judge's words and deeds. 
                      </div>
                      <div>
                        2. Every judge should treat your power carefully. 
                        When the contract case cannot be resolved, 
                        he has the right to vote on the allocation of funds between the parties involved in the contract.
                      </div>
                      <div>
                        3.Only an impartial judge team can grow rapidly with the support of users.
                      </div>
                      <div>
                        4.The postponed justice will no longer be justice. When a case occurs, a certain number of judges will be randomly selected to resolve the dispute. The judge should clarify the cause of the dispute as soon as possible within 7 days, 
                        and allocate funds based on the evidence and based on the principle of justice.
                      </div>
                      <div>
                        5.Each judge team is a dao organization. The organization will vote democratically through the DAO one person, one vote.
                         Any member of the team can initiate a vote, the voting time is 2 days, and the vote can be executed 1 day after the vote is passed.
                      </div>
                      <div>
                        6.When the founders first set up the judge team, you have absolute control, but when your team grows, you will need to win the support of more people.
Therefore, all your proposals should not include personal self-interest, but should stand from the perspective of the entire team, and reasonably allocate the various resources that determine the team.
                      </div>
                      <div>
                        7.The judge team has the right to determine the reasonable distribution of remuneration, 
                        the increase or withdrawal of judges, the number of judges allocated to the case, the maximum number of cases handled by the judge at the same time, team name, url address, remarks, and contact information.
                      </div>
                      <div>
                        8.It is recommended to communicate with users through Discord. In order to maintain compatibility in the later period, you can fill in the contact information of the judge as follows: discord: https://discord.gg/url; telegram:@groupname.
                      </div>
                    </div>
                    <el-row>
                       <vs-button
                        block
                        style="margin-left:0px;margin-top:20px;margin-bottom:20px;"
                        @click="showCreateTeamDialog"
                      >
                        Create Team
                      </vs-button>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <vs-dialog
      width="550px"
      :loading="createTeamDialogLoading"
      not-center
      prevent-close
      v-model="createTeamDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Create Judge Team</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to create?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createTeam" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="createTeamDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="agreeJudgeProposalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="agreeJudgeProposalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Agree Judger's Proposal</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to agree this judger's Proposal?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="agreeJudgeProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="agreeJudgeProposalDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="contactDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="contactDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Set Contact Info</h4>
      </template>

      <div class="con-content">
        <vs-input
          state="success"
          success
          v-model="contact"
          placeholder="Please input your contact info.discord: https://discord.gg/url; telegram:@groupname"
          block
        >
        </vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="setContactMap" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="contactDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="delegateDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="delegateDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Set delegatee of your votes</h4>
      </template>

      <div class="con-content">
        <vs-input
                state="primary"
                success
                v-model="delegatee"
                placeholder="Please input your delegatee address"
                block
              >
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>

      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="setDelegatee" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="delegateDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="rejectJudgeProposalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="rejectJudgeProposalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Reject Judger's Proposal</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to Sign rejection?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="rejectJudgeProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="rejectJudgeProposalDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="setIdleStatusDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="setIdleStatusDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Set Judge's Status</h4>
      </template>

      <div class="con-content">
        <p>Are you sure?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="setIdleStatus(curOrder,idleStatus)" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="setIdleStatusDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="contractInfoDialogLoading"
      width="550px"
      not-center
      v-model="contractInfoDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Contract Detail</h4>
      </template>

      <div class="con-content">
        <div v-for="(contractSignInfo,index) in contractSignInfos" :key="'contractSignInfo'+index">
          <el-row style="text-align:left;margin-left:10px;">
            File{{index}}-{{contractSignInfo.title}}
          </el-row>
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th>
                  Person
                </vs-th>
                <vs-th>
                  signTime
                </vs-th>
                <vs-th>
                  SignStatus
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for ="(signInfo,personIndex) in contractSignInfo.signInfos" :key="'personIndex'+personIndex"
              >
                <vs-td>
                {{signInfo.person}}
                </vs-td>
                <vs-td>
              {{signInfo.blockTime}}
                </vs-td>
                <vs-td>
              {{signInfo.signStatus}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="contractInfoDialogShow = false" dark transparent>
            Close
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    
    <vs-dialog
      :loading="judgeProposalInfoDialogLoading"
      width="550px"
      not-center
      v-model="judgeProposalInfoDialogShow"
    >
      <template #header>
        <h4 class="not-margin">JudgeProposal Detail</h4>
      </template>

      <div class="con-content">
        <div v-for="(proposalSignInfo,index) in proposalSignInfos" :key="'proposalSignInfo'+index">
          <el-row style="text-align:left;margin-left:10px;">
            Proposal{{index}}
          </el-row>
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th>
                  Person
                </vs-th>
                <vs-th>
                  balance
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for ="(assignPlan,assignIndex) in proposalSignInfo.assignPlans" :key="'personIndex'+assignIndex" style="text-align:left;"
              >
                <vs-td>
                {{assignPlan.assignAddr}}
                </vs-td>
                <vs-td>
              {{assignPlan.balance}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th>
                  Person
                </vs-th>
                <vs-th>
                  signTime
                </vs-th>
                <vs-th>
                  SignStatus
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for ="(signInfo,personIndex) in proposalSignInfo.signInfos" :key="'personIndex'+personIndex" style="text-align:left;"
              >
                <vs-td>
                {{signInfo.person}}
                </vs-td>
                <vs-td>
              {{signInfo.blockTime}}
                </vs-td>
                <vs-td>
              {{signInfo.signStatus}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="contractInfoDialogShow = false" dark transparent>
            Close
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="proposalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="proposalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">
          Please enter the contract fund allocation plan
        </h4>
      </template>

      <div class="con-content">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :sm="18" style="margin-top: 0px; text-align: right">
            <vs-button @click="addAddr" block success> Add Person </vs-button>
          </el-col>
        </el-row>
        <div
          v-for="(personAddr, index) in personAddrArray"
          :key="'personAddr' + index"
        >
          <el-row type="flex" justify="center" style="">
            <el-col :xs="22" :sm="18" style="line-height: 30px">
              <vs-input
                state="primary"
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

          <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="18" style="line-height: 30px">
              <vs-input
                state="primary"
                success  icon-after
                v-model="balanceArray[index]"
                placeholder="Please input allocated token number"
                block
              >
                <template #icon>
                  <div
                    @click="maxProposalMoney(index)"
                    style="cursor: pointer; font-size: 12px"
                  >
                    {{ $t("max") }}
                  </div>
                </template>
              </vs-input>
            </el-col>
          </el-row>
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="confirmInitiateProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="proposalDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
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
import {MainContract,JudgerOrg} from "@/contracts";


export default {
  name: "me",
  components: {},
  data() {
    return {
      delegatee:"",
      idleStatus:false,
      personAddrArray: [""],
      balanceArray: [""],
      contracts:[],
      contractSignInfos:[],
      proposalSignInfos:[],
      mainContracts:[],
      judgerOrgs: [],
      judgeProposals:[],
      page: 1,
      pageCount: 0,
      showDatas: [],
      contact:'',
      tabName: "teamsInfo",
      idleButtonLoading:false,
      createTeamDialogShow:false,
      createTeamDialogLoading:false,
      rejectJudgeProposalDialogLoading: false,
      rejectJudgeProposalDialogShow: false,
      agreeJudgeProposalDialogLoading: false,
      agreeJudgeProposalDialogShow: false,
      contactDialogShow:false,
      contactDialogLoading:false,
      contactContentDialogShow:false,
      judgeProposalInfoDialogShow: false,
      judgeProposalInfoDialogLoading: false,
      contractInfoDialogShow: false,
      contractInfoDialogLoading: false,
      proposalDialogLoading: false,
      proposalDialogShow: false,
      setIdleStatusDialogLoading: false,
      setIdleStatusDialogShow: false,
      delegateDialogLoading: false,
      delegateDialogShow:false,
      tokenMap:[],

    };
  },
  computed: {
    config: function () {
      return config;
    },
    entranceContract: function () {
      return this.$store.state.web3.entranceContract;
    },
    showAccount: function () {
      if (this.$store.state.web3.account != null) {
        return utils.shortAddr(this.$store.state.web3.account);
      } else return "";
    },
    account: function () {
      return this.$store.state.web3.account;
    },
  },
  watch: {
    account: async function (account) {},
    page: async function (page) {
      var that = this;
      that.loadData();
    },
  },
  async created() {
    const that = this;

    for (let k=0;k<config.tokens.length;k++){
      that.tokenMap[config.tokens[k].address.toLowerCase()] =k;
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
    that.loadData();
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
    async setContactMap() {
      let that = this;

      that.contactDialogLoading = true;
      let judgerOrgContract = new JudgerOrg(that.judgerOrgs[that.curOrder].id);

      let status = await judgerOrgContract.setContactMap(
        that.$store.state.web3.account,
        that.contact
      );
      that.contactDialogLoading = false;
      that.contactDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Success",
          text: "Set contact successfully",
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
    async setDelegatee() {
      let that = this;

      that.delegateDialogLoading = true;
      let judgerOrgContract = new JudgerOrg(that.judgerOrgs[that.curOrder].id);

      let status = await judgerOrgContract.delegate(
        that.$store.state.web3.account,
        that.delegatee
      );
      that.delegateDialogLoading = false;
      that.delegateDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Success",
          text: "Set delegatee successfully",
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
    addAddr() {
      this.personAddrArray.push("");
      this.balanceArray.push("");
    },
    async maxProposalMoney(index) {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let token = data.mainContract.token;
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }
      let totalStake = BigNumber(data.mainContract.totalStake).div( BigNumber(10).pow(BigNumber(decimals)));
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let judgerOrgContract = new JudgerOrg(judgerOrgAddr);
      let rate = await judgerOrgContract.rateMantissa();
      totalStake = totalStake.minus(rate.multipliedBy(totalStake))
      let sum = BigNumber(0);
      for (let i =0;i<that.balanceArray.length;i++){
        if (i != index){
          if(that.balanceArray[i] != ""){
            let balanceBigNumber = BigNumber(that.balanceArray[i]);
            sum = sum.plus(balanceBigNumber);
          }
        }
      }
      let remainBalance = totalStake.minus(sum);
      if (remainBalance.comparedTo(0)<0){
        this.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: "Exceeds the maximum balance",
        });
        return ;
      }
      that.balanceArray.splice(index,1,remainBalance.toFixed());
    },
    async showInitiateProposalDialog(index) {
      this.proposalDialogShow = true;
      this.curOrder = index;
    },
    async confirmInitiateProposal() {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let mainContractOrder = data.mainContract.mainContractOrder;

      that.proposalDialogLoading = true;
      let token = data.mainContract.token;
      
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }

      let status = await that.entranceContract.launchJudgerProposal(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        that.personAddrArray,
        that.balanceArray,
        decimals
      );
      that.proposalDialogLoading = false;
      that.proposalDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Proposal initiated successfully",
          text: "Please wait for others to sign",
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
    showSetIdleStatusDialog(index,idleStatus){
      let that = this;
      that.setIdleStatusDialogShow = true;
      this.curOrder = index;
      this.idleStatus = idleStatus;
    },
    async setIdleStatus(index,idleStatus) {
      let that = this;
      that.setIdleStatusDialogLoading = true;
      let judgerOrgContract = new JudgerOrg(that.judgerOrgs[index].id);
      let status = await judgerOrgContract.setIdleStatus(
        that.$store.state.web3.account,
        idleStatus
      );
      that.setIdleStatusDialogLoading = false;
      that.setIdleStatusDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "success",
          text: "Set IdleStatus ",
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
    showContactDialog(index){
      this.contactDialogShow = true;
      this.curOrder = index;
    },
    showDelegateDialog(index){
      this.delegateDialogShow = true;
      this.curOrder = index;
    },
    async rejectJudgeProposal(){
      let that = this;
      let judgerOrgAddr = that.judgeProposals[that.curOrder].proposal.mainContract.judgerOrgAddr;
      let mainContractOrder = that.judgeProposals[that.curOrder].proposal.mainContract.mainContractOrder;
      let proposalOrder = that.judgeProposals[that.curOrder].proposal.proposalOrder;
      that.rejectJudgeProposalDialogLoading = true;

      let status = await that.entranceContract.signJudgerProposal(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        proposalOrder,
        -1
      );
      that.rejectJudgeProposalDialogLoading = false;
      that.rejectJudgeProposalDialogShow = false;
      if (status.succ == true) {
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
    async agreeJudgeProposal(){
      let that = this;
      let judgerOrgAddr = that.judgeProposals[that.curOrder].proposal.mainContract.judgerOrgAddr;
      let mainContractOrder = that.judgeProposals[that.curOrder].proposal.mainContract.mainContractOrder;
      let proposalOrder = that.judgeProposals[that.curOrder].proposal.proposalOrder;
      that.agreeJudgeProposalDialogLoading = true;

      let status = await that.entranceContract.signJudgerProposal(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        proposalOrder,
        1
      );
      that.agreeJudgeProposalDialogLoading = false;
      that.agreeJudgeProposalDialogShow = false;
      if (status.succ == true) {
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
    async viewContractInfo(mainContract){
        // let mainContract = mainContracts[i].mainContract;
        var that = this;
        that.contractInfoDialogShow = true;
        that.contractInfoDialogLoading = true;
        let mainContractContract = new MainContract(
            mainContract.mainContractAddr
        );
        that.contractSignInfos = [];

        for(let j=0;j<mainContract.contracts.length;j++){
          that.contractSignInfos[j] = {}
          that.contractSignInfos[j].contentOrIpfsHash = mainContract.contracts[j].contentOrIpfsHash;
          that.contractSignInfos[j].signInfos = []

          for (let k=0;k<mainContract.persons.length;k++){
            let data = await mainContractContract.getContractSignInfo(j,mainContract.persons[k].person.id);
            let signInfo = {}
            signInfo.person = mainContract.persons[k].person.id;
            signInfo.signStatus = data[1];
            if (data[0] == 0){
              signInfo.blockTime = "";  
            }else{
              signInfo.blockTime = utils.getTimeStringByBlockTime(data[0]);
            }
            
            that.contractSignInfos[j].signInfos.push(signInfo)
          }
        }
        that.contractInfoDialogLoading = false;
    },
    async viewJudgeProposalInfo(mainContract){
        var that = this;
        that.judgeProposalInfoDialogShow = true;
        that.judgeProposalInfoDialogLoading = true;
        let mainContractContract = new MainContract(
            mainContract.mainContractAddr
        );
        that.proposalSignInfos = [];

        for(let j=0;j<mainContract.judgeProposals.length;j++){
          that.proposalSignInfos[j] = {}
          that.proposalSignInfos[j].proposal = {};
          let result = await mainContractContract.judgerProposalMap(j);
          that.proposalSignInfos[j].assignAddrMapNum = result[0];
          that.proposalSignInfos[j].agreeNum = result[1];
          that.proposalSignInfos[j].rejectNum = result[2];
          that.proposalSignInfos[j].proposer = result[3];
          that.proposalSignInfos[j].signInfos = [];
          for (let k=0;k<mainContract.judgers.length;k++){
            let data = await mainContractContract.getProposalSignInfo(1, j, mainContract.judgers[k].judger.id);
            let signInfo = {}
            signInfo.person = mainContract.judgers[k].judger.id;
            signInfo.signStatus = data[1];
            if (data[0] == 0){
              signInfo.blockTime = "";  
            }else{
              signInfo.blockTime = utils.getTimeStringByBlockTime(data[0]);
            }
            
            that.proposalSignInfos[j].signInfos.push(signInfo)
          }
          that.proposalSignInfos[j].assignPlans = []

          for (let k=0;k<that.proposalSignInfos[j].assignAddrMapNum;k++){
            let assignAddr = await mainContractContract.getProposalAssignAddr(1,j,k);
            let balance = await mainContractContract.getProposalAssignBalance(1,j,assignAddr)
            let signInfo = {}
            signInfo.assignAddr = assignAddr;
            signInfo.balance = balance;
            
            that.proposalSignInfos[j].assignPlans.push(signInfo)
          }
        }
        that.judgeProposalInfoDialogLoading = false;
    },
    async showAgreeJudgeProposalDialog(index) {
      this.agreeJudgeProposalDialogShow = true;
      this.curOrder = index;
    },
    async showRejectJudgeProposalDialog(index) {
      this.rejectJudgeProposalDialogShow = true;
      this.curOrder = index;
    },
    initShowData(mainContracts) {
      var that = this;
      that.showDatas = [];
      that.judgerOrgs = [];
      for (let i = 0; i < mainContracts.length; i++) {
        that.showDatas.push({});
        if (mainContracts[i].mainContract.status == 0) {
          that.showDatas[i].status = "waiting to be signed";
        } else if (mainContracts[i].mainContract.status == 1) {
          that.showDatas[i].status = "in contract execution phase";
        } else if (mainContracts[i].mainContract.status == 2) {
          that.showDatas[i].status = "waiting for the judge to handle the case";
        } else if (mainContracts[i].mainContract.status == 3) {
          that.showDatas[i].status = "in exit phase";
        } else if (mainContracts[i].mainContract.status == 4) {
          that.showDatas[i].status = "in finished phase";
        }
        that.showDatas[i].tokenName = mainContracts[i].mainContract.token;
        
        let token = mainContracts[i].mainContract.token;
        
        let decimals;

        if (that.tokenMap[token.toLowerCase()]==null){
          decimals= 18
        }else{
          decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
        }
        that.showDatas[i].balance = BigNumber(
          mainContracts[i].mainContract.totalStake
        ).div(BigNumber(10).pow(BigNumber(decimals)));
        that.showDatas[i].contracts = [];

        that.showDatas[i].applyExitTime = utils.getTimeStringByBlockTime(mainContracts[i].mainContract.applyExitBlockTime);
        that.showDatas[i].exitWaitPeriodTime = utils.getTimeStringByBlockTime(parseInt(mainContracts[i].mainContract.applyExitBlockTime)+parseInt(mainContracts[i].mainContract.exitWaitPeriodTime));

        for (let j = 0; j < mainContracts[i].mainContract.contracts.length; j++) {

          that.showDatas[i].contracts.push({});
          let titleIndex =  mainContracts[i].mainContract.contracts[j].contentOrIpfsHash.indexOf("\n");
          that.showDatas[i].contracts[j].contentOrIpfsHash =  mainContracts[i].mainContract.contracts[j].contentOrIpfsHash;
          that.showDatas[i].contracts[j].title = mainContracts[i].mainContract.contracts[j].contentOrIpfsHash.substring(
            1,
            titleIndex
          );
          that.showDatas[i].contracts[j].description = mainContracts[i].mainContract.contracts[j].contentOrIpfsHash.substring(titleIndex);
        }
        for (let j = 0; j < config.tokens.length; j++) {
          if (
            mainContracts[i].mainContract.token == config.tokens[j].address
          ) {
            that.showDatas[i].tokenName = config.tokens[j].name;
          }
        }
      }
    },
    async initJudgerOrgShowData(judgerOrgs,idleStatus) {
      var that = this;
      that.showDatas = [];
      that.mainContracts = [];
      for (let i = 0; i < judgerOrgs.length; i++) {
        let showData = {};

        let judgerOrgContract = new JudgerOrg(judgerOrgs[i].id);
        // showData.url = await judgerOrgContract.url();
        // showData.contact = await judgerOrgContract.contact();
        showData.url = judgerOrgs[i].url;
        showData.contact = judgerOrgs[i].contact;
        showData.name = judgerOrgs[i].name;
        showData.rateMantissa = BigNumber(judgerOrgs[i].rateMantissa).div( BigNumber(10).pow(BigNumber(18)));
        // showData.name = await judgerOrgContract.name();
        if(that.tabName == "myTeam"){
          showData.myContact = await judgerOrgContract.contactMap(that.$store.state.web3.account);
          showData.myCaseNum = await judgerOrgContract.caseNum(that.$store.state.web3.account);
          showData.myDelegate = await judgerOrgContract.delegates(that.$store.state.web3.account);
          let isIdle =  idleStatus[i];
          if (isIdle == true){
            showData.status = "idle"
          }else {
            showData.status = "busy"
          }
        }
        showData.idleJudgerSupply = await judgerOrgContract.idleJudgerSupply();
        showData.totalSupply = await judgerOrgContract.totalSupply();
        that.showDatas.push(showData);
      }
    },

    async createTeam(){
    
      let that = this;
      that.createTeamDialogLoading = true;

      let status = await that.entranceContract.createKindle(that.$store.state.web3.account);
      that.createTeamDialogLoading = false;
      that.createTeamDialogShow = false;
      if (status.succ == true) {
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
    async loadData() {
      var that = this;
      // that.mainContracts = [];
      that.proposals = [];
      that.judgeProposals = [];
      that.pageCount = 0;
      that.page = 1;
      that.judgerOrgs = [];
      const loading = that.$vs.loading({
            type:'square',
            text: 'Loading...'
          });
      if (that.tabName == "teamsInfo") {
        let result = await that.entranceContract.getJudgerOrgs(
          5,
          (that.page - 1) * 5
        );
        if(result.data.judgerOrgs !=null){
          let judgerOrgs = result.data.judgerOrgs;
          await that.initJudgerOrgShowData(judgerOrgs,null);
          that.judgerOrgs  = judgerOrgs
          let count = result.data.countQuery.length;
          that.pageCount = Math.ceil(count / 5);
        }
      } else if (that.tabName == "myTeam") {
        let result = await that.entranceContract.getTeamsByJudger(
          that.$store.state.web3.account,
          1,
          5,
          (that.page - 1) * 5
        );
        var judgerOrgs = [];
        var idleStatus = [];
        if(result.data.judger !=null){
          for(let i=0;i<result.data.judger.judgerOrgs.length;i++){
            judgerOrgs.push(result.data.judger.judgerOrgs[i].judgerOrg);
          }
          for(let i=0;i<result.data.judger.judgerOrgs.length;i++){
            idleStatus.push(result.data.judger.judgerOrgs[i].idleStatus);
          }
          await that.initJudgerOrgShowData(judgerOrgs,idleStatus);
          that.judgerOrgs = judgerOrgs;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count / 5);
        }
      } else if (that.tabName == "pendingJudgerProposal") {
        let result = await that.entranceContract.getProposalsByJudger(
          that.$store.state.web3.account,
          [0],
          5,
          (that.page-1)*5
        );
        if(result.data.judger !=null){
          let judgeProposals = result.data.judger.proposals;
          var mainContracts = [];
          for (let i=0;i<judgeProposals.length;i++){
            mainContracts.push(judgeProposals[i].proposal);
          }
          await that.initShowData(mainContracts);
          that.mainContracts = mainContracts;
          that.judgeProposals = judgeProposals;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      } else if (that.tabName == "completedJudgerProposal") {
        let result = await that.entranceContract.getProposalsByJudger(
          that.$store.state.web3.account,
          [-1,1],
          5,
          (that.page-1)*5
        );
        if(result.data.judger !=null){
          let judgeProposals = result.data.judger.proposals;
          var mainContracts = [];
          for (let i=0;i<judgeProposals.length;i++){
            mainContracts.push(judgeProposals[i].proposal);
          }
          await that.initShowData(mainContracts);
          that.mainContracts = mainContracts;
          that.judgeProposals = judgeProposals;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }else if (that.tabName == "pendingJudgeContract") {
        let result = await that.entranceContract.getMainContractsByJudger(
          that.$store.state.web3.account,
          0,
          5,
          (that.page-1)*5
        );
        if(result.data.judger !=null){
          let mainContracts = result.data.judger.mainContracts;

          that.initShowData(mainContracts)
          that.mainContracts = mainContracts
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }else if (that.tabName == "completedJudgeContract") {
        let result = await that.entranceContract.getMainContractsByJudger(
          that.$store.state.web3.account,
          1,
          5,
          (that.page-1)*5
        );
        if(result.data.judger !=null){
          let mainContracts = result.data.judger.mainContracts;

          that.initShowData(mainContracts)
          that.mainContracts = mainContracts
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }
      loading.close();
    },
    async showCreateTeamDialog(){
      this.createTeamDialogShow = true;
    },
    async tabClick(tab, event) {
      this.loadData();
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
