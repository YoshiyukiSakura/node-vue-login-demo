<template>
  <a-card>
    <div v-if="!user.token">
      <a-form :model="form" name="login" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
              @finish="onLogin" @finishFailed="onLoginFailed">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="form.username"/>
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="form.password"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-else>

      <a-alert
          :type="'success'"
          :showIcon="true"
          message="登录成功"
          description="欢迎回来"
          @close="onLogout"
      />
      <ADivider/>
      <a-button
          type="primary"
          @click="onLogout"
      >
        退出登录
      </a-button>
    </div>
  </a-card>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import axios from "axios";
import {message} from 'ant-design-vue';
import MD5 from "crypto-js/md5";

interface LoginForm {
  username: string;
  password: string;
}

type User = {
  token: string;
};


export default defineComponent({
  setup() {
    const user = reactive<User>({token: ""});
    const form = reactive<LoginForm>({username: 'jack', password: 'redballoon',});

    const token = sessionStorage.getItem("token");

    if (token && token !== "undefined") {
      user.token = token;
    }
    const onLogin = async (form: LoginForm) => {

      const baseURL = '/api/user/login';
      try {
        const {data: {code, data, message: msg}} = await axios.post(baseURL, {
          username: form.username,
          password: MD5(form.password).toString(),
        });

        if (code == 200) {
          message.success(msg);
          sessionStorage.setItem('token', data.token);
          user.token = data.token;
        } else {
          message.error(msg ?? "登录失败");
        }
      } catch (error) {
        console.error(error)
      }
    };

    const onLogout = async () => {
      sessionStorage.removeItem('token');
      user.token = "";
      message.info("退出登录");
    };

    const onLoginFailed = (errorInfo: any) => {
      message.error(errorInfo ?? "登录失败");
    };

    return {
      user,
      form,
      onLogin,
      onLogout,
      onLoginFailed,
    };

  },
});
</script>
