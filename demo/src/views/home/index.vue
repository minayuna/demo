<template>
  <div>
    <div class="home-top">
      <img class="bk-img" src="@/assets/image/组 2.png" alt="">
      <p>2023年青岛市中职教学能力大赛平台</p>
      <div class="join-btn">
        <span style="font-weight: 600;" @click="joinHandle">我要报名</span><img
          src="@/assets/icons/right-arrow-svgrepo-com.svg" alt="">
      </div>
    </div>
    <div class="home-main">
      <div class="main-item">
        <div class="title">
          <img src="@/assets/image/组 3@2x.png"><span>赛事流程</span><img src="@/assets/image/组 3@2x.png">
        </div>
        <div class="content">
          <div class="box">
            <img src="@/assets/image/组 4@2x(1).png">
            <span>登录报名</span>
          </div>
          <img class="left-arrow" src="@/assets/image/矢量智能对象 拷贝 5.png">
          <div class="box">
            <img src="@/assets/image/组 5@2x.png">
            <span>提交作品</span>
          </div>
          <img class="left-arrow" src="@/assets/image/矢量智能对象 拷贝 5.png">
          <div class="box">
            <img src="@/assets/image/组 6@2x.png">
            <span>作品评审</span>
          </div>
          <img class="left-arrow" src="@/assets/image/矢量智能对象 拷贝 5.png">
          <div class="box">
            <img src="@/assets/image/组 7@2x.png">
            <span>获奖公示</span>
          </div>
        </div>
      </div>
      <div class="main-item flex-row">
        <div class="title">
          <img src="@/assets/image/组 3@2x.png"><span>比赛指南</span><img src="@/assets/image/组 3@2x.png">
        </div>
        <div class="content flex-row box1">
          <h2>2023年青岛市中等职业学校技能大赛教学能力比赛规程</h2>
          <div style="margin-bottom: 30px;">
            <p class="title">一、指导思想</p>
            <p>深入贯彻习近平总书记关于职业教育的重要指示,落实全国职业教育大会精神,按照《国家职业教育改革实施方案》等部署,坚持“以赛促教、以赛促研,以赛促建、
              以赛促改”的总体思路,引导各校围绕立德树人根本任务,构建”三全育人“体系,深化”课程思政”建设引导各校切实推进国家教学标准.落地,积极探索“岗课赛证”
              融合育人模式,创新发展项目教学、情境教学、线上线下混合式教学模式;引导各校持续深化教师、教材、教法“三教改革”,持续提升学校改进教育教学管理的能力;
              引导各校推进高水平、结构化教师教学团队建设,提高教师的师德践行能力、专业教学能力、综合育人能力和自主发展能力,推动示范性教学,促进“能说会做”的“双
              师型”教师成长。</p>
          </div>
          <div>
            <p class="title">二、比赛要求</p>
            <p>重点考察教学团队(2-4人)针对某门课程中部分教学内容完成教学设计、实施课堂教学、达成评价目标、进行反思改进的能力。<br>
              1.教学内容。根据职业教育国家教学标准要求,对接职业标准(规范)、职业技能等级标准等,优化课程体系和教学目标,拓展教学内容深度和广度(思政课要严格按照国规教材或国家课程标准规定教学模块和内容进行教学。<br>
              2.教学设计。依据学校实际使用的专业人才培养方案和课程标准,针对参赛教学内容,进行学情分析,确定教学目标,优化教学过程。针对不同生源分类施教、因材施教。合理运用教学平台、技术、方法和资源等组织教育教学,进行考核与评价,持续开展教学诊断与改进。专业(技能)课程鼓励按照生产实际和岗位需求设计模块化课程,强化工学结合、理实一体,实施项目教学、情景教学、案例教学等行动导向教学。应执行《关于加强中小学生手机管理工作的通知》”有限带入校园、禁止带入课堂”的要求。
            </p>
            <img src="@/assets/image/组 4(2).png">
          </div>
        </div>
      </div>
      <div class="main-item">
        <div class="title">
          <img src="@/assets/image/组 3@2x.png"><span>作品展示</span><img src="@/assets/image/组 3@2x.png">
        </div>
        <div class="content"></div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/modules/user';
import { ElMessage } from 'element-plus';

let $router = useRouter()
let userStore = useUserStore()

const joinHandle = () => {
  if (userStore.token) {
    $router.push('/apply')
  } else {
    ElMessage({
      type: 'error',
      message: '请先登录'
    })
  }
}
</script>

<style scoped>
.home-top {
  color: white;
  width: 100%;
  margin-bottom: 50px;
  text-align: left;
}

.bk-img {
  width: 100%;
  position: relative;
  top: 30px;
  left: 0;
  margin-top: -5px;
  z-index: 0;
}

.home-top p {
  position: absolute;
  z-index: 99;
  font-size: 35px;
  font-weight: 600;
  top: 150px;
  left: 300px;
  width: 450px;
}

.join-btn {
  background-color: white;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  font-size: 18px;
  top: 280px;
  left: 300px;
  padding: 10px 15px;
  color: rgb(67, 110, 255);
  border-radius: 21px;
  display: flex;
}

.join-btn img {
  width: 25px;
  height: 25px;
}

.home-main {
  display: flex;
  margin: auto;
  width: 65rem;
  flex: 1 1;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-item {
  margin: 20px 0;
}

.flex-row {
  display: flex;
  flex-direction: column;
}

.main-item img {
  width: 30px;
}

.main-item span {
  margin: 0 15px;
  font-size: 30px;
  font-weight: 600;
}

.title {
  margin-bottom: 30px;
}

.content {
  display: flex;
}

.box {
  padding: 15px 20px;
  display: flex;
  vertical-align: middle;
  border-radius: 5px;
  background-color: rgb(67, 110, 255);
  color: white;
}

.box1 {
  border: 1px solid white;
  background-color: rgb(247, 247, 247);
  border-radius: 5px;
  padding: 10px 40px;
}

.box span {
  line-height: 30px;
  font-size: 14px;
}

.box img {
  width: 30px;
  height: 30px;
}

.left-arrow {
  margin: 20px 10px;
  height: 21px;
  width: 21px !important;
}

.title {
  margin-bottom: 10px;
  font-weight: 600;
}

p {
  text-align: left;
}
</style>