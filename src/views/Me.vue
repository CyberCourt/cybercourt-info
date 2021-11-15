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
      <el-tab-pane label="Project Operation" name="contractOperation">
        <div v-if ="tabName =='contractOperation'">
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
                   Project Information
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
                    <div >
                      You can perform many operations through the buttons under
                      this column, including
                      <strong>Add Contract</strong>,<strong
                        >Initiating Proposal</strong
                      >,<strong>Apply Judge</strong>, and
                      <strong>Exit StakeBalance</strong>.
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
                    <el-row style="width: 100%"  >
                      <vs-button
                        block :disabled="data.mainContract.status !=1"
                        @click="showAddContractDialog(index)"
                        size="large"
                        >Add Contract</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px">
                      <vs-button 
                        block :disabled="data.mainContract.status !=1"
                        @click="showInitiateProposalDialog(index)"
                        size="large"
                        >Initiate Proposal</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px" >
                      <vs-button
                        block :disabled="data.mainContract.status !=1 && data.mainContract.status !=2"
                        @click="showApplyJudgeDialog(index)"
                        size="large"
                        danger
                        >Apply Judge</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px">
                      <vs-button
                        block  :disabled="data.mainContract.status !=1 && data.mainContract.status !=2"
                        @click="showApplyExitDialog(index)"
                        size="large"
                        danger
                        >Apply Exit</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px;margin-bottom:20px;" >
                      <vs-button
                        block :disabled="data.mainContract.status !=0 && data.mainContract.status !=1 && data.mainContract.status !=2 &&data.mainContract.status !=3"
                        @click="showExitStakeBalDialog(index)"
                        size="large"
                        danger
                        >Exit StakeBalance</vs-button
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
      <el-tab-pane label="Pending Sign Contract" name="signContract"
        >
        <div v-if ="tabName =='signContract'">
          <el-row v-if="contracts.length == 0" style="text-align: center">
            There are no contract waiting to be signed！
          </el-row>
          <el-row v-else>
            <el-row
              type="flex"
              justify="center"
              align="center"
              style="margin-top: 50px"
              v-for="(data, index) in contracts"
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
                      style="font-size: 26px; margin-top: 20px"
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
                        This is one of your contracts to be signed. The title
                        of the contract is
                        <vs-button flat style="display: inline" @click="showContractContentDialog(showDatas[index].contracts[data.contract.contractOrder])" success>{{
                          showDatas[index].contracts[data.contract.contractOrder].title
                        }}</vs-button>. It is contract with <strong> Order {{data.contract.contractOrder+1}}</strong> in Smart Contract. 
                      </div>
                      <div>
                        The Smart Contract of this contract is
                        <strong>{{ showDatas[index].status }}</strong
                        >. The address of the <strong>Smart Contract</strong> is
                        <vs-button
                          flat
                          style="display: inline"
                          blank
                          :href="
                            config.explorerUrl +
                            'address/' +
                            data.contract.mainContract.mainContractAddr
                          "
                          success
                          >{{
                            data.contract.mainContract.mainContractAddr
                          }}</vs-button
                        >, the <strong>judge organization</strong> address is
                        <vs-button
                          flat
                          style="display: inline"
                          blank
                          :href="
                            config.explorerUrl +
                            'address/' +
                            data.contract.mainContract.judgerOrgAddr
                          "
                          success
                          >{{
                            data.contract.mainContract.judgerOrgAddr
                          }}</vs-button
                        >, the Smart Contract uses
                        <vs-button
                          flat
                          style="display: inline"
                          blank
                          :href="
                            config.explorerUrl +
                            'address/' +
                            data.contract.mainContract.token
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
                          v-for="(personData, personIndex) in data.contract
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
                          data.contract.mainContract.contracts.length
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
                        >. <vs-button  success style="display: inline" @click="viewContractInfo(data.contract.mainContract)">Click To View</vs-button> the signing of the subsidiary
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
                        <vs-button block @click="showRejectDialog(index)" size="large" danger
                          >Reject</vs-button
                        >
                      </el-row>
                      <el-row style="width: 100%; margin-top: 20px;margin-bottom:20px;">
                        <vs-button block @click="showAgreeDialog(index)" size="large" primary
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
      
      <el-tab-pane label="Pending Proposal" name="pendingProposal"
        >
        <div v-if ="tabName =='pendingProposal'">
        <el-row v-if="proposals.length == 0" style="text-align: center">
          There are no proposal waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in proposals"
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
                <el-col :xs="24" :md="17">
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
                      <vs-button  success style="display: inline" @click="viewProposalInfo(data.proposal.mainContract)">Click To View</vs-button> the details.<br />
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
                      <vs-button block @click="showRejectProposalDialog(index)" size="large" danger
                        >Reject</vs-button
                      >
                    </el-row>
                    <el-row style="width: 100%; margin-top: 20px;margin-bottom:20px;">
                      <vs-button block @click="showAgreeProposalDialog(index)" size="large" primary
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
      <!-- <el-tab-pane label="Completed MainContract" name="completedMainContract">
        <div v-if ="tabName =='completedMainContract'">
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
              <el-row type="flex" justify="center" align="middle" style="flex-wrap:wrap;">
                <el-col :xs="24" :md="17">
                  <el-row
                    type="flex"
                    justify="center"
                    style="font-size: 26px; margin-top: 20px;"
                  >
                    Main Contract Information
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
                  </div>
                </el-col>
                
              </el-row>
            </el-col>
          </el-row>
          
          <vs-pagination v-model="page" :length="pageCount" style="margin-top:20px;"/>
        </el-row>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="Completed Contract" name="completedContract"
        >
        <div v-if ="tabName =='completedContract'">
        <el-row v-if="contracts.length == 0" style="text-align: center">
          There are no contract waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in contracts"
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
                    style="font-size: 26px; margin-top: 20px"
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
                      This is one of your contracts to be signed. The title
                       of the contract is
                      <vs-button flat style="display: inline"  success @click="showContractContentDialog(showDatas[index].contracts[data.contract.contractOrder])" >{{
                        showDatas[index].contracts[data.contract.contractOrder].title
                      }}</vs-button
                      >. It is contract with <strong> Order {{data.contract.contractOrder+1}}</strong> in Smart Contract. 
                    </div>
                    <div>
                      The Smart Contract of this contract is
                      <strong>{{ showDatas[index].status }}</strong
                      >. The address of the <strong>Smart Contract</strong> is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.contract.mainContract.mainContractAddr
                        "
                        success
                        >{{
                          data.contract.mainContract.mainContractAddr
                        }}</vs-button
                      >, the <strong>judge organization</strong> address is
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.contract.mainContract.judgerOrgAddr
                        "
                        success
                        >{{
                          data.contract.mainContract.judgerOrgAddr
                        }}</vs-button
                      >, the Smart Contract uses
                      <vs-button
                        flat
                        style="display: inline"
                        blank
                        :href="
                          config.explorerUrl +
                          'address/' +
                          data.contract.mainContract.token
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
                        v-for="(personData, personIndex) in data.contract
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
                        data.contract.mainContract.contracts.length
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
                      >. <vs-button  success style="display: inline" @click="viewContractInfo(data.contract.mainContract)">Click To View</vs-button> the signing of the subsidiary
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
      
      <el-tab-pane label="Completed Proposal" name="completedProposal"
        >
        <div v-if ="tabName =='completedProposal'">
        <el-row v-if="proposals.length == 0" style="text-align: center">
          There are no proposal waiting to be signed！
        </el-row>
        <el-row v-else>
          <el-row
            type="flex"
            justify="center"
            align="center"
            style="margin-top: 50px"
            v-for="(data, index) in proposals"
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
                <el-col :xs="24" :md="17">
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
                      <vs-button  success style="display: inline" @click="viewProposalInfo(data.proposal.mainContract)">Click To View</vs-button> the details.<br />
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
        </el-tab-pane
      >
    </el-tabs>

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

    <vs-dialog
      :loading="addContractDialogLoading"
      width="850px"
      not-center
      prevent-close
      v-model="addContractDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Please add the contract</h4>
      </template>

      <div class="con-content">
        
        <!-- <el-row type="flex" justify="center" style="margin-bottom: 20px;">
          <el-col :xs="24" :sm="18" style="line-height:30px;">
          </el-col>
        </el-row> -->
        <vs-input
              state="success"
              primary
              v-model="title"
              placeholder="Please input title"
              block
            >
              <template #icon>
                <i class="bx bxs-file"></i>
              </template>
            </vs-input>
          <m-editor v-model="description" placeholder="Please input content of this contract"/>
        <vs-input
          state="primary"
          success icon-after
          v-model="stakeBalance"
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
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="approve" transparent>
            Approve
          </vs-button>
          <vs-button @click="addContract" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="addContractDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog
      :loading="applyJudgeDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="applyJudgeDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Apply Judge</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to apply Judge?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="applyJudge" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="applyJudgeDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="rejectDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="rejectDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Reject</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to Sign rejection</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="reject" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="rejectDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="rejectProposalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="rejectProposalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Reject Proposal</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to Sign rejection</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="rejectProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="rejectProposalDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    
    <vs-dialog
      :loading="agreeDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="agreeDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Agree</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to agree this contract?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="agree" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="agreeDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      :loading="agreeProposalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="agreeProposalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Agree</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to agree this proposal?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="agreeProposal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="agreeProposalDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    
    <vs-dialog
      :loading="exitStakeBalDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="exitStakeBalDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Exit Stake Balance</h4>
      </template>

      <div class="con-content">
        <vs-input
          state="success"
          success  icon-after
          v-model="exitBal"
          placeholder="Please input allocated token number"
          block
        >
          <template #icon>
            <div 
              @click="maxExitStakeMoney()"
              style="cursor: pointer; font-size: 12px"
            >
              {{ $t("max") }}
            </div>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="exitStakeBal" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="exitStakeBalDialogShow = false" dark transparent>
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
          <el-row style="text-align:left;margin-left:10px;margin-top:10px;font-weight:700;">
            Contract{{index}}-{{contractSignInfo.title}}
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
          <el-row style="text-align:left;margin-left:10px;margin-top:10px;font-weight:700;">
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
      :loading="proposalInfoDialogLoading"
      width="550px"
      not-center
      v-model="proposalInfoDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Proposal Detail</h4>
      </template>

      <div class="con-content">
        <div v-for="(proposalSignInfo,index) in proposalSignInfos" :key="'proposalSignInfo'+index">
          <el-row style="text-align:left;margin-left:10px;margin-top:10px;font-weight:700;">
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
      :loading="applyExitDialogLoading"
      width="550px"
      not-center
      prevent-close
      v-model="applyExitDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Apply Exit</h4>
      </template>

      <div class="con-content">
        <p>Are you sure to apply exit?</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="applyExit" transparent>
            {{ $t("noticeConfirm") }}
          </vs-button>
          <vs-button @click="applyExitDialogShow = false" dark transparent>
            {{ $t("noticeCancel") }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      width="850px"
      not-center
      v-model="contactContentDialogShow"
    >
      <template #header>
        <h4 class="not-margin">Contract Content</h4>
      </template>

      <div class="con-content">
        
        <m-editor
         style="display:none"
          v-model="dialogContractContent.contentOrIpfsHash"
          ref="markdownEditor"
        />
        <div
          class="m-editor-preview"
          v-html="dialogContractHtmlMarkdown"
        ></div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="contactContentDialogShow = false" dark transparent>
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
import {MainContract,JudgerOrg,Erc20} from "@/contracts";

export default {
  name: "me",
  components: {
    mEditor,
  },
  data() {
    return {
      title:"",
      description:"",
      page:1,
      pageCount:0,
      judgerOrgs: [],
      judgerOrgShowDatas:[],
      proposalSignInfos:[],
      contractSignInfos:[],
      showDatas: [],
      exitBal: "",
      stakeBalance: "",
      contentOrIpfsHash: "",
      curOrder: 0,
      personAddrArray: [""],
      balanceArray: [""],
      proposals:[],
      contracts: [],
      judgeProposals:[],
      tabName: "contractOperation",
      dialogContractContent:{description:"",contentOrIpfsHash:""},
      dialogContractHtmlMarkdown:"",
      mainContracts: [],
      proposalDialogLoading: false,
      proposalDialogShow: false,
      addContractDialogLoading: false,
      addContractDialogShow: false,
      applyExitDialogLoading: false,
      applyExitDialogShow: false,
      exitStakeBalDialogLoading: false,
      exitStakeBalDialogShow: false,
      agreeDialogLoading: false,
      agreeDialogShow: false,
      agreeProposalDialogLoading: false,
      agreeProposalDialogShow: false,
      rejectDialogLoading: false,
      rejectDialogShow: false,
      contractInfoDialogShow: false,
      contractInfoDialogLoading: false,
      proposalInfoDialogShow: false,
      proposalInfoDialogLoading: false,
      judgeProposalInfoDialogShow: false,
      judgeProposalInfoDialogLoading: false,
      applyJudgeDialogLoading: false,
      applyJudgeDialogShow: false,
      rejectProposalDialogLoading: false,
      rejectProposalDialogShow: false,
      contactDialogShow:false,
      contactDialogLoading:false,
      contactContentDialogShow:false,
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
    page: async function(page){
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
        if (that.tokenMap[that.showDatas[i].tokenName.toLowerCase()]!=null)
          that.showDatas[i].tokenName = config.tokens[that.tokenMap[that.showDatas[i].tokenName.toLowerCase()]].name;
        
        
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
    async initJudgerOrgShowData(judgerOrgs) {
      var that = this;
      that.showDatas = [];
      that.mainContracts = [];
      for (let i = 0; i < judgerOrgs.length; i++) {
        let showData = {};

        let judgerOrgContract = new JudgerOrg(judgerOrgs[i].judgerOrg.id);
        // showData.url = await judgerOrgContract.url();
        // showData.contact = await judgerOrgContract.contact();
        showData.rateMantissa = BigNumber(judgerOrgs[i].judgerOrg.rateMantissa).div( BigNumber(10).pow(BigNumber(18)));
        // showData.name = await judgerOrgContract.name();
        showData.myContact = await judgerOrgContract.contactMap(that.$store.state.web3.account);
        showData.myCaseNum = await judgerOrgContract.caseNum(that.$store.state.web3.account);
        showData.myDelegate = await judgerOrgContract.delegates(that.$store.state.web3.account);
        let isIdle =  judgerOrgs[i].idleStatus;
        if (isIdle == 1){
          showData.status = "idle"
        }else {
          showData.status = "busy"
        }
        showData.idleJudgerSupply = await judgerOrgContract.idleJudgerSupply();
        showData.totalSupply = await judgerOrgContract.totalSupply();
        that.showDatas.push(showData);
      }
    },
    addAddr() {
      this.personAddrArray.push("");
      this.balanceArray.push("");
    },
    async loadData(){
      var that = this;
      that.mainContracts = [];
      that.contracts = [];
      that.proposals = [];
      that.judgeProposals = [];
      that.pageCount = 0;
      
      const loading = that.$vs.loading({
            type:'square',
            text: 'Loading...'
          });
      if (that.tabName == "signContract") {
        let result = await that.entranceContract.getContractsByPerson(
          that.$store.state.web3.account,
          0,
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let contracts = result.data.person.contracts;
          var mainContracts = [];
          for (let i=0;i<contracts.length;i++){
            mainContracts.push(contracts[i].contract);
          }
          await that.initShowData(mainContracts)
          that.contracts = contracts;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }else if (that.tabName == "completedContract") {
        let result = await that.entranceContract.getContractsByPerson(
          that.$store.state.web3.account,
          1,
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let contracts = result.data.person.contracts;
          var mainContracts = [];
          for (let i=0;i<contracts.length;i++){
            mainContracts.push(contracts[i].contract);
          }
          await that.initShowData(mainContracts)
          that.contracts = contracts;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      } else if (that.tabName == "pendingProposal") {
        let result = await that.entranceContract.getProposalsByPerson(
          that.$store.state.web3.account,
          [0],
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let proposals = result.data.person.proposals;
          var mainContracts = [];
          for (let i=0;i<proposals.length;i++){
            mainContracts.push(proposals[i].proposal);
          }
          await that.initShowData(mainContracts)
          that.mainContracts = mainContracts;
          that.proposals = proposals;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }else if (that.tabName == "completedProposal") {
        let result = await that.entranceContract.getProposalsByPerson(
          that.$store.state.web3.account,
          [-1,1],
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let proposals = result.data.person.proposals;
          var mainContracts = [];
          for (let i=0;i<proposals.length;i++){
            mainContracts.push(proposals[i].proposal);
          }
          await that.initShowData(mainContracts)
          that.mainContracts = mainContracts;
          that.proposals = proposals;
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      } else if (that.tabName == "contractOperation") {
        let result = await that.entranceContract.getMainContractsByPerson(
          that.$store.state.web3.account,
          [1],
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let mainContracts = result.data.person.mainContracts;

          that.initShowData(mainContracts)
          that.mainContracts = mainContracts
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      } else if (that.tabName == "completedMainContract") {
        let result = await that.entranceContract.getMainContractsByPerson(
          that.$store.state.web3.account,
          [4],
          5,
          (that.page-1)*5
        );
        if(result.data.person !=null){
          let mainContracts = result.data.person.mainContracts;

          that.initShowData(mainContracts)
          that.mainContracts = mainContracts
          let count = result.data.countQuery.fields.length;
          that.pageCount = Math.ceil(count/5);
        }
      }
      loading.close();
    },
    async tabClick(tab, event) {
      this.loadData();
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
      let token = data.mainContract.token;
      
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }

      that.proposalDialogLoading = true;

      let status = await that.entranceContract.launchProposal(
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
    async showAddContractDialog(index) {
      this.addContractDialogShow = true;
      this.curOrder = index;
    },
    showContractContentDialog(contractData){
      let that = this;
      that.contactContentDialogShow = true;
      that.dialogContractContent = contractData;
      
      that.$nextTick(() => {
        that.dialogContractHtmlMarkdown = that.$refs.markdownEditor.compiledMarkdown
      })
    },
    async approve() {
      var that = this;

      let data = that.mainContracts[that.curOrder];
      if (that.stakeBalance == "" || that.stakeBalance <= 0) {
        this.$vs.notification({
          // width:'100%',
          duration: 10000,
          icon: "<i class='bx bx-error' ></i>",
          progress: "auto",
          color: "danger",
          position: "top-center",
          title: that.$t("error"),
          text: that.$t("correctNumPlaceholder"),
        });
        return;
      }
      let tokenContract = new Erc20(
          data.mainContract.token
      );

      that.addContractDialogLoading = true;
      let curAllowance = await tokenContract.allowance(
        this.$store.state.web3.account,
        config.entranceAddress
      );
      if (curAllowance.isLessThan(that.stakeBalance)) {
        let status = await tokenContract.approve(
          this.$store.state.web3.account,
          config.entranceAddress,
          that.stakeBalance
        );

        that.addContractDialogLoading = false;

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
      }
    },

    async addContract() {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let mainContractOrder = data.mainContract.mainContractOrder;

      that.addContractDialogLoading = true;
      if (that.title==""|| that.description=="" || that.stakeBalance==""){
        
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
        that.addContractDialogLoading = false;
        return;
      }

      let content = "# " + that.title + "\n" + that.description;

      let token = data.mainContract.token;
      
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }
      let status = await that.entranceContract.addContract(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        content,
        that.stakeBalance,
        decimals
      );
      that.addContractDialogLoading = false;
      that.addContractDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Add contract successfully",
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

    async showApplyJudgeDialog(index) {
      this.applyJudgeDialogShow = true;
      this.curOrder = index;
    },
    async applyJudge() {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let mainContractOrder = data.mainContract.mainContractOrder;

      that.applyJudgeDialogLoading = true;

      let status = await that.entranceContract.applyJudge(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder
      );
      that.applyJudgeDialogLoading = false;
      that.applyJudgeDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Apply judge successfully",
          text: "Please contact with judge org and submit info",
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

    async showApplyExitDialog(index) {
      this.applyExitDialogShow = true;
      this.curOrder = index;
    },

    async applyExit() {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let mainContractOrder = data.mainContract.mainContractOrder;

      that.applyExitDialogLoading = true;

      let status = await that.entranceContract.applyExit(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder
      );
      that.applyExitDialogLoading = false;
      that.applyExitDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          // width:'100%',
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "apply exit successfully",
          text: "Please click 'Exit StakeBalance' Button to exit",
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

    async showExitStakeBalDialog(index) {
      this.exitStakeBalDialogShow = true;
      this.curOrder = index;
    },

    async exitStakeBal() {
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let judgerOrgAddr = data.mainContract.judgerOrgAddr;
      let mainContractOrder = data.mainContract.mainContractOrder;
      let token = data.mainContract.token;
      
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }
      that.exitStakeBalDialogLoading = true;

      let status = await that.entranceContract.exitStakeBalance(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        that.exitBal,
        decimals
      );
      that.exitStakeBalDialogLoading = false;
      that.exitStakeBalDialogShow = false;
      if (status.succ == true) {
        that.$vs.notification({
          duration: 6000,
          icon: "<i class='bx bx-select-multiple' ></i>",
          progress: "auto",
          color: "success",
          position: "top-center",
          title: "Exit balance successfully",
          text: "Please check balances",
        });
      } else {
        that.$vs.notification({
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
     
    
    async showAgreeProposalDialog(index) {
      this.agreeProposalDialogShow = true;
      this.curOrder = index;
    },
    async showRejectProposalDialog(index) {
      this.rejectProposalDialogShow = true;
      this.curOrder = index;
    },
    async showAgreeDialog(index) {
      this.agreeDialogShow = true;
      this.curOrder = index;
    },
    async showRejectDialog(index) {
      this.rejectDialogShow = true;
      this.curOrder = index;
    },
    async reject() {
      let that = this;
      let judgerOrgAddr = that.contracts[that.curOrder].contract.mainContract.judgerOrgAddr;
      let mainContractOrder = that.contracts[that.curOrder].contract.mainContract.mainContractOrder;
      let contractOrder = that.contracts[that.curOrder].contract.contractOrder;
      that.rejectDialogLoading = true;

      let status = await that.entranceContract.signContract(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        contractOrder,
        -1,
        0,
        0
      );
      that.rejectDialogLoading = false;
      that.rejectDialogShow = false;
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
    async agree() {
      let that = this;
      let judgerOrgAddr = that.contracts[that.curOrder].contract.mainContract.judgerOrgAddr;
      let mainContractOrder = that.contracts[that.curOrder].contract.mainContract.mainContractOrder;
      let contractOrder = that.contracts[that.curOrder].contract.contractOrder;
      that.agreeDialogLoading = true;

      let status = await that.entranceContract.signContract(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        contractOrder,
        1,
        0,
        0
      );
      that.agreeDialogLoading = false;
      that.agreeDialogShow = false;
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
    async rejectProposal(){
      let that = this;
      let judgerOrgAddr = that.proposals[that.curOrder].proposal.mainContract.judgerOrgAddr;
      let mainContractOrder = that.proposals[that.curOrder].proposal.mainContract.mainContractOrder;
      let proposalOrder = that.proposals[that.curOrder].proposal.proposalOrder;
      that.agreeProposalDialogLoading = true;

      let status = await that.entranceContract.signProposal(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        proposalOrder,
        -1
      );
      that.agreeProposalDialogLoading = false;
      that.agreeProposalDialogShow = false;
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
    async agreeProposal(){
      let that = this;
      let judgerOrgAddr = that.proposals[that.curOrder].proposal.mainContract.judgerOrgAddr;
      let mainContractOrder = that.proposals[that.curOrder].proposal.mainContract.mainContractOrder;
      let proposalOrder = that.proposals[that.curOrder].proposal.proposalOrder;
      that.agreeProposalDialogLoading = true;

      let status = await that.entranceContract.signProposal(
        that.$store.state.web3.account,
        judgerOrgAddr,
        mainContractOrder,
        proposalOrder,
        1
      );
      that.agreeProposalDialogLoading = false;
      that.agreeProposalDialogShow = false;
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
    async maxExitStakeMoney(index){
      let that = this;
      let data = that.mainContracts[that.curOrder];
      let token = data.mainContract.token;
      
      let decimals;

      if (that.tokenMap[token.toLowerCase()]==null){
        decimals= 18
      }else{
        decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
      }
      let balance = BigNumber(data.balance).div( BigNumber(10).pow(BigNumber(decimals)));
      
      that.exitBal = balance.toFixed();

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
          
          let titleIndex =  mainContract.contracts[j].contentOrIpfsHash.indexOf("\n");
          that.contractSignInfos[j].contentOrIpfsHash =  mainContract.contracts[j].contentOrIpfsHash;
          that.contractSignInfos[j].title = mainContract.contracts[j].contentOrIpfsHash.substring(
            1,
            titleIndex
          );
          that.contractSignInfos[j].description = mainContract.contracts[j].contentOrIpfsHash.substring(titleIndex);
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
    async viewProposalInfo(mainContract){
        var that = this;
        that.proposalInfoDialogShow = true;
        that.proposalInfoDialogLoading = true;
        let mainContractContract = new MainContract(
            mainContract.mainContractAddr
        );
        that.proposalSignInfos = [];

        for(let j=0;j<mainContract.proposals.length;j++){
          that.proposalSignInfos[j] = {}
          that.proposalSignInfos[j].proposal = {};
          let result = await mainContractContract.conPersonProposalMap(j);
          that.proposalSignInfos[j].assignAddrMapNum = result[0];
          that.proposalSignInfos[j].agreeNum = result[1];
          that.proposalSignInfos[j].rejectNum = result[2];
          that.proposalSignInfos[j].proposer = result[3];
          that.proposalSignInfos[j].signInfos = [];
          for (let k=0;k<mainContract.persons.length;k++){
            let data = await mainContractContract.getProposalSignInfo(0, j, mainContract.persons[k].person.id);
            let signInfo = {}
            signInfo.person = mainContract.persons[k].person.id;
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
            let assignAddr = await mainContractContract.getProposalAssignAddr(0,j,k);
            
            let token = mainContract.token;
            
            let decimals;

            if (that.tokenMap[token.toLowerCase()]==null){
              decimals= 18
            }else{
              decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
            }
            let balance = await mainContractContract.getProposalAssignBalance(0,j,assignAddr,decimals)
            // let balanceBig = BigNumber(balance).div( BigNumber(10).pow(BigNumber(18)));
            let signInfo = {}
           
            signInfo.assignAddr = assignAddr;
            signInfo.balance = balance.toString();
            
            that.proposalSignInfos[j].assignPlans.push(signInfo)
          }
        }
        that.proposalInfoDialogLoading = false;
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
            
            let token = mainContract.token;
            
            let decimals;

            if (that.tokenMap[token.toLowerCase()]==null){
              decimals= 18
            }else{
              decimals = config.tokens[that.tokenMap[token.toLowerCase()]].decimals;
            }
            let balance = await mainContractContract.getProposalAssignBalance(1,j,assignAddr,decimals)
            let signInfo = {}
            signInfo.assignAddr = assignAddr;
            signInfo.balance =  BigNumber(balance).div( BigNumber(10).pow(BigNumber(decimals)));;
            
            that.proposalSignInfos[j].assignPlans.push(signInfo)
          }
        }
        that.judgeProposalInfoDialogLoading = false;
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
