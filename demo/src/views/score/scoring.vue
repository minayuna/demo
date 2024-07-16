<template>
  <div>
    <el-card class="item-card">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in nav" :key="index">
          <span>{{ item }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{ itemBasicInfo.title }}</h1>
      <div class="type-info">
        <span>所属分类：{{ MAP_ZH(itemBasicInfo.classOne) }}</span>
        <span>所属课程：{{ itemBasicInfo.classTwoName }}</span>
        <span>提交时间：{{ itemBasicInfo.updateTime }}</span>
      </div>
      <el-table :data="itemSubInfo" border :show-header="false">
        <el-table-column width="150px">
          <template #="{ rwo, $index }">
            <span v-if="$index === 0">课堂实录</span>
            <span v-else>{{ itemSubInfo[$index].subTitle.split('.')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column width="850px">
          <template #="{ rwo, $index }">
            <div v-if="$index === 0">
              <div v-for="video in itemSubInfo[$index]" :key="subId" style="display: inline-block; text-align: center;">
                <video :src="'http://reg.vip.cpolar.cn' + video.url"></video>
                <div>{{ video.subTitle }}</div>
              </div>
            </div>
            <div v-else>
              <img :src="'/src/assets/image/' + judgeFile(itemSubInfo[$index].subTitle) + '.png'"
                style="padding-right: 10px;">
              <span @click="viewFile($index)" class="a-decro">{{ itemSubInfo[$index].subTitle }}</span>
              <img style="float: right; cursor: pointer;" alt="下载" @click="download($index)"
                src="@/assets/image/矢量智能对象(6).png">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="item-card">
      <h3>评审</h3>
      <el-table :data="scoreGuide" :span-method="objectSpanMethod">
        <el-table-column label="一级指标" width="140px">
          <span>评分参考指标（100分）</span>
        </el-table-column>
        <el-table-column prop="name" label="二级指标" width="140px"></el-table-column>
        <el-table-column prop="info" label="评审标准" width="470px"></el-table-column>
        <el-table-column label="各项得分" width="100px">
          <template #="{ row, $index }">
            <el-input v-model="scoreArr[$index]"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="总得分" width="100px">
          <template #="{ row, $index }">
            <el-input v-model="totalPoint" disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
      <h4>评审意见</h4>
      <textarea cols="130" rows="10" v-model="itemScoreObj.mark"></textarea>
      <div style="text-align: center;">
        <el-button @click="save">保存</el-button><el-button @click="saveAndNext">保存并评审下一个</el-button>
      </div>
      
    </el-card>
    <div class="fileTemp">
      <div v-for="file in fileType" :key="file">
        <div>
          <img :src="'/src/assets/image/' + file + '.png'">
          <span class="file-name">{{ judgeTypeName(file) }}</span>
        </div>
      </div>
    </div>
    <div v-if="flag" class="preview-wrap">
      <iframe :src="previewUrl">
      </iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { reqItemInfo, reqItemSubInfoList, reqScore } from '@/api/score';
import { MAP_ZH } from '@/utils/approveMapping';
import { judgeFile, fileType, judgeTypeName } from '@/utils/fileTypeJudge';
import { downloadFile } from '@/utils/download';
import { ElMessage } from 'element-plus';

let baseUrl = import.meta.env.VITE_APP_BASE_API
let nav = ref(['首页', '专家评审'])
let itemSubInfo = ref([[]])
const $emit = defineEmits(['changeScene', 'changeNext'])

let scoreGuide = ref([
  { name: '教学实施报告', info: '' },
  { name: '教案', info: '' },
  { name: '视频资料', info: '' },
  { name: '专业⼈才培养⽅案', info: '' },
  { name: '课程标准（或实施案）', info: '' },
  { name: '教材选⽤说明', info: '' }
])
let scoreArr = ref(new Array(6))
let totalPoint = computed(() => scoreArr.value.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0))
let itemScoreObj = ref({
  itemId: 0,
  mark: '',
  dimension1: '',
  dimension2: '',
  dimension3: '',
  dimension4: '',
  dimension5: '',
  dimension5: ''
})
let itemBasicInfo = ref({
  title: '',
  classOne: 0,
  classTwoName: '',
  updateTime: ''
})
let flag = ref(false)
let previewUrl = ref('')

const initItem = async (itemObj) => {
  itemBasicInfo.value.title = itemObj.title
  itemBasicInfo.value.classOne = itemObj.classOne
  nav.value = ['首页', '专家评审']
  nav.value.push(itemObj.title)
  let res = await reqItemInfo(itemObj.itemId)
  if (res.data.classTwoName) {
    itemBasicInfo.value.classTwoName = res.data.classTwoName
  }
  itemBasicInfo.value.updateTime = res.data.updateTime
  itemSubInfo = ref([])
  itemSubInfo.value[0] = []
  res.data.dsItemSubList.forEach(item => {
    if (item.fileType === 1) {
      itemSubInfo.value[0].push(item)
    } else {
      itemSubInfo.value.push(item)
    }
  });
  itemSubInfo.value[0].pop()
  itemSubInfo.value.pop()
}

const download = (index) => {
  downloadFile('http://reg.vip.cpolar.cn' + itemSubInfo.value[index].url)
}

const viewFile = (index) => {
  previewUrl.value = 'http://reg.vip.cpolar.cn' + itemSubInfo.value[index].url
  flag.value = true
}

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if((columnIndex === 0 && rowIndex === 0) || (columnIndex === 4 && rowIndex === 0)) {
    return {
      rowspan: 6,
      colspan: 1
    }
  }
  if((columnIndex === 0 && rowIndex !== 0) || (columnIndex === 4 && rowIndex !== 0)) {
    return [0, 0]
  }
}

const save = async () => {
  scoreArr.value.map((item, index) => {
    itemScoreObj.value['dimension' + (index + 1)] = item
  })
  
  let res = await reqScore(itemScoreObj.value)
  if(res.code === 200) {
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: res.msg
    })
  }
  $emit('changeScene')
}

const saveAndNext = async () => {
  scoreArr.value.map((item, index) => {
    itemScoreObj.value['dimension' + (index + 1)] = item
  })
  
  let res = await reqScore(itemScoreObj.value)
  if(res.code === 200) {
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: res.msg
    })
  }
  $emit('changeNext')
}

defineExpose({ initItem })
</script>

<style scoped>
.type-info {
  font-size: 13px;
}

.type-info span {
  margin-right: 20px;
}

.item-card {
  display: flex;
  margin: auto;
  width: 65rem;
  margin-top: 10px;
  flex: 1 1;
  align-content: space-between;
  vertical-align: middle;
  align-items: center;
  text-align: left;
}

video {
  height: 100px;
}

.fileTemp {
  text-align: left;
  position: absolute;
  top: 30%;
  left: 30px;
  font-size: 14px;
}

.fileTemp img {
  margin-right: 10px;
  width: 18px;
}

@media (width < 1320px) {
  .fileTemp {
    visibility: hidden;
  }
}

.a-decro {
  cursor: pointer;
}

.a-decro:hover {
  color: rgb(19, 106, 219);
}

.preview-wrap {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.preview-wrap iframe {
  width: 1300px;
  height: 700px;
}
</style>