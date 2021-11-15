<template>
  <div
    style="background-color: #000000;color:white;font-family: 'Tourney', cursive;"
  >
    <el-row
      style="background-image:url('banner.jpg');height:500px;background-size:100% 100%;font-size:70px;flex-wrap:wrap;"
      type="flex"
      align="middle"
      justify="center"
    >
      <el-col :span="24" style="margin-top:50px;">
        Welcome to Cyber World
      </el-col>
      <el-col :span="24">
        <el-row style="margin-top:-80px;">
          <el-col
            :xs="{ span: 18, offset: 3 }"
            :sm="{ span: 4, offset: 8 }"
            :xl="{ span: 5, offset: 7 }"
          >
            <vs-button
              @click="showApplyPage"
              border
              block
              style="font-size:20px;line-height:40px;font-family: 'Tourney', cursive;"
              color="#ffffff"
            >
              Apply
            </vs-button>
          </el-col>
          <el-col :offset="1" :xs="{ span: 18, offset: 3 }" :sm="4" :xl="3">
            <vs-button
              @click="showDocPage"
              block
              style="font-size:20px;line-height:40px;font-family: 'Tourney', cursive;"
              primary
            >
              Read Docs
            </vs-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div style="">
      <el-row
        style="background-color:#0862D6;height:400px;flex-wrap:wrap;"
        type="flex"
        align="middle"
        justify="center"
      >
        <el-col :span="24" >
          <div style="font-size:58px;">
          Court Based BlockChain
          </div>
          <div style="margin-top:20px;">
          What do you need when you have disputes with others in the cyber
          world?
          </div>
        </el-col>
        <el-col :span="24" style="margin-top:-240px;">
        </el-col>
      </el-row>
      <el-row
      class="judge-team"
        style=""
        type="flex"
        justify="center"
      >
        <el-col :xs="24" :md="16" style="font-size:60px;">
          <el-row>
            <el-col :span="5">
              <img src="court-1.png" class="court"/>
            </el-col>
            <el-col :span="12" :offset="1">
              <img src="court-2.png" class="court" />
            </el-col>
            <el-col :span="5" :offset="1">
              <img src="court-3.jpg" class="court" />
            </el-col>
          </el-row>
          <el-row style="height:100px;color:#000000;margin-top:50px;">
            <el-col :span="24" style="font-size:50px;">
              Decentralized Judge Team
            </el-col>
          </el-row>
          <el-row
            style="height:100px;color:#000000;margin-top:50px;text-align:left;flex-wrap:wrap;"
            type="flex"
          >
            <el-col :xs="{span:11}" :sm="{span:11}" :md="{span:5}" style="">
              <!-- <div>
                  <img
                    src="card-code.jpg"
                    alt=""
                    style="width:100%;height:150px;border-radius:20px;"
                  />
              </div>
              <el-row style="font-size:14px;height:100px;">
                
                    Every team is a DAO organization.Anyone can create a
                    Decentralized Judge Team.
              </el-row> -->
              <vs-card>
                <template #img>
                  <img
                    src="card-code.jpg"
                    alt=""
                    style="width:100%;height:150px;border-radius:20px;"
                  />
                </template>
                <template #text>
                  <div style="font-size:14px;height:100px;margin-top:10px;">
                    Every team is a DAO organization.Anyone can create a
                    Decentralized Judge Team.
                  </div>
                </template>
              </vs-card>
            </el-col>
            <el-col :xs="{span:11,offset:2}" :sm="{span:11,offset:2}" :md="{span:5,offset:1}" style="">
              <!-- <div>
                  <img
                    src="card-org.jpg"
                    alt=""
                    style="width:100%;height:150px;border-radius:20px;"
                  />
              </div>
              <el-row style="font-size:14px;height:100px;">
                    This DAO organization restricts everyone's rights and
                    obligations through code.
              </el-row> -->
              <vs-card>
                <template #img>
                  <img
                    src="card-org.jpg"
                    alt=""
                    style="width:100%;height:150px;"
                  />
                </template>
                <template #text>
                  <div style="font-size:14px;height:100px;margin-top:10px;">
                    This DAO organization restricts everyone's rights and
                    obligations through code.
                  </div>
                </template>
              </vs-card>
            </el-col>
            <el-col :xs="{span:11}" :sm="{span:11}" :md="{span:5,offset:1}" style="">
              <!-- <div>
                  <img
                    src="card-vote.jpg"
                    alt=""
                    style="width:100%;height:150px;border-radius:20px;"
                  />
              </div>
              <el-row style="font-size:14px;height:100px;">
                One person, one vote, decides the future of the team.
                    Decentralized Judge Team
              </el-row> -->
              <vs-card>
                <template #img>
                  <img
                    src="card-vote.jpg"
                    alt=""
                    style="width:100%;height:150px;"
                  />
                </template>
                <template #text>
                  <div style="font-size:14px;height:100px;margin-top:10px;">
                    One person, one vote, decides the future of the team.
                    Decentralized Judge Team
                  </div>
                </template>
              </vs-card>
            </el-col>
            <el-col :xs="{span:11,offset:2}" :sm="{span:11,offset:2}" :md="{span:5,offset:1}" >
              <!-- <div>
                  <img
                    src="card-money.jpg"
                    alt=""
                    style="width:100%;height:150px;border-radius:20px;"
                  />
              </div>
              <el-row style="font-size:14px;height:100px;">
                    Rewards will enter your organization, and the distribution
                    will be determined entirely by the organization.
              </el-row> -->
              <vs-card>
                <template #img>
                  <img
                    src="card-money.jpg"
                    alt=""
                    style="width:100%;height:150px;"
                  />
                </template>
                <template #text>
                  <div style="font-size:14px;height:100px;margin-top:10px;">
                    Rewards will enter your organization, and the distribution
                    will be determined entirely by the organization.
                  </div>
                </template>
              </vs-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row
        style="background-color:#4B28D3;height:750px;flex-wrap:wrap;"
        type="flex"
        justify="center"
      >
      
        <el-col :xs="24" :md="18" style="margin-top:0px;font-size:24px;">
          
          <el-row :span="24" style="font-size:58px;margin-top:50px;">
            What will be the Cyber Future?

          </el-row>
          <el-row type="flex" align="top" justify="center">
            <el-col
              :span="24"
              style="margin-top:30px;font-size:18px;text-align:center;line-height:32px;"
            >
              <el-row>
                In the future, what the cyber world will be like depends largely on you. 
                Before you start your journey in the cyber world, I need to remind you a word:Trust code,trust mechanism,don't trust person in Cyber World.When you don't need to trust anyone,you may gain the most trustworthy relationship.
      
              </el-row>
              <el-row
                style="background-image:url('cyberworld.png');height:300px;background-size:100% 100%;font-size:70px;flex-wrap:wrap;margin-top:50px;"
                type="flex"
                align="middle"
                justify="center"
              ></el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        style="background-color:#ffffff;"
        type="flex"
        justify="center"
      >
        <el-col :xs="24" :md="18" style="font-size:60px;margin-top:30px;">
          <el-row style="height:100px;color:#000000;margin-top:50px;">
            <el-col :span="24" style="font-size:60px;">
              A global community
            </el-col>
            <el-col :span="24" style="font-size:20px;margin-top:30px;">
              We are a decentralized team, no matter where you are, you can join us. We need idealistic people to participate in
              our community.
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        style="background-color:#ffffff;color:#000000;text-align:left;font-size:20px;flex-wrap:wrap;padding-bottom:30px;"
        type="flex"
        justify="center"
      >
        <el-col :xs="24" :md="16" >
          <el-row type="flex" style="flex-wrap:wrap;margin-top:20px;"
        justify="center">
            <el-col
              :xs="{span:10,offset:1}"
              :sm="5"
              style="background-color:#F5F5F5;text-align:center;border-radius:20px;cursor:pointer;margin-top:20px;padding-bottom:30px;"
              @click.native="showDiscordPage"
            >
              <img
                src="discord.svg"
                style="width:68px;height:68px;padding-top:30px;"
              />
              <el-row>
                DisCord
              </el-row>
            </el-col>
            <el-col
              :xs="{span:10,offset:2}"
              :sm="{span:5,offset:1}"
              style="background-color:#F5F5F5;text-align:center;border-radius:20px;cursor:pointer;margin-top:20px;padding-bottom:30px;"
              @click.native="showTwitterPage"
            >
              <img
                src="twitter.svg"
                style="width:68px;height:68px;padding-top:30px;"
              />
              <el-row>
                Twitter
              </el-row>
            </el-col>
            <el-col
              :xs="{span:10,offset:1}"
              :sm="{span:5,offset:1}"
              style="background-color:#F5F5F5;text-align:center;border-radius:20px;cursor:pointer;margin-top:20px;padding-bottom:30px;"
              @click.native="showRedditPage"
            >
              <el-row>
              <img
                src="reddit.svg"
                style="width:68px;height:68px;padding-top:30px;"
              />
              </el-row>
              <el-row>
                Reddit
              </el-row>
            </el-col>
            <el-col
              :xs="{span:10,offset:2}"
              :sm="{span:5,offset:1}"
              style="background-color:#F5F5F5;text-align:center;border-radius:20px;cursor:pointer;margin-top:20px;padding-bottom:30px;"
              @click.native="showGithubPage"
            >
              <img
                src="github.svg"
                style="width:68px;height:68px;padding-top:30px;"
              />
            </el-col>
          </el-row>
          <el-row>

          </el-row>
          
        </el-col>
      </el-row>

      <el-row 
        style="background-color:#000000;"
        type="flex"
        justify="center" >
         <a style="color:#8B8B8B;margin-top:20px;margin-bottom:20px;"  size="xl"
        href="https://polygon.technology/"
        flat
      >
        Powered by Polygon
      </a>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},

  async mounted() {},
  beforeDestroy() {},
  methods: {
    showTwitterPage(){
      window.open("https://twitter.com/CyberCourt");
    },
    showDiscordPage(){
      window.open("https://discord.gg/RnfECVtbx9");
    },
    showGithubPage(){
      window.open("https://github.com/CyberCourt");
    },
    showRedditPage(){
      window.open("https://www.reddit.com/r/CyberCourt/");
    },
    showApplyPage(){
      this.$router.push({
        path:"/apply"
      })
    },
    showDocPage(){
      let that = this;
      
      window.open("https://github.com/CyberCourt");

    }
  },
};
</script>

<style>
@media screen and (max-width:500px){
  .court{
    width:100%;
    height:180px;
    margin-top:-100px;
  }
}
@media screen and (min-width:500px){
  .court{
    width:100%;
    height:250px;
    margin-top:-150px;
  }
}
@media screen and (min-width: 1000px) {
  .judge-team {
    background-color:#ffffff;height:650px
  }
}

@media screen and (max-width: 1000px) {
  .judge-team {
    background-color:#ffffff;height:900px
    /*border: 1px solid #E91E63;*/
    /*border-radius: 10px;*/
    /*box-shadow: 0px 0px 10px #E91E63, inset 0px -45px 45px -5px #8A123B, inset 0px 0px 5px -5px #E91E63, inset 0px 0px 5px 0px #E91E63, inset 0px 0px 15px 0px #E91E63;*/
  }
}
</style>
