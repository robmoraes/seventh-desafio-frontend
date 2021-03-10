<template>
  <q-page padding>
    <div class="q-pa-md" style="width:100%;">
      <q-table
        title="Log de atividades"
        :loading="loadingTable"
        :data="records"
        :columns="columns"
        row-key="user_name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Well this is sad... {{ message }}
            </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th></q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="refresh" color="primary" @click="listRecords()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ActivityPage',
  data () {
    return {
      loadingTable: false,
      records: [],
      filter: '',
      columns: [
        { name: 'user_name', field: 'user_name', required: true, label: 'Nome', align: 'left', sortable: true },
        { name: 'description', field: 'description', align: 'left', label: 'Descrição', sortable: true },
        { name: 'ip', field: 'ip', align: 'left', label: 'IP', sortable: true },
        { name: 'useragent', field: 'useragent', align: 'left', label: 'User-agent', sortable: false },
        { name: 'created_at', field: 'created_at', align: 'left', label: 'Hora', sortable: false }
      ]
    }
  },
  methods: {
    ...mapActions('activity', ['list']),
    listRecords () {
      this.loadingTable = true
      this.list()
        .then(res => {
          this.records = res.data
          this.loadingTable = false
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            message: `Ocorreu algum problema ao tentar lista os registros. [${err.status} ${err.data.message}]`,
            icon: 'report_problem',
            position: 'top'
          })
          this.loadingTable = false
        })
    }
  },
  mounted () {
    this.listRecords()
  }
}
</script>
