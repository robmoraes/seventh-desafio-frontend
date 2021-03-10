<template>
  <q-page padding>
    <q-card style="max-width:600px; width:100%;">
      <q-card-section>
        <div class="text-h6">Perfil de usuário</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit="onSubmit"
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
            label="Senha"
            lazy-rules
            hint="Preencha apenas se desejar alterar a senha."
          />

          <div>
            <q-btn label="Salvar" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProfilePage',
  data () {
    return {
      record: {}
    }
  },
  methods: {
    ...mapActions('profile', ['show', 'update']),
    loadRecord () {
      this.show()
        .then(res => {
          this.record = res.data
        })
        .catch(err => console.error(err.data.message))
    },
    onSubmit () {
      const payload = {
        name: this.record.name,
        email: this.record.email,
        password: this.record.password
      }
      this.update(payload)
        .then(res => {
          this.$q.notify({
            color: 'positive',
            message: 'Perfil atualizado.',
            icon: 'save',
            position: 'top'
          })
        })
        .catch(err => {
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: 'Ocorreu algum problema ao tentar atualizar o perfil.',
              icon: 'report_problem',
              position: 'top'
            })
            console.error(err.data.message)
          }
        })
    }
  },
  mounted () {
    this.loadRecord()
  }
}
</script>
