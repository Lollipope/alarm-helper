<template>
  <div class="kind-item">
    <div class="kind-title">
      <img class="icon" src="../../../../assets/images/alarm-robot-title-icon1.png" alt="" />
      <span class="name">管控策略</span>
    </div>
    <div class="kind-cnt">
      <div class="kind-cnt-item">
        <span class="btn">一键发布</span>
        <div class="box">
          <div class="title">情报板发布</div>
          <div class="row">
            <span class="l">发布对象：</span>
            <span class="v">FCMS-往xx方向-K80+190 前</span>
          </div>
          <div class="row">
            <span class="l">发布对象：</span>
            <span class="v">FCMS-往xx方向-K80+190 前</span>
          </div>
        </div>
      </div>
      <div class="kind-cnt-item">
        <span class="btn">一键发布</span>
        <div class="box">
          <div class="title">广播发布</div>
          <div class="row">
            <span class="l">发布对象：</span>
            <span class="v">FCMS-往xx方向-K80+190 前</span>
          </div>
          <div class="row">
            <span class="l">发布对象：</span>
            <span class="v">FCMS-往xx方向-K80+190 前</span>
          </div>
        </div>
      </div>
      <div class="kind-cnt-item">
        <span class="btn">一键发布</span>
        <div class="box">
          <div class="title">警示灯</div>
          <div class="row">
            <span class="l">发布对象：</span>
            <span class="v">FCMS-往xx方向-K80+190 前</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.kind-item {
  .kind-title {
    height: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon {
      margin-left: 7px;
      width: 18px;
      height: 12px;
      display: inline-block;
    }
    .name {
      margin-left: 9px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;
      font-size: 13px;
      color: #333333;
      letter-spacing: 1px;
    }
  }

  .kind-cnt {
    .kind-cnt-item {
      width: 451px;
      background: #edf6ff;
      border-radius: 12px;
      position: relative;
      margin-bottom: 10px;
      .btn {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        width: 58px;
        height: 23px;
        color: white;
        line-height: 23px;
        text-align: center;
        background: url('../../../../assets/images/alarm-robot-btn-oper1.png') no-repeat 0 0/ 100%
          100%;
        font-size: 10px;
      }

      .box {
        padding: 13px 0 18px 28px;
        .title {
          height: 16px;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 600;
          font-size: 11px;
          color: #1989fd;
          line-height: 16px;
          letter-spacing: 1px;
          position: relative;
          &::before {
            content: '';
            display: block;
            position: absolute;
            left: -8px;
            top: 6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #1989fd;
          }
        }
        .row {
          display: flex;
          align-items: center;
          height: 21px;
          .l {
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 400;
            font-size: 11px;
            color: #666666;
            letter-spacing: 1px;
            margin-right: 6px;
          }
          .v {
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            font-size: 11px;
            color: #333333;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>
