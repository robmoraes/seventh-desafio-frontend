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
                v-model="record.password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Senha *"
                hint="Preencha apenas se deseja alterar a senha"
                >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

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
      record: {},
      isPwd: true
    }
  },
  methods: {
    ...mapActions('profile', ['show', 'update']),
    loadRecord () {
      this.$q.loading.show()
      this.show()
        .then(res => {
          this.$q.loading.hide()
          this.record = res.data
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err) {
            this.$q.notify({ color: 'negative', position: 'top', message: 'Erro ao consultar dados.' })
          }
        })
    },
    onSubmit () {
      this.$q.loading.show()
      const payload = {
        name: this.record.name,
        email: this.record.email,
        password: this.record.password
      }
      this.update(payload)
        .then(res => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Perfil atualizado.',
            icon: 'save',
            position: 'top'
          })
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err) {
            if (err.status === 422) {
              console.log(err.data.errors)
              Object.keys(err.data.errors).forEach(itemKey => {
                const element = err.data.errors[itemKey]
                element.map((value, index) => {
                  this.$q.notify({ color: 'negative', position: 'top', message: value })
                })
              })
            } else {
              this.$q.notify({ color: 'negative', position: 'top', message: 'Erro ao tentar atualizar o perfil!' })
            }
          }
        })
    }
  },
  mounted () {
    this.loadRecord()
  }
}
</script>
