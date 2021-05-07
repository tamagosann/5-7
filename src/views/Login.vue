<template>
    <v-layout align-start>
        <v-spacer></v-spacer>
            <v-card width="400" class="mt-15">
                <v-card-title class="text-center"> 
                    <v-spacer></v-spacer>
                        <h1 class="display-1">ログイン</h1>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="login">
                        <v-text-field
                         autocomplete="off"
                         prepend-icon="mdi-account-circle" 
                         label="ユーザ名" 
                         v-model="user.name"
                         @keyup="nameKeyUp"
                        />
                        <v-card-text v-show="name_blank_flag" class="alert">
                            ユーザ名かメールアドレスを入力してください。
                        </v-card-text>
                        <v-text-field
                            autocomplete="off"
                            :type="showPassword ? 'text' : 'password'" 
                            prepend-icon="mdi-lock" 
                            @click:append="showPassword = !showPassword" 
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  
                            label="パスワード" 
                            v-model="user.password"
                            @keyup="passwordKeyUp"

                        />
                        <v-card-text v-show="password_blank_flag" class="alert">
                            パスワードを入力してください。
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                depressed
                                elevation="2"
                                type="submit"
                            >ログイン</v-btn>
                        </v-card-actions>
                    </v-form>
                    <v-card-text v-show="loginMissedFlag" class="alert">
                        ログインに失敗しました。ログインIDとパスワードをお確かめください。
                    </v-card-text>
                </v-card-text>
            </v-card>
        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            showPassword: false,
            nameBlankFlag: false,
            passwordBlankFlag: false,
            user: {
                name: '',
                password: '',
            }
        }
    },
    computed: {
        name_blank_flag() {
            return this.nameBlankFlag
        },
        password_blank_flag() {
            return this.passwordBlankFlag
        },
        ...mapGetters(['loginMissedFlag'])
    },
    methods: {
        nameKeyUp() {
            if(!this.user.name) {
                this.nameBlankFlag = true;
            } else {
                this.nameBlankFlag = false;
            }
            this.loginMissedCancelCheck()
        },
        passwordKeyUp() {
            if(!this.user.password) {
                this.passwordBlankFlag = true;
            } else {
                this.passwordBlankFlag = false;
            }
            this.loginMissedCancelCheck()
        },
        login() {
            this.$store.dispatch('login', this.user.name);
        },
        loginMissedCancelCheck() {
            if(this.loginMissedFlag !== true) return;
            this.loginMissedCancel()
        },
        ...mapActions(['loginMissedCancel'])
    }
}
</script>

<style lang="scss" scoped>
    .alert {
        color: red;

    }

</style>