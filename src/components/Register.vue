<template>
  <q-layout
    view="lhh LpR lff"
    container
    :style="($q.platform.is.mobile)
      ? ''
      : 'height: 500px; min-width: 700px'"
    :class="($q.dark.isActive)
      ? 'bg-dark'
      : 'bg-grey-3'"
  >
    <q-header>
      <q-bar>
        <div>Cadastro de usuário</div>
        <q-space />
        <q-btn flat dense icon="close" label="" v-close-popup />
      </q-bar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-card style="width: 100%">
          <q-card-section>
            <div class="text-h6">Cadastro de Usuário</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="record.name"
                label="Nome *"
                lazy-rules
                hint="Máximo 255 caracteres"
                :rules="[
                  val => val && val.length > 0 || 'Digite algo',
                  val => val.length <= 255 || 'Use no máximo 255 caracteres'
                ]"
              />
              <q-input
                filled
                v-model="record.email"
                label="Email *"
                lazy-rules
                hint="Máximo 255 caracteres"
                :rules="[
                  val => val && val.length > 0 || 'Digite algo',
                  val => val.length <= 255 || 'Use no máximo 255 caracteres'
                ]"
              />
              <q-input
                filled
                v-model="record.password"
                label="Senha *"
                lazy-rules
                hint="Máximo 255 caracteres"
                :rules="[
                  val => val && val.length > 0 || 'Digite algo',
                  val => val.length <= 255 || 'Use no máximo 255 caracteres'
                ]"
              />

              <div>
                <q-btn label="Salvar" type="submit" color="primary" />
                <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
                <q-btn flat label="Cancelar" v-close-popup color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>

    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      record: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions('register', ['insert']),
    onSubmit () {
      return this.insertRecord()
    },
    onReset () {
      this.record = []
    },
    insertRecord () {
      this.insert(this.record)
        .then(res => {
          this.$q.notify({ color: 'positive', message: 'Registro incluído!' })
          this.$root.$emit('hideDialogRegister')
        })
        .catch(err => {
          this.$q.notify({ color: 'negative', message: 'Erro ao tentar incluir registro!' })
          console.log(err.response)
        })
    }
  },
  mounted () {
    //
  }
}
</script>
