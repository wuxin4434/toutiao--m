<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon name="cross" color="#fff" slot="left" @click="$router.back()"/>
    </van-nav-bar>

    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShoe" @finish="isCountDownShoe = false"/>
          <van-button
          v-if="!isCountDownShoe"
            round
            size="small"
            class="send-sms-btn"
            type="default"
            native-type="button"
            @click="OnSendSms"            >发送验证码
          </van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShoe: false
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      // 2.表单验证
      // 3.提交表单数据请求登录
      // 4.根据请求响应处理后续操作
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 如果为0，则持续展示
      })
      try {
        const { data } = await login(user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async OnSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('手机号验证成功')
      } catch (error) {
        return console.log(error)
      }
      this.isCountDownShoe = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountDownShoe = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }

  }
}
</script>
<style scoped lang="less">
.toutiao {
  font-size: 37px;
}

.send-sms-btn {
  background-color: #ededed;
  width: 152px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  color: #666;
}

.login-btn-wrap {
  margin: 53px 33px;

  .login-btn {
    background-color: #6db4fb;
  }
}
</style>
