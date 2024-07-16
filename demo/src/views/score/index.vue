<template>
  <div v-show="scene === 0" class="card-wrap">
    <el-card style="text-align: left;">
      <div class="bk-img">
        <p>专家评审你好！</p>
        <span>您评审的分类为：{{ approveType }}，评审的课程为：{{ coures }}</span>
      </div>
      <el-input v-model="title" style="width: 270px; height: 32px; margin-right: 10px;" placeholder="请输入">
        <template #prefix>
          <span style="color: black;">作品名称</span>
        </template>
      </el-input>
      <el-select v-model="state" filterable placeholder="请选择" style="width: 130px;" :filter-method="filterFun">
        <template #prefix>
          <span style="color: black;">状态</span>
        </template>
        <el-option v-for="item in states" :key="item" :label="item" :value="item" />
      </el-select>
      <el-table style="margin: 10px auto;" :data="itemList">
        <el-table-column label="序号" type="index" width="80px"></el-table-column>
        <el-table-column label="作品名称" prop="title" width="500px"></el-table-column>
        <el-table-column label="提交时间" prop="updateTime" width="200px"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template #="{ row, $index }">
            <span :class="row.isApprove.split(',')[1] == '1' != '' ? 'c-black' : 'c-red'">{{ row.isApprove.split(',')[1]
              == '1' != '' ? '已评分' : '未评分' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #="{ row, $index }">
            <div class="score-btn" @click="toScore(row)">评分</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNum" v-model:page-size="searchObj.pageSize" :background="true"
        layout="->,total,prev, pager, next, jumper" :total="total" @current-change="getHasItem"
        @size-change="changeSize" />
    </el-card>
  </div>
  <div>
    <Scoring ref="item" v-show="scene === 1" @changeScene="changeScene" @changeNext="changeNext"></Scoring>
  </div>

  <div v-if="userStore.readFlag == 1" class="readme-wrap">
    <el-card class="readme" style="margin-top: 3rem;">
      <h2>承诺书</h2>
      <p v-for="msg in readme" style="text-align: left;">{{ msg }}</p>
      <el-button @click="agree" type="primary">我已阅读并同意</el-button><el-button @click="disagree">不同意</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import Scoring from './scoring.vue'
import { reqScoreList, reqDictInfoList } from '@/api/score';
import useUserStore from '@/stores/modules/user';
import { MAP_ZH, MAP_EN } from '@/utils/approveMapping';

let $router = useRouter()
let approveType = ref('')
let coures = ref('')
let userStore = useUserStore()
let scene = ref(0)
let total = ref(0)
let pageNum = ref(1)
let states = ref(['已评分', '未评分'])
let state = ref('')
let itemList = ref([])
let item = ref()
let title = ref('')
let isApprove = ref('')
let searchObj = ref({
  pageNum: 1,
  pageSize: 10,
  isApprove: '',
  title: ''
})
let timer = null
let readme = ref([
  '一、本人自愿加入专家评委库,并严格通守其他各项规定和纪律,客现公正地为本次大开展评审工作。',
  '二、本人将严格通守大赛评选工作的保密义务,不使用或拔露,也不许可他人使用或技器在评进工作中获悉的梦费企业和国队的基本估息、观点、想法、创意、知识产权、暂力成果、技术方法、商业计划、财务信息等商业秘密。',
  '三、本人将严格技服大费评选规则、规程,以严肃相学的志度,客观公正、实事水是、专业独立地参与选工作,提出评隐息见,并对评港息见的真实性、公正性负责。',
  '四、本人保证设入足够的时间精力,按时参加大赛评选相关工作,并愿通过电子部件、手机信和电等方式供得大组会有关评选工作的通知信息。',
  '五、本人与参赛企业或队在在利害关嘉,可能影评工作的公正、本人将及时向大赛组费会声明共提出道申通,如发现其他评委也存在相同情,本人也将及时向大赛组委会反映情况。',
  '六、未经大赛组委会授权,本人不以任式与参赛企业或个人联系。',
  '七、未经大赛组委会授权,本人不以大赛评要名义参与任何与大赛评选无关的活动,也不以大赛评要名义对外发表任何评论。',
  '八、本人担任本次大赛的评委已经取得了应当取得的所有授权、许司、同息、批准,并不会违反对本人适用的法律、法规或本人已经签订的合同,协议或其他文件。',
  '九、本人承诺只在大赛组委会授权的范国内进行评进工作,不超授权权,并且不利用职务之便为自身、他人以及所在工作机构谋得利益。'
])

watch(userStore.approveType, async () => {
  approveType.value = MAP_ZH(userStore.approveType)
  let res = await reqDictInfoList(MAP_EN(userStore.approveType))
  coures.value = res.data.map(item => item.dictLabel).toString()
}, { immediate: true })

const searchItemList = async () => {
  let res = await reqScoreList(searchObj.value)
  total.value = res.data.total
  itemList.value = res.data.rows
}

const searchCallback = () => {
  if (timer) {
    timer = null
  }
  timer = setTimeout(() => {
    searchItemList()
  }, 300)
}

watch(title, () => {
  searchObj.value.title = title.value
  searchObj.value.pageNum = 1
  searchCallback()
}, { immediate: true })

watch(isApprove, () => {
  searchObj.value.isApprove = isApprove.value
  searchObj.value.pageNum = 1
  searchCallback()
}, { immediate: true })

const toScore = (row) => {
  scene.value = 1
  item.value.initItem(row)
}

const filterFun = () => {
  if (state.value === '已评分') {
    isApprove.value = '1'
  } else {
    isApprove.value = '0'
  }
}

const getHasItem = async (pager = 1) => {
  searchObj.value.pageNum = pager
  searchCallback()
}

const changeScene = () => {
  scene.value = 0
}

const changeNext = () => {
  itemList.value.map(el => {
    if (el.isApprove.split(',')[1] == '0') {
      item.value.initItem(el)
    }
  })
}

const agree = () => {
  userStore.readFlag = 0
}

const disagree = () => {
  $router.push('/')
}
</script>

<style scoped>
.card-wrap,
.readme {
  display: flex;
  margin: auto;
  width: 65rem;
  flex: 1 1;
  vertical-align: middle;
  align-items: center;
}

p {
  font-size: 18px;
  font-weight: 500;
}

.bk-img {
  position: relative;
  width: 100%;
  color: white;
  margin-bottom: 10px;
  padding: 15px 20px;
  background: url('@/assets/image/组 2 拷贝.png') no-repeat;
}

.score-btn {
  color: rgb(0, 81, 255);
  cursor: pointer;
}

.c-red {
  color: red;
}

.c-black {
  color: black;
}

.readme-wrap {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>